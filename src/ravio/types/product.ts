/**
 * Product & Category Domain Types
 * Designed for future Shopify Storefront API GraphQL mapping.
 */

export type CategorySlug = 
  | 'polo-shirts' 
  | 'denim' 
  | 'twill-trousers' 
  | 'knitwear' 
  | 'tailoring' 
  | 'leather-goods' 
  | 'footwear';

export interface ProductCategory {
  id: string;
  slug: CategorySlug;
  name: string;
  editorialSubtitle: string;
  phase: 'launch' | 'expansion-phase-1' | 'expansion-phase-2';
  description: string;
  materialFocus: string;
  itemCountEstimate: number;
}

export interface ProductPrice {
  amountBDT: number;
  amountUSD: number;
  formattedBDT: string;
  formattedUSD: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  colorName: string;
  colorHex: string;
  size: string;
  inStock: boolean;
  inventoryQuantity?: number;
  shopifyVariantId?: string;
}

export interface ProductEditorialAttribute {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  shopifyId?: string;
  handle: string;
  title: string;
  editorialKicker: string;
  categorySlug: CategorySlug;
  price: ProductPrice;
  isNewArrival?: boolean;
  isSignatureClassic?: boolean;
  shortDescription: string;
  editorialNote: string;
  composition: string;
  craftDetails: string[];
  careInstructions: string[];
  attributes: ProductEditorialAttribute[];
  variants: ProductVariant[];
  availableSizes: string[];
  availableColors: { name: string; hex: string }[];
  imageUrls: {
    hero: string;
    editorial: string;
    detail: string;
    modelFront: string;
    modelBack: string;
  };
}
