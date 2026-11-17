# RAVIO — Verification report (release candidate for controlled staging)

Environment of every statement below: Claude.ai sandbox, Node 22, **no network (registry unreachable: HTTP 000), no PHP, no WordPress, no browser, no Cloudflare access.** Statuses: IMPLEMENTED · TESTED · FAILED · NOT TESTED · REQUIRES EXTERNAL ACCESS.
**Headline: nothing was FAILED. The lockfile, `npm ci`, production build, all PHP execution, all WooCommerce/gateway behaviour and all browser checks are NOT TESTED.** This is not a production-ready claim.

## A. Tests actually executed (code ran; result observed)
| # | Command | Result | Scope / files |
|---|---|---|---|
| A1 | `TS_PATH=… node scripts/syntax-check.cjs` | **TESTED — 58 files, 0 syntax errors** | every `.ts/.tsx` in the project (syntax only; no type or import resolution) |
| A2 | `tsc -p tests/tsconfig.subset.json` (strict, exit 0) | **TESTED — pass** | exactly 6 files: `src/lib/products.ts`, `woo/types.ts`, `woo/server.ts`, `woo/catalog.ts`, `storeClient.ts`, `commerce.ts` (Node types only). All other TSX files are **NOT type-checked** (React/Next/three types not installable). |
| A3 | `node tests/run.mjs` | **TESTED — 14/14 pass** | `lib/products.ts`: attribute-name normalisation, variation matching (exact, out-of-stock, "any" attribute, incomplete, non-existent, case/spacing, simple product, empty-attribute variation), money formatting (2dp, string input, zero-decimal), null price never invented |
| A4 | `node tests/run-proxy.mjs` | **TESTED — 17/17 pass, against a stand-in for `next/server` and a mock WordPress** | `app/api/store/[...path]/route.ts`: cookie options (HttpOnly, SameSite=lax, path, no Domain), no-store header, persistence with replayed cookie, separate session empty, Origin missing/foreign/look-alike → 403, content-type → 415, >32 KB → 413, bad JSON → 400, allow-list/traversal/admin paths → 404, only GET+POST exported, error sanitisation, production refuses non-https origin, **production without `RAVIO_PROXY_SECRET` → 503 with no upstream call**, wrong secret surfaced as 403 |
| A5 | `node scripts/verify-store-api.mjs` against `tests/mock-wp.mjs` | **TESTED (script mechanics only) — 29 pass, 0 fail, 2 skip** | Proves the verification script runs. The mock encodes **my own assumptions**, so this says **nothing** about real WooCommerce behaviour. |
| A6 | Import audit (script) | **TESTED** — all 5 external packages imported in `src` (`next, react, @react-three/fiber, three, gsap`) are declared in `package.json` | |
| A7 | `diff -rq` vs the original ZIP | **TESTED** — apart from the 20 `src` files and the config/CI/doc files listed in section F, every file is byte-identical to the approved original, including `globals.css`, hero/cloth/animation code, copy and every non-commerce route | |
| A8 | Heuristic brace/paren balance on 7 PHP files | passes (one false positive in a test file, manually confirmed) | **Not a lint.** PHP syntax is **NOT TESTED**. |
| A9 | Secret scan (`grep` for consumer key/secret, store password, proxy secret) in `src` | **TESTED** — referenced only in `src/lib/woo/server.ts`; no `'use client'` file imports it; `NEXT_PUBLIC_*` holds no secret | |

## B. Deployment blockers
| Item | Status | Detail / exact next action |
|---|---|---|
| `package-lock.json` | **NOT TESTED — REQUIRES EXTERNAL ACCESS** (registry unreachable). **Not included** — a hand-made lockfile would be fabricated. | Run workflow "Generate lockfile (manual)" or `npm install` locally; commit the lockfile. |
| `npm ci` compatibility | NOT TESTED | follows from the lockfile; CI step fails with a clear message until it exists |
| Full `tsc --noEmit` | NOT TESTED | `npm run typecheck` after install |
| `next build` / `build:cf` | NOT TESTED | `npm run build`, then `npm run build:cf` |
| CI workflows (`deploy.yml`, `generate-lockfile.yml`, plugin `php.yml`) | IMPLEMENTED; NOT TESTED | corrected to check for the lockfile *before* `setup-node` cache (which errors without one); PRs never deploy |
| Cloudflare deployment | NOT TESTED — REQUIRES EXTERNAL ACCESS | not performed |
| OpenNext/wrangler versions | NOT TESTED | `^1.0.0` / `^4.0.0` are placeholders; verify against current docs |
| Next 15 + R3F + three + GSAP on Workers | NOT TESTED | reasoned compatible (client-only libs, no edge runtime/middleware, checked by grep); unproven until `build:cf` + preview |
| Env/secret handling | IMPLEMENTED (code inspection + A4/A9) | table in DEPLOYMENT-GUIDE.md §2 |

