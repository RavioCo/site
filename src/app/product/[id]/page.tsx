import { notFound } from 'next/navigation';
import { ProductView } from '@/components/ProductView';
import { getProduct, listProducts, safe } from '@/lib/commerce';
import { meta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { data: p } = await safe(() => getProduct(id), null);
  return p ? meta(p.name, p.description || 'RAVIO & Co.', `/product/${p.id}/`) : meta('Product', 'RAVIO & Co.', '/shop/');
}
export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const { data: product, failed } = await safe(() => getProduct(id), null);
  if (!product) { if (failed) throw new Error('Catalog unavailable'); notFound(); }
  const related = (await safe(() => listProducts(), [])).data.filter((p) => p.id !== id).slice(0, 4);
  const offers = product.price === null ? undefined : {
    '@type': 'Offer', priceCurrency: product.currency, price: (product.price / 10 ** product.minorUnit).toFixed(product.minorUnit),
    availability: product.availability === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    url: `${SITE.url}/product/${product.id}/`,
  };
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description, sku: product.sku || undefined, brand: { '@type': 'Brand', name: 'RAVIO' }, url: `${SITE.url}/product/${product.id}/`, offers });
  return (
    <>
      <ProductView product={product} related={related} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
    </>
  );
}
