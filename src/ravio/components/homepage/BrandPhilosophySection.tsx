import React from 'react';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { getResponsiveImageAttrs } from '../../utils/imageOptimization';
import { ArrowRight } from 'lucide-react';

export interface BrandPhilosophySectionProps {
  onOpenPhilosophyModal?: () => void;
}

const PHILOSOPHY_BG_URL =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85';

/**
 * SECTION 04 — BRAND PHILOSOPHY
 * Full-width atmospheric editorial section with high-contrast typography
 * and the foundational brand manifesto.
 */
export const BrandPhilosophySection: React.FC<BrandPhilosophySectionProps> = ({
  onOpenPhilosophyModal,
}) => {
  const imgAttrs = getResponsiveImageAttrs(PHILOSOPHY_BG_URL, [640, 1024, 1600, 2400], '100vw');

  return (
    <section id="philosophy" className="relative w-full py-24 sm:py-36 bg-[#171717] text-[#F4F1EA] overflow-hidden">
      {/* Background Atmospheric Editorial Imagery with Warm Light */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgAttrs.src}
          srcSet={imgAttrs.srcSet}
          sizes={imgAttrs.sizes}
          width={1920}
          height={1080}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          alt="RAVIO Architectural Sanctuary — Atmosphere of Quiet Refinement"
          className="w-full h-full object-cover object-center filter brightness-[0.40] transition-transform duration-1000 ease-out hover:scale-[1.01]"
        />
        <div className="absolute inset-0 bg-[#171717]/65 pointer-events-none" />
      </div>

      <Container width="content" className="relative z-10 text-center space-y-8 sm:space-y-10">
        <EditorialKicker variant="gold" className="text-xs tracking-[0.25em]">
          FOUNDATIONAL MANIFESTO
        </EditorialKicker>

        <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#F4F1EA] uppercase max-w-3xl mx-auto">
          THE PURSUIT OF BETTER.
        </h2>

        <blockquote className="max-w-2xl mx-auto">
          <p className="font-editorial italic text-xl sm:text-3xl text-[#F4F1EA]/90 leading-[1.38] font-normal tracking-[-0.01em]">
            “We believe refinement is a lifelong pursuit. Not of perfection, but of progress. The quiet decision to choose better. To think deeper. To live with intention.”
          </p>
          <footer className="mt-4 text-xs font-sans uppercase tracking-[0.22em] text-[#B7A17A]">
            — Ravio & Co.
          </footer>
        </blockquote>

        <div className="pt-4 flex justify-center">
          <button
            onClick={onOpenPhilosophyModal}
            className="group inline-flex items-center gap-2.5 font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#F4F1EA] border-b border-[#F4F1EA]/40 pb-1 hover:border-white hover:text-white transition-colors"
          >
            <span>DISCOVER OUR PHILOSOPHY</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B7A17A] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </Container>
    </section>
  );
};
