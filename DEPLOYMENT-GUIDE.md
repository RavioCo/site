# RAVIO — Deployment guide (release candidate for controlled STAGING)

Status at hand-over: **no `npm install`, `npm ci`, production build, browser test or deployment has been performed** (the authoring environment had no registry access). Follow this order; each step says what proves it worked.

## 0. Hard blockers you must clear first
| # | Blocker | Action |
|---|---|---|
| 1 | `package-lock.json` is **not included** (cannot be generated offline; a hand-written one would be fabricated) | Either run **Actions > "Generate lockfile (manual)"** and commit the downloaded artifact, or locally: `npm install` then commit `package-lock.json`. CI fails fast with a clear message until it exists. |
| 2 | Build never run | `npm run typecheck && npm test && npm run build`, then `npm run build:cf`. Fix real errors; none of the TSX was type-checked against real React/Next types. |
| 3 | `@opennextjs/cloudflare ^1.0.0` and `wrangler ^4.0.0` are unverified placeholders | Check each project's current docs/changelog for Next 15 support and adjust. |

## 1. Local run (needs Node 22)
```
npm install                 # first time only; commit package-lock.json
cp .dev.vars.example .dev.vars   # fill WC_STORE_URL and RAVIO_PROXY_SECRET (staging values)
npm run dev
```
`NODE_ENV=production` **refuses to call WordPress without `RAVIO_PROXY_SECRET`** and refuses a non-https `WC_STORE_URL`. In `npm run dev` those two production rules do not apply, so also test with `npm run preview:cf`.

## 2. Environment variables and secrets
| Name | Where it lives | Public? | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build env (GitHub workflow) | yes | `https://ravioco.com` |
| `NEXT_PUBLIC_ORDERING_OPEN` | build env | yes | **`false`** until the go-live gate (section 7) passes |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | build env | yes | optional |
| `WC_STORE_URL` | Cloudflare Worker secret | no | `https://commerce.ravioco.com` |
| `RAVIO_PROXY_SECRET` | Cloudflare Worker secret **and** `wp-config.php` | no | ≥ 32 random chars; same value both sides; **mandatory in production on both sides** |
| `WC_REST_CONSUMER_KEY/SECRET` | not used | — | The storefront uses only the public Store API. Do not create keys unless a server-side admin feature is added; then Worker secrets only. |
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | GitHub Actions secrets | no | Token scoped to Workers Scripts:Edit only |
Set Worker secrets: `npx wrangler secret put WC_STORE_URL` and `npx wrangler secret put RAVIO_PROXY_SECRET`. Never commit `.dev.vars`; it is git-ignored. Generate a secret with `openssl rand -base64 48`.

## 3. GitHub Actions
`deploy.yml`: checks lockfile exists -> `npm ci` -> `typecheck` -> `npm test` -> `build:cf` -> deploy (only on `main`). Pull requests build but never deploy and see no secrets. `generate-lockfile.yml`: manual, uploads `package-lock.json`. Neither workflow has been executed.

## 4. Cloudflare
1. Create the Worker by first deploy (`npm run deploy:cf` or the workflow). Name `ravio-web` (matches `wrangler.jsonc`).
2. Dashboard > Workers > ravio-web > Settings > Domains: add `ravioco.com`.
3. DNS for `commerce`: proxied record to the host's origin (section 6). SSL/TLS mode **Full (strict)**.
4. Cache rules: **bypass** `commerce.ravioco.com/wp-json/*`. Never cache `ravioco.com/api/store/*`, `/bag`, `/checkout`, `/order` (the app already sends `private, no-store`; do not override).
5. WAF rate-limit rules (the app has no in-process rate limiting): `ravioco.com/api/store/*` POST, `commerce.ravioco.com/wp-login.php`, `/wp-json/`.
6. Restrict `commerce.ravioco.com/wp-admin` with Cloudflare Access or an IP allow-list.

### Runtime compatibility (reasoned, not tested)
- Selected runtime: **OpenNext for Cloudflare Workers** (Node.js runtime, `nodejs_compat`). No route sets `runtime = 'edge'` and there is no middleware (checked by grep).
- React Three Fiber / three / GSAP are client-only (`'use client'`); the Worker never executes them. Compatibility with the Workers runtime is therefore not expected to matter, but **NOT TESTED**.
- vinext: **not evaluated**. Revisit only after the OpenNext deployment is verified.
- Check after first deploy: Worker bundle size limit for your plan; ISR/data cache (not configured; all commerce pages are `force-dynamic`, so no stale or empty catalog can be baked into the build).

## 5. Security headers
Set in `next.config.ts` (HSTS, nosniff, frame-deny, referrer, permissions, CSP). `public/_headers` only adds cache rules for static assets. CSP still allows inline scripts (inherited from the approved build); tighten with nonces in a later release. `img-src` allows `https://commerce.ravioco.com` for product photos.

## 6. Hosting (WordPress/WooCommerce origin)
Requirements (re-verify current official numbers before buying): WooCommerce-supported WordPress, PHP 8.3+ (plugin requires ≥ 8.1), MySQL 8.0+/MariaDB 10.6+, HTTPS, ≥ 256 MB PHP memory (512 MB preferred), daily backups with restore, staging, REST + Store API reachable, real cron, ability to install plugins, origin in Singapore or Mumbai.
| Option | Fit | Watch-outs |
|---|---|---|
| Cloudways (DigitalOcean/Vultr/AWS, Singapore) | lower cost, staging, backups, control | you maintain updates/hardening |
| Kinsta | managed, WooCommerce-focused, staging, backups | highest cost; plan limits |
| SiteGround / WP Engine | mature managed options | entry-plan resource limits / cost |
| Local Bangladesh host | latency, local billing | managed-WP features vary widely; vet backups/staging |
Pricing and features above are from general knowledge and **were not verified**. Recommendation for founder review: **Cloudways (Singapore) to start; Kinsta if hands-off operation is worth the cost.** Nothing was purchased.

## 7. Go-live gate (all must be true before `NEXT_PUBLIC_ORDERING_OPEN=true`)
1. Lockfile committed; CI green (typecheck, tests, build).
2. Staging WordPress + `ravio-commerce-bridge` running; `npm run verify:store` reports **0 FAILED** (including section F with `--storefront`).
3. Payment proof of concept and negative tests in `PAYMENT-SETUP.md` pass in sandbox.
4. Visual QA against the approved design on desktop and a mid-range phone (routes list in VERIFICATION-REPORT.md).
5. Merchant approval + live credentials for each live gateway, entered only as secrets/`wp-config.php` constants.
6. Backups confirmed restorable.
Rollback: redeploy the previous Worker version (`wrangler rollback`) and set `NEXT_PUBLIC_ORDERING_OPEN=false`.
