import { SITE } from '@/lib/site';
import { SocialLinks } from './SocialLinks';
import { TLink } from './TransitionProvider';

const COLS: { title: string; links: [string, string][] }[] = [
  { title: 'Shop', links: [['/shop', 'All pieces'], ['/shop/polo', 'Polo shirts'], ['/shop/trousers', 'Trousers'], ['/shop/knit', 'Sweatshirts and hoodies']] },
  { title: 'House', links: [['/about', 'About'], ['/contact', 'Contact'], ['/faq', 'FAQ']] },
  { title: 'Policies', links: [['/shipping', 'Shipping and delivery'], ['/returns', 'Returns and exchanges'], ['/privacy', 'Privacy'], ['/ordering', 'Ordering information'], ['/terms', 'Terms']] },
];

export function Footer() {
  return (
    <footer>
      <div>
        <div className="logo" style={{ fontSize: 20 }}>RAVIO &amp; CO.</div>
        <p style={{ color: '#B9AF9F', maxWidth: '24em' }}>{SITE.tagline}</p>
        <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        <SocialLinks />
      </div>
      {COLS.map((c) => (
        <div key={c.title}>
          <h4>{c.title}</h4>
          {c.links.map(([href, label]) => <TLink key={href} href={href}>{label}</TLink>)}
        </div>
      ))}
      <div className="wm">RAVIO</div>
      <div className="legal">© Ravio &amp; Co. · ravioco.com</div>
    </footer>
  );
}
