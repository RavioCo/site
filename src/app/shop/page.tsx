import { ShopView } from '@/components/ShopView';
import { listCategories, listProducts, safe } from '@/lib/commerce';
import { meta } from '@/lib/seo';

export const metadata = meta('Shop', 'The pieces from RAVIO & Co.', '/shop/');
export const dynamic = 'force-dynamic';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';
const SORTS = ['featured', 'newest', 'price-asc', 'price-desc', 'name'] as const;

export default async function Shop({ searchParams }: Props) {
  const sp = await searchParams;
  const q = one(sp.q).slice(0, 80);
  const sort = (SORTS as readonly string[]).includes(one(sp.sort)) ? (one(sp.sort) as (typeof SORTS)[number]) : 'featured';
  const instock = one(sp.instock) === '1';
  const [cats, prods] = await Promise.all([
    safe(listCategories, []),
    safe(() => listProducts({ search: q || undefined, sort, inStockOnly: instock }), []),
  ]);
  return <ShopView category={null} categories={cats.data} products={prods.data} query={{ q, sort, instock }} failed={prods.failed} />;
}
