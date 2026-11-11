import React from 'react';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { getResponsiveImageAttrs } from '../../utils/imageOptimization';
import { ArrowRight } from 'lucide-react';

export interface BrandStorySectionProps {
  onOpenStoryModal?: () => void;
}

const STORY_IMG_URL =
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1400&q=85';

/**
 * SECTION 07 — BRAND STORY
 * Balanced two-column editorial layout exploring the founding ethos of Ravio & Co.
 */
export const BrandStorySection: React.FC<BrandStorySectionProps> = ({
  onOpenStoryModal,
}) => {
  const imgAttrs = getResponsiveImageAttrs(
    STORY_IMG_URL,
    [400, 800, 1200, 1400],
    '(max-width: 1024px) 100vw, 50vw'
  );

  return (
    <section id="our-story" className="py-20 sm:py-32 bg-[#FFFFFF] text-[#171717] border-y border-[#171717]/10">
      <Container width="flagship">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait Editorial Photography */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E8E4DC] border border-[#171717]/10 group">
              <img
                src={imgAttrs.src}
                srcSet={imgAttrs.srcSet}
                sizes={imgAttrs.sizes}
                width={960}
                height={1200}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                alt="Portrait in natural morning light — The RAVIO Perspective"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-[#171717]">
                Atelier Archive · Dhaka & Global Sourcing
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & CTA */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <EditorialKicker variant="gold">THE HOUSE OF RAVIO</EditorialKicker>

              <h2 className="font-editorial text-3xl sm:text-5xl font-normal leading-[1.08] tracking-[-0.02em] uppercase text-[#171717]">
                A DIFFERENT PERSPECTIVE.
              </h2>

              <p className="font-editorial italic text-xl sm:text-2xl text-[#171717]/90 leading-relaxed font-normal">
                “RAVIO is built on a belief that everyday things deserve more care, more thought, and higher standards.”
              </p>
            </div>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-[#77736C] leading-relaxed font-light">
              <p>
                In an era dominated by rapid synthetic production and fleeting trends, Ravio & Co. was founded on a simpler, more demanding proposition: to elevate what already exists.
              </p>
              <p>
                From the collar of a morning polo shirt to the selvedge edge rolled over a shoe, garments touch our daily lives in intimate silence. When crafted with intention, they outlive temporary fads and become trusted companions of individual refinement.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <button
                onClick={onOpenStoryModal}
                className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] font-medium py-3.5 px-8 bg-[#171717] text-[#F4F1EA] hover:bg-[#2C2C2C] transition-colors"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B7A17A]" />
              </button>

              <div className="text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736C] block">
                  Parent House
                </span>
                <span className="font-serif text-sm text-[#171717] font-medium">
                  Ravio & Co. · ravioco.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
