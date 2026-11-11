import React from 'react';
import { RAVIO_BRAND_DATA, BRAND_CHAPTERS } from '../../data/brandFoundation';
import { Container } from '../common/Container';
import { EditorialHeading, EditorialKicker, EditorialBody, EditorialQuote } from '../common/Typography';
import { HairlineDivider } from '../common/HairlineDivider';
import { BrandLogo } from '../common/BrandLogo';
import { Compass, ShieldCheck, Sparkles, Globe, MapPin, Feather } from 'lucide-react';

export const BrandSummaryView: React.FC = () => {
  return (
    <div className="py-12 space-y-16">
      {/* Brand Hero & Philosophy Opening */}
      <Container width="content">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <EditorialKicker variant="gold">Brand Foundation & Philosophy</EditorialKicker>
          
          <div className="py-2">
            <BrandLogo size="lg" showSubtitle={true} showTempIdentifier={true} />
          </div>

          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#7E776F]">
            Tagline: <span className="text-[#171717] font-medium">{RAVIO_BRAND_DATA.tagline}</span>
          </p>

          <HairlineDivider variant="gold" className="max-w-xs mx-auto" />

          <EditorialQuote attribution="RAVIO Brand Philosophy · Ravio & Co.">
            {RAVIO_BRAND_DATA.establishedPhilosophy}
          </EditorialQuote>
        </div>
      </Container>

      {/* Mission & Brand Pillar Cards */}
      <Container width="flagship">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FFFFFF] p-8 border border-[#171717]/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 flex items-center justify-center border border-[#171717]/10 text-[#171717]">
                <Compass className="w-5 h-5 text-[#B7A17A]" />
              </div>
              <EditorialKicker variant="muted">01 · Mission Statement</EditorialKicker>
              <h3 className="font-editorial text-2xl text-[#171717]">
                Enduring Value & Earned Trust
              </h3>
              <EditorialBody size="base" variant="charcoal">
                {RAVIO_BRAND_DATA.mission}
              </EditorialBody>
            </div>
            <div className="pt-6 mt-6 border-t border-[#171717]/5 text-xs text-[#7E776F]">
              Long-term house trajectory rather than disposable seasonal drops.
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 border border-[#171717]/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 flex items-center justify-center border border-[#171717]/10 text-[#171717]">
                <Feather className="w-5 h-5 text-[#B7A17A]" />
              </div>
              <EditorialKicker variant="muted">02 · Creative Direction</EditorialKicker>
              <h3 className="font-editorial text-2xl text-[#171717]">
                Quiet Elevation & Materiality
              </h3>
              <EditorialBody size="base" variant="charcoal">
                Refinement without pretension. We choose fabrics, weave tensions, and tailoring cuts that honor the human silhouette in quiet confidence.
              </EditorialBody>
            </div>
            <div className="pt-6 mt-6 border-t border-[#171717]/5 text-xs text-[#7E776F]">
              Generous whitespace, refined typography, and large unhurried photography.
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 border border-[#171717]/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 flex items-center justify-center border border-[#171717]/10 text-[#171717]">
                <Globe className="w-5 h-5 text-[#B7A17A]" />
              </div>
              <EditorialKicker variant="muted">03 · Market Trajectory</EditorialKicker>
              <h3 className="font-editorial text-2xl text-[#171717]">
                Bangladesh Flagship & Global Reach
              </h3>
              <EditorialBody size="base" variant="charcoal">
                Initial focus on establishing the premier lifestyle flagship for discerning patrons in Bangladesh, engineered with international luxury standards.
              </EditorialBody>
            </div>
            <div className="pt-6 mt-6 border-t border-[#171717]/5 text-xs text-[#7E776F]">
              Direct BDT currency settlement, Dhaka courier, and international export readiness.
            </div>
          </div>
        </div>
      </Container>

      {/* Visual Reference Houses & Ethical Boundaries */}
      <Container width="content">
        <div className="bg-[#171717] text-[#F4F1EA] p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#F4F1EA]/15 pb-6">
            <div>
              <EditorialKicker variant="gold">Design Philosophy Heritage</EditorialKicker>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F4F1EA] mt-1">
                Visual References & Creative Ethos
              </h2>
            </div>
            <p className="text-xs text-[#F4F1EA]/60 max-w-xs font-sans">
              Inspired by the philosophical rigor of classic European and American heritage houses, developing an authentic original digital flagship for RAVIO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RAVIO_BRAND_DATA.aestheticHeritage.referenceHouses.map((house, idx) => (
              <div key={idx} className="p-5 border border-[#F4F1EA]/10 bg-[#1F1F1F]/60 flex items-start gap-4">
                <span className="font-serif text-2xl text-[#B7A17A] leading-none">
                  0{idx + 1}
                </span>
                <p className="font-sans text-sm text-[#F4F1EA]/90 leading-relaxed">
                  {house}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#F4F1EA]/10">
            <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-[#B7A17A] mb-4">
              Anti-Pattern Guarantees (What RAVIO Deliberately Avoids)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#F4F1EA]/70">
              {RAVIO_BRAND_DATA.aestheticHeritage.antiPatterns.map((anti, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[#B7A17A] mt-0.5">✕</span>
                  <span>{anti}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Brand Narrative Chapters Preview */}
      <Container width="content">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <EditorialKicker variant="gold">Editorial Storytelling Structure</EditorialKicker>
            <h2 className="font-editorial text-3xl text-[#171717]">
              The Three Foundational Chapters
            </h2>
            <p className="text-xs text-[#7E776F] max-w-lg mx-auto">
              How brand storytelling will weave between product discovery on the digital flagship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRAND_CHAPTERS.map((chapter) => (
              <div key={chapter.id} className="p-6 bg-white border border-[#171717]/10 flex flex-col justify-between space-y-6">
                <div>
                  <span className="font-editorial text-3xl text-[#B7A17A] block mb-2">
                    {chapter.index}
                  </span>
                  <h3 className="font-editorial text-xl text-[#171717] mb-1">
                    {chapter.title}
                  </h3>
                  <p className="text-xs font-sans uppercase tracking-[0.15em] text-[#7E776F] mb-4">
                    {chapter.subtitle}
                  </p>
                  <p className="text-xs text-[#171717]/80 leading-relaxed mb-3">
                    {chapter.narrative[0]}
                  </p>
                  <p className="text-xs text-[#7E776F] leading-relaxed">
                    {chapter.narrative[1]}
                  </p>
                </div>

                {chapter.materialFocus && (
                  <div className="pt-4 border-t border-[#171717]/5 text-[10px] font-sans uppercase tracking-wider text-[#B7A17A]">
                    {chapter.materialFocus}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
