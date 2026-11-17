# Store API integration

Browser -> `/api/store/<path>/` (Next route handler) -> `https://commerce.ravioco.com/wp-json/wc/store/v1/<path>`.

| Browser path | Method | Upstream | Notes |
|---|---|---|---|
| `cart` | GET | `cart` | Creates/refreshes token via `Cart-Token` header |
| `cart/add-item` | POST | same | body `{id, quantity, variation?}`; `id` = variation id for variable products |
| `cart/update-item`, `cart/remove-item` | POST | same | by cart item `key` |
| `cart/apply-coupon`, `cart/remove-coupon` | POST | same | `{code}` |
| `cart/update-customer` | POST | same | sets address so rates/tax recalc |
| `cart/select-shipping-rate` | POST | same | `{package_id, rate_id}` |
| `checkout` | POST | same | `{billing_address, shipping_address, payment_method, payment_data}` |
| `order/{id}?key&billing_email` | GET | same | confirmation |
| `markets` | GET | `/wp-json/ravio/v1/markets` | countries, states, allowed payment methods |

Catalog (public, cacheable 60 s, server-side only): `products`, `products/categories`, plus `products?type=variation&parent=<id>`.
Any path not in `route.ts`'s allow-list returns 404. Admin REST (`wc/v3`) is not used; `WC_REST_CONSUMER_*` are **not** configured or needed today.

**Verification:** every assumption below is checked by `npm run verify:store -- --wp <staging url> --secret <secret> --storefront <url> --coupon <code>` (docs/ in VERIFICATION-REPORT.md lists it as NOT TESTED until run against a real store). Fields and flows checked: product/variation shape, `type=variation&parent=`, attribute-name agreement, Cart-Token-only mutations (no Nonce), persistence, separate sessions, coupons, shipping rates, market/payment policy, proxy cookie flags and origin checks.

Caching rules: catalog GETs use `revalidate`; cart/checkout/order proxy responses carry `private, no-store` and the proxy never caches. Do not put the proxy path behind a Cloudflare cache rule.