## C. WooCommerce Store API (frontend integration)
Nothing here was executed against real WooCommerce. **Code inspection only** for each; `npm run verify:store` is the procedure, **NOT TESTED**.
| Item | Status | Notes / what was corrected this round |
|---|---|---|
| Product retrieval, simple + variable | IMPLEMENTED; NOT TESTED | verify B1–B7, C1 |
| Variation retrieval (`type=variation&parent=`) | IMPLEMENTED; NOT TESTED; REQUIRES EXTERNAL ACCESS | The parameter combination is from memory and **unverified** (check C2). If unsupported, fall back to per-variation fetch by id. |
| Variation IDs / attribute names / values | IMPLEMENTED; unit-tested logic (A3); WooCommerce shapes NOT TESTED | Fixed: matching is normalised (`Size`/`pa_size`/`size`) and the add-to-cart `variation[]` payload now uses the **variation's own attribute names/values**, not the parent's. Checks C3/C4. |
| Price / availability | IMPLEMENTED; NOT TESTED | minor-unit parsing unit-tested (A3) |
| Add to cart, quantity, remove, coupons | IMPLEMENTED; NOT TESTED | D2–D8, D13 |
| Cart persistence, separate sessions | IMPLEMENTED; proxy logic TESTED against mock (A4); real Cart-Token flow NOT TESTED | **Open question:** whether Cart-Token alone (no Nonce) authorises mutations/checkout on your WooCommerce version. Check D2/D3. If it fails, forward the `Nonce` response header via the same cookie mechanism. |
| Shipping recalculation | IMPLEMENTED; NOT TESTED | Fixed: debounced 700 ms, only when country (+state when required) is set, skipped when unchanged, stale responses ignored, form locked while updating; **forced explicit address sync at submit**; aborts if the selected rate or total changed; notice when a previously selected rate disappears |
| Taxes | IMPLEMENTED (displayed from WooCommerce totals); NOT TESTED | none configured; accountant input required |
| Checkout validation / order creation | IMPLEMENTED; NOT TESTED | needs staging WordPress |
| Stale-catalog risk | **Fixed** | commerce pages are `force-dynamic`, so an empty catalog can never be baked in at build time |

## D. Payments
| Item | Status | Notes |
|---|---|---|
| Validator logic (`Ravio_SSLC_Validator`) | IMPLEMENTED; reviewed; **NOT TESTED** (needs PHP) | 21 PHP test cases written in `tests/validator-test.php`; run `php tests/validator-test.php`. Hardened: missing currency now **rejects**; `val_id` must match; amount compared in cents; transaction suffix 6 → **20** chars |
| Amount / currency / tran-id / status checks | IMPLEMENTED; NOT TESTED | |
| Duplicate callback + IPN idempotency | IMPLEMENTED (is_paid short-circuit + atomic option lock + re-read); NOT TESTED | tests S8–S11 |
| Success / failure / cancellation | IMPLEMENTED; NOT TESTED | S1–S3 |
| Store API checkout compatibility of the gateway | **NOT TESTED — undetermined** | test P1 decides; fallback designed in PAYMENT-SETUP.md, **not implemented** (untestable here) |
| SSLCOMMERZ endpoint/field names | **UNVERIFIED** (from memory) | check against current docs |
| Fail/cancel callbacks | IMPLEMENTED; **limitation** | they move a *pending* order using the unguessable `tran_id` but without a gateway-side check; mitigated by the 20-char suffix and `pending`-only transitions |
| Refunds | not implemented | process in the SSLCOMMERZ panel |
| COD Bangladesh-only | IMPLEMENTED (hard ceiling in code and settings); NOT TESTED | M1, M2 |
| bKash | **disabled and hidden by code**; no integration exists | blocked in checkout, `/markets` and order creation unless `RAVIO_BKASH_VERIFIED`; requirements in PAYMENT-SETUP.md |
| Sandbox / live credentials | REQUIRES EXTERNAL ACCESS | merchant approval; none invented; live payments not enabled (`NEXT_PUBLIC_ORDERING_OPEN=false`) |

