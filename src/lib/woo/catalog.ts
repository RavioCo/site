/** SERVER-ONLY catalog access. WooCommerce is the single source of truth: nothing here is a product database. */
import { publicGet } from './server';
import type { WcCategory, WcProduct } from './types';
import type { Category, Product, Variation } from '../products';

const strip = (h: string) => h.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const minor = (v: string | undefined) => (v === undefined || v === '' ? null : Number.parseInt(v, 10));

export function mapProduct(w: WcProduct, variations: Variation[] = []): Product {
  const cat = w.categories[0];
  const price = minor(w.prices?.price);
  return {
    id: w.slug, wcId: w.id, name: w.name,
    category: cat?.slug ?? 'uncategorised', categoryName: cat?.name ?? 'Shop',
    description: strip(w.short_description || w.description || ''),
    longDescription: w.description,
    images: w.images.map((i) => ({ id: i.id, src: i.src, srcSet: i.srcset, alt: i.alt || w.name })),
    sku: w.sku, type: w.type === 'variable' ? 'variable' : 'simple',
    price, regularPrice: minor(w.prices?.regular_price), onSale: w.on_sale,
    currency: w.prices?.currency_code ?? 'BDT', minorUnit: w.prices?.currency_minor_unit ?? 2,
    availability: !w.is_purchasable ? 'coming-soon' : w.is_in_stock || w.is_on_backorder ? 'available' : 'sold-out',
    lowStock: w.low_stock_remaining,
    attributes: w.attributes.filter((a) => a.has_variations).map((a) => ({
      name: a.name, key: a.taxonomy || a.name, options: a.terms.map((t) => ({ name: t.name, slug: t.slug })),
    })),
    variations,
  };
}

export interface ListOpts { category?: string; search?: string; sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'name'; inStockOnly?: boolean }

export async function listCategories(): Promise<Category[]> {
  const { data } = await publicGet<WcCategory[]>('/wp-json/wc/store/v1/products/categories?per_page=100&hide_empty=true');
  return data.filter((c) => c.slug !== 'uncategorised').map((c) => ({ id: c.id, slug: c.slug, name: c.name, count: c.count }));
}

export async function listProducts(o: ListOpts = {}): Promise<Product[]> {
  const q = new URLSearchParams({ per_page: '48' });
  if (o.category) {
    const cat = (await listCategories()).find((c) => c.slug === o.category);
    if (!cat) return [];
    q.set('category', String(cat.id));
  }
  if (o.search) q.set('search', o.search.slice(0, 80));
  if (o.inStockOnly) q.append('stock_status[]', 'instock');
  const sort = { 'price-asc': ['price', 'asc'], 'price-desc': ['price', 'desc'], newest: ['date', 'desc'], name: ['title', 'asc'], featured: ['menu_order', 'asc'] }[o.sort ?? 'featured'];
  q.set('orderby', sort[0]); q.set('order', sort[1]);
  const { data } = await publicGet<WcProduct[]>(`/wp-json/wc/store/v1/products?${q}`);
  return data.map((w) => mapProduct(w));
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  const { data } = await publicGet<WcProduct[]>(`/wp-json/wc/store/v1/products?slug=${encodeURIComponent(slug)}`);
  const w = data[0];
  if (!w) return null;
  let variations: Variation[] = [];
  if (w.type === 'variable') {
    // Variation records (price, stock, SKU) come from the products collection filtered by parent.
    // NOTE: verify `type=variation&parent=` against your installed WooCommerce Store API version.
    const v = await publicGet<WcProduct[]>(`/wp-json/wc/store/v1/products?type=variation&parent=${w.id}&per_page=100`);
    variations = v.data.map((x) => ({
      id: x.id, sku: x.sku, attributes: [] as { name: string; value: string }[], // filled from parent.variations below
      price: minor(x.prices?.price), regularPrice: minor(x.prices?.regular_price),
      inStock: x.is_in_stock || x.is_on_backorder, purchasable: x.is_purchasable,
    }));
    // Attribute selections live on the parent's `variations[]` list.
    for (const pv of w.variations) {
      const hit = variations.find((x) => x.id === pv.id);
      if (hit) hit.attributes = pv.attributes;
    }
  }
  return mapProduct(w, variations);
}
