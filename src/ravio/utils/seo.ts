import { useEffect } from 'react';
import { Product } from '../types/product';
import { SAMPLE_CATALOG } from '../data/sampleCatalog';

export type WorkflowView =
  | 'homepage'
  | 'our-story'
  | 'the-ravio-standard'
  | 'philosophy'
  | 'cart'
  | 'checkout'
  | 'pdp'
  | 'shop'
  | 'collection-polo'
  | 'collection-essentials'
  | 'collection-new-arrivals'
  | 'design-system'
  | 'foundation-architecture'
  | 'not-found';

export interface PageSEOConfig {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, unknown>;
}

export const VIEW_TO_PATH: Record<WorkflowView, string> = {
  homepage: '/',
  'our-story': '/our-story',
  'the-ravio-standard': '/the-ravio-standard',
  philosophy: '/philosophy',
  shop: '/shop',
  'collection-polo': '/collections/polo',
  'collection-essentials': '/collections/essentials',
  'collection-new-arrivals': '/collections/new-arrivals',
  pdp: '/product/essential-polo',
  cart: '/cart',
  checkout: '/checkout',
  'design-system': '/design-system',
  'foundation-architecture': '/foundation-architecture',
  'not-found': '/404',
};

export function parseRouteFromPathname(pathname: string): {
  view: WorkflowView;
  productHandle?: string;
} {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/' || clean === '/home') return { view: 'homepage' };
  if (clean === '/our-story') return { view: 'our-story' };
  if (clean === '/the-ravio-standard') return { view: 'the-ravio-standard' };
  if (clean === '/philosophy') return { view: 'philosophy' };
  if (clean === '/shop') return { view: 'shop' };
  if (clean === '/collections/polo') return { view: 'collection-polo' };
  if (clean === '/collections/essentials') return { view: 'collection-essentials' };
  if (clean === '/collections/new-arrivals') return { view: 'collection-new-arrivals' };
  if (clean === '/product' || clean.startsWith('/product/')) {
    const handlePart = clean.replace(/^\/product\/?/, '').trim();
    if (!handlePart) {
      return { view: 'pdp', productHandle: 'essential-polo' };
    }
    const matched = SAMPLE_CATALOG.find((p) => p.handle === handlePart);
    if (matched) {
      return { view: 'pdp', productHandle: matched.handle };
    }
    return { view: 'not-found' };
  }
  if (clean === '/cart') return { view: 'cart' };
  if (clean === '/checkout') return { view: 'checkout' };
  if (clean === '/design-system') return { view: 'design-system' };
  if (clean === '/foundation-architecture') return { view: 'foundation-architecture' };
  return { view: 'not-found' };
}

export function getProductSEOConfig(product: Product): PageSEOConfig {
  return {
    title: `${product.title} — RAVIO | Elevation Refined`,
    description: `${product.shortDescription} (${product.composition}).`,
    path: `/product/${product.handle}`,
    type: 'product',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.shortDescription,
      image: product.imageUrls.hero,
      // Demo SKUs remain in the catalog; do not publish internal references in metadata.
      brand: {
        '@type': 'Brand',
        name: 'RAVIO by Ravio & Co.',
      },
      // Offers omitted pre-launch: prices are not yet announced.
    },
  };
}

