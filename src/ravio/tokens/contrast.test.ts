import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { RAVIO_TOKENS } from './tokens';

function luminance(hex: string) {
  const channels = [1, 3, 5].map((offset) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels.reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(a: string, b: string) {
  const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (high + 0.05) / (low + 0.05);
}

describe('RAVIO accessible text roles', () => {
  const { semantic, primary, secondary } = RAVIO_TOKENS.colors;
  it('keeps decorative gold at #B7A17A', () => {
    expect(secondary.mutedGold.hex).toBe('#B7A17A');
    expect(semantic.accentDecorative).toBe('#B7A17A');
  });
  it('does not claim the proposed #735E38 meets AAA on #F4F1EA', () => {
    expect(contrast('#735E38', '#F4F1EA')).toBeLessThan(7);
  });
  it('meets AAA for gold typography on ivory and white', () => {
    expect(contrast(semantic.textAccent, '#F4F1EA')).toBeGreaterThanOrEqual(7);
    expect(contrast(semantic.textAccent, primary.pureWhite.hex)).toBeGreaterThanOrEqual(7);
  });
  it('uses #5A5A5A secondary text meeting AA on ivory', () => {
    expect(semantic.textSecondary).toBe('#5A5A5A');
    expect(contrast(semantic.textSecondary, '#F4F1EA')).toBeGreaterThanOrEqual(4.5);
  });
  it('keeps inverted gold readable on both dark surfaces', () => {
    expect(contrast(semantic.textAccentInverted, '#171717')).toBeGreaterThanOrEqual(7);
    expect(contrast(semantic.textAccentInverted, '#212121')).toBeGreaterThanOrEqual(4.5);
  });
  it('keeps the CSS theme consistent with the token registry', () => {
    const css = readFileSync('src/styles.css', 'utf8');
    expect(css).toContain(`--ravio-gold-text-light: ${semantic.textAccent};`);
    expect(css).toContain(`--ravio-secondary-text-light: ${semantic.textSecondary};`);
    expect(css).toContain(`--ravio-gold: ${semantic.accentDecorative};`);
  });
});