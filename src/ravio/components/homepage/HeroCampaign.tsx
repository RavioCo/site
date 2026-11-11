import React from 'react';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { ArrowDown } from 'lucide-react';

export interface HeroCampaignProps {
  onExplore?: () => void;
}

/**
 * SECTION 02 — HERO CAMPAIGN
 * Immersive editorial fashion campaign featuring natural daylight,
 * architectural lines, and quiet luxury presence.
 * Optimized for LCP with WebP srcSet, high fetchPriority, explicit dimensions, and responsive typography.
 */
export const HeroCampaign: React.FC<HeroCampaignProps> = ({ onExplore }) => {
  const scrollToCollection = () => {
    if (onExplore) {
      onExplore();
    } else {
      const element = document.getElementById('shop');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#171717] text-[#F4F1EA]">
      {/* Editorial Campaign Photography Canvas */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fm=webp&fit=crop&w=800&q=85 800w, https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fm=webp&fit=crop&w=1200&q=85 1200w"
            sizes="100vw"
          />
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fm=webp&fit=crop&w=1600&q=85"
            srcSet="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fm=webp&fit=crop&w=1200&q=85 1200w, https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fm=webp&fit=crop&w=1800&q=85 1800w, https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fm=webp&fit=crop&w=2400&q=85 2400w"
            sizes="100vw"
            width={1600}
            height={900}
            referrerPolicy="no-referrer"
            alt="RAVIO Editorial Campaign — Understated luxury clothing and refined architecture"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-[0.75] sm:brightness-[0.78] transition-transform duration-1000 ease-out hover:scale-[1.015]"
          />
        </picture>
        {/* Sophisticated linear gradient scrim ensuring WCAG AA contrast compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/95 via-[#171717]/40 to-[#171717]/30 pointer-events-none" />
      </div>

      {/* Hero Typography & Primary Call to Action */}
      <Container width="content" className="relative z-10 py-16 sm:py-28 text-center flex flex-col items-center">
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-8">
          <EditorialKicker variant="gold" className="text-xs tracking-[0.28em] drop-shadow-xs">
            RAVIO & CO. · CAMPAIGN 01
          </EditorialKicker>

          <h1
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.04] tracking-[-0.025em] text-[#F4F1EA] uppercase"
            style={{ textWrap: 'balance' }}
          >
            ELEVATION REFINED.
          </h1>

          <p className="font-sans text-base sm:text-xl text-[#F4F1EA]/90 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
            “Discover a more considered perspective.”
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToCollection}
              className="min-h-[48px] inline-flex items-center justify-center font-sans font-medium uppercase transition-all duration-300 py-3.5 px-8 text-xs tracking-[0.2em] bg-[#F4F1EA] text-[#171717] hover:bg-white hover:shadow-lg active:bg-[#E8E4DC] border border-[#F4F1EA]"
            >
              EXPLORE COLLECTION
            </button>
          </div>
        </div>
      </Container>

      {/* Subtle Bottom Scroll Anchor */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-xs text-[#F4F1EA]/60 font-sans tracking-[0.2em] uppercase">
        <button
          type="button"
          onClick={scrollToCollection}
          aria-label="Scroll to collection"
          className="min-w-[44px] min-h-[44px] hover:text-white transition-colors p-2 flex flex-col items-center justify-center gap-1 group"
        >
          <span className="text-[9px] font-mono">SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#B7A17A] group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
