# RAVIO & Co. — production website

Next.js (App Router, static export) · React 19 · TypeScript · Tailwind CSS (tokens/utilities) · React Three Fiber · GSAP ScrollTrigger.

> **Status:** source migrated from the approved single-file prototype. It has **not yet been installed, built or browser-tested**. Run the checklist in `docs/MIGRATION.md` before treating anything as working.

## Quick start
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static site in ./out
```

## Structure
```
src/app/          routes (home, shop, shop/[category], product/[id], bag, about, standard, contact, faq, [legal], not-found, sitemap, robots)
src/components/   visual components (Hero, ClothCanvas, StickyStatement, HorizontalGallery, Parallax, ...)
src/lib/          business logic and data (products, cart, commerce seam, images config, site config)
src/lib/content.ts   all page copy
src/styles/globals.css  design system, ported 1:1 from the approved prototype
public/images/    asset folders      asset-source/  original photos
```

## Key controls
- **Ordering state:** `NEXT_PUBLIC_ORDERING_OPEN` (default `false`) -> "Ordering opens soon". Keep false until payments exist.
- **Images:** edit only `src/lib/images.ts` (see `public/images/README.md`).
- **Products:** `src/lib/products.ts`. Prices are `null` until announced. Never invent specs.
- **Commerce backend:** implement `CommerceProvider` in `src/lib/commerce.ts`. No payment is simulated.
- **Forms:** set `NEXT_PUBLIC_FORMS_ENDPOINT` once an endpoint exists; until then forms say honestly they are not connected.

See `docs/DEPLOYMENT.md` for GitHub + Cloudflare.
