# Payment setup — COD, SSLCOMMERZ, bKash

## Currency model
1. **Display** = what the page shows (BDT). 2. **Checkout** = what WooCommerce/gateway charges = store base currency **BDT**. 3. **Settlement** = what the merchant receives (set by the gateway/bank agreement). A displayed conversion never means the gateway can charge that currency. No multi-currency plugin is installed. Enable non-BDT only after SSLCOMMERZ confirms in writing which currencies your merchant account can charge **and** settle.

## Status by method
| Method | Status |
|---|---|
| Cash on Delivery | Native WooCommerce. **Bangladesh only**, hard-coded ceiling in `Ravio_Market_Rules`/`Ravio_Settings` (settings cannot widen it). IMPLEMENTED; NOT TESTED. |
| SSLCOMMERZ | Custom hosted-redirect gateway (id `ravio_sslcommerz`). IMPLEMENTED; NOT TESTED; REQUIRES EXTERNAL ACCESS (approved merchant account + sandbox credentials). Refunds not implemented. |
| bKash | **Disabled and hidden.** No bKash gateway code exists. Even if a plugin registers an id containing `bkash`, the bridge removes it from checkout, from `/ravio/v1/markets` and rejects it at order creation, unless `define('RAVIO_BKASH_VERIFIED', true)` is set in `wp-config.php`. |

## How the SSLCOMMERZ gateway decides a payment is valid
`process_payment()` creates a session server-side (random 20-char suffix transaction id `RAVIO-<orderId>-<suffix>`), stores it on the order, and returns the hosted-page URL as `redirect`. The browser return is **never trusted**. On `success` or `ipn` the plugin calls SSLCOMMERZ's validation API server-to-server and `Ravio_SSLC_Validator::evaluate()` requires **all** of: status `VALID`/`VALIDATED`; `tran_id` equals the stored value; `val_id` equals the requested one; `amount` equals the order total to the cent; `currency_type` **present** and equal to the order currency (missing = reject). `risk_level` 1 puts the order **on-hold**. Settlement is idempotent: `is_paid()` short-circuit plus an atomic `add_option` lock, re-read inside the lock; validation errors leave the order pending for the IPN retry. Failed/cancelled returns move only *pending* orders.
**Written from memory, unverified:** endpoint paths (`/gwprocess/v4/api.php`, `/validator/api/validationserverAPI.php`), request/response field names, whether browser returns are POST. Compare each against SSLCOMMERZ's current developer documentation before testing.

## Headless (Store API) compatibility — NOT DETERMINED
The gateway needs no browser-posted fields (`has_fields=false`) and returns a redirect URL, which is the shape Store API checkout is expected to pass back as `payment_result.redirect_url`. That expectation could not be confirmed here. **Proof test P1 below decides it.** If P1 fails, implement this fallback (not written, because it cannot be tested here and speculative payment code is a liability): after `POST /checkout` the bridge exposes `POST /ravio/v1/payments/sslcommerz/session {order_id, order_key}` which re-validates order ownership and eligibility, calls the same session-creation code, and returns the hosted URL; the order stays `pending`; settlement stays in the validated callbacks above.

## Test plan (sandbox; all NOT TESTED)
Unit (no WordPress): `php tests/validator-test.php` — 21 cases: valid, VALIDATED, FAILED, INVALID_TRANSACTION, missing status, tran mismatch, empty expected tran, val_id mismatch, amount ±0.01/non-numeric/missing, sub-cent rounding, currency mismatch/missing/case, risky flag, tran-id parsing incl. injection and wrong prefix. Must exit 0.
Integration: `tests/INTEGRATION-TESTS.md` in the plugin ZIP (P1 Store API compatibility; success; failure; cancellation; invalid transaction; amount mismatch; currency mismatch; duplicate callback; IPN before/after browser return; IPN only; COD outside BD; unlisted country; bKash hidden; direct API without secret).

## Rules
Keep `sandbox` ON until P1 and all negatives pass **and** the merchant is approved. Put credentials only in `wp-config.php` constants. Never paste secrets into chat, GitHub, tickets or the storefront. Never set `NEXT_PUBLIC_ORDERING_OPEN=true` for live payment without the go-live gate (DEPLOYMENT-GUIDE.md section 7).

## Future bKash activation checklist
1. bKash merchant approval and **tokenized checkout** API credentials/docs (app key, secret, username, password, sandbox + live base URLs). 2. Choose: a maintained plugin that passes P1 in headless checkout, **or** a hosted-redirect gateway modelled on `class-gateway-sslcommerz.php` (create payment -> redirect -> server-side execute/query -> idempotent settle with amount/currency/transaction checks). 3. Implement refund handling per merchant terms. 4. Run the same negative test set. 5. Only then define `RAVIO_BKASH_VERIFIED` and list `bkash` for `BD` in RAVIO Markets (country ceiling stays BD).
