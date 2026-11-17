// Run: node --test tests/   (Node >= 22; uses esbuild or TypeScript only to strip types - see tests/run.mjs)
import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const lib = await import('./.build/products.mjs');
const { findVariation, formatMoney, normAttr, priceLabel } = lib;

const p = (over = {}) => ({ id: 'polo', wcId: 10, name: 'The Polo', type: 'variable', price: 450000, currency: 'BDT', minorUnit: 2, availability: 'available',
  attributes: [{ name: 'Size', key: 'pa_size', options: [] }, { name: 'Colour', key: 'pa_colour', options: [] }],
  variations: [
    { id: 11, sku: 'P-S-IV', attributes: [{ name: 'Size', value: 's' }, { name: 'Colour', value: 'ivory' }], price: 450000, regularPrice: 450000, inStock: true, purchasable: true },
    { id: 12, sku: 'P-M-IV', attributes: [{ name: 'Size', value: 'm' }, { name: 'Colour', value: 'ivory' }], price: 470000, regularPrice: 470000, inStock: false, purchasable: true },
    { id: 13, sku: 'P-L-ANY', attributes: [{ name: 'Size', value: 'l' }, { name: 'Colour', value: '' }], price: 450000, regularPrice: 450000, inStock: true, purchasable: true },
  ], ...over });

test('normAttr unifies Store API naming shapes', () => {
  assert.equal(normAttr('Size'), 'size'); assert.equal(normAttr('pa_size'), 'size'); assert.equal(normAttr('PA_Colour'), 'colour'); assert.equal(normAttr('Fit & Cut'), 'fitcut');
});
test('exact variation matched by id', () => assert.equal(findVariation(p(), { size: 's', colour: 'ivory' })?.id, 11));
test('out-of-stock variation is still returned (UI decides)', () => assert.equal(findVariation(p(), { size: 'm', colour: 'ivory' })?.inStock, false));
test('"any" attribute (empty value) matches any chosen colour', () => assert.equal(findVariation(p(), { size: 'l', colour: 'charcoal' })?.id, 13));
test('"any" attribute still requires a choice', () => assert.equal(findVariation(p(), { size: 'l' }), null));
test('incomplete selection returns null', () => assert.equal(findVariation(p(), { size: 's' }), null));
test('non-existent combination returns null', () => assert.equal(findVariation(p(), { size: 'xl', colour: 'ivory' }), null));
test('value matching tolerates case and spacing', () => assert.equal(findVariation(p(), { size: 'S', colour: 'IVORY' })?.id, 11));
test('simple products never match a variation', () => assert.equal(findVariation(p({ type: 'simple' }), { size: 's' }), null));
test('variation with no attributes is ignored (would match everything)', () => assert.equal(findVariation(p({ variations: [{ id: 1, sku: '', attributes: [], price: 1, regularPrice: 1, inStock: true, purchasable: true }] }), {}), null));
test('formatMoney BDT 2dp from minor units', () => assert.match(formatMoney(450000, 'BDT', 2), /4,500\.00/));
test('formatMoney accepts string minor units', () => assert.match(formatMoney('12345', 'BDT', 2), /123\.45/));
test('formatMoney zero-decimal currency', () => assert.match(formatMoney(5000, 'JPY', 0), /5,000/));
test('priceLabel null price is not invented', () => assert.equal(priceLabel(p({ price: null })), 'Price to be announced'));
