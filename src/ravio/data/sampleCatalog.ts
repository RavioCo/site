import { Product } from '../types/product';
import placeholderEssentialPolo from '../assets/placeholders/essential-polo.png';
import placeholderRefinedPolo from '../assets/placeholders/refined-polo.png';
import placeholderLongSleevePolo from '../assets/placeholders/long-sleeve-polo.png';
import placeholderSelvedgeDenim from '../assets/placeholders/selvedge-denim.png';
import placeholderTwillTrouser from '../assets/placeholders/twill-trouser.png';
import placeholderRawRigidDenim from '../assets/placeholders/raw-rigid-denim.png';

export const SAMPLE_CATALOG: Product[] = [
  {
    id: 'ravio-polo-essential',
    handle: 'essential-polo',
    title: 'Essential Polo',
    editorialKicker: 'Demonstration Concept · Everyday Archetype',
    categorySlug: 'polo-shirts',
    price: {
      amountBDT: 5800,
      amountUSD: 50,
      formattedBDT: '৳ 5,800 (Placeholder Ref)',
      formattedUSD: '$50 (Placeholder Ref)',
    },
    isSignatureClassic: true,
    isNewArrival: false,
    shortDescription: 'Long-staple combed cotton piqué engineered for relaxed everyday elegance. Clean rib collar and mother-of-pearl buttons.',
    editorialNote: 'Conceived as the foundational day-to-day polo. Woven from breathable two-ply yarns that maintain shape through daily wear and washing.',
    composition: '100% Long-Staple Combed Cotton (200 GSM)',
    craftDetails: [
      'Natural Australian mother-of-pearl buttons with cross-stitch anchor',
      'Engineered knit collar designed to resist edge-curl',
      'Reinforced side vents with subtle herringbone binding tape',
      'Preshrunk fabric to maintain dimensional fidelity',
    ],
    careInstructions: [
      'Machine wash cold (30°C) with mild detergent',
      'Lay flat in shade to dry naturally; avoid tumble dry',
      'Warm iron with cloth press if required',
    ],
    attributes: [
      { label: 'Weave', value: 'Two-Ply Combed Micro-Piqué' },
      { label: 'Collar Style', value: 'Classic Ribbed Spread' },
      { label: 'Buttons', value: 'Australian Mother-of-Pearl' },
      { label: 'Status', value: 'Demonstration Prototype Concept' },
    ],
    variants: [
      { id: 'var-ess-c-s', sku: 'RAV-DEMO-ESS-CHR-S', title: 'Deep Charcoal / S', colorName: 'Deep Charcoal', colorHex: '#171717', size: 'S', inStock: true },
      { id: 'var-ess-c-m', sku: 'RAV-DEMO-ESS-CHR-M', title: 'Deep Charcoal / M', colorName: 'Deep Charcoal', colorHex: '#171717', size: 'M', inStock: true },
      { id: 'var-ess-c-l', sku: 'RAV-DEMO-ESS-CHR-L', title: 'Deep Charcoal / L', colorName: 'Deep Charcoal', colorHex: '#171717', size: 'L', inStock: true },
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Warm Ivory', hex: '#F4F1EA' },
      { name: 'Muted Olive', hex: '#4B4E41' },
    ],
    imageUrls: {
      // No verified polo photography available (prior shot depicted a T-shirt); neutral placeholders used.
      hero: placeholderEssentialPolo,
      editorial: placeholderEssentialPolo,
      detail: placeholderEssentialPolo,
      modelFront: placeholderEssentialPolo,
      modelBack: placeholderEssentialPolo,
    },
  },
  {
    id: 'ravio-polo-refined',
    handle: 'refined-polo',
    title: 'Refined Polo',
    editorialKicker: 'Demonstration Concept · 60/2 Double Mercerized',
    categorySlug: 'polo-shirts',
    price: {
      amountBDT: 6800,
      amountUSD: 58,
      formattedBDT: '৳ 6,800 (Placeholder Ref)',
      formattedUSD: '$58 (Placeholder Ref)',
    },
    isSignatureClassic: true,
    isNewArrival: true,
    shortDescription: 'Double-mercerized Egyptian long-staple cotton polo with structured sartorial collar that remains upright beneath tailored jackets.',
    editorialNote: 'A heightened expression of the classic polo. Double mercerization gives the yarn a permanent silk-like luster and eliminates surface fuzz for an elevated sartorial drape.',
    composition: '100% Giza Double-Mercerized Cotton (220 GSM)',
    craftDetails: [
      'Structured tailored spread collar with internal interlining stand',
      'Genuine hand-selected Australian mother-of-pearl buttons',
      'Split side hems lined with fine cotton herringbone tape',
      'Zero synthetic blend fibers; 100% natural cotton handfeel',
    ],
    careInstructions: [
      'Machine wash delicate cold (30°C) with gentle soap',
      'Reshape collar while damp; lay flat to dry in shade',
      'Medium iron with pressing cloth',
    ],
    attributes: [
      { label: 'Weave', value: 'Double Mercerized High-Twist Piqué' },
      { label: 'Collar Style', value: 'Structured Tailored Spread' },
      { label: 'Luster', value: 'Natural Mercerized Silk-Sheen' },
      { label: 'Status', value: 'Demonstration Prototype Concept' },
    ],
    variants: [
      { id: 'var-ref-c-s', sku: 'RAV-DEMO-REF-CHR-S', title: 'Warm Ivory / S', colorName: 'Warm Ivory', colorHex: '#F4F1EA', size: 'S', inStock: true },
      { id: 'var-ref-c-m', sku: 'RAV-DEMO-REF-CHR-M', title: 'Warm Ivory / M', colorName: 'Warm Ivory', colorHex: '#F4F1EA', size: 'M', inStock: true },
      { id: 'var-ref-c-l', sku: 'RAV-DEMO-REF-CHR-L', title: 'Warm Ivory / L', colorName: 'Warm Ivory', colorHex: '#F4F1EA', size: 'L', inStock: true },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Warm Ivory', hex: '#F4F1EA' },
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Mineral Navy', hex: '#1E2530' },
    ],
    imageUrls: {
      // No verified Refined Polo photography available; neutral placeholders used throughout.
      hero: placeholderRefinedPolo,
      editorial: placeholderRefinedPolo,
      detail: placeholderRefinedPolo,
      modelFront: placeholderRefinedPolo,
      modelBack: placeholderRefinedPolo,
    },
  },
  {
    id: 'ravio-polo-longsleeve',
    handle: 'long-sleeve-mercerized-polo',
    title: 'Long-Sleeve Mercerized Polo',
    editorialKicker: 'Demonstration Concept · Autumn Transitional',
    categorySlug: 'polo-shirts',
    price: {
      amountBDT: 7400,
      amountUSD: 64,
      formattedBDT: '৳ 7,400 (Placeholder Ref)',
      formattedUSD: '$64 (Placeholder Ref)',
    },
    isSignatureClassic: false,
    isNewArrival: true,
    shortDescription: 'Long-sleeve iteration with tailored shirt-cuffs and mother-of-pearl closures for trans-seasonal layering beneath unconstructed tailoring.',
    editorialNote: 'Designed for fluid movement between morning appointments and evening gatherings. Finished with functional button cuffs cut from genuine Australian shell.',
    composition: '100% Long-Staple Double-Mercerized Cotton (230 GSM)',
    craftDetails: [
      'Tailored sleeve cuffs with single-button mother-of-pearl gauntlet closure',
      'Sartorial spread collar with integrated interlining',
      'Continuous clean placket with pick-stitch edge detailing',
      'Pre-washed to eliminate progressive sleeve shrinkage',
    ],
    careInstructions: [
      'Machine wash cold delicate cycle',
      'Lay flat in shade to dry',
      'Warm steam iron with damp press cloth',
    ],
    attributes: [
      { label: 'Sleeve Style', value: 'Sartorial Button-Cuff' },
      { label: 'Weave', value: 'Double Mercerized Micro-Piqué' },
      { label: 'Buttons', value: 'Australian Mother-of-Pearl' },
      { label: 'Status', value: 'Demonstration Prototype Concept' },
    ],
    variants: [
      { id: 'var-lsp-m-s', sku: 'RAV-DEMO-LSP-NVY-S', title: 'Mineral Navy / S', colorName: 'Mineral Navy', colorHex: '#1E2530', size: 'S', inStock: true },
      { id: 'var-lsp-m-m', sku: 'RAV-DEMO-LSP-NVY-M', title: 'Mineral Navy / M', colorName: 'Mineral Navy', colorHex: '#1E2530', size: 'M', inStock: true },
      { id: 'var-lsp-m-l', sku: 'RAV-DEMO-LSP-NVY-L', title: 'Mineral Navy / L', colorName: 'Mineral Navy', colorHex: '#1E2530', size: 'L', inStock: true },
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Mineral Navy', hex: '#1E2530' },
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Warm Ivory', hex: '#F4F1EA' },
    ],
    imageUrls: {
      // No verified long-sleeve polo photography available; neutral placeholders used throughout.
      hero: placeholderLongSleevePolo,
      editorial: placeholderLongSleevePolo,
      detail: placeholderLongSleevePolo,
      modelFront: placeholderLongSleevePolo,
      modelBack: placeholderLongSleevePolo,
    },
  },
  {
    id: 'ravio-denim-01',
    handle: 'selvedge-indigo-denim',
    title: 'The Selvedge Denim',
    editorialKicker: 'Demonstration Concept · 13.5oz Shuttle-Loom',
    categorySlug: 'denim',
    price: {
      amountBDT: 9800,
      amountUSD: 85,
      formattedBDT: '৳ 9,800 (Placeholder Ref)',
      formattedUSD: '$85 (Placeholder Ref)',
    },
    isSignatureClassic: true,
    isNewArrival: false,
    shortDescription: 'Slow-woven 13.5oz red-line selvedge denim in a deep indigo one-wash finish. Clean straight-taper silhouette.',
    editorialNote: 'Woven on restored low-tension vintage shuttle looms. The irregular ring-spun slub yields a rich, three-dimensional surface that softens uniquely to the wearer’s stride.',
    composition: '100% Ring-Spun Long-Staple Cotton (13.5 oz Red-Line Selvedge)',
    craftDetails: [
      'Vintage Toyoda loom red-line selvedge ID visible at rolled cuff',
      'Solid antique copper rivets hand-peened through leather backing washers',
      'Chain-stitched waistband and hem executed on vintage Union Special machines',
      'Heavy unbleached drill cotton pocket bags',
    ],
    careInstructions: [
      'Wear frequently before first wash to establish natural crease geometry',
      'Turn inside out, soak in cold water with minimal detergent',
      'Hang to dry naturally; never tumble dry',
    ],
    attributes: [
      { label: 'Denim Weight', value: '13.5 oz Medium-Heavy' },
      { label: 'Loom Type', value: 'Vintage Low-Tension Shuttle Loom' },
      { label: 'Dye Method', value: 'Pure Rope-Dyed Indigo (12 Dips)' },
      { label: 'Status', value: 'Demonstration Prototype Concept' },
    ],
    variants: [
      { id: 'var-den-30', sku: 'RAV-DEMO-DEN-IND-30', title: 'Deep Indigo / 30', colorName: 'Deep Indigo', colorHex: '#1B2430', size: '30', inStock: true },
      { id: 'var-den-32', sku: 'RAV-DEMO-DEN-IND-32', title: 'Deep Indigo / 32', colorName: 'Deep Indigo', colorHex: '#1B2430', size: '32', inStock: true },
      { id: 'var-den-34', sku: 'RAV-DEMO-DEN-IND-34', title: 'Deep Indigo / 34', colorName: 'Deep Indigo', colorHex: '#1B2430', size: '34', inStock: true },
    ],
    availableSizes: ['29', '30', '31', '32', '33', '34', '36'],
    availableColors: [
      { name: 'Deep Indigo', hex: '#1B2430' },
      { name: 'Deep Charcoal', hex: '#171717' },
    ],
    imageUrls: {
      // Available denim shot depicted light-wash skinny jeans, not deep-indigo selvedge; placeholders used.
      hero: placeholderSelvedgeDenim,
      editorial: placeholderSelvedgeDenim,
      detail: placeholderSelvedgeDenim,
      modelFront: placeholderSelvedgeDenim,
      modelBack: placeholderSelvedgeDenim,
    },
  },
  {
    id: 'ravio-twill-01',
    handle: 'tailored-twill-trouser',
    title: 'The Tailored Twill Trouser',
    editorialKicker: 'Demonstration Concept · 280gsm Dense Gabardine',
    categorySlug: 'twill-trousers',
    price: {
      amountBDT: 8200,
      amountUSD: 70,
      formattedBDT: '৳ 8,200 (Placeholder Ref)',
      formattedUSD: '$70 (Placeholder Ref)',
    },
    isSignatureClassic: true,
    isNewArrival: true,
    shortDescription: 'Clean front trouser tailored from dense combed cotton twill with an immaculate drape and internal sartorial curtain waistband.',
    editorialNote: 'Designed to bridge the gap between formal suiting trousers and relaxed chinos. The high-twist gabardine weave naturally resists wrinkling during travel and long studio days.',
    composition: '100% Double-Combed Long-Staple Cotton Gabardine (280 GSM)',
    craftDetails: [
      'Curtained sartorial waistband lined with cotton herringbone canvas',
      'Extended tab waistband closure with genuine horn button and inner hook',
      'Split rear waistband V-notch for comfort during seated posture',
      'Double-welt back pockets with button loop anchors',
    ],
    careInstructions: [
      'Dry clean recommended or machine wash cold on delicate cycle',
      'Hang by cuffs to maintain natural crease line',
      'Medium steam iron along the center crease',
    ],
    attributes: [
      { label: 'Weave', value: 'High-Density 3/1 Cotton Gabardine' },
      { label: 'Waistband', value: 'Sartorial Extended Tab with V-Split' },
      { label: 'Hardware', value: 'Natural Buffalo Horn Buttons & YKK Brass Zipper' },
      { label: 'Status', value: 'Demonstration Prototype Concept' },
    ],
    variants: [
      { id: 'var-twill-snd-30', sku: 'RAV-DEMO-TWL-SND-30', title: 'Warm Sand / 30', colorName: 'Warm Sand', colorHex: '#D4C7B5', size: '30', inStock: true },
      { id: 'var-twill-snd-32', sku: 'RAV-DEMO-TWL-SND-32', title: 'Warm Sand / 32', colorName: 'Warm Sand', colorHex: '#D4C7B5', size: '32', inStock: true },
      { id: 'var-twill-snd-34', sku: 'RAV-DEMO-TWL-SND-34', title: 'Warm Sand / 34', colorName: 'Warm Sand', colorHex: '#D4C7B5', size: '34', inStock: true },
    ],
    availableSizes: ['30', '32', '34', '36', '38'],
    availableColors: [
      { name: 'Warm Sand', hex: '#D4C7B5' },
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Muted Olive', hex: '#4B4E41' },
    ],
    imageUrls: {
      // Placeholder used for visual consistency until official RAVIO photography is delivered.
      hero: placeholderTwillTrouser,
      editorial: placeholderTwillTrouser,
      detail: placeholderTwillTrouser,
      modelFront: placeholderTwillTrouser,
      modelBack: placeholderTwillTrouser,
    },
  },
  {
    id: 'ravio-denim-rigid',
    handle: 'raw-rigid-selvedge-denim',
    title: 'Raw Rigid Selvedge Denim',
    editorialKicker: 'Demonstration Concept · 14oz Unwashed Loomstate',
    categorySlug: 'denim',
    price: {
      amountBDT: 10500,
      amountUSD: 90,
      formattedBDT: '৳ 10,500 (Placeholder Ref)',
      formattedUSD: '$90 (Placeholder Ref)',
    },
    isSignatureClassic: false,
    isNewArrival: true,
    shortDescription: 'Unwashed 14oz loomstate indigo denim featuring heavy red-line selvedge ID and antique copper hardware.',
    editorialNote: 'For purists seeking uncompromised shuttle-loom authenticity. Unsanforized and loomstate, ready to shrink-to-fit and mold precisely to the patron’s posture.',
    composition: '100% Long-Staple Pure Indigo Dyed Cotton (14 oz Loomstate)',
    craftDetails: [
      'Unwashed pure indigo loomstate red-line selvedge',
      'Solid hand-hammered raw copper rivets',
      'Heavyweight drill cotton pocket lining with atelier numbering',
      'Hidden back pocket rivets to protect leather furniture and automotive seating',
    ],
    careInstructions: [
      'First warm soak required before hem alteration',
      'Hang to dry in shaded ventilation',
      'Wear persistently to develop sharp contrast honeycombs and whiskers',
    ],
    attributes: [
      { label: 'Fabric Weight', value: '14 oz Heavyweight Loomstate' },
      { label: 'Finish', value: 'Raw Unwashed (Shrink-to-Fit)' },
      { label: 'Loom', value: 'Low-Tension Japanese Shuttle Loom' },
      { label: 'Status', value: 'Demonstration Prototype Concept' },
    ],
    variants: [
      { id: 'var-rig-32', sku: 'RAV-DEMO-RIG-IND-32', title: 'Raw Indigo / 32', colorName: 'Raw Indigo', colorHex: '#111822', size: '32', inStock: true },
      { id: 'var-rig-34', sku: 'RAV-DEMO-RIG-IND-34', title: 'Raw Indigo / 34', colorName: 'Raw Indigo', colorHex: '#111822', size: '34', inStock: true },
    ],
    availableSizes: ['30', '32', '34', '36'],
    availableColors: [
      { name: 'Raw Indigo', hex: '#111822' },
    ],
    imageUrls: {
      hero: placeholderRawRigidDenim,
      editorial: placeholderRawRigidDenim,
      detail: placeholderRawRigidDenim,
      modelFront: placeholderRawRigidDenim,
      modelBack: placeholderRawRigidDenim,
    },
  },
];

