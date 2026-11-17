import { LEGAL, type LegalKey } from '@/lib/content';
import { SITE } from '@/lib/site';
import { PageBanner } from './PageBanner';

export function LegalPage({ k }: { k: LegalKey }) {
  const { title, body } = LEGAL[k];
  return (
    <>
      <PageBanner title={title} scene="twill" compact />
      <div className="wrap prose" style={{ paddingTop: '6vh' }}>
        <p>{body}</p>
        <p>Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      </div>
    </>
  );
}
