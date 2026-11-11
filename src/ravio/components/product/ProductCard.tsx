import { customerPrice } from '../../utils/customerCopy';
import { customerShortDescription } from '../../utils/customerCopy';
import React, { useState, memo } from 'react';
import { Product } from '../../types/product';
import { getResponsiveImageAttrs } from '../../utils/imageOptimization';

export interface ProductCardProps {
  product: Product;
  currency?: 'BDT' | 'USD';
  onQuickView?: (product: Product) => void;
  onSelect?: (product: Product) => void;
  showBadge?: boolean;
  showColorSwatches?: boolean;
  showPlaceholderNotice?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * ProductCard Component
 * Image-led, minimal product display card adhering strictly to Zero-Pill and Anti-Slop principles.
 * Optimized for mobile-first 2-column grids, responsive WebP srcSet, zero CLS, and accessible touch targets.
 */
export const ProductCard: React.FC<ProductCardProps> = memo(({
  product,
  currency = 'BDT',
  onQuickView,
  onSelect,
  showBadge = true,
  showColorSwatches = true,
  showPlaceholderNotice = false,
  priority = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const activePrice =
    customerPrice();

  const activeImageUrl = isHovered ? product.imageUrls.editorial : product.imageUrls.hero;
  const imgAttrs = getResponsiveImageAttrs(
    activeImageUrl,
    [400, 600, 900],
    '(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 24vw'
  );

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onSelect) onSelect(product);
    }
  };

  return (
    <article
      className={`group relative flex flex-col bg-white border border-[#171717]/10 transition-all duration-300 hover:border-[#171717]/30 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photography Canvas */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Inspect ${product.title}`}
        onKeyDown={handleCardKeyDown}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#E8E4DC] cursor-pointer"
        onClick={() => onSelect && onSelect(product)}
      >
        {!imgError ? (
          <img
            src={imgAttrs.src}
            srcSet={imgAttrs.srcSet}
            sizes={imgAttrs.sizes}
            alt={product.title}
            width={600}
            height={800}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-4 text-center bg-[#E8E4DC] text-[#171717]">
            <span className="font-editorial text-lg tracking-[0.2em] uppercase">RAVIO</span>
            <span className="font-sans text-[10px] text-[#77736C] mt-1">{product.title}</span>
          </div>
        )}

        {/* Quiet Kicker Top Bar (Strictly Zero Pills) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 text-[10px] text-[#171717] tracking-widest uppercase pointer-events-none">
          {showBadge && !/demonstration/i.test(product.editorialKicker) && (
            <span className="bg-white/95 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] font-sans font-medium text-[#171717] border border-[#171717]/5 truncate">
              {product.editorialKicker.split('·')[0].trim()}
            </span>
          )}
          {showBadge && product.isSignatureClassic && !/demonstration/i.test(product.editorialKicker) && (
            <span className="hidden sm:inline-block text-[9px] font-sans font-medium text-[#B7A17A] bg-white/95 backdrop-blur-xs px-2.5 py-1 border border-[#171717]/5 ml-auto shrink-0">
              Signature Classic
            </span>
          )}
        </div>

        {/* Desktop Quick Inspection Slide-Up Button */}
        {onQuickView && (
          <div className="hidden sm:block absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 pointer-events-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full min-h-[40px] py-2.5 bg-[#171717]/95 hover:bg-[#171717] text-[#F4F1EA] text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-colors"
            >
              Inspect Specification
            </button>
          </div>
        )}
      </div>

      {/* Product Details (Zero pills, clean unboxed typography, mobile-friendly spacing) */}
      <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 space-y-2.5 sm:space-y-3">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-[#77736C] uppercase tracking-[0.14em] sm:tracking-[0.18em] truncate">
            <span className="truncate">{product.categorySlug.replace('-', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{product.availableSizes.length} Sizes</span>
          </div>

          <h3 className="font-editorial text-base sm:text-xl text-[#171717] font-medium leading-snug">
            <button
              type="button"
              onClick={() => onSelect && onSelect(product)}
              className="text-left hover:text-[#B7A17A] transition-colors duration-200 cursor-pointer"
            >
              {product.title}
            </button>
          </h3>

          <p className="font-sans text-[11px] sm:text-xs text-[#77736C] line-clamp-2 leading-relaxed font-light">
            {customerShortDescription()}
          </p>
        </div>

        {/* Price & Optional Color Swatches */}
        <div className="pt-2.5 sm:pt-3 border-t border-[#171717]/10 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs sm:text-sm font-sans font-medium text-[#171717] tracking-wide tabular-nums">
            {activePrice}
          </div>

          {showColorSwatches && product.availableColors && product.availableColors.length > 0 && (
            <div className="flex items-center gap-0.5" role="group" aria-label={`Available colors for ${product.title}`}>
              {product.availableColors.map((color, index) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIndex(index);
                  }}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                  aria-pressed={selectedColorIndex === index}
                  className="w-7 h-7 min-w-[28px] min-h-[28px] inline-flex items-center justify-center cursor-pointer"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                      selectedColorIndex === index
                        ? 'ring-1 ring-[#171717] ring-offset-1 border-black/40 scale-110'
                        : 'border-black/20 hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Quick View Trigger */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="sm:hidden w-full min-h-[38px] py-2 border border-[#171717]/15 bg-[#FAF8F5] text-[#171717] text-[10px] font-sans uppercase tracking-[0.16em] font-medium active:bg-[#171717] active:text-[#F4F1EA] transition-colors"
          >
            Quick View
          </button>
        )}

        {/* Internal component notice intentionally remains source-only. */}
        {false && showPlaceholderNotice && (
          <div className="hidden sm:block text-[9px] font-mono text-[#77736C] text-center pt-1 border-t border-[#171717]/5">
            Component Demonstration Archetype
          </div>
        )}
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
