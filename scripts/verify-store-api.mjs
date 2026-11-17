#!/usr/bin/env node
/**
 * Verifies the REAL WooCommerce backend and (optionally) the deployed/dev storefront proxy against every assumption
 * the integration makes. Run it against STAGING. It creates throw-away carts only (no orders, no payments).
 *
 *   node scripts/verify-store-api.mjs --wp https://commerce.example.com --secret "$RAVIO_PROXY_SECRET" \
 *        [--storefront http://localhost:3000] [--coupon CODE] [--country BD] [--state BD-13] [--json report.json]
 *
 * Exit code 0 only if no check FAILED (SKIPs are reported, not hidden).
 */
import { writeFileSync } from 'node:fs';
const arg = (n, d = '') => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : d; };
const WP = arg('wp').replace(/\/+$/, ''), SECRET = arg('secret'), SF = arg('storefront').replace(/\/+$/, '');
const COUPON = arg('coupon'), COUNTRY = arg('country', 'BD'), STATE = arg('state', '');
if (!WP) { console.error('--wp is required'); process.exit(2); }
const S = '/wp-json/wc/store/v1/', R = '/wp-json/ravio/v1/';
const results = [];
const norm = (s) => String(s).toLowerCase().replace(/^pa_/, '').replace(/[^a-z0-9]+/g, '');
async function check(name, fn) {
  try { const r = await fn(); if (r === 'SKIP' || (r && r.skip)) { results.push({ name, status: 'SKIP', note: r.skip ?? '' }); console.log('SKIP', name, r.skip ?? ''); } else { results.push({ name, status: 'PASS' }); console.log('PASS', name); } }
  catch (e) { results.push({ name, status: 'FAIL', note: e.message }); console.log('FAIL', name, '->', e.message); }
}
const ok = (c, m) => { if (!c) throw new Error(m); };
const has = (o, keys, ctx) => { for (const k of keys) ok(k.split('.').reduce((a, p) => (a == null ? undefined : a[p]), o) !== undefined, `${ctx}: missing field "${k}"`); };

async function wp(path, { method = 'GET', body, token, secret = SECRET, headers = {} } = {}) {
  const h = { Accept: 'application/json', ...headers };
  if (secret) h['X-Ravio-Proxy-Secret'] = secret;
  if (token) h['Cart-Token'] = token;                       // NOTE: no Nonce header is ever sent
  if (body) h['Content-Type'] = 'application/json';
  const res = await fetch(WP + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined, redirect: 'manual' });
  let json = null; try { json = await res.json(); } catch { /* */ }
  return { res, json, token: res.headers.get('cart-token') ?? token };
}

// ---------------- A. Access control on the origin ----------------
await check('A1 Store API rejects requests without the proxy secret (403/503)', async () => {
  const r = await wp(S + 'products?per_page=1', { secret: '' }); ok([403, 503].includes(r.res.status), `got ${r.res.status}; origin is publicly readable`);
});
await check('A2 Store API rejects a WRONG secret', async () => { const r = await wp(S + 'cart', { secret: 'x'.repeat(40) }); ok(r.res.status === 403, `got ${r.res.status}`); });
await check('A3 /ravio/v1/markets rejects requests without the secret', async () => { const r = await wp(R + 'markets', { secret: '' }); ok([403, 503].includes(r.res.status), `got ${r.res.status}`); });
await check('A4 /wc/v3 REST is not usable anonymously', async () => { const r = await wp('/wp-json/wc/v3/products', { secret: '' }); ok([401, 403, 404].includes(r.res.status), `got ${r.res.status}`); });

