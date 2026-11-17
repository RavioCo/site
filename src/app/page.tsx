import { HorizontalGallery } from '@/components/HorizontalGallery';
import { Hero } from '@/components/Hero';
import { FbIcon, IgIcon } from '@/components/SocialLinks';
import { SceneImage } from '@/components/ImageSlot';
import { NewsletterForm } from '@/components/Forms';
import { Parallax } from '@/components/Parallax';
import { ProductCard } from '@/components/ProductCard';
import { StickyStatement } from '@/components/StickyStatement';
import { TLink } from '@/components/TransitionProvider';
import { MISSION } from '@/lib/content';
import { listProducts, safe } from '@/lib/commerce';
import { SITE } from '@/lib/site';

const NEW_TAB = <span className="vh"> (opens in a new tab)</span>;

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: products } = await safe(() => listProducts({ sort: 'featured' }), []);
  return (
    <>
      <Hero />
      <StickyStatement />
      <section className="ess">
        <div className="wrap">
          <div className="row rv"><h2>Considered essentials</h2><TLink className="ul" href="/shop">View all pieces</TLink></div>
          <div className="grid">{products.length ? products.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />) : <p>The first pieces will appear here.</p>}</div>
        </div>
      </section>
      <HorizontalGallery />
      <section className="craft">
        <Parallax factor={0.15} className="bg"><SceneImage scene="seam" /></Parallax>
        <div className="wrap rv">
          <h2>The RAVIO Standard</h2>
          <p className="lede">Every piece is held to one question: is it better? Verified details on material, construction and care are published on each product page before release.</p>
          <TLink className="btn light" href="/about">Our philosophy</TLink>
        </div>
      </section>
      <section className="mission m2">
        <Parallax factor={0.22} className="bg"><SceneImage scene="horizon" /></Parallax>
        <Parallax factor={-0.14} className="mw" aria-hidden>RAVIO</Parallax>
        <div className="wrap rv"><p className="mq">{MISSION}</p><p>Our mission</p></div>
      </section>
      <section className="sdisc">
        <div className="wrap">
          <h2 className="rv">Follow the house.</h2>
          <p className="lede rv">News of the first release appears first on our official accounts.</p>
          <div className="sl2 rv">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"><IgIcon />Instagram{NEW_TAB}</a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer"><FbIcon />Facebook{NEW_TAB}</a>
          </div>
        </div>
      </section>
      <section className="nlz">
        <div className="rv"><h2>Be first to hear of the first release.</h2></div>
        <NewsletterForm />
      </section>
    </>
  );
}
