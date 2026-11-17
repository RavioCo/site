import type { MetadataRoute } from 'next';
import { listCategories, listProducts, safe } from '@/lib/commerce';
import { LEGAL } from '@/lib/content';
import { SITE } from '@/lib/site';

export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cats, prods] = await Promise.all([safe(listCategories, []), safe(() => listProducts(), [])]);
  const paths = ['/', '/shop', '/about', '/contact', '/faq',
    ...cats.data.map((c) => `/shop/${c.slug}`),
    ...prods.data.map((p) => `/product/${p.id}`),
    ...Object.keys(LEGAL).map((k) => `/${k}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p === '/' ? '/' : `${p}/`}` }));
}
