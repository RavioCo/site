import { MISSION, PHILOSOPHY } from '@/lib/content';
import { PageBanner } from './PageBanner';

export function AboutPage() {
  return (
    <>
      <PageBanner title="The RAVIO Standard" scene="weave" />
      <div className="wrap">
        <div className="split" style={{ padding: '10vh 0 12vh' }}>
          <p className="lede">Refinement is a lifelong pursuit.</p>
          <div className="prose" style={{ padding: 0 }}>
            {PHILOSOPHY.map((p) => <p key={p}>{p}</p>)}
            <h2>Mission</h2>
            <p>{MISSION}</p>
            <h2>Beginning with the polo</h2>
            <p>The polo is where RAVIO begins, not where it ends. The house is built to grow into a broader lifestyle universe, one considered category at a time.</p>
          </div>
        </div>
      </div>
    </>
  );
}
