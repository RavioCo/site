# Migration record

## 1. Inventory of the approved prototype (ravio.html)
Routes (hash -> Next route): home `/`, shop `/shop`, collections `/shop/[category]` (polo, tee, denim, trousers, knit), product `/product/[id]` (7 products), bag `/bag`, about / The RAVIO Standard `/about` (+ `/standard`), contact `/contact`, faq `/faq`, shipping `/shipping`, returns `/returns`, privacy `/privacy`, terms `/terms`, ordering `/ordering`, not-found.
Features: WebGL cloth hero with fallbacks; sticky word-reveal statement; horizontal editorial gallery; craftsmanship band; parallax mission; social discovery; newsletter; product gallery with zoom; sizes; bag with quantity, remove, persistence; collection filters and sorting; Ordering-opens-soon state; curtain page transitions; desktop cursor, magnetic buttons, card tilt; reduced-motion rules; official Facebook, Instagram and email links.

## 2. Architecture
Static-export Next.js App Router. Server components for pages and content; client components only where needed (cart, transitions, 3D, scroll, forms). Styling: the approved CSS is ported verbatim into `globals.css` so the design is preserved exactly; Tailwind supplies tokens/utilities (preflight off). Data/logic in `src/lib`, copy in `content.ts`, images in `images.ts`, commerce seam in `commerce.ts`.

## 3. Preserved assets and dependencies
Palette, typography (Cormorant Garamond, Hanken Grotesk via next/font), conceptual art generators (`conceptArt.ts`), cloth shaders (`clothShaders.ts`), copy, official links. Dependencies: next, react, three, @react-three/fiber, gsap, tailwindcss.

## 4. Status: written vs verified
| Item | Status |
|---|---|
| All routes, components, data, config, docs, deploy files | Written |
| Syntax of TS/TSX | Checked with a syntax-only pass (see delivery notes) |
| Dependency install, `next build`, type-check against real types | **Not run** (no registry access in the authoring environment) |
| Visual match to prototype, R3F cloth rendering, GSAP scroll behaviour | **Not tested in a browser** |
| Mobile, reduced-motion, WebGL-fallback behaviour | **Not tested** (logic written to mirror the prototype, which was browser-tested) |
| Cloudflare deployment | **Not performed** |

## 5. First-run checklist
1. `npm install && npm run typecheck && npm run build`; fix any version or type issues.
2. `npm run dev`: compare every route against the prototype side by side.
3. Check the cloth hero on desktop and a mid-range phone; confirm fallback with WebGL disabled and with reduced motion on.
4. Verify bag persistence, quantity, remove, filters, sorting, product gallery, forms, social links.
5. Lighthouse and keyboard/screen-reader pass; then deploy a preview to Cloudflare.

## 6. Known gaps
No real photography or 3D models; no prices, confirmed sizes or colourways; no payments, orders or mailing backend; legal pages are placeholders needing counsel review; fonts load at build time via next/font (requires network in CI).
