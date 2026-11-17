# WooCommerce / WordPress setup (staging first)

Nothing here has been executed by the author (no WordPress was available). All steps are for a real installation.

## 1. Install
1. WordPress at `https://commerce.ravioco.com` (not the root domain). Check current WordPress/WooCommerce/PHP requirements first.
2. Settings > Permalinks: **Post name** (required for `/wp-json/`).
3. Install WooCommerce; wizard: **currency BDT**; sell to Bangladesh plus only countries with verified shipping arrangements.
4. Upload `ravio-commerce-bridge-final.zip` (Plugins > Add New > Upload). It requires WooCommerce, WordPress ≥ 6.5, PHP ≥ 8.1.
5. Add to `wp-config.php` (never in Git, never in chat):
```php
define('RAVIO_PROXY_SECRET', '<≥32 random chars; same value as the Worker secret>');
define('RAVIO_SSLC_STORE_ID', '<from SSLCOMMERZ sandbox, later live>');
define('RAVIO_SSLC_STORE_PASSWORD', '<from SSLCOMMERZ>');
define('DISALLOW_FILE_EDIT', true);
// Staging only, to allow local testing without the secret:  define('WP_ENVIRONMENT_TYPE', 'staging');   // NOTE: staging STILL requires the secret; only 'local'/'development' skip it.
```
**Important:** without `RAVIO_PROXY_SECRET` (≥ 32 chars) the plugin answers every `/wc/store/*` and `/ravio/v1/*` request with 503 outside `local`/`development` environments. This is deliberate (fail closed). The storefront Worker sends the secret in `X-Ravio-Proxy-Secret`.
6. WooCommerce > RAVIO Markets: shipping countries default to `BD` only. Add a country **only** after you have a verified carrier arrangement **and** a WooCommerce shipping zone with your own rates for it. COD and bKash are hard-limited to `BD` in code; the settings page cannot widen them.
7. Lock down `wp-admin` (Cloudflare Access/IP allow-list), enforce 2FA for admins, keep plugins updated.

## 2. Catalogue (native WooCommerce dashboard)
- **Categories:** slugs `polo`, `tee`, `denim`, `trousers`, `knit` (header links use them).
- **Attributes:** `Size` (S, M, L, XL — provisional until confirmed) and `Colour` only once colourways are confirmed. Tick **Used for variations**.
- **Variable products:** generate variations; each variation needs its own SKU, price, stock quantity and (optionally) image. Avoid "Any …" attribute values unless intended (the storefront supports them, but verify check C-series).
- **Prices/stock:** real values only. A product with no price displays "Price to be announced" and cannot be sold.
- **Coupons, orders, customers, emails:** native screens.
- **Shipping & tax:** WooCommerce > Settings > Shipping (zones, your rates), Tax (per accountant). The plugin never sets rates or taxes.

## 3. Plugins
| Plugin | Role | Status |
|---|---|---|
| WooCommerce | core | check current version/requirements |
| RAVIO Commerce Bridge | market rules, `/ravio/v1/markets`, proxy-secret guard, SSLCOMMERZ gateway | written, **not run on WordPress** |
| Cash on Delivery | built into WooCommerce | Bangladesh only (enforced by bridge) |
| bKash | **not provided and hidden** | see PAYMENT-SETUP.md |
| Multi-currency | **not installed** | only if gateway approves non-BDT charging |
Do not page-cache `/wp-json/wc/store/*` or `/wp-json/ravio/*`.

## 4. DNS
`ravioco.com` -> Cloudflare Worker custom domain. `commerce` -> host origin, proxied, SSL Full (strict), cache bypass for `/wp-json/*`.

## 5. Verify the backend against the integration
```
npm run verify:store -- --wp https://commerce.ravioco.com --secret "$RAVIO_PROXY_SECRET" --coupon <test coupon> [--storefront https://ravioco.com]
```
Prepare before running: ≥1 in-stock **simple** product, ≥1 **variable** product with Size variations and stock, a shipping zone for Bangladesh with a rate, a test coupon. The script creates only throw-away carts (no orders). Save the report with `--json report.json`.

## 6. Owner day-to-day
Add/edit products and prices in Products; fulfil in WooCommerce > Orders. COD orders arrive *Processing*. SSLCOMMERZ orders become *Processing* **only after server-side validation**; otherwise they remain *Pending/Failed/On hold*. Never mark one paid by hand without checking the SSLCOMMERZ merchant panel.
