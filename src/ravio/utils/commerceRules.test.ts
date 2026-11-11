import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  calculateOrderTotals,
  evaluatePromoCode,
  validateCheckoutForm,
  filterAndSortProducts,
} from './commerceRules';
import { parseRouteFromPathname, getProductSEOConfig } from './seo';
import { getResponsiveImageAttrs } from './imageOptimization';
import { SAMPLE_CATALOG } from '../data/sampleCatalog';
import { INITIAL_FILTER_STATE } from '../components/shop/types';

test('calculateOrderTotals computes subtotals, free delivery threshold, and promo discounts accurately', () => {
  const dhakaDelivery = { priceBDT: 120, priceUSD: 2, freeThresholdBDT: 10000 };

  // Below free threshold (5800 BDT < 10000 BDT), no promo
  const res1 = calculateOrderTotals(
    [{ quantity: 1, unitPriceBDT: 5800, unitPriceUSD: 50 }],
    dhakaDelivery,
    null
  );
  assert.equal(res1.totalItemCount, 1);
  assert.equal(res1.subtotalBDT, 5800);
  assert.equal(res1.isDeliveryFreeBDT, false);
  assert.equal(res1.deliveryCostBDT, 120);
  assert.equal(res1.totalBDT, 5920);

  // Above free threshold (5800 + 6800 = 12600 BDT >= 10000 BDT) with 10% promo
  const promo10 = {
    code: 'RAVIO10',
    discountPercentage: 10,
    description: '10% Courtesy',
  };
  const res2 = calculateOrderTotals(
    [
      { quantity: 1, unitPriceBDT: 5800, unitPriceUSD: 50 },
      { quantity: 1, unitPriceBDT: 6800, unitPriceUSD: 58 },
    ],
    dhakaDelivery,
    promo10
  );
  assert.equal(res2.totalItemCount, 2);
  assert.equal(res2.subtotalBDT, 12600);
  assert.equal(res2.isDeliveryFreeBDT, true);
  assert.equal(res2.deliveryCostBDT, 0);
  assert.equal(res2.discountAmountBDT, 1260);
  assert.equal(res2.totalBDT, 11340);
});

test('evaluatePromoCode validates recognized codes and rejects invalid codes', () => {
  const valid10 = evaluatePromoCode('  ravio10 ');
  assert.equal(valid10.success, true);
  assert.equal(valid10.promo?.discountPercentage, 10);

  const valid15 = evaluatePromoCode('ATELIER');
  assert.equal(valid15.success, true);
  assert.equal(valid15.promo?.discountPercentage, 15);

  const invalid = evaluatePromoCode('FAKE99');
  assert.equal(invalid.success, false);
  assert.equal(invalid.promo, null);
});

test('validateCheckoutForm enforces required Bangladesh customer and address fields', () => {
  const emptyErrors = validateCheckoutForm({
    fullName: '',
    email: 'invalid-email',
    phoneNumber: '12345',
    cityDistrict: 'Dhaka (Metropolitan)',
    thanaArea: '',
    streetAddress: '',
  });
  assert.ok(emptyErrors.fullName);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.phoneNumber);
  assert.ok(emptyErrors.thanaArea);
  assert.ok(emptyErrors.streetAddress);

  const validErrors = validateCheckoutForm({
    fullName: 'Arifin Rahman',
    email: 'arifin@example.com',
    phoneNumber: '+880 1711-234567',
    cityDistrict: 'Dhaka (Metropolitan)',
    thanaArea: 'Gulshan 2',
    streetAddress: 'House 14, Road 71',
  });
  assert.equal(Object.keys(validErrors).length, 0);
});

test('filterAndSortProducts filters by category, price, and sorts by price ascending/descending', () => {
  const poloOnly = filterAndSortProducts(
    SAMPLE_CATALOG,
    { ...INITIAL_FILTER_STATE, categories: ['polo-shirts'] },
    'price-low'
  );
  assert.equal(poloOnly.length, 3);
  assert.equal(poloOnly[0].handle, 'essential-polo');
  assert.equal(poloOnly[2].handle, 'long-sleeve-mercerized-polo');

  const under7000 = filterAndSortProducts(
    SAMPLE_CATALOG,
    { ...INITIAL_FILTER_STATE, priceRange: 'under-7000' },
    'price-high'
  );
  assert.equal(under7000.length, 2);
  assert.equal(under7000[0].price.amountBDT, 6800);
  assert.equal(under7000[1].price.amountBDT, 5800);
});

test('parseRouteFromPathname maps valid routes and rejects unknown product handles to not-found', () => {
  assert.deepEqual(parseRouteFromPathname('/'), { view: 'homepage' });
  assert.deepEqual(parseRouteFromPathname('/our-story/'), { view: 'our-story' });
  assert.deepEqual(parseRouteFromPathname('/product/refined-polo'), {
    view: 'pdp',
    productHandle: 'refined-polo',
  });
  assert.deepEqual(parseRouteFromPathname('/product/unknown-garment'), {
    view: 'not-found',
  });
  assert.deepEqual(parseRouteFromPathname('/non-existent-route'), {
    view: 'not-found',
  });
});

test('getProductSEOConfig and getResponsiveImageAttrs generate valid SEO and WebP srcSet attributes', () => {
  const seo = getProductSEOConfig(SAMPLE_CATALOG[0]);
  assert.ok(seo.title.includes('Essential Polo'));
  assert.equal(seo.path, '/product/essential-polo');
  assert.equal((seo.jsonLd as Record<string, unknown>)['@type'], 'Product');

  const imgAttrs = getResponsiveImageAttrs(
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1200&q=80',
    [400, 800]
  );
  assert.ok(imgAttrs.src.includes('fm=webp'));
  assert.ok(imgAttrs.srcSet?.includes('400w'));
  assert.ok(imgAttrs.srcSet?.includes('800w'));
});
