import { notFound } from 'next/navigation';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL, type LegalKey } from '@/lib/content';
import { meta } from '@/lib/seo';

// Serves /shipping, /returns, /privacy, /terms and /ordering. Anything else is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(LEGAL).map((legal) => ({ legal }));

type Props = { params: Promise<{ legal: string }> };
const isLegal = (k: string): k is LegalKey => k in LEGAL;

export async function generateMetadata({ params }: Props) {
  const { legal } = await params;
  return isLegal(legal) ? meta(LEGAL[legal].title, LEGAL[legal].body, `/${legal}/`) : meta('Not found', '', '/');
}
export default async function Legal({ params }: Props) {
  const { legal } = await params;
  if (!isLegal(legal)) notFound();
  return <LegalPage k={legal} />;
}