## E. Security
| Control | Status |
|---|---|
| Proxy secret mandatory in production — storefront (`upstreamHeaders` throws 503) | IMPLEMENTED; **TESTED** (A4) |
| Proxy secret mandatory — WordPress (≥32-char constant, else 503; wrong header 403; skipped only in `local`/`development`) | IMPLEMENTED; NOT TESTED (PHP) — tests X1–X3 |
| Direct unauthenticated access to Store API / `/ravio/v1` rejected | IMPLEMENTED; NOT TESTED — `verify-store-api` A1–A3 |
| Cookie: HttpOnly, SameSite=Lax, host-only (no Domain), Secure in production | options TESTED (A4, the `Secure` flag only when `NODE_ENV=production` — serialised flag NOT TESTED on https; check F1) |
| CSRF/origin: Origin required & host-matched on every POST, JSON-only, 32 KB cap, path/method allow-list | IMPLEMENTED; **TESTED** (A4) |
| No-store on proxy and `/bag`, `/checkout`, `/order` | header set TESTED (A4 for proxy); page headers in `next.config.ts` NOT TESTED on a running server |
| No private credentials in client code | **TESTED** (A9) |
| Payment callback verification | IMPLEMENTED; NOT TESTED |
| Server-side shipping + payment eligibility | IMPLEMENTED in plugin (`validate_checkout`); NOT TESTED |
**Remaining limitations (honest):** no in-app rate limiting (use Cloudflare WAF rules); CSP allows `'unsafe-inline'` scripts; the shared secret is a bearer secret (rotate by changing both sides); `ravio_address_stale` check relies on WooCommerce session behaviour that is untested and could reject legitimate orders (M4); Store API semantics unverified; plugin never security-reviewed or run; Cart-Token lifetime/expiry is WooCommerce's, unverified.

## F. Design preservation
Code inspection + A7. **No browser rendering was performed**, so desktop/mobile appearance is NOT TESTED.
Files changed in `src` (everything else byte-identical): `app/page.tsx` (live products, empty-state line), `app/shop/page.tsx`, `app/shop/[category]/page.tsx`, `app/product/[id]/page.tsx`, `app/sitemap.ts`, `components/{BagView,ImageSlot,ProductCard,ProductView,ShopView}.tsx`, `lib/{cart,commerce,images,products,site}.ts(x)`; added `app/api/store/[...path]/route.ts`, `app/checkout`, `app/order`, `components/{CheckoutView,OrderView}.tsx`, `lib/storeClient.ts`, `lib/woo/*`. `globals.css`, hero/cloth/animation code, copy, links and fonts untouched. Non-`src` changes: `next.config.ts`, `package.json`, `public/_headers`, `.env.example`, `.gitignore`, `README.md`, `.github/workflows/*`, added `wrangler.jsonc`, `open-next.config.ts`, `.dev.vars.example`, `tests/`, `scripts/`, docs. The original static-Pages `docs/DEPLOYMENT.md` was removed (obsolete; replaced by `DEPLOYMENT-GUIDE.md`); the original `MIGRATION.md` is kept as `docs/MIGRATION-static-prototype.md`.
Defects introduced by the integration and fixed: global `input{width:100%}` would have stretched radios/checkbox (inline `width:auto` on those controls only; CSS file untouched); doubled toolbar spacing in the shop (one inline margin); empty "essentials" row during a catalog outage (calm one-line message). Existing classes (`btn, chip, tools, sizes, bagrow, qty, msg, err, note, tag`) are reused; no template styling added.
**Visual QA still required (NOT TESTED), desktop 1440 + phone 390:** `/`, `/shop`, `/shop/<category>`, `/product/<slug>` (gallery, size buttons, add), `/bag`, `/checkout`, `/order`, `/about`, `/standard`, `/contact`, `/faq`, `/shipping`, `/returns`, `/privacy`, `/terms`, `/ordering`, 404; hero cloth with WebGL on/off and reduced-motion. Checkout and order pages are new screens built from existing form styles and need design review.

## G. Remaining actions requiring external access
1. **Registry access:** generate/commit `package-lock.json`; run `npm ci`, `typecheck`, `test`, `build`, `build:cf`; fix any real errors (only 6 of the project's 58 TS/TSX files, none of the 38 TSX components, have been type-checked).
2. **Hosting account (founder decision):** buy/configure managed WordPress (DEPLOYMENT-GUIDE.md §6); create staging.
3. **WordPress:** install WooCommerce + bridge; set `RAVIO_PROXY_SECRET`; create categories, Size attribute, ≥1 simple + ≥1 variable product with stock, a BD shipping zone with your own rate, a test coupon.
4. **Run** `npm run verify:store -- --wp … --secret … --coupon … --storefront …`; resolve every FAIL (especially C2 variation filter, D2/D3 Cart-Token-only, F1 cookie flags).
5. **PHP:** `php -l` on all plugin files and `php tests/validator-test.php` (CI does both).
6. **Merchant:** SSLCOMMERZ approval + sandbox credentials; run P1 and S1–S11, M1–M5, X1–X3 (`tests/INTEGRATION-TESTS.md`). Confirm endpoint/field names against current docs.
7. **bKash:** merchant approval + API credentials/docs, then the checklist in PAYMENT-SETUP.md.
8. **International markets:** verified carrier arrangements, own shipping rates, tax advice, gateway currency approval — until then only `BD` is enabled.
9. **Cloudflare:** account + API token; `wrangler secret put`; domain, SSL Full (strict), WAF rate limits, cache bypass rules; deploy; check Worker size and headers (`curl -I`).
10. **Visual QA** (section F list) and brand-owner sign-off; add real photography, prices, confirmed sizes/colours in WooCommerce (nothing invented).
