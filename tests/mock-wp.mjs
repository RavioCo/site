// MOCK of the assumed WooCommerce/bridge behaviour. Exists ONLY to smoke-test scripts/verify-store-api.mjs.
// Passing against this mock proves the script runs; it proves NOTHING about real WooCommerce.
import http from 'node:http';
const SECRET = 'm'.repeat(40);
const prices = (p) => ({ price: p, regular_price: p, sale_price: '', currency_code: 'BDT', currency_minor_unit: 2 });
const P = [
  { id: 1, name: 'Tee', slug: 'tee', type: 'simple', sku: 'T', description: '', short_description: '', prices: prices('120000'), on_sale: false, images: [], categories: [{ id: 5, name: 'T-shirts', slug: 'tee' }], attributes: [], variations: [], is_purchasable: true, is_in_stock: true, is_on_backorder: false, low_stock_remaining: null },
  { id: 2, name: 'Polo', slug: 'polo', type: 'variable', sku: '', description: '', short_description: '', prices: prices('450000'), on_sale: false, images: [], categories: [{ id: 6, name: 'Polo', slug: 'polo' }],
    attributes: [{ id: 1, name: 'Size', taxonomy: 'pa_size', has_variations: true, terms: [{ id: 1, name: 'S', slug: 's' }, { id: 2, name: 'M', slug: 'm' }] }],
    variations: [{ id: 21, attributes: [{ name: 'Size', value: 's' }] }, { id: 22, attributes: [{ name: 'Size', value: 'm' }] }], is_purchasable: true, is_in_stock: true, is_on_backorder: false, low_stock_remaining: null },
  { id: 21, name: 'Polo - S', slug: 'polo-s', type: 'variation', sku: 'P-S', prices: prices('450000'), attributes: [{ name: 'Size', value: 's' }], is_in_stock: true, is_purchasable: true, is_on_backorder: false, images: [], categories: [], variations: [] },
  { id: 22, name: 'Polo - M', slug: 'polo-m', type: 'variation', sku: 'P-M', prices: prices('450000'), attributes: [{ name: 'Size', value: 'm' }], is_in_stock: true, is_purchasable: true, is_on_backorder: false, images: [], categories: [], variations: [] },
];
const carts = new Map(); let n = 0;
const empty = () => ({ items: [], items_count: 0, needs_shipping: true, coupons: [], shipping_rates: [], totals: { total_items: '0', total_discount: '0', total_shipping: null, total_tax: '0', total_price: '0', currency_code: 'BDT', currency_minor_unit: 2 } });
const reprice = (c) => { const t = c.items.reduce((s, i) => s + Number(i.prices.price) * i.quantity, 0); const d = c.coupons.length ? Math.round(t * 0.1) : 0; c.items_count = c.items.reduce((s, i) => s + i.quantity, 0); c.totals.total_items = String(t); c.totals.total_discount = String(d); c.totals.total_price = String(t - d + (c.country === 'BD' ? 6000 : 0)); c.shipping_rates = c.country === 'BD' ? [{ package_id: 0, shipping_rates: [{ rate_id: 'flat_rate:1', name: 'Standard', price: '6000', selected: !!c.rate, currency_code: 'BDT', currency_minor_unit: 2 }] }] : []; return c; };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x'); let body = ''; req.on('data', (d) => (body += d)); req.on('end', () => {
    const send = (s, j, tok) => { const h = { 'Content-Type': 'application/json' }; if (tok) h['Cart-Token'] = tok; res.writeHead(s, h); res.end(JSON.stringify(j)); };
    const p = u.pathname; const prot = p.startsWith('/wp-json/wc/store/') || p.startsWith('/wp-json/ravio/');
    if (p.startsWith('/wp-json/wc/v3')) return send(401, { code: 'rest_forbidden' });
    if (prot && req.headers['x-ravio-proxy-secret'] !== SECRET) return send(403, { code: 'ravio_forbidden', message: 'Forbidden.' });
    let tok = req.headers['cart-token']; if (!tok || !carts.has(tok)) { tok = 'tok' + ++n; carts.set(tok, empty()); } const c = carts.get(tok); const j = body ? JSON.parse(body) : {};
    const q = u.searchParams;
    if (p.endsWith('/products/categories')) return send(200, [{ id: 5, name: 'T-shirts', slug: 'tee', count: 1 }, { id: 6, name: 'Polo', slug: 'polo', count: 1 }]);
    if (p.endsWith('/products')) { let l = P; if (q.get('type') === 'variation') l = P.filter((x) => x.type === 'variation' && String(q.get('parent')) === '2' && x.id > 20); else l = P.filter((x) => x.type !== 'variation'); if (q.get('slug')) l = l.filter((x) => x.slug === q.get('slug')); if (q.get('category')) l = l.filter((x) => x.categories.some((cc) => String(cc.id) === q.get('category'))); return send(200, l); }
    if (p.endsWith('/cart') && req.method === 'GET') return send(200, reprice(c), tok);
    if (p.endsWith('/cart/add-item')) { const pr = P.find((x) => x.id === j.id); if (!pr || pr.type === 'variable') return send(400, { code: 'woocommerce_rest_variation_id_required' }, tok); if (pr.type === 'variation' && !j.variation?.length) return send(400, { code: 'missing_variation_data' }, tok); const ex = c.items.find((i) => i.id === j.id); if (ex) ex.quantity += j.quantity; else c.items.push({ key: 'k' + j.id, id: j.id, name: pr.name, quantity: j.quantity, variation: (j.variation ?? []).map((v) => ({ attribute: v.attribute, value: v.value })), images: [], prices: pr.prices, totals: { line_total: pr.prices.price, currency_minor_unit: 2, currency_code: 'BDT' }, quantity_limits: { minimum: 1, maximum: 10, editable: true } }); return send(201, reprice(c), tok); }
    if (p.endsWith('/cart/update-item')) { if (j.quantity > 10) return send(400, { code: 'woocommerce_rest_cart_invalid_qty', message: 'Too many' }, tok); c.items.find((i) => i.key === j.key).quantity = j.quantity; return send(200, reprice(c), tok); }
    if (p.endsWith('/cart/remove-item')) { c.items = c.items.filter((i) => i.key !== j.key); return send(200, reprice(c), tok); }
    if (p.endsWith('/cart/apply-coupon')) { if (j.code.toLowerCase() !== 'save10') return send(400, { code: 'woocommerce_rest_cart_coupon_error', message: 'Invalid coupon' }, tok); c.coupons = [{ code: 'save10', totals: { total_discount: '0' } }]; return send(200, reprice(c), tok); }
    if (p.endsWith('/cart/remove-coupon')) { c.coupons = []; return send(200, reprice(c), tok); }
    if (p.endsWith('/cart/update-customer')) { c.country = j.shipping_address.country; return send(200, reprice(c), tok); }
    if (p.endsWith('/cart/select-shipping-rate')) { c.rate = j.rate_id; return send(200, reprice(c), tok); }
    if (p.endsWith('/ravio/v1/markets')) return send(200, { base_currency: 'BDT', countries: [{ code: 'BD', name: 'Bangladesh', states: {}, payment_methods: [{ id: 'cod', title: 'Cash on delivery' }] }] });
    send(404, { code: 'no_route' });
  });
}).listen(Number(process.env.PORT ?? 8799), () => console.log('mock up'));
