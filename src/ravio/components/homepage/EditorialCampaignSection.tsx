import React from 'react';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { getResponsiveImageAttrs } from '../../utils/imageOptimization';
import { ArrowRight } from 'lucide-react';

export interface EditorialCampaignSectionProps {
  onExploreRavio?: () => void;
}

import beyondTheOrdinary from '../../assets/editorial/beyond-the-ordinary.jpg';

const CAMPAIGN_IMG_URL = beyondTheOrdinary;

/**
 * SECTION 06 — EDITORIAL CAMPAIGN
 * Immersive lifestyle campaign composition strengthening brand prestige
 * rather than hard-selling commercial transactions.
 */
export const EditorialCampaignSection: React.FC<EditorialCampaignSectionProps> = ({
  onExploreRavio,
}) => {
  const imgAttrs = getResponsiveImageAttrs(CAMPAIGN_IMG_URL, [640, 1024, 1600, 2400], '100vw');

  return (
    <section id="collections" className="py-20 sm:py-32 bg-[#F4F1EA] overflow-hidden">
      <Container width="flagship" className="space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <EditorialKicker variant="gold">EDITORIAL PERSPECTIVE</EditorialKicker>

          <h2 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal tracking-[-0.015em] uppercase">
            BEYOND THE ORDINARY.
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-relaxed">
            “A perspective shaped by intention.”
          </p>
        </div>

        {/* Large Lifestyle Photographic Composition */}
        <div className="relative w-full aspect-[16/9] min-h-[420px] sm:min-h-[540px] overflow-hidden bg-[#171717] border border-[#171717]/10 flex items-center group">
          <img
            src={imgAttrs.src}
            srcSet={imgAttrs.srcSet}
            sizes={imgAttrs.sizes}
            width={1600}
            height={900}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            alt="RAVIO Editorial Campaign — Architecture, space, and understated garments"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.78] transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/85 via-[#171717]/45 to-transparent pointer-events-none" />

          {/* Content Overlay */}
          <div className="relative z-10 p-6 sm:p-14 max-w-xl space-y-6 text-[#F4F1EA]">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#B7A17A] block">
                Visual Essay · Autumn Light
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] text-white">
                Intention Over Abundance
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#F4F1EA]/85 leading-relaxed font-light">
              We look past the rhythm of disposable fashion cycles. Our focus rests upon archetypes created to age with dignity alongside their owner. Every seam, edge, and collar tension is considered with lasting intent.
            </p>

            <div className="pt-2">
              <button
                onClick={onExploreRavio}
                className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] font-medium py-3.5 px-7 bg-[#F4F1EA] text-[#171717] hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <span>EXPLORE RAVIO</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#171717]" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
