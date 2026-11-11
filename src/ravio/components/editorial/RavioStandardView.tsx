import React, { useState } from 'react';
import {
  EditorialPageTemplate,
  EditorialNavigationCallbacks,
  EditorialHero,
  EditorialLeadStatement,
  EditorialPullQuote,
  EditorialSplitSection,
  EditorialClosingStatement,
} from './EditorialPageTemplate';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { HairlineDivider } from '../common/HairlineDivider';
import {
  EDITORIAL_CAMPAIGN_IMAGES,
  RAVIO_STANDARD_PRINCIPLES,
  APPROVED_BRAND_COPY,
} from '../../data/editorialContent';

export interface RavioStandardViewProps extends EditorialNavigationCallbacks {}

/**
 * RavioStandardView — Dedicated Route: `/the-ravio-standard`
 * Presents the six guiding principles behind the RAVIO brand in an elegant editorial layout:
 * 1. Quality
 * 2. Intention
 * 3. Thoughtful Design
 * 4. Craftsmanship
 * 5. Enduring Value
 * 6. Continuous Refinement
 *
 * Strictly treated as brand principles rather than unsupported claims about specific products or production processes.
 */
export const RavioStandardView: React.FC<RavioStandardViewProps> = (props) => {
  const [selectedPrincipleId, setSelectedPrincipleId] = useState<string>('all');

  const heroImage = EDITORIAL_CAMPAIGN_IMAGES.standardHero;
  const detailPrimary = EDITORIAL_CAMPAIGN_IMAGES.standardDetailPrimary;
  const detailSecondary = EDITORIAL_CAMPAIGN_IMAGES.standardDetailSecondary;

  const visiblePrinciples =
    selectedPrincipleId === 'all'
      ? RAVIO_STANDARD_PRINCIPLES
      : RAVIO_STANDARD_PRINCIPLES.filter((p) => p.id === selectedPrincipleId);

  return (
    <EditorialPageTemplate
      {...props}
      activeRoute="the-ravio-standard"
      breadcrumbLabel="The RAVIO Standard"
    >
      {/* 1. Opening Editorial Hero */}
      <EditorialHero
        kicker="THE RAVIO STANDARD · SIX GUIDING PRINCIPLES"
        title="The Principles Behind the Name."
        lead="The RAVIO Standard is a framework of six enduring principles that govern how we think, how we design, and how we measure value."
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        placeholderSlotName={heroImage.placeholderSlotName}
      />

      {/* 2. Editorial Lead Introduction */}
      <EditorialLeadStatement
        kicker="FOUNDATIONAL DISCIPLINE"
        heading="Standards Defined by Principle, Not Pretense"
        surface="ivory"
        paragraphs={[
          'A standard is only meaningful when it serves as an internal compass. At RAVIO, our standard is not a collection of superlatives; it is a quiet discipline applied to every decision we make.',
          'Because ordinary things deserve more care, more thought, and higher standards, we hold our work accountable to six interconnected principles: Quality, Intention, Thoughtful Design, Craftsmanship, Enduring Value, and Continuous Refinement.',
        ]}
      />

      {/* 3. The Six Principles Interactive Index & Editorial Ledger */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#171717]/10">
        <Container width="flagship" className="space-y-12 sm:space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#171717]/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <EditorialKicker variant="gold">THE SIX PILLARS</EditorialKicker>
              <h2
                className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal leading-[1.12] tracking-[-0.015em]"
                style={{ textWrap: 'balance' }}
              >
                Six Principles of Elevation Refined
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-relaxed">
                Each principle reinforces the others—forming a cohesive standard dedicated to earning trust over time.
              </p>
            </div>

            {/* Interactive Principle Filter Controls */}
            <div
              role="tablist"
              aria-label="Filter principles"
              className="flex flex-wrap items-center gap-1.5 bg-[#F4F1EA] p-1.5 border border-[#171717]/10"
            >
              <button
                role="tab"
                aria-selected={selectedPrincipleId === 'all'}
                onClick={() => setSelectedPrincipleId('all')}
                className={`px-3 py-1.5 text-[11px] font-sans uppercase tracking-[0.15em] whitespace-nowrap shrink-0 transition-colors ${
                  selectedPrincipleId === 'all'
                    ? 'bg-[#171717] text-[#F4F1EA] font-medium'
                    : 'text-[#77736C] hover:text-[#171717]'
                }`}
              >
                All Six (06)
              </button>
              {RAVIO_STANDARD_PRINCIPLES.map((p) => {
                const isActive = selectedPrincipleId === p.id;
                return (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedPrincipleId(p.id)}
                    className={`px-3 py-1.5 text-[11px] font-sans uppercase tracking-[0.15em] whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#171717] text-[#F4F1EA] font-medium'
                        : 'text-[#77736C] hover:text-[#171717]'
                    }`}
                  >
                    {p.number}. {p.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {visiblePrinciples.map((principle) => (
              <article
                key={principle.id}
                className="bg-[#F4F1EA] border border-[#171717]/10 p-8 sm:p-12 flex flex-col justify-between space-y-8 transition-colors duration-300 hover:border-[#171717]/30"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#171717]/10 pb-4">
                    <span className="font-editorial text-3xl sm:text-4xl text-[#B7A17A] leading-none">
                      {principle.number}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#77736C]">
                      Principle {principle.number} of 06
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
                      {principle.title}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#B7A17A] font-medium">
                      {principle.subtitle}
                    </p>
                  </div>

                  <p className="font-editorial italic text-xl sm:text-2xl text-[#171717]/90 leading-relaxed">
                    “{principle.lead}”
                  </p>

                  <p className="font-sans text-sm sm:text-base text-[#171717]/80 font-light leading-[1.75]">
                    {principle.body}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#171717]/10 space-y-1.5">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#77736C] block">
                    Guiding Reflection
                  </span>
                  <p className="font-sans text-xs text-[#171717] font-normal leading-relaxed">
                    {principle.reflection}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Image and Text Combination — Thoughtful Design & Craftsmanship */}
      <EditorialSplitSection
        kicker="CONSIDERATION IN PRACTICE"
        title="Where Thoughtful Design Meets Craftsmanship"
        subtitle="Clarity of purpose in every line and proportion."
        imageSrc={detailPrimary.src}
        imageAlt={detailPrimary.alt}
        imageCaption="Study of form, texture, and quiet balance."
        imageCredit="Campaign Placeholder · Replaceable Asset"
        placeholderSlotName={detailPrimary.placeholderSlotName}
        aspectRatio="4/5"
        imagePosition="left"
        surface="ivory"
        paragraphs={[
          'Thoughtful design begins with restraint. Rather than adding complexity for visual effect, it seeks harmony between form and daily life—ensuring that every element has a clear reason to exist.',
          'Craftsmanship honors that design through patience and attentiveness. Together, they ensure that what feels composed on the first day continues to hold its dignity over time.',
        ]}
        calloutTitle="Our Mission"
        calloutBody={APPROVED_BRAND_COPY.mission}
      />

      {/* 5. Pull Quote — Continuous Refinement */}
      <EditorialPullQuote
        kicker="CONTINUOUS REFINEMENT"
        quote="We believe refinement is a lifelong pursuit. Not of perfection, but of progress. The quiet decision to choose better."
        attribution="The RAVIO Standard"
        subtext="Every principle returns to a single commitment: to elevate what already exists."
        variant="dark"
      />

      {/* 6. Secondary Editorial Split — Enduring Value */}
      <EditorialSplitSection
        kicker="LONG-TERM PERSPECTIVE"
        title="Enduring Value Over Fleeting Novelty"
        subtitle="Creating to earn trust across time."
        imageSrc={detailSecondary.src}
        imageAlt={detailSecondary.alt}
        imageCaption="Composed structure designed for permanence."
        imageCredit="Campaign Placeholder · Replaceable Asset"
        placeholderSlotName={detailSecondary.placeholderSlotName}
        aspectRatio="1/1"
        imagePosition="right"
        surface="white"
        paragraphs={[
          'When quality, intention, thoughtful design, and craftsmanship align, the result is enduring value. It is an approach that respects the individual who chooses fewer, better things.',
          'Continuous refinement ensures that our standard never grows complacent—always looking closer, thinking deeper, and holding higher standards for the everyday.',
        ]}
      />

      {/* 7. Closing Brand Statement */}
      <EditorialClosingStatement
        kicker="THE STANDARD UPHELD"
        statement="To create products and experiences that earn trust through quality, intention, and enduring value."
        substatement="Explore our Brand Philosophy or view the considered essentials in our Shop."
        activeRoute="the-ravio-standard"
        onNavigateEditorial={props.onNavigateEditorial}
        onNavigateShop={props.onNavigateShop}
      />
    </EditorialPageTemplate>
  );
};
