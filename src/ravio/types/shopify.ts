/**
 * Headless Shopify Integration Specification & Contracts
 * Ensures zero rework when connecting real Shopify Storefront API.
 */

export interface ShopifyStorefrontConfig {
  storeDomain: string; // e.g. "ravio-co.myshopify.com"
  apiVersion: string;  // e.g. "2025-01"
  publicAccessToken: string;
  countryCode: 'BD' | 'US' | 'GB';
  currencyCode: 'BDT' | 'USD';
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      url: string;
      altText?: string;
    };
    selectedOptions: {
      name: string;
      value: string;
    }[];
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: ShopifyCartLine[];
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
    totalTaxAmount?: { amount: string; currencyCode: string };
  };
}

export interface ShopifyIntegrationStep {
  stepNumber: string;
  name: string;
  layer: 'Frontend Client' | 'GraphQL Query' | 'Shopify Storefront' | 'Local Payments (Bangladesh)';
  description: string;
  technicalDeliverable: string;
  status: 'foundation-ready' | 'pending-credentials' | 'future-deployment';
}
