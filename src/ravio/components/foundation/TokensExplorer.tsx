import React, { useState } from 'react';
import { RAVIO_TOKENS } from '../../tokens/tokens';
import { Container } from '../common/Container';
import { EditorialKicker, EditorialHeading, EditorialBody } from '../common/Typography';
import { HairlineDivider } from '../common/HairlineDivider';
import { Check, Copy } from 'lucide-react';

export const TokensExplorer: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const paletteEntries = [
    { key: 'charcoal', name: 'Charcoal', token: RAVIO_TOKENS.colors.primary.charcoal, border: false },
    { key: 'ivory', name: 'Warm Ivory', token: RAVIO_TOKENS.colors.primary.warmIvory, border: true },
    { key: 'white', name: 'Pure White', token: RAVIO_TOKENS.colors.primary.pureWhite, border: true },
    { key: 'gold', name: 'Muted Gold', token: RAVIO_TOKENS.colors.secondary.mutedGold, border: false },
    { key: 'stone', name: 'Soft Stone', token: RAVIO_TOKENS.colors.secondary.softStone, border: false },
    { key: 'grey', name: 'Warm Grey', token: RAVIO_TOKENS.colors.secondary.warmGrey, border: false },
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Title & Introduction */}
      <Container width="content">
        <div className="space-y-4">
          <EditorialKicker variant="gold">Design Token Specification</EditorialKicker>
          <EditorialHeading size="title" variant="charcoal">
            Restrained Chromatic & Typographic System
          </EditorialHeading>
          <EditorialBody size="base" variant="muted">
            The RAVIO design tokens balance tactile warmth and graphic rigor. Built for seamless translation into Tailwind CSS classes, CSS custom variables, and future headless Shopify storefront themes.
          </EditorialBody>
        </div>
      </Container>

      {/* 1. Chromatic Swatches */}
      <Container width="flagship">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#171717]/10 pb-3">
            <h3 className="font-editorial text-2xl text-[#171717]">
              01. Chromatic Palette & Swatch Matrix
            </h3>
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#7E776F]">
              6 Core Tokens
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paletteEntries.map((item) => (
              <div
                key={item.key}
                className="bg-white border border-[#171717]/10 p-5 space-y-4 transition-all duration-300 hover:shadow-sm"
              >
                {/* Visual Swatch */}
                <div
                  className="w-full h-28 relative flex items-end p-3 transition-transform duration-300"
                  style={{
                    backgroundColor: item.token.hex,
                    border: item.border ? '1px solid rgba(23, 23, 23, 0.12)' : 'none',
                  }}
                >
                  <span
                    className={`text-[11px] font-mono tracking-wider px-2 py-0.5 ${
                      item.key === 'ivory' || item.key === 'white' || item.key === 'stone'
                        ? 'text-[#171717] bg-white/70'
                        : 'text-white bg-black/40'
                    }`}
                  >
                    {item.token.hex}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-editorial text-lg text-[#171717]">{item.name}</h4>
                    <button
                      onClick={() => handleCopy(item.token.hex, item.key)}
                      className="text-xs text-[#7E776F] hover:text-[#171717] flex items-center gap-1 font-mono"
                      title="Copy HEX"
                    >
                      {copiedToken === item.key ? (
                        <span className="flex items-center text-emerald-700 text-[10px]">
                          <Check className="w-3 h-3 mr-0.5" /> Copied
                        </span>
                      ) : (
                        <span className="flex items-center text-[10px]">
                          <Copy className="w-3 h-3 mr-0.5" /> Copy
                        </span>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-[#7E776F] leading-relaxed">
                    {item.token.role}
                  </p>

                  <div className="pt-2 border-t border-[#171717]/5 flex items-center justify-between text-[11px] font-mono text-[#7E776F]">
                    <span>RGB: {item.token.rgb}</span>
                    <span className="text-[10px] text-[#171717]/60">CSS: var(--color-ravio-{item.key})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* 2. Typography Scale Inspector */}
      <Container width="flagship">
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#171717]/10 pb-3">
            <div>
              <h3 className="font-editorial text-2xl text-[#171717]">
                02. Typographic Hierarchy & Scale Pairing
              </h3>
              <p className="text-xs text-[#7E776F] mt-1 font-sans">
                Editorial Serif: <span className="text-[#171717] font-medium">Cormorant Garamond</span> paired with Modern Sans: <span className="text-[#171717] font-medium">Plus Jakarta Sans</span>.
              </p>
            </div>
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#7E776F]">
              Scale 11px to 72px
            </span>
          </div>

          <div className="bg-white border border-[#171717]/10 divide-y divide-[#171717]/5">
            {/* Display Large */}
            <div className="p-6 sm:p-8 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7E776F] font-mono">
                <span>Display Large · Cormorant Garamond · clamp(2.75rem, 5vw, 4.5rem)</span>
                <span className="text-[#B7A17A]">Hero Editorial Headlines</span>
              </div>
              <p className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#171717] leading-[1.08] tracking-[-0.02em]">
                Elevation Refined.
              </p>
            </div>

            {/* Display Medium */}
            <div className="p-6 sm:p-8 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7E776F] font-mono">
                <span>Display Medium · Cormorant Garamond · clamp(2rem, 3.5vw, 3rem)</span>
                <span className="text-[#B7A17A]">Collection Headings & Chapter Titles</span>
              </div>
              <p className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#171717] leading-[1.15] tracking-[-0.015em]">
                The Mercerized Piqué & Vintage Shuttle Selvedge
              </p>
            </div>

            {/* Heading Large / Product */}
            <div className="p-6 sm:p-8 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7E776F] font-mono">
                <span>Heading Large · Cormorant Garamond · clamp(1.5rem, 2.5vw, 2rem)</span>
                <span className="text-[#B7A17A]">Product Detail Titles & Chapter Openers</span>
              </div>
              <p className="font-editorial text-xl sm:text-2xl lg:text-3xl text-[#171717]">
                Tailored Ease in Dense Gabardine
              </p>
            </div>

            {/* Editorial Kicker (Zero pills) */}
            <div className="p-6 sm:p-8 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7E776F] font-mono">
                <span>Editorial Kicker · Plus Jakarta Sans · 11px / Tracking 0.22em Uppercase</span>
                <span className="text-[#B7A17A]">Category Kickers / Unboxed Meta</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#B7A17A]">
                  EDITION 01
                </span>
                <span className="text-[#171717]/30">·</span>
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#7E776F]">
                  DHAKA CONCIERGE
                </span>
                <span className="text-[#171717]/30">·</span>
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#171717]">
                  RAW SELVEDGE
                </span>
              </div>
            </div>

            {/* Body Large & Base */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="text-xs text-[#7E776F] font-mono">
                  Body Large · Plus Jakarta Sans 18px (Light)
                </div>
                <p className="font-sans text-lg font-light text-[#171717] leading-relaxed">
                  Refinement is the quiet decision to choose better. To think deeper. Because ordinary things deserve more care, more thought, and higher standards.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-[#7E776F] font-mono">
                  Body Base · Plus Jakarta Sans 15px (Normal)
                </div>
                <p className="font-sans text-sm text-[#171717]/85 leading-relaxed">
                  Double-mercerized Egyptian long-staple cotton polo with structured spread collar. Tailored to retain form after hundreds of wears and clean pressing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 3. Hairlines & Layout Geometry */}
      <Container width="flagship">
        <div className="bg-white border border-[#171717]/10 p-8 space-y-8">
          <div className="border-b border-[#171717]/10 pb-3">
            <h3 className="font-editorial text-2xl text-[#171717]">
              03. Hairline Geometry & Border Discipline
            </h3>
            <p className="text-xs text-[#7E776F] mt-1 font-sans">
              Strict 1px borders with low optical weight (10% to 15% opacity), eliminating chunky shadows or garish borders.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#7E776F]">Hairline Charcoal (rgba(23, 23, 23, 0.10))</span>
              <HairlineDivider variant="charcoal" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#7E776F]">Hairline Muted Gold (rgba(183, 161, 122, 0.35))</span>
              <HairlineDivider variant="gold" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#7E776F]">Architectural Stone Divider (#E6E1D7)</span>
              <HairlineDivider variant="subtle" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#171717]/5 text-xs text-[#7E776F]">
            <div>
              <span className="font-semibold text-[#171717] block mb-1">Max-Width Standard</span>
              Flagship: 1440px | Content: 1200px | Editorial: 880px
            </div>
            <div>
              <span className="font-semibold text-[#171717] block mb-1">Corner Radii</span>
              Sharp 0px to 1px (anti-slop rule: no pill capsules)
            </div>
            <div>
              <span className="font-semibold text-[#171717] block mb-1">Motion Curve</span>
              350ms cubic-bezier(0.16, 1, 0.3, 1) ease-out
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
