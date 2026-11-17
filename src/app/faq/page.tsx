import { PageBanner } from '@/components/PageBanner';
import { FAQ } from '@/lib/content';
import { meta } from '@/lib/seo';

export const metadata = meta('FAQ', 'Answers about ordering, pricing, materials and contacting RAVIO & Co.', '/faq/');

export default function Faq() {
  return (
    <>
      <PageBanner title="FAQ" scene="weave" compact />
      <div className="wrap prose" style={{ paddingTop: '6vh' }}>
        {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </>
  );
}
