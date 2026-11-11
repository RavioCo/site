import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { EditorialKicker } from '../common/Typography';

export interface ProductGridProps {
  products: Product[];
  kicker?: string;
  title?: string;
  subtitle?: string;
  currency?: 'BDT' | 'USD';
  columns?: 2 | 3 | 4;
  onProductSelect?: (product: Product) => void;
  onProductQuickView?: (product: Product) => void;
  showPlaceholderNotice?: boolean;
  className?: string;
}

/**
 * ProductGrid
 * Responsive editorial catalog grid with standardized gaps and clean header alignment.
 */
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  kicker,
  title,
  subtitle,
  currency = 'BDT',
  columns = 3,
  onProductSelect,
  onProductQuickView,
  showPlaceholderNotice = false,
  className = '',
}) => {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <section className={`space-y-8 ${className}`}>
      {(title || kicker || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#171717]/10 pb-6">
          <div className="space-y-2 max-w-2xl">
            {kicker && <EditorialKicker variant="gold">{kicker}</EditorialKicker>}
            {title && (
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-sans text-xs sm:text-sm text-[#77736C] font-light leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <div className="text-right flex-shrink-0 text-xs font-mono text-[#77736C]">
            <span>{products.length} Pieces</span>
          </div>
        </div>
      )}

      {/* Grid */}
      {products.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#171717]/10 space-y-2">
          <p className="font-editorial text-xl text-[#171717]">No pieces matching current criteria.</p>
          <p className="text-xs text-[#77736C]">Adjust the collection filters or explore other chapters.</p>
        </div>
      ) : (
        <div className={`grid gap-6 sm:gap-8 ${columnClasses[columns]}`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onSelect={onProductSelect}
              onQuickView={onProductQuickView}
              showPlaceholderNotice={showPlaceholderNotice}
            />
          ))}
        </div>
      )}
    </section>
  );
};
