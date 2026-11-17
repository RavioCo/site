# Integration tests (require a real WordPress + WooCommerce staging site) — ALL NOT TESTED

Preconditions: bridge active; `RAVIO_PROXY_SECRET` set; SSLCOMMERZ **sandbox** credentials (from your approved/sandbox merchant panel) defined in `wp-config.php`; gateway enabled with Sandbox ON; one in-stock simple product; a Bangladesh shipping zone with a rate; storefront preview running with `NEXT_PUBLIC_ORDERING_OPEN=true`. Callback URL: `https://commerce…/?wc-api=ravio_sslc&r=<success|fail|cancel|ipn>`.

| ID | Procedure | Pass criteria |
|---|---|---|
| P1 | Storefront: add item, country BD, choose rate, choose SSLCOMMERZ, Place order. Or `POST /api/store/checkout/` via the proxy. | Response contains `payment_result.redirect_url` to the sandbox host; order is **Pending**. **If this fails, Store API checkout does not support the gateway: implement the fallback in PAYMENT-SETUP.md.** |
| S1 Success | Complete the sandbox payment. | Browser lands on `/order/`; order **Processing**; note "validated server-side"; `_transaction_id` set. |
| S2 Failure | Fail the payment on the sandbox page. | Order **Failed**; storefront `/order/` shows failure text; stock restored. |
| S3 Cancellation | Cancel on the sandbox page. | Order **Cancelled**. |
| S4 Invalid transaction | `curl -X POST '…?wc-api=ravio_sslc&r=success' -d tran_id=<real pending tran_id> -d val_id=FAKE123` | HTTP redirect to storefront; order stays **Pending**; note "validation rejected". |
| S5 Unknown order/tran | Same with a fabricated `tran_id` | HTTP 400; no order changes. |
| S6 Amount mismatch | After the redirect and **before** paying, edit the order total in wp-admin; then pay. | Order not marked paid; note `amount_mismatch`. |
| S7 Currency mismatch | In WP shell: `wp eval 'var_dump(Ravio_SSLC_Validator::evaluate(["status"=>"VALID","tran_id"=>"T","amount"=>"100","currency_type"=>"USD"],"T","BDT","100",""));'` using a captured real response with `currency_type` altered | `ok=false, reason=currency_mismatch`. |
| S8 Duplicate callback | Replay the successful `success` POST 5 times, concurrently (`xargs -P5`). | Exactly **one** payment note; status stays Processing; no duplicate stock reduction/emails. |
| S9 IPN then browser | Send `r=ipn` first, then `r=success`. | One completion. |
| S10 Browser then IPN | Reverse order. | One completion. |
| S11 IPN only | Close the tab after paying; wait for IPN. | Order Processing without browser return. |
| S13 Missing val_id in validation response | In the WP shell: `wp eval 'var_dump(Ravio_SSLC_Validator::evaluate(["status"=>"VALID","tran_id"=>"T","amount"=>"100","currency_type"=>"BDT"],"T","BDT","100","V1"));'` | `ok=false, reason=val_id_missing`. Also confirm from a real sandbox validation response that `val_id` is actually echoed (otherwise every payment is rejected: fix code and tests together). |
| S12 Risky | Not reproducible in sandbox without SSLCOMMERZ support; rely on the unit test. | — |
| M1 COD in BD | Place a COD order. | Processing/On-hold per WooCommerce COD rules. |
| M2 COD outside BD | Allow-list a second country temporarily; POST checkout with COD and that country. | 4xx `ravio_payment_not_available`; settings page cannot add COD for it. |
| M3 Unlisted country | POST checkout with country not allow-listed. | 4xx `ravio_country_not_served`. |
| M4 Stale session | `update-customer` to BD, then `checkout` with another country. | 4xx (`ravio_country_not_served` or `ravio_address_stale`). **Watch for false rejections on normal BD orders; if any occur, report immediately.** |
| M5 bKash hidden | Install any plugin registering a `bkash…` gateway. | Absent from `/ravio/v1/markets` and checkout; `POST checkout` with it -> `ravio_payment_not_available`. |
| X1 Direct API | `curl https://commerce…/wp-json/wc/store/v1/products` without header | 403 (503 if the secret constant is missing). |
| X2 Wrong secret | Same with a wrong header | 403. |
| X3 Admin untouched | Log in to wp-admin, edit a product, open WooCommerce > Orders | Works normally (guard covers only `/wc/store/` and `/ravio/v1/`). |
Record each result with date, WooCommerce version, and the order id.
