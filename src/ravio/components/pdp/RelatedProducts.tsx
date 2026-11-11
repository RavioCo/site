import React from 'react';
import { SAMPLE_CATALOG } from '../../data/sampleCatalog';
import { Product } from '../../types/product';
import { ProductCard } from '../product/ProductCard';
import { EditorialKicker } from '../common/Typography';

export interface RelatedProductsProps {
  currentProduct: Product;
  currency?: 'BDT' | 'USD';
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
  currency = 'BDT',
  onSelectProduct,
  onQuickView,
}) => {
  // Find related products: same category first, or remaining products
  const related = SAMPLE_CATALOG.filter((p) => p.id !== currentProduct.id).slice(0, 4);

  return (
    <section className="border-t border-[#171717]/10 pt-16 sm:pt-24 space-y-10 sm:space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <EditorialKicker variant="gold" className="text-[10px] tracking-[0.25em]">
          COMPLEMENTARY PIECES
        </EditorialKicker>

        <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal uppercase tracking-tight">
          YOU MAY ALSO EXPLORE
        </h2>

        <p className="font-sans text-xs sm:text-sm text-[#77736C] font-light leading-relaxed">
          Considered garments created with equal intention to silhouette, textile integrity, and enduring value.
        </p>
      </div>

      {/* Grid: 2 columns mobile, 4 columns desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {related.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            currency={currency}
            onSelect={onSelectProduct}
            onQuickView={onQuickView}
            showPlaceholderNotice={true}
          />
        ))}
      </div>
    </section>
  );
};
