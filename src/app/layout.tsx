import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Hanken_Grotesk } from 'next/font/google';
import { CursorFX } from '@/components/CursorFX';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RevealObserver } from '@/components/RevealObserver';
import { TransitionProvider } from '@/components/TransitionProvider';
import { CartProvider } from '@/lib/cart';
import { ORDERING_OPEN, SITE } from '@/lib/site';
import '@/styles/globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-serif', display: 'swap' });
const sans = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-sans', display: 'swap' });

const DESC = 'RAVIO & Co. is a modern luxury house built on quality, intention and enduring value.';
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'RAVIO & Co. — Elevation Refined.', template: '%s — RAVIO & Co.' },
  description: DESC,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: SITE.name, title: 'RAVIO & Co. — Elevation Refined.', description: DESC, url: '/' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

const orgLd = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Ravio & Co.', url: SITE.url,
  email: SITE.email, sameAs: [SITE.facebook, SITE.instagram],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <noscript><style>{'.curt{display:none}.rv{opacity:1;transform:none}'}</style></noscript>
        <a className="skip" href="#main">Skip to content</a>
        <CartProvider>
          <TransitionProvider>
            <div className="banner">{ORDERING_OPEN ? 'Now ordering' : 'Ordering opens soon'}</div>
            <Header />
            <main id="main" tabIndex={-1}>{children}</main>
            <Footer />
            <RevealObserver />
            <CursorFX />
          </TransitionProvider>
        </CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgLd }} />
      </body>
    </html>
  );
}