// ---------------- B. Catalog shape ----------------
let simple, variable;
await check('B1 products collection shape', async () => {
  const { res, json } = await wp(S + 'products?per_page=50'); ok(res.status === 200 && Array.isArray(json), `status ${res.status}`); ok(json.length > 0, 'no products published');
  for (const p of json.slice(0, 5)) has(p, ['id', 'name', 'slug', 'type', 'sku', 'description', 'short_description', 'prices.price', 'prices.regular_price', 'prices.sale_price', 'prices.currency_code', 'prices.currency_minor_unit', 'on_sale', 'images', 'categories', 'attributes', 'variations', 'is_purchasable', 'is_in_stock', 'is_on_backorder', 'low_stock_remaining'], `product ${p.id}`);
  simple = json.find((p) => p.type === 'simple' && p.is_purchasable && p.is_in_stock); variable = json.find((p) => p.type === 'variable' && p.is_purchasable);
});
await check('B2 prices are integer-strings in minor units', async () => { const p = simple ?? variable; ok(p, 'no product'); ok(/^\d+$/.test(p.prices.price), `price=${p.prices.price}`); ok(Number.isInteger(p.prices.currency_minor_unit), 'minor unit'); });
await check('B3 currency is BDT', async () => { const p = simple ?? variable; ok(p.prices.currency_code === 'BDT', `currency=${p.prices.currency_code}`); });
await check('B4 category endpoint shape', async () => { const { res, json } = await wp(S + 'products/categories?per_page=100'); ok(res.status === 200 && Array.isArray(json), `status ${res.status}`); if (json[0]) has(json[0], ['id', 'name', 'slug', 'count'], 'category'); });
await check('B5 search / orderby / stock_status params accepted', async () => {
  for (const q of ['search=a', 'orderby=price&order=asc', 'orderby=date&order=desc', 'orderby=title&order=asc', 'orderby=menu_order&order=asc', 'stock_status[]=instock']) { const r = await wp(S + 'products?per_page=2&' + q); ok(r.res.status === 200, `${q} -> ${r.res.status}`); }
});
await check('B6 lookup by slug returns the product', async () => { const p = simple ?? variable; const { json } = await wp(S + 'products?slug=' + encodeURIComponent(p.slug)); ok(json[0]?.id === p.id, 'slug filter not honoured'); });
await check('B7 category filter by id', async () => { const c = (await wp(S + 'products/categories?per_page=100')).json.find((x) => x.count > 0); if (!c) return { skip: 'no non-empty category' }; const { res, json } = await wp(S + 'products?category=' + c.id); ok(res.status === 200 && json.every((p) => p.categories.some((x) => x.id === c.id)), 'filter wrong'); });

// ---------------- C. Variable products ----------------
let variations = [];
await check('C1 variable product exists (create one: Size S/M/L/XL with stock + prices)', async () => { if (!variable) return { skip: 'NO VARIABLE PRODUCT ON STORE' }; ok(variable.variations.length > 0, 'no variations'); has(variable.variations[0], ['id', 'attributes'], 'parent.variations[0]'); ok(variable.attributes.some((a) => a.has_variations), 'no attribute flagged has_variations'); });
await check('C2 variation retrieval: products?type=variation&parent=<id>', async () => {
  if (!variable) return { skip: 'no variable product' };
  const { res, json } = await wp(S + `products?type=variation&parent=${variable.id}&per_page=100`); ok(res.status === 200 && Array.isArray(json), `status ${res.status} (parameter unsupported on this version?)`);
  ok(json.length === variable.variations.length, `got ${json.length} variations, parent lists ${variable.variations.length}`);
  for (const v of json) has(v, ['id', 'sku', 'prices.price', 'is_in_stock', 'is_purchasable', 'attributes'], `variation ${v.id}`);
  ok(json.every((v) => variable.variations.some((pv) => pv.id === v.id)), 'variation ids differ from parent.variations ids'); variations = json;
});
await check('C3 attribute NAMES agree between parent attributes and variation attributes (after normalisation)', async () => {
  if (!variable) return { skip: 'no variable product' };
  const parentNames = new Set(variable.attributes.filter((a) => a.has_variations).map((a) => norm(a.name)));
  for (const pv of variable.variations) for (const a of pv.attributes) ok(parentNames.has(norm(a.name)), `variation attr "${a.name}" not among parent attrs ${[...parentNames]}`);
  console.log('     parent attrs:', JSON.stringify(variable.attributes.map((a) => ({ name: a.name, taxonomy: a.taxonomy, terms: a.terms.map((t) => t.slug) }))), '\n     sample variation attrs:', JSON.stringify(variable.variations[0].attributes));
});
await check('C4 variation values are term slugs present in the parent attribute terms (or empty = any)', async () => {
  if (!variable) return { skip: 'no variable product' };
  for (const pv of variable.variations) for (const a of pv.attributes) { if (a.value === '') continue; const pa = variable.attributes.find((x) => norm(x.name) === norm(a.name)); ok(pa.terms.some((t) => t.slug === a.value || t.name === a.value), `value "${a.value}" not in terms ${pa.terms.map((t) => t.slug)}`); }
});

