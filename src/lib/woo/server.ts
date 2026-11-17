/**
 * SERVER-ONLY helpers. Never import from a 'use client' file.
 * Browser code never talks to WordPress: it talks to /api/store/* on the storefront origin (see app/api/store).
 */
export const WP_NS_STORE = '/wp-json/wc/store/v1/';
export const WP_NS_RAVIO = '/wp-json/ravio/v1/';

export class UpstreamError extends Error {
  constructor(public status: number, message: string) { super(message); this.name = 'UpstreamError'; }
}

export function wpBase(): string {
  const b = (process.env.WC_STORE_URL ?? '').trim().replace(/\/+$/, '');
  if (!b) throw new UpstreamError(503, 'WC_STORE_URL is not configured.');
  if (!/^https:\/\//.test(b) && process.env.NODE_ENV === 'production') throw new UpstreamError(503, 'WC_STORE_URL must be https in production.');
  return b;
}

/** Headers that identify the storefront proxy to the WordPress plugin (shared secret; mandatory in production). */
export function upstreamHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const h: Record<string, string> = { Accept: 'application/json', ...extra };
  const secret = process.env.RAVIO_PROXY_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    // Fail closed: never talk to the commerce API without the shared secret in production.
    throw new UpstreamError(503, 'RAVIO_PROXY_SECRET is required in production.');
  }
  if (secret) h['X-Ravio-Proxy-Secret'] = secret;
  return h;
}

/** Cacheable GET for PUBLIC catalog data only (no cookies, no cart token, no customer data). */
export async function publicGet<T>(path: string, revalidate = 60): Promise<{ data: T; headers: Headers }> {
  const res = await fetch(`${wpBase()}${path}`, {
    headers: upstreamHeaders(),
    // `next` is honoured by Next's patched fetch; ignored elsewhere.
    next: { revalidate },
  } as RequestInit);
  if (!res.ok) throw new UpstreamError(res.status, `Catalog request failed (${res.status}).`);
  return { data: (await res.json()) as T, headers: res.headers };
}
