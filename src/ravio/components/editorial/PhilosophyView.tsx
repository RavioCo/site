import React from 'react';
import {
  EditorialPageTemplate,
  EditorialNavigationCallbacks,
  EditorialHero,
  EditorialSplitSection,
  EditorialPullQuote,
  EditorialClosingStatement,
} from './EditorialPageTemplate';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { HairlineDivider } from '../common/HairlineDivider';
import {
  EDITORIAL_CAMPAIGN_IMAGES,
  APPROVED_BRAND_COPY,
  PHILOSOPHY_MOVEMENTS,
} from '../../data/editorialContent';

export interface PhilosophyViewProps extends EditorialNavigationCallbacks {}

/**
 * PhilosophyView — Dedicated Route: `/philosophy`
 * Presents the brand's philosophy through thoughtful typography, restrained layouts, and editorial imagery.
 * Avoids generic luxury language, excessive adjectives, and repetitive marketing copy.
 */
export const PhilosophyView: React.FC<PhilosophyViewProps> = (props) => {
  const heroImage = EDITORIAL_CAMPAIGN_IMAGES.philosophyHero;
  const studyOne = EDITORIAL_CAMPAIGN_IMAGES.philosophyStudyOne;
  const studyTwo = EDITORIAL_CAMPAIGN_IMAGES.philosophyStudyTwo;

  return (
    <EditorialPageTemplate
      {...props}
      activeRoute="philosophy"
      breadcrumbLabel="Brand Philosophy"
    >
      {/* 1. Opening Visual */}
      <EditorialHero
        kicker="BRAND PHILOSOPHY · RAVIO & CO."
        title="The Pursuit of Progress."
        lead="A reflection on intention, care, and the quiet decision to choose better in everyday life."
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        placeholderSlotName={heroImage.placeholderSlotName}
      />

      {/* 2. The Complete Approved Brand Philosophy — Typographic Centerpiece */}
      <section className="py-24 sm:py-36 bg-[#F4F1EA] border-b border-[#171717]/10">
        <Container width="editorial" className="space-y-10 text-center">
          <EditorialKicker variant="gold">THE RAVIO MANIFESTO</EditorialKicker>

          <blockquote className="space-y-8">
            <p
              className="font-editorial text-2xl sm:text-4xl lg:text-[44px] text-[#171717] font-normal leading-[1.35] tracking-[-0.015em]"
              style={{ textWrap: 'balance' }}
            >
              “{APPROVED_BRAND_COPY.philosophy}”
            </p>
            <footer className="font-sans text-xs uppercase tracking-[0.24em] text-[#77736C]">
              — RAVIO · {APPROVED_BRAND_COPY.tagline}
            </footer>
          </blockquote>

          <HairlineDivider variant="gold" className="max-w-[120px] mx-auto" />

          <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-[1.75] max-w-xl mx-auto">
            Our philosophy is written plainly because it is meant to be practiced plainly—in how we think, what we create, and the standard we uphold.
          </p>
        </Container>
      </section>

      {/* 3. Four Philosophical Movements — Restrained Typographic Essays */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#171717]/10">
        <Container width="flagship" className="space-y-16">
          <div className="max-w-2xl space-y-3">
            <EditorialKicker variant="gold">FOUR MOVEMENTS OF THOUGHT</EditorialKicker>
            <h2
              className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal leading-[1.12] tracking-[-0.015em]"
              style={{ textWrap: 'balance' }}
            >
              A Closer Reading of Our Ethos
            </h2>
          </div>

          <div className="divide-y divide-[#171717]/10 border-t border-[#171717]/10">
            {PHILOSOPHY_MOVEMENTS.map((movement) => (
              <div
                key={movement.id}
                className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* Left Index & Title */}
                <div className="lg:col-span-5 space-y-3">
                  <span className="font-editorial text-2xl text-[#B7A17A] block">
                    Movement {movement.index}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal">
                    {movement.title}
                  </h3>
                  <p className="font-editorial italic text-lg sm:text-xl text-[#77736C] leading-snug pt-1">
                    {movement.phrase}
                  </p>
                </div>

                {/* Right Prose */}
                <div className="lg:col-span-7 space-y-4 font-sans text-sm sm:text-base text-[#171717]/85 font-light leading-[1.75]">
                  {movement.essay.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Editorial Imagery & Text — Thinking Deeper */}
      <EditorialSplitSection
        kicker="INTENTIONAL LIVING"
        title="To Think Deeper. To Live With Intention."
        subtitle="Clarity begins when distraction is set aside."
        imageSrc={studyOne.src}
        imageAlt={studyOne.alt}
        imageCaption="Restrained study in light and natural proportion."
        imageCredit="Campaign Placeholder · Replaceable Asset"
        placeholderSlotName={studyOne.placeholderSlotName}
        aspectRatio="3/4"
        imagePosition="left"
        surface="ivory"
        paragraphs={[
          'Living with intention is not about complexity; it is about discernment. It asks us to pause and consider why we choose what we choose, and whether the things around us reflect care and purpose.',
          'When we choose with intention, fewer things are needed, and each one carries greater meaning.',
        ]}
      />

      {/* 5. Editorial Imagery & Text — Care for the Everyday */}
      <EditorialSplitSection
        kicker="HIGHER STANDARDS"
        title="Care for What Already Exists"
        subtitle="Respecting the familiar essentials of daily life."
        imageSrc={studyTwo.src}
        imageAlt={studyTwo.alt}
        imageCaption="Stillness and composure in everyday form."
        imageCredit="Campaign Placeholder · Replaceable Asset"
        placeholderSlotName={studyTwo.placeholderSlotName}
        aspectRatio="4/5"
        imagePosition="right"
        surface="white"
        paragraphs={[
          'Ordinary things accompany us through the quietest and most important hours of our days. Treating them with care is a form of self-respect and respect for the craft of making.',
          'By holding everyday essentials to higher standards, we elevate daily experience without noise or display.',
        ]}
      />

      {/* 6. Mission Pull Quote */}
      <EditorialPullQuote
        kicker="THE MISSION"
        quote={APPROVED_BRAND_COPY.mission}
        attribution="RAVIO · Ravio & Co."
        variant="dark"
      />

      {/* 7. Closing Brand Statement */}
      <EditorialClosingStatement
        kicker="ELEVATION REFINED."
        statement="Not of perfection, but of progress. The quiet decision to choose better."
        substatement="Continue exploring Our Story, The RAVIO Standard, or our considered collection."
        activeRoute="philosophy"
        onNavigateEditorial={props.onNavigateEditorial}
        onNavigateShop={props.onNavigateShop}
      />
    </EditorialPageTemplate>
  );
};
