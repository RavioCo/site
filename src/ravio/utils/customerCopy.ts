// Presentation-only cleanup: retain catalog labels, reference codes, and prices in source data.
export function customerProductKicker(kicker: string): string {
  return customerKickerNeutral(kicker);
}

function stripInternalKicker(kicker: string): string {
  return kicker.replace(/^Demonstration Concept\s*·\s*/, '').replace(/Everyday Archetype/g, 'Everyday Essentials');
}

// Pre-launch: catalog prices are placeholders; customers never see monetary values.
export const PRICE_TO_BE_ANNOUNCED = 'Price to be announced';
export function customerPrice(_formattedPrice?: string): string {
  return PRICE_TO_BE_ANNOUNCED;
}
export const PRE_LAUNCH_ORDERING_NOTICE =
  'Ordering is not yet open. Your bag is saved on this device so you can revisit your selections when the first RAVIO edition is released.';

export function isInternalProductAttribute(value: string): boolean {
  return /demonstration|prototype|archetype concept/i.test(value);
}
// Unverified fabric/construction claims stay in catalog data; customers see neutral copy until the founder confirms details.
export const PENDING_PRODUCT_DETAILS = 'Fabric and construction details will be confirmed before release.';
export const PENDING_CARE_DETAILS = 'Care guidance will be provided with the final garment.';

export function customerShortDescription(): string {
  return `A considered RAVIO essential from our first edition. ${PENDING_PRODUCT_DETAILS}`;
}

export function customerKickerNeutral(kicker: string): string {
  const cleaned = stripInternalKicker(kicker);
  return /\d|mercerized|loom|gabardine|shuttle|selvedge/i.test(cleaned) ? 'Edition 01' : cleaned;
}
