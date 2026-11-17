/** All page copy lives here (content separated from components). Nothing below is a product claim. */
export const FAQ: [string, string][] = [
  ['When can I order?', 'Ordering has not opened yet. Add pieces to your bag to save them on this device, and subscribe to hear first.'],
  ['What are the prices?', 'Pricing will be announced before release.'],
  ['What are the pieces made from?', 'Fabric and construction details will be published once confirmed.'],
  ['Which payment methods are accepted?', 'Payment methods will be listed once they are live.'],
  ['How can I contact RAVIO?', 'Write to info.ravioco@gmail.com, or message us on Facebook or Instagram.'],
];

export const LEGAL = {
  shipping: { title: 'Shipping and delivery', body: 'Delivery regions, timings and costs will be confirmed before ordering opens. This page will be updated with the final policy.' },
  returns: { title: 'Returns and exchanges', body: 'The return and exchange policy will be confirmed before ordering opens. This page will be updated with the final policy.' },
  privacy: { title: 'Privacy', body: 'This is a pre-launch draft placeholder. A complete privacy policy, reviewed by legal counsel, must be published before any customer data is collected.' },
  terms: { title: 'Terms and conditions', body: 'This is a pre-launch draft placeholder. Final terms, reviewed by legal counsel, must be published before ordering opens.' },
  ordering: { title: 'Ordering information', body: 'Ordering has not opened yet. Items added to your bag are saved on this device only. Pricing, payment methods, delivery regions and timings will be published here before ordering opens, and nothing is charged until then.' },
} as const;
export type LegalKey = keyof typeof LEGAL;

export const PHILOSOPHY = [
  'We believe refinement is a lifelong pursuit. Not of perfection, but of progress. The quiet decision to choose better. To think deeper. To live with intention.',
  'Because ordinary things deserve more care, more thought, and higher standards. To elevate what already exists.',
];
export const MISSION = 'To create products and experiences that earn trust through quality, intention, and enduring value.';

export const GALLERY = [
  { scene: 'pique', key: 'craftsmanship/pique', label: 'Surface and structure' },
  { scene: 'seam', key: 'craftsmanship/seam', label: 'Construction' },
  { scene: 'twill', key: 'editorial/twill', label: 'Natural materials' },
  { scene: 'weave', key: 'editorial/linen', label: 'Quiet texture' },
] as const;
