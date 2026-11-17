# RAVIO staging audit — 17 November 2026

## Scope
Read-only inspection of `RavioCo/site` on `staging/free-testing`, plus local checks of the supplied `ravio-web-final.zip` and `ravio-commerce-bridge-final-v2.zip`.

## Findings

### 1. GitHub branch does not currently contain the supplied Next.js storefront
The repository root currently contains a Vite/TanStack application structure:
- `vite.config.ts`, `vitest.config.ts`, `src/router.tsx`, `src/routes/`, `src/start.ts`, `src/server.ts`
- No `src/app/` directory exists in the repository tree.
- Root `package.json` declares Next.js 15, but does not declare dependencies used by the checked-in Vite/TanStack files (including `lucide-react`, `vitest`, and TanStack packages).
- Root `bun.lock` describes a TanStack/Vite dependency set, not the root Next.js `package.json`.

This is a source/package mismatch, not a single TypeScript error. Do not silence it by excluding the old source tree or by adding arbitrary dependencies: that could produce a green check while leaving the intended storefront absent.

### 2. CI result
GitHub Actions successfully checked out the staging branch, set up Node 22, and installed the declared root package dependencies. The TypeScript step failed because imports and assets in the checked-in Vite/TanStack source do not match the root Next.js package manifest. The production build was skipped by the workflow after typecheck failed.

Run: https://github.com/RavioCo/site/actions/runs/44005358795

### 3. Supplied Next.js source archive
The Library archive `ravio-web-final.zip` contains the expected Next.js App Router source under `src/app/`, Store API proxy route, WooCommerce client/server modules, Cloudflare OpenNext configuration, tests, and deployment documentation. It is not currently present in the GitHub repository tree.

Its built-in product/variation test suite was run locally: 14/14 passed. The proxy test runner could not start because `esbuild` was not installed in this environment. A local npm dependency install did not complete within the available runtime window, so no local production build is claimed.

### 4. Commerce bridge archive
The exact v2 archive was verified against the supplied SHA-256 checksum:
`7c689d5f17764760fe23485ef823c6fc1bafaa775dc8fd48178a4ffd81882eb1`

PHP 8.4.24 checks:
- All 7 PHP files passed `php -l`.
- Validator suite: 30/30 passed.

These are syntax and unit tests only. The plugin has not yet been run inside WordPress/WooCommerce, and the SSLCOMMERZ sandbox flow remains unverified.

## Safe next step
Replace the staging branch's mismatched Vite/TanStack root with the supplied `ravio-web-final.zip` project contents (preserving `main`), then rerun install, typecheck, unit/proxy tests, and production build. Only after that should the branch be deployed to a free Cloudflare staging URL. Do not change production DNS or enable live ordering.