export interface CollectionMeta {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bannerImage: string;
  bannerAlt: string;
  filterFn: (product: Product) => boolean;
}

export const RAVIO_COLLECTIONS: Record<string, CollectionMeta> = {
  all: {
    slug: 'all',
    title: 'SHOP',
    tagline: 'ALL CONSIDERED PIECES',
    description: 'Discover considered essentials, thoughtfully created for everyday living.',
    bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2400&q=85',
    bannerAlt: 'RAVIO Full Collection Campaign',
    filterFn: () => true,
  },
  polo: {
    slug: 'polo',
    title: 'POLO COLLECTION',
    tagline: 'THE HIGH-TWIST MERCERIZED PIQUÉ',
    description: 'Double-mercerized Egyptian long-staple cottons with structured collars engineered to remain sharp beneath tailored jackets.',
    bannerImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=2400&q=85',
    bannerAlt: 'RAVIO Polo Collection Studio Campaign',
    filterFn: (p) => p.categorySlug === 'polo-shirts',
  },
  essentials: {
    slug: 'essentials',
    title: 'ESSENTIAL COLLECTION',
    tagline: 'CONSIDERED FOUNDATIONAL ARCHETYPES',
    description: 'Permanent classic garments engineered to transcend seasons. Woven with long-staple fibers, vintage shuttle selvedge, and mother-of-pearl buttons.',
    bannerImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=85',
    bannerAlt: 'RAVIO Essential Foundational Collection',
    filterFn: (p) => Boolean(p.isSignatureClassic),
  },
  'new-arrivals': {
    slug: 'new-arrivals',
    title: 'NEW ARRIVALS',
    tagline: 'EDITION 01 RELEASES',
    description: 'The latest sartorial archetypes from Ravio & Co. Fresh additions in mercerized cottons, dense gabardines, and raw loomstate denim.',
    bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2400&q=85',
    bannerAlt: 'RAVIO New Arrivals Edition 01',
    filterFn: (p) => Boolean(p.isNewArrival),
  },
};
