import React from 'react';
import {
  EditorialPageTemplate,
  EditorialNavigationCallbacks,
  EditorialHero,
  EditorialLeadStatement,
  EditorialPullQuote,
  EditorialSplitSection,
  EditorialFullWidthVisual,
  EditorialClosingStatement,
} from './EditorialPageTemplate';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { HairlineDivider } from '../common/HairlineDivider';
import {
  EDITORIAL_CAMPAIGN_IMAGES,
  APPROVED_BRAND_COPY,
} from '../../data/editorialContent';

export interface OurStoryViewProps extends EditorialNavigationCallbacks {}

/**
 * OurStoryView — Dedicated Route: `/our-story`
 * Editorial brand story experience presenting:
 * 1. Sophisticated opening visual
 * 2. Strong brand introduction
 * 3. RAVIO's approved philosophy
 * 4. The meaning behind ELEVATION REFINED.
 * 5. The brand's commitment to quality, intention, and enduring value (approved mission)
 * 6. Closing brand statement
 *
 * Strictly contains zero invented founder biographies, company histories, manufacturing claims, or achievements.
 */
export const OurStoryView: React.FC<OurStoryViewProps> = (props) => {
  const heroImage = EDITORIAL_CAMPAIGN_IMAGES.ourStoryHero;
  const perspectiveImage = EDITORIAL_CAMPAIGN_IMAGES.ourStoryPerspective;
  const elevationImage = EDITORIAL_CAMPAIGN_IMAGES.ourStoryElevation;
  const panoramaImage = EDITORIAL_CAMPAIGN_IMAGES.ourStoryPanorama;

  const commitments = [
    {
      number: '01',
      title: 'Quality',
      description:
        'A commitment to substance that holds up to close examination and daily life. Quality is the quiet assurance that what you choose was created with care and respect.',
    },
    {
      number: '02',
      title: 'Intention',
      description:
        'Every element is considered for its purpose. By setting aside distraction and excess, we focus on clarity of form, calm proportion, and thoughtful utility.',
    },
    {
      number: '03',
      title: 'Enduring Value',
      description:
        'Designed to remain relevant across time rather than answer passing trends. True value is measured by the trust an object earns over years of use.',
    },
  ];

  return (
    <EditorialPageTemplate
      {...props}
      activeRoute="our-story"
      breadcrumbLabel="Our Story"
    >
      {/* 1. Sophisticated Opening Visual */}
      <EditorialHero
        kicker="OUR STORY · THE HOUSE OF RAVIO"
        title="A More Considered Perspective."
        lead="RAVIO by Ravio & Co. is built on a clear conviction: that the things we live with every day deserve more care, more thought, and higher standards."
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        placeholderSlotName={heroImage.placeholderSlotName}
      />

      {/* 2. Strong Brand Introduction */}
      <EditorialLeadStatement
        kicker="01 · INTRODUCTION"
        heading="Elevating the Everyday Through Quiet Discipline"
        surface="ivory"
        paragraphs={[
          'In a culture often defined by speed, volume, and momentary novelty, the familiar essentials of daily life are frequently overlooked. They are treated as temporary rather than enduring.',
          'RAVIO exists to offer a steadier point of view. Rather than chasing reinvention for its own sake, we look closely at what already exists—the garments and essentials you reach for each morning—and ask how they can be approached with greater care, clearer thought, and higher standards.',
        ]}
      />

      {/* 3. RAVIO's Approved Philosophy */}
      <EditorialPullQuote
        kicker="02 · OUR PHILOSOPHY"
        quote={APPROVED_BRAND_COPY.philosophy}
        attribution="RAVIO · Ravio & Co."
        subtext="The foundational philosophy guiding every decision of the house."
        variant="dark"
      />

      {/* 4. The Meaning Behind ELEVATION REFINED. */}
      <EditorialSplitSection
        kicker="03 · THE MEANING BEHIND THE ETHOS"
        title="ELEVATION REFINED."
        subtitle="Two words that define our standard of measure."
        imageSrc={elevationImage.src}
        imageAlt={elevationImage.alt}
        imageCaption="Study in proportion and quiet composure."
        imageCredit="Campaign Placeholder · Replaceable Asset"
        placeholderSlotName={elevationImage.placeholderSlotName}
        aspectRatio="3/4"
        imagePosition="left"
        surface="white"
        paragraphs={[
          'Elevation is the refusal to settle for the ordinary as merely routine. It is the decision to raise the standard of what surrounds us every day—to bring greater care, clearer intention, and deeper respect to familiar forms.',
          'Refined is the discipline of restraint. It means removing noise, excess, and ornament until only what is essential, balanced, and purposeful remains. Together, ELEVATION REFINED. expresses a pursuit of progress guided by calm composure.',
        ]}
        calloutTitle="The Standard of Measure"
        calloutBody="To elevate what already exists—not through noise or display, but through thought, proportion, and care."
      />

      {/* 5. Commitment to Quality, Intention, and Enduring Value (Approved Mission) */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#171717]/10">
        <Container width="flagship" className="space-y-16">
          <div className="max-w-3xl space-y-5">
            <EditorialKicker variant="gold">04 · OUR MISSION & COMMITMENT</EditorialKicker>
            <h2
              className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal leading-[1.12] tracking-[-0.015em]"
              style={{ textWrap: 'balance' }}
            >
              “{APPROVED_BRAND_COPY.mission}”
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-[1.7] max-w-2xl">
              Trust is never claimed; it is earned gradually through consistency. Every creation and experience bearing the RAVIO name is guided by three foundational commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitments.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-[#FFFFFF] border border-[#171717]/10 p-8 sm:p-10 flex flex-col justify-between space-y-8"
              >
                <div className="space-y-4">
                  <span className="font-editorial text-3xl text-[#B7A17A] block leading-none">
                    {pillar.number}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal">
                    {pillar.title}
                  </h3>
                  <HairlineDivider variant="subtle" />
                  <p className="font-sans text-sm text-[#171717]/80 font-light leading-[1.7]">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#171717]/5 text-[10px] font-sans uppercase tracking-[0.2em] text-[#77736C]">
                  RAVIO Foundational Commitment
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial Image & Text Combination: Living With Intention */}
      <EditorialSplitSection
        kicker="05 · THE QUIET DECISION"
        title="Progress Over Perfection"
        subtitle="Choosing better as a daily practice."
        imageSrc={perspectiveImage.src}
        imageAlt={perspectiveImage.alt}
        imageCaption="Natural light study."
        imageCredit="Campaign Placeholder · Replaceable Asset"
        placeholderSlotName={perspectiveImage.placeholderSlotName}
        aspectRatio="4/5"
        imagePosition="right"
        surface="white"
        paragraphs={[
          'We view refinement not as a fixed destination, but as a lifelong pursuit. It is found in the willingness to think deeper about what we create, what we choose, and how we live.',
          'When ordinary things are given the care and higher standards they deserve, they cease to be disposable. They become quiet, dependable companions to an intentional life.',
        ]}
      />

      {/* Full-Width Visual Section */}
      <EditorialFullWidthVisual
        kicker="THE HOUSE OF RAVIO"
        title="Created for Permanence and Composure"
        description="Guided by restraint, clarity of form, and a steadfast commitment to earning trust through quality, intention, and enduring value."
        imageSrc={panoramaImage.src}
        imageAlt={panoramaImage.alt}
        placeholderSlotName={panoramaImage.placeholderSlotName}
      />

      {/* 6. Closing Brand Statement */}
      <EditorialClosingStatement
        kicker="06 · CLOSING STATEMENT"
        statement="Refinement is the quiet decision to choose better, to think deeper, and to elevate what already exists."
        substatement="RAVIO by Ravio & Co. — ELEVATION REFINED."
        activeRoute="our-story"
        onNavigateEditorial={props.onNavigateEditorial}
        onNavigateShop={props.onNavigateShop}
      />
    </EditorialPageTemplate>
  );
};
