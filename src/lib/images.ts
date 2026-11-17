import type { Scene } from './conceptArt';

/**
 * CENTRAL IMAGE CONFIGURATION for campaign / editorial / craftsmanship slots (unchanged behaviour).
 * Product photography now comes from WooCommerce media (see ProductImage in components/ImageSlot.tsx);
 * products without uploaded images still render the labelled conceptual placeholder.
 */
export type ImageStatus = 'conceptual' | 'verified';
export interface ImageAsset {
  src: string | null; srcSet?: string; sizes?: string; alt: string; width: number; height: number; status: ImageStatus; priority?: boolean;
}
const slot = (alt: string, width: number, height: number, priority = false): ImageAsset =>
  ({ src: null, alt, width, height, status: 'conceptual', priority });

export const IMAGES: Record<string, ImageAsset> = {
  'campaign/hero': slot('RAVIO campaign: contemporary menswear in natural light', 2400, 1350, true),
  'campaign/mission': slot('RAVIO campaign: textured wall in natural light', 2400, 1350),
  'editorial/twill': slot('Twill fabric close-up', 1600, 1000),
  'editorial/linen': slot('Linen fabric close-up', 1600, 1000),
  'craftsmanship/pique': slot('Piqué knit close-up', 1600, 1000),
  'craftsmanship/seam': slot('Stitched seam detail', 1600, 1000),
};

export const VIEWS = ['Front view', 'Fabric detail', 'Back view'] as const;

export const SCENE_KEYS: Record<Scene, string> = {
  sun: 'campaign/hero', horizon: 'campaign/mission', pique: 'craftsmanship/pique',
  seam: 'craftsmanship/seam', twill: 'editorial/twill', weave: 'editorial/linen',
};
