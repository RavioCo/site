/**
 * Server-side commerce facade used by pages. WooCommerce is the only source of truth.
 * Pages call these inside try/catch via `safe()` so a backend outage renders a calm message, not a crash.
 */
export { listProducts, listCategories, getProduct } from './woo/catalog';
export async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<{ data: T; failed: boolean }> {
  try { return { data: await fn(), failed: false }; } catch { return { data: fallback, failed: true }; }
}