export const ROUTE_SEO_CONFIG: Record<string, PageSEOConfig> = {
  'our-story': {
    title: 'Our Story — RAVIO | Elevation Refined',
    description:
      'Discover the story of RAVIO by Ravio & Co. Built on the belief that ordinary things deserve more care, more thought, and higher standards.',
    path: '/our-story',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Our Story — RAVIO',
      description:
        'To create products and experiences that earn trust through quality, intention, and enduring value.',
      publisher: {
        '@type': 'Organization',
        name: 'RAVIO by Ravio & Co.',
        slogan: 'ELEVATION REFINED.',
      },
    },
  },
  'the-ravio-standard': {
    title: 'The RAVIO Standard — Principles of Quality & Intention | RAVIO',
    description:
      'Explore the six foundational principles of The RAVIO Standard: Quality, Intention, Thoughtful Design, Craftsmanship, Enduring Value, and Continuous Refinement.',
    path: '/the-ravio-standard',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'The RAVIO Standard — RAVIO',
      description:
        'The six guiding principles behind RAVIO: Quality, Intention, Thoughtful Design, Craftsmanship, Enduring Value, and Continuous Refinement.',
    },
  },
  philosophy: {
    title: 'Brand Philosophy — The Pursuit of Progress | RAVIO',
    description:
      'We believe refinement is a lifelong pursuit. Not of perfection, but of progress. The quiet decision to choose better, think deeper, and live with intention.',
    path: '/philosophy',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Brand Philosophy — RAVIO',
      description:
        'We believe refinement is a lifelong pursuit. Not of perfection, but of progress. The quiet decision to choose better. To think deeper. To live with intention.',
    },
  },
  homepage: {
    title: 'RAVIO — Elevation Refined | Digital Flagship',
    description:
      'RAVIO by Ravio & Co. Considered essentials and timeless silhouettes created around quality, intention, and enduring value.',
    path: '/',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'RAVIO by Ravio & Co.',
      url: 'https://ravioco.com',
      slogan: 'ELEVATION REFINED.',
      description:
        'To create products and experiences that earn trust through quality, intention, and enduring value.',
    },
  },
  shop: {
    title: 'Shop Considered Essentials — RAVIO | Elevation Refined',
    description:
      'Explore the RAVIO catalog of considered essentials, thoughtfully designed around quality, intention, and enduring value.',
    path: '/shop',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Shop Considered Essentials — RAVIO',
      description:
        'Explore the RAVIO catalog of considered essentials, thoughtfully designed around quality, intention, and enduring value.',
      url: 'https://ravioco.com/shop',
    },
  },
  'collection-polo': {
    title: 'Polo Collection — RAVIO | Elevation Refined',
    description:
      'Discover the RAVIO Polo Collection. Double-mercerized cotton piqué with structured sartorial collars.',
    path: '/collections/polo',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Polo Collection — RAVIO',
      description:
        'Discover the RAVIO Polo Collection. Double-mercerized cotton piqué with structured sartorial collars.',
      url: 'https://ravioco.com/collections/polo',
    },
  },
  'collection-essentials': {
    title: 'Essential Collection — RAVIO | Elevation Refined',
    description:
      'Permanent foundational archetypes engineered to transcend seasons with enduring value.',
    path: '/collections/essentials',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Essential Collection — RAVIO',
      description:
        'Permanent foundational archetypes engineered to transcend seasons with enduring value.',
      url: 'https://ravioco.com/collections/essentials',
    },
  },
  'collection-new-arrivals': {
    title: 'New Arrivals — Edition 01 | RAVIO',
    description:
      'Explore the latest sartorial archetypes from RAVIO by Ravio & Co.',
    path: '/collections/new-arrivals',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'New Arrivals — Edition 01 | RAVIO',
      description: 'Explore the latest sartorial archetypes from RAVIO by Ravio & Co.',
      url: 'https://ravioco.com/collections/new-arrivals',
    },
  },
  pdp: {
    title: 'Garment Specification — RAVIO | Elevation Refined',
    description:
      'Inspect garment specifications, materials, sizing, and craftsmanship details at the RAVIO digital flagship.',
    path: '/product',
    type: 'product',
  },
  cart: {
    title: 'Shopping Bag — RAVIO | Elevation Refined',
    description:
      'Review your selected garments in the RAVIO shopping bag ahead of launch.',
    path: '/cart',
    type: 'website',
  },
  checkout: {
    title: 'Ordering Opens Soon — RAVIO | Elevation Refined',
    description:
      'Ordering for RAVIO Edition 01 is not yet open.',
    path: '/checkout',
    type: 'website',
  },
  'not-found': {
    title: 'Page Not Found (404) — RAVIO | Elevation Refined',
    description:
      'The requested page could not be found. Explore the RAVIO digital flagship, collections, and brand philosophy.',
    path: '/404',
    type: 'website',
  },
};

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function usePageSEO(config: PageSEOConfig) {
  useEffect(() => {
    document.title = config.title;

    setMetaTag('name', 'description', config.description);
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('property', 'og:type', config.type === 'product' ? 'website' : config.type || 'website');
    setMetaTag('property', 'og:site_name', 'RAVIO');
    setMetaTag('name', 'twitter:title', config.title);
    setMetaTag('name', 'twitter:description', config.description);

    const canonicalUrl = `${window.location.origin}${config.path}`;
    setMetaTag('property', 'og:url', canonicalUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const scriptId = 'ravio-json-ld-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (config.jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(config.jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [config.title, config.description, config.path, config.type, config.jsonLd]);
}
