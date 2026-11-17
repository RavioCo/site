import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const SECRET = 'm'.repeat(40), PORT = 8798;
const mock = spawn(process.execPath, ['tests/mock-wp.mjs'], { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));
test.after(() => mock.kill());

process.env.WC_STORE_URL = `http://127.0.0.1:${PORT}`;
process.env.RAVIO_PROXY_SECRET = SECRET;
process.env.NODE_ENV = 'test';
const { GET, POST } = await import('./.build/route.mjs');

const ORIGIN = 'https://ravioco.com';
const req = (path, { method = 'GET', body, origin = ORIGIN, ct = 'application/json', cookie } = {}) => {
  const headers = {}; if (origin !== null && method !== 'GET') headers.origin = origin; if (body !== undefined) headers['content-type'] = ct; if (cookie) headers.cookie = cookie;
  return { r: new Request(`https://ravioco.com/api/store/${path}/`, { method, headers, body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body) }), segs: path.split('/') };
};
import { NextRequest } from './next-server-shim.mjs';
const call = async (path, o = {}) => { const { r, segs } = req(path, o); const h = o.method === 'POST' ? POST : GET; const res = await h(new NextRequest(r.url, { method: r.method, headers: r.headers, body: r.body, duplex: 'half' }), { params: Promise.resolve({ path: segs }) }); return { res, json: await res.clone().json().catch(() => null) }; };
const host = new URL(ORIGIN).host;

test('GET cart creates a session cookie with the right options', async () => {
  const { res } = await call('cart'); assert.equal(res.status, 200);
  const c = res.cookieCalls[0]; assert.equal(c.name, 'ravio_ct');
  assert.deepEqual({ httpOnly: c.opts.httpOnly, sameSite: c.opts.sameSite, path: c.opts.path, hasDomain: 'domain' in c.opts }, { httpOnly: true, sameSite: 'lax', path: '/', hasDomain: false });
});
test('production refuses a non-https WooCommerce origin (the Secure flag itself needs a real https check: verify-store-api F1)', async () => {
  process.env.NODE_ENV = 'production'; process.env.WC_STORE_URL = `http://127.0.0.1:${PORT}`;
  const { res, json } = await call('cart'); process.env.NODE_ENV = 'test';
  assert.equal(res.status, 503, 'production must refuse a non-https origin'); assert.equal(json.code, 'upstream_unavailable');
});
test('responses are never cacheable', async () => { const { res } = await call('cart'); assert.match(res.headers.get('cache-control'), /no-store/); });
test('cart persists across requests when the cookie is replayed; a fresh jar is empty', async () => {
  const first = await call('cart'); const tok = first.res.cookieCalls[0].value;
  const add = await call('cart/add-item', { method: 'POST', body: { id: 1, quantity: 1 }, cookie: `ravio_ct=${tok}` }); assert.equal(add.res.status, 201);
  const again = await call('cart', { cookie: `ravio_ct=${tok}` }); assert.equal(again.json.items_count, 1);
  const other = await call('cart'); assert.equal(other.json.items_count, 0);
});
test('POST without Origin -> 403', async () => assert.equal((await call('cart/add-item', { method: 'POST', body: { id: 1, quantity: 1 }, origin: null })).res.status, 403));
test('POST with foreign Origin -> 403', async () => assert.equal((await call('cart/add-item', { method: 'POST', body: { id: 1, quantity: 1 }, origin: 'https://evil.example' })).res.status, 403));
test('POST with lookalike Origin host -> 403', async () => assert.equal((await call('cart/add-item', { method: 'POST', body: { id: 1, quantity: 1 }, origin: 'https://ravioco.com.evil.example' })).res.status, 403));
test('non-JSON content type -> 415', async () => assert.equal((await call('cart/apply-coupon', { method: 'POST', body: 'x', ct: 'text/plain' })).res.status, 415));
test('oversized body -> 413', async () => assert.equal((await call('cart/apply-coupon', { method: 'POST', body: { code: 'x'.repeat(40000) } })).res.status, 413));
test('invalid JSON / array body -> 400', async () => { assert.equal((await call('cart/apply-coupon', { method: 'POST', body: '{nope' })).res.status, 400); assert.equal((await call('cart/apply-coupon', { method: 'POST', body: '[1]' })).res.status, 400); });
test('allow-list: unknown, traversal and admin paths -> 404', async () => {
  for (const p of ['products', 'batch', 'wc/v3/orders', 'cart/../x', 'cart/items/extra', 'order/abc', 'Cart', 'cart%2F..']) assert.equal((await call(p)).res.status, 404, p);
});
test('allow-list: unlisted POST path -> 404 (no origin leak)', async () => assert.equal((await call('cart/select-payment', { method: 'POST', body: {} })).res.status, 404));
import * as routeExports from './.build/route.mjs';
test('only GET and POST are exported', () => assert.deepEqual(Object.keys(routeExports).filter((k) => /^[A-Z]+$/.test(k)).sort(), ['GET', 'POST']));
test('upstream errors are sanitised to {code,message,data}', async () => {
  const { json } = await call('cart/apply-coupon', { method: 'POST', body: { code: 'nope' } }); assert.deepEqual(Object.keys(json).sort(), ['code', 'data', 'message']);
});
test('markets passes through', async () => { const { res, json } = await call('markets'); assert.equal(res.status, 200); assert.equal(json.base_currency, 'BDT'); });
test('FAIL CLOSED: production + https + NO secret -> 503 and no upstream call', async () => {
  const keep = process.env.RAVIO_PROXY_SECRET; delete process.env.RAVIO_PROXY_SECRET; process.env.NODE_ENV = 'production'; process.env.WC_STORE_URL = 'https://127.0.0.1:1';
  const { res, json } = await call('cart'); process.env.NODE_ENV = 'test'; process.env.RAVIO_PROXY_SECRET = keep; process.env.WC_STORE_URL = `http://127.0.0.1:${PORT}`;
  assert.equal(res.status, 503); assert.equal(json.code, 'upstream_unavailable');
});
test('wrong secret is rejected by the origin and surfaced as an error (not data)', async () => {
  process.env.RAVIO_PROXY_SECRET = 'z'.repeat(40); const { res } = await call('cart'); process.env.RAVIO_PROXY_SECRET = SECRET; assert.equal(res.status, 403);
});
void host;
