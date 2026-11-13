# Deployment: GitHub + Cloudflare Pages

## Why a static export
The site is pre-launch with no server-side logic, so `output: 'export'` gives the simplest, fastest, cheapest Cloudflare deployment. When real commerce (server-side checkout, orders, accounts) is added, move to `@opennextjs/cloudflare` (Workers) or keep the static site and add Workers/Functions for the API. Do not do this migration until it is needed.

## One-time setup
1. Create a GitHub repository and push this project (`.env*` files are git-ignored; **never commit secrets**).
2. Run `npm install` once locally and commit the generated `package-lock.json` (the workflow uses `npm ci`).
3. Cloudflare dashboard -> Workers & Pages -> Create -> Pages. Either:
   - **Git integration (simplest):** connect the repo. Build command `npm run build`, output directory `out`, Node 22. Set the environment variables from `.env.example` in the project settings.
   - **GitHub Actions (included):** create a Pages project named `ravio`, then add repository secrets `CLOUDFLARE_API_TOKEN` (Pages:Edit permission only) and `CLOUDFLARE_ACCOUNT_ID`. Pushes to `main` deploy.
4. Add the custom domain `ravioco.com` under the Pages project's Custom domains.

## Environment variables
Only non-secret `NEXT_PUBLIC_*` values are used (see `.env.example`). Anything secret (payment keys, API tokens) must live in Cloudflare secrets for a Worker, never in the browser bundle.

## Headers and security
`public/_headers` sets security headers and a Content Security Policy. Re-check the CSP after adding any third-party service (payments, analytics, form endpoint).

## Before going live
Real photography and product data; reviewed legal pages; working forms endpoint; Lighthouse and accessibility audit on the deployed build; real-device WebGL test.
