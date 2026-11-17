# Phase A — Audit and final architecture

## Audit of the supplied project (`ravio-web.zip`)
| Finding | Detail |
|---|---|
| Stack | Next.js ^15.1, React ^19, TypeScript, Tailwind 3 (tokens only), @react-three/fiber ^9, three ^0.170, gsap ^3.12 |
| Mode | `output: 'export'` (static). Incompatible with route handlers and live catalog. **Removed.** |
| Commerce seam | `lib/commerce.ts` (static provider), `lib/products.ts` (7 hard-coded products, prices `null`), `lib/cart.tsx` (**localStorage** cart). All three conflicted with the directive and were replaced. |
| Preserved untouched | `globals.css`, `conceptArt.ts`, `clothShaders.ts`, `ClothCanvas`, `Hero`, GSAP/motion libs, TransitionProvider, CursorFX, content/copy, official links, fonts, layout, all non-commerce routes |
| Pre-existing caveat | The original authors never ran `npm install`/`next build` (see `MIGRATION-static-prototype.md`). Neither has this delivery. |

## What changed (commerce surface only)
- `lib/products.ts`: types + pure helpers only; **no product data**.
- `lib/woo/*`: server-only Store API client, types, catalog mapping.
- `app/api/store/[...path]/route.ts`: same-origin proxy (the session architecture below).
- `lib/cart.tsx`, `lib/storeClient.ts`: server-authoritative cart, no localStorage.
- `ProductView`, `ProductCard`, `ShopView`, `BagView`: same classes/markup; live data, variations (any attribute, e.g. Size, Colour), coupons, search/sort/stock filter.
- New: `/checkout`, `/order`, `CheckoutView`, `OrderView`.
- Home, shop, collection, product, sitemap pages read live data with `revalidate`.

## Decision: session architecture
| | Same-origin proxy (**chosen**) | Cross-subdomain cookies (`.ravioco.com`) |
|---|---|---|
| Cookie location | HttpOnly cookie on `ravioco.com`, set by our Worker | WordPress-set cookies shared across subdomains |
| JS can read token | No | WooCommerce session cookie is HttpOnly, but nonce handling still needs JS-visible headers |
| CORS | None needed (browser only talks to its own origin) | Needs credentialed CORS + exact origins |
| Safari/ITP, third-party-cookie rules | Not affected (first-party) | Same-site, but fragile with CORS/credentials |
| Lock origin to the storefront | Yes (`RAVIO_PROXY_SECRET`) | Not possible; API must be public to browsers |
| Cost | One extra hop (Worker -> origin) | None |
**Mechanism:** WooCommerce Store API returns a `Cart-Token` response header; the proxy stores it in `ravio_ct` (HttpOnly, Secure, SameSite=Lax) and replays it upstream. Mutations require a same-origin `Origin`, JSON content type and ≤32 KB. Totals are never taken from the browser. Every proxy response and the `/bag`, `/checkout`, `/order` pages are `private, no-store`.
**Must verify on staging:** that your installed WooCommerce version accepts `Cart-Token` alone for cart mutations and `POST /checkout` without a `Nonce` header (this is how the official docs describe token-based clients, but it was not testable here). If it demands a Nonce, extend the proxy to capture/forward the `Nonce` response header — same cookie mechanism.

## Decision: Cloudflare runtime
| Option | Status in this delivery |
|---|---|
| **OpenNext for Cloudflare Workers** (`@opennextjs/cloudflare`) | **Selected, configured** (`wrangler.jsonc`, `open-next.config.ts`, scripts, workflow). Not built or deployed. |
| vinext | **Not evaluated empirically.** It is a newer Cloudflare effort; compatibility with Next 15 + R3F + GSAP + route handlers could not be tested without network/install. Evaluate only after OpenNext is verified, and only on a branch. |
R3F, three and GSAP are client-only components and are not expected to interact with the Workers runtime; this is a reasoned expectation, **not a test result**. Re-check current OpenNext/wrangler versions and Next 15 support before building: the versions in `package.json` are placeholders (`^1.0.0`, `^4.0.0`).
