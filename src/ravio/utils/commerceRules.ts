import { Product } from '../types/product';
import { FilterState, SortOption } from '../components/shop/types';

export interface OrderLineInput {
  quantity: number;
  unitPriceBDT: number;
  unitPriceUSD: number;
}

export interface DeliveryRuleInput {
  priceBDT: number;
  priceUSD: number;
  freeThresholdBDT?: number;
}

export interface PromoCodeRule {
  code: string;
  discountPercentage: number;
  description: string;
}

export interface CalculatedOrderTotals {
  totalItemCount: number;
  subtotalBDT: number;
  subtotalUSD: number;
  isDeliveryFreeBDT: boolean;
  deliveryCostBDT: number;
  deliveryCostUSD: number;
  discountAmountBDT: number;
  discountAmountUSD: number;
  totalBDT: number;
  totalUSD: number;
}

export interface CheckoutFormInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  cityDistrict: string;
  thanaArea: string;
  streetAddress: string;
}

/**
 * Pure calculation of cart subtotals, promo courtesy discounts, complimentary delivery thresholds,
 * and final settlement totals in BDT and USD.
 */
export function calculateOrderTotals(
  items: OrderLineInput[],
  deliveryOption: DeliveryRuleInput,
  appliedPromo: PromoCodeRule | null
): CalculatedOrderTotals {
  const totalItemCount = items.reduce((sum, item) => sum + Math.max(0, item.quantity), 0);
  const subtotalBDT = items.reduce(
    (sum, item) => sum + item.unitPriceBDT * Math.max(0, item.quantity),
    0
  );
  const subtotalUSD = items.reduce(
    (sum, item) => sum + item.unitPriceUSD * Math.max(0, item.quantity),
    0
  );

  const isDeliveryFreeBDT = Boolean(
    deliveryOption.freeThresholdBDT && subtotalBDT >= deliveryOption.freeThresholdBDT
  );
  const deliveryCostBDT =
    totalItemCount === 0 || isDeliveryFreeBDT ? 0 : deliveryOption.priceBDT;
  const deliveryCostUSD =
    totalItemCount === 0 || isDeliveryFreeBDT ? 0 : deliveryOption.priceUSD;

  const discountAmountBDT = appliedPromo
    ? Math.round((subtotalBDT * appliedPromo.discountPercentage) / 100)
    : 0;
  const discountAmountUSD = appliedPromo
    ? Math.round((subtotalUSD * appliedPromo.discountPercentage) / 100)
    : 0;

  const totalBDT =
    totalItemCount === 0 ? 0 : Math.max(0, subtotalBDT - discountAmountBDT + deliveryCostBDT);
  const totalUSD =
    totalItemCount === 0 ? 0 : Math.max(0, subtotalUSD - discountAmountUSD + deliveryCostUSD);

  return {
    totalItemCount,
    subtotalBDT,
    subtotalUSD,
    isDeliveryFreeBDT,
    deliveryCostBDT,
    deliveryCostUSD,
    discountAmountBDT,
    discountAmountUSD,
    totalBDT,
    totalUSD,
  };
}

/**
 * Pure promo code validator returning structured outcome and courtesy rule.
 */
export function evaluatePromoCode(rawCode: string): {
  success: boolean;
  message: string;
  promo: PromoCodeRule | null;
} {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return {
      success: false,
      message: 'Please enter a valid invitation code.',
      promo: null,
    };
  }
  if (code === 'RAVIO10' || code === 'ELEVATE10') {
    return {
      success: true,
      message: `Courtesy code ${code} applied successfully (10% savings).`,
      promo: {
        code,
        discountPercentage: 10,
        description: '10% Welcome Courtesy applied to order subtotal.',
      },
    };
  }
  if (code === 'FOUNDER' || code === 'ATELIER') {
    return {
      success: true,
      message: `Patron code ${code} applied successfully (15% savings).`,
      promo: {
        code,
        discountPercentage: 15,
        description: '15% Atelier Patron courtesy applied to order subtotal.',
      },
    };
  }
  return {
    success: false,
    message: 'Invitation code not recognized. Please check and try again.',
    promo: null,
  };
}

/**
 * Pure checkout form validator for Bangladesh concierge fulfillment.
 */
export function validateCheckoutForm(formData: CheckoutFormInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!formData.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  }
  if (
    !formData.email.trim() ||
    !formData.email.includes('@') ||
    !formData.email.includes('.')
  ) {
    errors.email = 'Please provide a valid email address.';
  }
  if (
    !formData.phoneNumber.trim() ||
    formData.phoneNumber.replace(/\D/g, '').length < 10
  ) {
    errors.phoneNumber = 'Please provide a valid Bangladesh mobile number (minimum 10 digits).';
  }
  if (!formData.cityDistrict) {
    errors.cityDistrict = 'Please select your delivery district.';
  }
  if (!formData.thanaArea.trim()) {
    errors.thanaArea = 'Please specify your area or thana.';
  }
  if (!formData.streetAddress.trim()) {
    errors.streetAddress = 'Please enter your complete street address.';
  }
  return errors;
}

/**
 * Pure catalog filtering and sorting function.
 */
export function filterAndSortProducts(
  products: Product[],
  filterState: FilterState,
  sortOption: SortOption
): Product[] {
  const filtered = products.filter((product) => {
    if (
      filterState.categories.length > 0 &&
      !filterState.categories.includes(product.categorySlug)
    ) {
      return false;
    }

    if (filterState.sizes.length > 0) {
      const hasMatchingSize = filterState.sizes.some((sz) =>
        product.availableSizes.includes(sz)
      );
      if (!hasMatchingSize) return false;
    }

    if (filterState.colors.length > 0) {
      const hasMatchingColor = filterState.colors.some((c) =>
        product.availableColors.some((ac) => ac.name.toLowerCase() === c.toLowerCase())
      );
      if (!hasMatchingColor) return false;
    }

    if (filterState.priceRange !== 'all') {
      const amount = product.price.amountBDT;
      if (filterState.priceRange === 'under-7000' && amount >= 7000) return false;
      if (filterState.priceRange === '7000-9000' && (amount < 7000 || amount > 9000))
        return false;
      if (filterState.priceRange === 'over-9000' && amount <= 9000) return false;
    }

    if (filterState.inStockOnly) {
      const hasStock = product.variants.some((v) => v.inStock);
      if (!hasStock) return false;
    }

    return true;
  });

  const sorted = [...filtered];
  switch (sortOption) {
    case 'newest':
      return sorted.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    case 'price-low':
      return sorted.sort((a, b) => a.price.amountBDT - b.price.amountBDT);
    case 'price-high':
      return sorted.sort((a, b) => b.price.amountBDT - a.price.amountBDT);
    case 'featured':
    default:
      return sorted.sort(
        (a, b) => (b.isSignatureClassic ? 1 : 0) - (a.isSignatureClassic ? 1 : 0)
      );
  }
}