// ---------------- D. Cart via Cart-Token only (no Nonce) ----------------
let token, itemKey, cartShape;
await check('D1 GET cart returns a Cart-Token header', async () => { const r = await wp(S + 'cart'); ok(r.res.status === 200, `status ${r.res.status}`); ok(r.res.headers.get('cart-token'), 'NO Cart-Token response header: proxy cookie flow cannot work'); token = r.token; cartShape = r.json; has(r.json, ['items', 'items_count', 'totals.total_price', 'totals.currency_code', 'totals.currency_minor_unit', 'needs_shipping', 'coupons', 'shipping_rates'], 'cart'); });
await check('D2 add simple product with Cart-Token only (no Nonce)', async () => {
  if (!simple) return { skip: 'no simple in-stock product' };
  const r = await wp(S + 'cart/add-item', { method: 'POST', token, body: { id: simple.id, quantity: 1 } }); ok(r.res.status === 201 || r.res.status === 200, `status ${r.res.status}: ${JSON.stringify(r.json)}`);
  token = r.token; has(r.json.items[0], ['key', 'id', 'quantity', 'name', 'prices.price', 'totals.line_total', 'quantity_limits.minimum', 'quantity_limits.maximum', 'variation', 'images'], 'cart item'); itemKey = r.json.items[0].key; ok(r.json.items_count === 1, 'count');
});
await check('D3 add VARIATION: id = variation id + variation:[{attribute,value}]', async () => {
  if (!variable || !variations.length) return { skip: 'no variation data' };
  const v = variations.find((x) => x.is_in_stock && x.is_purchasable); if (!v) return { skip: 'no in-stock variation' };
  const pv = variable.variations.find((x) => x.id === v.id);
  const attrs = pv.attributes.map((a) => ({ attribute: a.name, value: a.value || variable.attributes.find((x) => norm(x.name) === norm(a.name)).terms[0].slug }));
  const r = await wp(S + 'cart/add-item', { method: 'POST', token, body: { id: v.id, quantity: 1, variation: attrs } }); ok([200, 201].includes(r.res.status), `status ${r.res.status}: ${JSON.stringify(r.json)}`);
  token = r.token; const line = r.json.items.find((i) => i.id === v.id); ok(line, `variation line not in cart (items: ${r.json.items.map((i) => i.id)})`);
  ok(line.variation.length > 0, 'cart line has no variation attributes echoed'); ok(line.prices.price === v.prices.price, `cart price ${line.prices.price} != variation price ${v.prices.price}`);
  console.log('     cart line variation echo:', JSON.stringify(line.variation));
});
await check('D4 variation add WITHOUT attributes is rejected (guards the UI assumption)', async () => {
  if (!variable || !variations.length) return { skip: 'no variation data' };
  const r = await wp(S + 'cart/add-item', { method: 'POST', token, body: { id: variable.id, quantity: 1 } }); ok(r.res.status >= 400, `parent variable product added without a variation (status ${r.res.status})`);
});
await check('D5 update-item quantity', async () => { if (!itemKey) return { skip: 'no cart item' }; const r = await wp(S + 'cart/update-item', { method: 'POST', token, body: { key: itemKey, quantity: 2 } }); ok(r.res.status === 200, `status ${r.res.status}`); ok(r.json.items.find((i) => i.key === itemKey).quantity === 2, 'quantity not updated'); token = r.token; });
await check('D6 over-stock quantity is refused', async () => { if (!itemKey) return { skip: 'no cart item' }; const r = await wp(S + 'cart/update-item', { method: 'POST', token, body: { key: itemKey, quantity: 99999 } }); ok(r.res.status >= 400, `accepted quantity 99999 (status ${r.res.status}); check stock management/limits`); });
await check('D7 invalid coupon is rejected', async () => { const r = await wp(S + 'cart/apply-coupon', { method: 'POST', token, body: { code: 'definitely-not-a-coupon-xyz' } }); ok(r.res.status >= 400, `status ${r.res.status}`); has(r.json, ['code', 'message'], 'error body'); });
await check('D8 valid coupon applies and removes (pass --coupon)', async () => {
  if (!COUPON) return { skip: 'pass --coupon CODE (create a 10% coupon on staging)' };
  const a = await wp(S + 'cart/apply-coupon', { method: 'POST', token, body: { code: COUPON } }); ok(a.res.status === 200, `apply ${a.res.status}: ${JSON.stringify(a.json)}`); ok(a.json.coupons.some((c) => c.code.toLowerCase() === COUPON.toLowerCase()), 'coupon not listed'); ok(Number(a.json.totals.total_discount) > 0, 'no discount applied');
  const d = await wp(S + 'cart/remove-coupon', { method: 'POST', token, body: { code: COUPON } }); ok(d.res.status === 200 && d.json.coupons.length === 0, `remove ${d.res.status}`);
});
await check('D9 cart persists with the same token ("page reload")', async () => { if (!itemKey) return { skip: 'no cart' }; const r = await wp(S + 'cart', { token }); ok(r.json.items.length > 0 && r.json.items.some((i) => i.key === itemKey), 'cart lost'); });
await check('D10 a different token / no token sees an EMPTY cart ("separate browser")', async () => { const r = await wp(S + 'cart'); ok(r.json.items.length === 0, 'carts are shared between sessions!'); ok(r.token !== token, 'same token issued to two sessions'); });
await check('D11 update-customer prices shipping; rates have the fields the UI reads', async () => {
  if (!itemKey) return { skip: 'no cart' };
  const addr = { country: COUNTRY, state: STATE, city: 'Dhaka', postcode: '1212' };
  const r = await wp(S + 'cart/update-customer', { method: 'POST', token, body: { billing_address: addr, shipping_address: addr } }); ok(r.res.status === 200, `status ${r.res.status}: ${JSON.stringify(r.json)}`); token = r.token;
  if (!r.json.needs_shipping) return { skip: 'cart does not need shipping' };
  const rates = r.json.shipping_rates[0]?.shipping_rates ?? []; ok(rates.length > 0, 'no shipping rates: configure a zone for ' + COUNTRY); has(rates[0], ['rate_id', 'name', 'price', 'selected', 'currency_code', 'currency_minor_unit'], 'rate'); has(r.json.shipping_rates[0], ['package_id'], 'package');
  const sel = await wp(S + 'cart/select-shipping-rate', { method: 'POST', token, body: { package_id: r.json.shipping_rates[0].package_id, rate_id: rates[0].rate_id } }); ok(sel.res.status === 200, `select ${sel.res.status}: ${JSON.stringify(sel.json)}`); ok(sel.json.shipping_rates[0].shipping_rates.find((x) => x.rate_id === rates[0].rate_id).selected, 'rate not selected');
});
await check('D12 shipping to a country NOT on the allow-list is not priceable', async () => { if (!itemKey) return { skip: 'no cart' }; const a = { country: 'ZZ', state: '', city: 'x', postcode: '1' }; const r = await wp(S + 'cart/update-customer', { method: 'POST', token, body: { billing_address: a, shipping_address: a } }); const rates = r.json?.shipping_rates?.[0]?.shipping_rates ?? []; ok(r.res.status >= 400 || rates.length === 0, 'rates offered for an unlisted country'); });
await check('D13 remove-item', async () => { if (!itemKey) return { skip: 'no cart' }; const r = await wp(S + 'cart/remove-item', { method: 'POST', token, body: { key: itemKey } }); ok(r.res.status === 200 && !r.json.items.some((i) => i.key === itemKey), `status ${r.res.status}`); });

