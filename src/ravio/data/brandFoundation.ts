import { BrandFoundationData, BrandChapter } from '../types/brand';

export const RAVIO_BRAND_DATA: BrandFoundationData = {
  name: 'RAVIO',
  parentCompany: 'Ravio & Co.',
  domain: 'ravioco.com',
  tagline: 'ELEVATION REFINED.',
  establishedPhilosophy:
    'We believe refinement is a lifelong pursuit. Not of perfection, but of progress. The quiet decision to choose better. To think deeper. To live with intention. Because ordinary things deserve more care, more thought, and higher standards. To elevate what already exists.',
  mission:
    'To create products and experiences that earn trust through quality, intention, and enduring value.',
  aestheticHeritage: {
    referenceHouses: [
      'Hermès (Disciplined craftsmanship, timeless restraint, reverent materiality)',
      'Ralph Lauren (Quiet patrician ease, enduring sartorial canon, multi-category lifestyle world)',
      'Brunello Cucinelli (Humanistic philosophy, understated luxury, dignified neutral palette)',
      'Loro Piana (Textile supremacy, tactile quietude, unbranded quiet luxury)',
    ],
    guidingTenets: [
      'Elevation over novelty: Refine everyday archetypes rather than chase disposable trends.',
      'Tactile truth: Highlight natural fibers, weight, weave density, and honest provenance.',
      'Quiet confidence: No billboard branding, no loud logos, no artificial urgency banners.',
      'Editorial pacing: Generous margins, deliberate photography, calm whitespace.',
    ],
    antiPatterns: [
      'No generic Shopify template aesthetics or high-saturation neon buttons',
      'No fabricated customer reviews, fake countdown timers, or fake buyer popups',
      'No rounded candy pill badges or rainbow category tags',
      'No low-contrast illegible gray body text or cramped product grids',
      'No over-animated disruptive motion; only quiet 350ms easing transitions',
    ],
  },
  marketStrategy: {
    primaryLaunchMarket: 'Bangladesh (Dhaka, Chattogram, Sylhet, and nationwide distribution)',
    currency: 'BDT',
    currencySymbol: '৳',
    localCommerceTouchpoints: [
      'Seamless BDT pricing with optional international USD parity',
      'Direct integration path for local payment channels (bKash, Nagad, Visa, Mastercard, AMEX)',
      'Premium white-glove packaging and insured door-to-door concierge delivery in Dhaka',
      'Bilingual microcopy readiness (English primary, Bengali customer support readiness)',
    ],
    internationalPositioning:
      'Engineered to international luxury standards (export-grade cottons, selvedge denim, Italian-milled twills), presenting an authentic South Asian luxury house with global prestige.',
  },
};

export const BRAND_CHAPTERS: BrandChapter[] = [
  {
    id: 'chapter-01',
    index: '01',
    title: 'The Pursuit of Progress',
    subtitle: 'Philosophy of Intentional Refinement',
    narrative: [
      'Refinement is not an arrival point or an elite club. It is a quiet discipline practiced every morning in the choices we make.',
      'We do not seek novelty for novelty’s sake. We inspect the garments and objects you touch every single day—the collar of a morning shirt, the drape of trousers after eight hours of movement—and ask what care was left undone.',
    ],
  },
  {
    id: 'chapter-02',
    index: '02',
    title: 'Material Honesty',
    subtitle: 'From Field to Finished Garment',
    narrative: [
      'We honor long-staple combed cottons, high-twist mercerized yarns, and Japanese-shuttle shuttle-loom selvedge.',
      'Every stitch is tensioned for endurance. Our buttons are cut from genuine mother-of-pearl and natural horn, never cast plastics.',
    ],
    materialFocus: 'Long-Staple Combed Cotton · Ring-Spun Twill · Indigo Selvedge',
  },
  {
    id: 'chapter-03',
    index: '03',
    title: 'A House for the Long Term',
    subtitle: 'Beyond Apparel into Lifestyle',
    narrative: [
      'While RAVIO begins with polo shirts, denim, and twill trousers, the architecture of the house is built for a complete lifestyle universe.',
      'From leather goods to personal fragrance, every creation must meet the single unwavering standard: does it elevate what already exists?',
    ],
  },
];
