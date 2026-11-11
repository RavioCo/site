import React, { useState } from 'react';
import { INITIAL_CATEGORIES } from '../../data/initialCategories';
import { SAMPLE_CATALOG } from '../../data/sampleCatalog';
import { ProductCategory } from '../../types/product';
import { Container } from '../common/Container';
import { EditorialKicker, EditorialHeading, EditorialBody } from '../common/Typography';
import { ProductCard } from '../product/ProductCard';
import { Sparkles, Compass, CheckCircle } from 'lucide-react';

export const CategoryRoadmap: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<'all' | 'launch' | 'expansion-phase-1' | 'expansion-phase-2'>('all');

  const filteredCategories =
    selectedPhase === 'all'
      ? INITIAL_CATEGORIES
      : INITIAL_CATEGORIES.filter((c) => c.phase === selectedPhase);

  const launchCategories = INITIAL_CATEGORIES.filter((c) => c.phase === 'launch');

  return (
    <div className="py-12 space-y-16">
      {/* Title & Introduction */}
      <Container width="content">
        <div className="space-y-4">
          <EditorialKicker variant="gold">Category Architecture</EditorialKicker>
          <EditorialHeading size="title" variant="charcoal">
            The Lifestyle House Scalability Matrix
          </EditorialHeading>
          <EditorialBody size="base" variant="muted">
            RAVIO launches with three core sartorial pillars: Polo Shirts, Denim, and Twill Trousers. The underlying data taxonomy, navigational tree, and product schema are architected to support subsequent phases without restructuring the codebase.
          </EditorialBody>
        </div>
      </Container>

      {/* Launch Archetype Showcase */}
      <Container width="flagship">
        <div className="bg-white border border-[#171717]/10 p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#171717]/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B7A17A]">
                Launch Phase · Edition 01
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] mt-1">
                The Three Launch Archetypes
              </h3>
            </div>
            <span className="text-xs font-sans text-[#7E776F]">
              Polo Shirts · Selvedge Denim · Tailored Twill
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SAMPLE_CATALOG.map((product) => (
              <ProductCard key={product.id} product={product} currency="BDT" />
            ))}
          </div>
        </div>
      </Container>

      {/* Complete Category Expansion Matrix */}
      <Container width="flagship">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#171717]/10 pb-4">
            <div>
              <h3 className="font-editorial text-2xl text-[#171717]">
                Multi-Phase Category Taxonomy
              </h3>
              <p className="text-xs text-[#7E776F] font-sans">
                Unified data models scaling from day-one garments to future home and lifestyle additions.
              </p>
            </div>

            {/* Phase Selector Tabs */}
            <div className="flex flex-wrap gap-1 bg-[#EBE7DF] p-1 rounded-xs">
              <button
                onClick={() => setSelectedPhase('all')}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
                  selectedPhase === 'all'
                    ? 'bg-[#171717] text-[#F4F1EA] font-medium'
                    : 'text-[#7E776F] hover:text-[#171717]'
                }`}
              >
                All (7)
              </button>
              <button
                onClick={() => setSelectedPhase('launch')}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
                  selectedPhase === 'launch'
                    ? 'bg-[#171717] text-[#F4F1EA] font-medium'
                    : 'text-[#7E776F] hover:text-[#171717]'
                }`}
              >
                Launch (3)
              </button>
              <button
                onClick={() => setSelectedPhase('expansion-phase-1')}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
                  selectedPhase === 'expansion-phase-1'
                    ? 'bg-[#171717] text-[#F4F1EA] font-medium'
                    : 'text-[#7E776F] hover:text-[#171717]'
                }`}
              >
                Phase 1 Expansion
              </button>
              <button
                onClick={() => setSelectedPhase('expansion-phase-2')}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
                  selectedPhase === 'expansion-phase-2'
                    ? 'bg-[#171717] text-[#F4F1EA] font-medium'
                    : 'text-[#7E776F] hover:text-[#171717]'
                }`}
              >
                Phase 2 Lifestyle
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-[#171717]/10 p-6 flex flex-col justify-between space-y-4 hover:border-[#171717]/30 transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 ${
                        category.phase === 'launch'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : category.phase === 'expansion-phase-1'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {category.phase === 'launch'
                        ? 'Immediate Launch'
                        : category.phase === 'expansion-phase-1'
                        ? 'Expansion Phase 1'
                        : 'Expansion Phase 2'}
                    </span>
                    <span className="text-xs font-mono text-[#7E776F]">
                      Est. {category.itemCountEstimate} Styles
                    </span>
                  </div>

                  <div>
                    <h4 className="font-editorial text-2xl text-[#171717]">
                      {category.name}
                    </h4>
                    <p className="text-xs font-sans uppercase tracking-[0.15em] text-[#B7A17A] mt-0.5">
                      {category.editorialSubtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#171717]/80 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#171717]/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7E776F] block">
                    Material Specification:
                  </span>
                  <p className="text-xs font-sans text-[#171717] font-medium leading-relaxed">
                    {category.materialFocus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
