import React, { useState } from 'react';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { getResponsiveImageAttrs } from '../../utils/imageOptimization';
import { ArrowRight } from 'lucide-react';
import fabricTexture from '../../assets/editorial/fabric-texture.jpg';

export interface RavioStandardSectionProps {
  onExploreStandard?: () => void;
}

export const RavioStandardSection: React.FC<RavioStandardSectionProps> = ({
  onExploreStandard,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const pillars = [
    {
      id: 'fabric',
      label: '01 · Fabric',
      title: 'Long-Staple Combed Cottons & Ring-Spun Yarns',
      description:
        'Selected for fiber length, tensile strength, and tactile breathability. Our piqués and twills undergo thorough fiber combing to eliminate short, uneven strands, preserving clean luster over years of wear.',
      macroImage: fabricTexture,
      macroAlt: 'Close study of natural woven fabric in soft daylight',
      specNote: 'Weave Density: 200–280 GSM · 100% Combed Natural Fibers',
    },
    {
      id: 'construction',
      label: '02 · Construction',
      title: 'Engineered Collars & Sartorial Waistbands',
      description:
        'A polo collar should never roll or collapse under a tailored sport coat. We engineer our collar stands with internal interlining stays, and line our trouser waistbands with a traditional cotton curtain to preserve clean drape.',
      macroImage:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
      macroAlt: 'Tailoring construction detail of waistband and stitching',
      specNote: 'Internal Interlining Stay · Cotton Herringbone Pocket Bags',
    },
    {
      id: 'finishing',
      label: '03 · Finishing',
      title: 'Chain-Stitched Hems & Clean Flat Seams',
      description:
        'Finished on vintage Union Special chain-stitch machines that produce the characteristic roping effect on raw denim hems. All garment seams are hand-pressed to sit flush against the skin without friction.',
      macroImage:
        'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1200&q=80',
      macroAlt: 'Chain-stitched selvedge denim hem close-up',
      specNote: 'Low-Tension Shuttle Selvedge · Hand-Pressed Flat Fell Seams',
    },
    {
      id: 'craftsmanship',
      label: '04 · Craftsmanship',
      title: 'Natural Horn & Australian Mother-of-Pearl',
      description:
        'We never use synthetic resin or cast plastic buttons. Fasteners are carved from genuine Australian mother-of-pearl and natural horn, individually anchored with cross-stitched tension cords.',
      macroImage:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
      macroAlt: 'Mother-of-pearl buttons cross-stitched on cotton placket',
      specNote: 'Genuine Mother-of-Pearl & Horn · Cross-Stitched Anchors',
    },
    {
      id: 'attention',
      label: '05 · Attention to Detail',
      title: 'Preshrunk Calibration & Proportional Balance',
      description:
        'Each silhouette is tested through multiple thermal wash cycles before production release to calibrate progressive shrinkage and guarantee that sleeve lengths and chest dimensions remain intact.',
      macroImage:
        'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=80',
      macroAlt: 'Garment measurement and hand finishing in atelier',
      specNote: 'Pre-Wash Calibrated · Proportional Modern Sizing',
    },
  ];

  const activePillar = pillars[activeStoryIndex];
  const macroAttrs = getResponsiveImageAttrs(
    activePillar.macroImage,
    [400, 800, 1200],
    '(max-width: 1024px) 100vw, 58vw'
  );

  return (
    <section id="craft" className="py-20 sm:py-32 bg-[#FFFFFF] text-[#171717] border-y border-[#171717]/10">
      <Container width="flagship" className="space-y-12 sm:space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <EditorialKicker variant="gold">THE RAVIO STANDARD</EditorialKicker>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal tracking-[-0.015em] uppercase">
            QUALITY IS IN THE DETAILS.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-relaxed">
            “Every detail deserves consideration.”
          </p>
        </div>

        {/* Pillar Switcher Navigation (Pill-less segmented tabs) */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 border-b border-[#171717]/10 pb-4">
          {pillars.map((pillar, idx) => {
            const isActive = activeStoryIndex === idx;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveStoryIndex(idx)}
                className={`py-2 px-3 sm:px-4 text-xs font-sans tracking-[0.16em] uppercase transition-all duration-200 border-b-2 ${
                  isActive
                    ? 'border-[#171717] text-[#171717] font-semibold bg-[#F4F1EA]'
                    : 'border-transparent text-[#77736C] hover:text-[#171717]'
                }`}
              >
                {pillar.label}
              </button>
            );
          })}
        </div>

        {/* Visual Storytelling Showcase: Split Image & Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Close-Up Macro Photography */}
          <div className="lg:col-span-7 overflow-hidden bg-[#E8E4DC] border border-[#171717]/10 aspect-[4/3] sm:aspect-[16/10] relative group">
            <img
              src={macroAttrs.src}
              srcSet={macroAttrs.srcSet}
              sizes={macroAttrs.sizes}
              width={1200}
              height={750}
              alt={activePillar.macroAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono uppercase bg-white/95 backdrop-blur-xs px-3 py-1.5 border border-[#171717]/10">
              <span className="text-[#171717] font-medium">{activePillar.label}</span>
              <span className="text-[#77736C]">{activePillar.specNote}</span>
            </div>
          </div>

          {/* Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B7A17A]">
                Atelier Focus · {activePillar.label}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#171717] font-normal leading-snug">
                {activePillar.title}
              </h3>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#171717]/85 font-light leading-relaxed">
              {activePillar.description}
            </p>

            <div className="pt-4 border-t border-[#171717]/10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736C] block">
                Honest Provenance:
              </span>
              <p className="text-xs font-sans text-[#77736C] leading-relaxed">
                We present garment specifications as physical realities. No artificial eco-labels or fabricated certifications—only natural fibers, precise tensioning, and enduring stitches.
              </p>
            </div>

            {onExploreStandard && (
              <div className="pt-2">
                <button
                  onClick={onExploreStandard}
                  className="group inline-flex items-center gap-2.5 font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#171717] border-b border-[#171717]/40 pb-1 hover:border-[#171717] transition-colors"
                >
                  <span>EXPLORE THE RAVIO STANDARD</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B7A17A] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