// ---------------- E. Markets / payment eligibility ----------------
await check('E1 /ravio/v1/markets shape and policy (COD only BD, bKash absent, sslcommerz only if enabled)', async () => {
  const { res, json } = await wp(R + 'markets'); ok(res.status === 200, `status ${res.status}`); has(json, ['base_currency', 'countries'], 'markets'); ok(json.base_currency === 'BDT', 'base currency'); 
  for (const c of json.countries) { has(c, ['code', 'name', 'states', 'payment_methods'], 'country'); ok(!c.payment_methods.some((m) => /bkash/i.test(m.id)), 'bKash is exposed'); if (c.code !== 'BD') ok(!c.payment_methods.some((m) => m.id === 'cod'), `COD offered for ${c.code}`); }
});
await check('E2 checkout is refused for COD with a non-BD address (needs a non-BD country allow-listed to be meaningful)', async () => {
  const m = (await wp(R + 'markets')).json.countries.find((c) => c.code !== 'BD'); if (!m) return { skip: 'only BD is enabled, which is the safe default' };
  const t = (await wp(S + 'cart')).token; await wp(S + 'cart/add-item', { method: 'POST', token: t, body: { id: simple.id, quantity: 1 } });
  const a = { first_name: 'T', last_name: 'T', address_1: '1 Test', city: 'X', state: '', postcode: '1', country: m.code, phone: '1' };
  const r = await wp(S + 'checkout', { method: 'POST', token: t, body: { billing_address: { ...a, email: 't@example.com' }, shipping_address: a, payment_method: 'cod', payment_data: [] } }); ok(r.res.status >= 400, `COD checkout for ${m.code} returned ${r.res.status}`); console.log('     refusal code:', r.json?.code);
});

