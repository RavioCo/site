import { describe, expect, it } from 'vitest';
import { customerPrice, PRICE_TO_BE_ANNOUNCED } from './customerCopy';

describe('pre-launch pricing', () => {
  it('never shows a monetary placeholder price to customers', () => {
    expect(customerPrice('৳ 5,800 (Placeholder Ref)')).toBe('Price to be announced');
    expect(PRICE_TO_BE_ANNOUNCED).toBe('Price to be announced');
  });
});
