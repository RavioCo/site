import React from 'react';
import { SAMPLE_CATALOG } from '../../data/sampleCatalog';
import { Product } from '../../types/product';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ProductCard } from '../product/ProductCard';
import { EditorialKicker } from '../common/Typography';

export interface FeaturedCollectionProps {
  currency: 'BDT' | 'USD';
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onExploreAll?: () => void;
}

/**
 * SECTION 03 — FEATURED COLLECTION
 * Curated product grid showcasing "Essential Polo" and "Refined Polo" as clearly labelled demonstration concepts.
 * Features a responsive 2-column mobile layout and elegant 4-column desktop display.
 */
export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  currency,
  onSelectProduct,
  onQuickView,
  onExploreAll,
}) => {
  return (
    <section id="shop" className="py-20 sm:py-28 bg-[#F4F1EA]">
      <Container width="flagship" className="space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <EditorialKicker variant="gold">CURATED CAPSULE</EditorialKicker>

          <h2 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal tracking-[-0.015em] uppercase">
            CONSIDERED ESSENTIALS.
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-relaxed">
            “Thoughtfully created for everyday living.”
          </p>
        </div>

        {/* Responsive Grid: 2-column mobile, balanced 3-column desktop (2 rows of 3) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {SAMPLE_CATALOG.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              showBadge={false}
              showPlaceholderNotice={false}
              onSelect={onSelectProduct}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Section Bottom Note & Shop Navigation Action */}
        <div className="pt-6 border-t border-[#171717]/10 flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-xs text-[#77736C] font-sans max-w-lg mx-auto">
            Each garment is developed with long-staple combed cottons, vintage shuttle-loom selvedge, and natural button fasteners cut from mother-of-pearl and horn.
          </p>

          {onExploreAll && (
            <button
              onClick={onExploreAll}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#171717] hover:bg-[#333333] text-[#F4F1EA] text-xs font-sans uppercase tracking-[0.2em] font-medium transition-colors"
            >
              <span>Explore All Considered Pieces in Shop</span>
              <span>→</span>
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};
