/**
 * Types and pure helpers only. There is NO static product list here: WooCommerce is the single source of truth.
 * Live data is loaded server-side by lib/woo/catalog.ts.
 */
export type Availability = 'coming-soon' | 'available' | 'sold-out';
export interface Category { id: number; slug: string; name: string; count: number }
export interface ProductImageData { id: number; src: string; srcSet?: string; alt: string }
export interface Variation {
  id: number; sku: string; attributes: { name: string; value: string }[];
  price: number | null; regularPrice: number | null; inStock: boolean; purchasable: boolean;
}
export interface ProductAttribute { name: string; key: string; options: { name: string; slug: string }[] }
export interface Product {
  /** URL slug (WooCommerce product slug). */
  id: string;
  wcId: number;
  name: string;
  category: string;
  categoryName: string;
  description: string;
  longDescription: string;
  images: ProductImageData[];
  sku: string;
  type: 'simple' | 'variable';
  /** Minor units (e.g. poisha). null = no price set in WooCommerce. */
  price: number | null;
  regularPrice: number | null;
  onSale: boolean;
  currency: string;
  minorUnit: number;
  availability: Availability;
  lowStock: number | null;
  attributes: ProductAttribute[];
  variations: Variation[];
}

export function formatMoney(minor: number | string, currency: string, minorUnit = 2): string {
  const n = (typeof minor === 'string' ? Number.parseInt(minor, 10) : minor) / 10 ** minorUnit;
  return new Intl.NumberFormat('en', { style: 'currency', currency, minimumFractionDigits: minorUnit === 0 ? 0 : 2, maximumFractionDigits: minorUnit }).format(n);
}
export const priceLabel = (p: Product) => (p.price === null ? 'Price to be announced' : formatMoney(p.price, p.currency, p.minorUnit));
export const availabilityLabel = (p: Product) => ({ 'coming-soon': 'Coming soon', available: 'Available', 'sold-out': 'Sold out' })[p.availability];

/** Normalises attribute names across Store API shapes ("Size", "pa_size", "size") so selection keys always agree. */
export const normAttr = (s: string) => s.toLowerCase().replace(/^pa_/, '').replace(/[^a-z0-9]+/g, '');
const normVal = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Matches a variation to the chosen values. `chosen` is keyed by normAttr(name). An empty variation value means "any". */
export function findVariation(p: Product, chosen: Record<string, string>): Variation | null {
  if (p.type !== 'variable') return null;
  return p.variations.find((v) => v.attributes.length > 0 && v.attributes.every((a) => {
    const val = chosen[normAttr(a.name)];
    return a.value === '' ? Boolean(val) : val !== undefined && normVal(val) === normVal(a.value);
  })) ?? null;
}
