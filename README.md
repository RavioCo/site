# RAVIO & Co. — headless storefront (Next.js + WooCommerce)

Approved design preserved. Commerce comes from WooCommerce through a same-origin proxy (`/api/store/*`). **Release candidate for controlled staging: not yet installed, built, browser-tested or deployed.** Read `VERIFICATION-REPORT.md` first.

| File | Purpose |
|---|---|
| `DEPLOYMENT-GUIDE.md` | blockers, env/secrets, CI, Cloudflare, hosting, go-live gate |
| `WOOCOMMERCE-SETUP.md` | WordPress/WooCommerce + plugin setup |
| `PAYMENT-SETUP.md` | COD, SSLCOMMERZ, bKash requirements, test plan |
| `VERIFICATION-REPORT.md` | what was executed vs not |
| `docs/` | architecture/audit, Store API map, original static-prototype notes |

Commands: `npm test` (unit + proxy tests) · `npm run verify:store -- --wp … --secret …` (real-backend verification) · `npm run typecheck` · `npm run build:cf`.
**First:** commit a `package-lock.json` (run the "Generate lockfile" workflow or `npm install`).
