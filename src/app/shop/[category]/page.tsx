import { notFound } from 'next/navigation';
import { ShopView } from '@/components/ShopView';
import { listCategories, listProducts, safe } from '@/lib/commerce';
import { meta } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ category: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';
const SORTS = ['featured', 'newest', 'price-asc', 'price-desc', 'name'] as const;

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cats = await safe(listCategories, []);
  const name = cats.data.find((c) => c.slug === category)?.name ?? 'Shop';
  return meta(name, `${name} from RAVIO & Co.`, `/shop/${category}/`);
}
export default async function Collection({ params, searchParams }: Props) {
  const { category } = await params;
  const sp = await searchParams;
  const q = one(sp.q).slice(0, 80);
  const sort = (SORTS as readonly string[]).includes(one(sp.sort)) ? (one(sp.sort) as (typeof SORTS)[number]) : 'featured';
  const instock = one(sp.instock) === '1';
  const cats = await safe(listCategories, []);
  const current = cats.data.find((c) => c.slug === category) ?? null;
  if (!cats.failed && !current) notFound();
  const prods = await safe(() => listProducts({ category, search: q || undefined, sort, inStockOnly: instock }), []);
  return <ShopView category={current} categories={cats.data} products={prods.data} query={{ q, sort, instock }} failed={cats.failed || prods.failed} />;
}
