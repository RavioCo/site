/**
 * Same-origin proxy between the browser and WooCommerce.
 *  - Browser -> /api/store/* (this file) -> https://commerce.ravioco.com/wp-json/...
 *  - The Store API `Cart-Token` is kept in an HttpOnly, Secure, SameSite=Lax cookie on the STOREFRONT origin only.
 *    JavaScript can never read it; no third-party / cross-subdomain cookie is involved.
 *  - Strict allow-list of paths and methods; JSON-only bodies with a size cap; same-origin check on mutations.
 *  - Responses are never cacheable.
 */
import { NextRequest, NextResponse } from 'next/server';
import { UpstreamError, WP_NS_RAVIO, WP_NS_STORE, upstreamHeaders, wpBase } from '@/lib/woo/server';

export const dynamic = 'force-dynamic';

const COOKIE = 'ravio_ct';
const MAX_BODY = 32_768;
const GET_STORE = [/^cart$/, /^cart\/items$/, /^cart\/coupons$/, /^checkout$/, /^order\/\d{1,12}$/];
const POST_STORE = new Set(['cart/add-item', 'cart/update-item', 'cart/remove-item', 'cart/apply-coupon', 'cart/remove-coupon', 'cart/select-shipping-rate', 'cart/update-customer', 'checkout']);
const GET_RAVIO = new Set(['markets']);

const NO_STORE = { 'Cache-Control': 'private, no-store, max-age=0', Vary: 'Cookie' };
const fail = (status: number, code: string, message: string) => NextResponse.json({ code, message }, { status, headers: NO_STORE });

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;               // mutations from browsers always send Origin
  try { return new URL(origin).host === req.nextUrl.host; } catch { return false; }
}

async function handle(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const segs = (await ctx.params).path ?? [];
  const path = segs.join('/');
  if (!/^[a-z0-9\-/]{1,80}$/.test(path)) return fail(404, 'not_found', 'Not found.');
  const method = req.method;

  let target: string;
  let body: string | undefined;
  if (method === 'GET') {
    if (GET_RAVIO.has(path)) target = WP_NS_RAVIO + path;
    else if (GET_STORE.some((r) => r.test(path))) target = WP_NS_STORE + path;
    else return fail(404, 'not_found', 'Not found.');
    // Order lookups must carry key + billing_email; pass only those two query parameters.
    if (path.startsWith('order/')) {
      const key = req.nextUrl.searchParams.get('key') ?? '';
      const email = req.nextUrl.searchParams.get('billing_email') ?? '';
      target += `?key=${encodeURIComponent(key)}&billing_email=${encodeURIComponent(email)}`;
    }
  } else if (method === 'POST') {
    if (!POST_STORE.has(path)) return fail(404, 'not_found', 'Not found.');
    if (!sameOrigin(req)) return fail(403, 'forbidden_origin', 'Request origin not allowed.');
    if (!(req.headers.get('content-type') ?? '').includes('application/json')) return fail(415, 'unsupported_media_type', 'JSON required.');
    const raw = await req.text();
    if (raw.length > MAX_BODY) return fail(413, 'payload_too_large', 'Request too large.');
    try { const j = JSON.parse(raw); if (typeof j !== 'object' || j === null || Array.isArray(j)) throw new Error('shape'); } catch { return fail(400, 'invalid_json', 'Invalid request.'); }
    body = raw;
    target = WP_NS_STORE + path;
  } else {
    return fail(405, 'method_not_allowed', 'Method not allowed.');
  }

  let upstream: Response;
  try {
    const headers = upstreamHeaders(body ? { 'Content-Type': 'application/json' } : {});
    const token = req.cookies.get(COOKIE)?.value;
    if (token && /^[\w.\-]+$/.test(token) && target.startsWith(WP_NS_STORE)) headers['Cart-Token'] = token;
    const ip = req.headers.get('cf-connecting-ip');
    if (ip) headers['X-Forwarded-For'] = ip;
    upstream = await fetch(`${wpBase()}${target}`, { method, headers, body, cache: 'no-store', redirect: 'manual' });
  } catch (e) {
    const status = e instanceof UpstreamError ? e.status : 502;
    return fail(status, 'upstream_unavailable', 'The store is temporarily unavailable. Please try again.');
  }

  if (upstream.status >= 500) return fail(502, 'upstream_error', 'The store could not complete that request. Please try again.');

  const text = await upstream.text();
  let payload: unknown;
  try { payload = JSON.parse(text); } catch { return fail(502, 'bad_upstream_response', 'Unexpected response from the store.'); }
  // Errors from WooCommerce carry a safe { code, message, data.status } shape; do not leak anything else.
  if (!upstream.ok && payload && typeof payload === 'object') {
    const p = payload as { code?: string; message?: string; data?: { status?: number; params?: unknown } };
    payload = { code: p.code ?? 'error', message: p.message ?? 'Request failed.', data: { status: p.data?.status ?? upstream.status, params: p.data?.params } };
  }
  const res = NextResponse.json(payload, { status: upstream.status, headers: NO_STORE });
  const newToken = upstream.headers.get('Cart-Token');
  if (newToken && /^[\w.\-]+$/.test(newToken)) {
    res.cookies.set(COOKIE, newToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
  }
  return res;
}

export const GET = handle;
export const POST = handle;