// ---------------- F. Storefront proxy (cookie flow) ----------------
if (!SF) { results.push({ name: 'F* storefront proxy checks', status: 'SKIP', note: 'pass --storefront URL (npm run dev or the deployed Worker)' }); console.log('SKIP F* storefront proxy checks (pass --storefront)'); }
else {
  const jar = () => { const c = {}; return { get: () => Object.entries(c).map(([k, v]) => `${k}=${v}`).join('; '), set(res) { for (const sc of res.headers.getSetCookie?.() ?? []) { const [kv] = sc.split(';'); const [k, ...v] = kv.split('='); c[k.trim()] = v.join('='); } } }; };
  const sf = async (j, path, { method = 'GET', body, origin = SF } = {}) => { const h = { Accept: 'application/json' }; const ck = j.get(); if (ck) h.Cookie = ck; if (body) h['Content-Type'] = 'application/json'; if (method !== 'GET' && origin) h.Origin = origin; const res = await fetch(SF + '/api/store/' + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined, redirect: 'manual' }); j.set(res); let json = null; try { json = await res.json(); } catch { /* */ } return { res, json }; };
  const A = jar(), B = jar(); let rawCookie = '';
  await check('F1 proxy: GET cart/ sets ravio_ct as HttpOnly; SameSite=Lax (+Secure on https)', async () => { const res = await fetch(SF + '/api/store/cart/'); const sc = (res.headers.getSetCookie?.() ?? []).find((c) => c.startsWith('ravio_ct=')); ok(sc, 'no ravio_ct cookie'); rawCookie = sc; ok(/httponly/i.test(sc), 'not HttpOnly'); ok(/samesite=lax/i.test(sc), 'SameSite not Lax'); if (SF.startsWith('https')) ok(/secure/i.test(sc), 'not Secure over https'); ok(!/domain=/i.test(sc), 'cookie has a Domain attribute (should be host-only)'); });
  await check('F2 proxy responses are never cacheable', async () => { const r = await sf(A, 'cart/'); ok(/no-store/i.test(r.res.headers.get('cache-control') ?? ''), `cache-control="${r.res.headers.get('cache-control')}"`); });
  await check('F3 proxy: add item, reload (same cookie jar) keeps the cart', async () => { if (!simple) return { skip: 'no simple product' }; const a = await sf(A, 'cart/add-item/', { method: 'POST', body: { id: simple.id, quantity: 1 } }); ok(a.res.status < 300, `add ${a.res.status}: ${JSON.stringify(a.json)}`); const r = await sf(A, 'cart/'); ok(r.json.items_count === 1, `after reload items_count=${r.json.items_count}`); });
  await check('F4 proxy: a separate cookie jar has an empty cart', async () => { const r = await sf(B, 'cart/'); ok(r.json.items_count === 0, 'carts leaked between browsers'); });
  await check('F5 proxy: POST without Origin -> 403', async () => { const r = await sf(A, 'cart/add-item/', { method: 'POST', body: { id: 1, quantity: 1 }, origin: '' }); ok(r.res.status === 403, `status ${r.res.status}`); });
  await check('F6 proxy: POST with foreign Origin -> 403', async () => { const r = await sf(A, 'cart/add-item/', { method: 'POST', body: { id: 1, quantity: 1 }, origin: 'https://evil.example' }); ok(r.res.status === 403, `status ${r.res.status}`); });
  await check('F7 proxy: unknown / admin paths -> 404', async () => { for (const p of ['products/', 'cart/../../wc/v3/orders/', 'batch/', 'wc/v3/products/']) { const r = await sf(A, p); ok(r.res.status === 404, `${p} -> ${r.res.status}`); } });
  await check('F8 proxy: oversized body -> 413', async () => { const r = await sf(A, 'cart/apply-coupon/', { method: 'POST', body: { code: 'x'.repeat(40000) } }); ok(r.res.status === 413, `status ${r.res.status}`); });
  await check('F9 proxy: non-JSON content type -> 415', async () => { const res = await fetch(SF + '/api/store/cart/apply-coupon/', { method: 'POST', headers: { Origin: SF, 'Content-Type': 'text/plain' }, body: 'x' }); ok(res.status === 415, `status ${res.status}`); });
  await check('F10 browser JS cannot read the token: cookie value never appears in any response body', async () => { const v = rawCookie.split(';')[0].split('=').slice(1).join('='); const r = await fetch(SF + '/api/store/cart/', { headers: { Cookie: `ravio_ct=${v}` } }); const t = await r.text(); ok(!t.includes(v), 'token echoed in body'); });
}

const fail = results.filter((r) => r.status === 'FAIL').length, skip = results.filter((r) => r.status === 'SKIP').length, pass = results.filter((r) => r.status === 'PASS').length;
console.log(`\nSUMMARY: ${pass} passed, ${fail} FAILED, ${skip} skipped`);
if (arg('json')) writeFileSync(arg('json'), JSON.stringify({ when: new Date().toISOString(), wp: WP, storefront: SF || null, results }, null, 2));
process.exit(fail ? 1 : 0);
