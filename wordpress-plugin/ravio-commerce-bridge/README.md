# RAVIO Commerce Bridge 0.1.0

Market rules, payment restrictions, proxy-secret guard and an SSLCOMMERZ hosted-redirect gateway for the RAVIO headless storefront. See the storefront repo's `WOOCOMMERCE-SETUP.md` and `PAYMENT-SETUP.md`.

- **Not executed on WordPress.** PHP lint and `tests/validator-test.php` have not been run by the author (no PHP available). CI (`.github/workflows/php.yml`) lints on PHP 8.1/8.3/8.4, runs the 30 validator tests, and `tests/check-validator-output.sh` fails the job on any FAIL, count mismatch or PHP warning. The workflow only runs if this folder is the repository root.
- Requires WooCommerce, WP ≥ 6.5, PHP ≥ 8.1.
- Required in `wp-config.php`: `RAVIO_PROXY_SECRET` (≥ 32 chars). Credentials: `RAVIO_SSLC_STORE_ID`, `RAVIO_SSLC_STORE_PASSWORD`.
- bKash is blocked unless `RAVIO_BKASH_VERIFIED` is defined true; COD/bKash are capped to Bangladesh in code.
