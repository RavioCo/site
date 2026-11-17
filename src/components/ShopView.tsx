import type { Scene } from '@/lib/conceptArt';
import type { Category, Product } from '@/lib/products';
import { PageBanner } from './PageBanner';
import { ProductCard } from './ProductCard';
import { TLink } from './TransitionProvider';

const BANNER: Record<string, Scene> = { polo: 'pique', tee: 'weave', denim: 'seam', trousers: 'twill', knit: 'weave' };

export interface ShopQuery { q: string; sort: string; instock: boolean }

/** Search, sort and filter are plain GET forms: they work without JavaScript and are resolved by WooCommerce. */
export function ShopView({ category, categories, products, query, failed }: {
  category: Category | null; categories: Category[]; products: Product[]; query: ShopQuery; failed?: boolean;
}) {
  const action = category ? `/shop/${category.slug}/` : '/shop/';
  return (
    <>
      <PageBanner title={category ? category.name : 'All pieces'} scene={BANNER[category?.slug ?? ''] ?? 'twill'} />
      <div className="wrap" style={{ paddingTop: '6vh', paddingBottom: '14vh' }}>
        <div className="tools" role="group" aria-label="Collections" style={{ marginBottom: 20 }}>
          <TLink className="chip" href="/shop" aria-current={!category ? 'page' : undefined}>All</TLink>
          {categories.map((c) => (
            <TLink key={c.slug} className="chip" href={`/shop/${c.slug}`} aria-current={category?.slug === c.slug ? 'page' : undefined}>{c.name}</TLink>
          ))}
        </div>
        <form className="tools" method="get" action={action} role="search" aria-label="Search and sort">
          <label htmlFor="q" className="vh">Search</label>
          <input id="q" name="q" type="search" defaultValue={query.q} placeholder="Search" maxLength={80} style={{ width: "auto", minWidth: 200 }} />
          <label htmlFor="sort" style={{ margin: 0 }}>Sort</label>
          <select id="sort" name="sort" defaultValue={query.sort}>
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="name">Name, A to Z</option>
          </select>
          <label style={{ margin: 0 }}><input type="checkbox" name="instock" value="1" defaultChecked={query.instock} style={{ width: "auto", padding: 0, marginRight: 6 }} /> In stock</label>
          <button className="btn" type="submit">Apply</button>
        </form>
        <div className="grid">
          {failed ? <p>The collection is temporarily unavailable. Please try again shortly.</p>
            : products.length ? products.map((p) => <ProductCard key={p.id} p={p} />) : <p>Nothing here yet.</p>}
        </div>
      </div>
    </>
  );
}
