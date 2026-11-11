import { customerProductKicker, customerPrice } from '../../utils/customerCopy';
import React, { useState, useEffect, useRef } from 'react';
import { SAMPLE_CATALOG } from '../../data/sampleCatalog';
import { Product } from '../../types/product';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  currency: 'BDT' | 'USD';
}

/**
 * SearchModal
 * Refined search interface for the RAVIO digital flagship.
 * Features auto-focus, query clear button, curated empty state, no-results state,
 * and authentic catalog mapping without fabricated products.
 */
export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  currency,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredProducts = trimmed
    ? SAMPLE_CATALOG.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.categorySlug.toLowerCase().includes(trimmed) ||
          p.composition.toLowerCase().includes(trimmed)
      )
    : [];

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/80 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search RAVIO Catalog"
        className="relative w-full max-w-2xl bg-[#F4F1EA] text-[#171717] border border-[#171717]/20 shadow-2xl z-10 overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#171717]/10 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#B7A17A] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search polos, selvedge denim, twill trousers, fabrics..."
            aria-label="Search RAVIO catalog"
            className="w-full bg-transparent text-sm sm:text-base font-sans tracking-wide text-[#171717] placeholder-[#77736C] focus:outline-none"
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-mono text-[#77736C] hover:text-[#171717] p-1 uppercase tracking-wider"
              aria-label="Clear search input"
            >
              Clear
            </button>
          )}

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-xs font-mono text-[#77736C] hover:text-[#171717] transition-colors border-l border-[#171717]/10 pl-2.5 ml-1"
            aria-label="Close search overlay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="px-5 py-3 bg-[#E8E4DC] border-b border-[#171717]/10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#77736C]">
            Explore:
          </span>
          {['Essential Polo', 'Refined Polo', 'Selvedge Denim', 'Twill Trousers', 'Mercerized Cotton'].map(
            (tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="text-[11px] font-sans px-2.5 py-1 bg-white border border-[#171717]/10 text-[#171717] hover:border-[#171717]/40 transition-colors"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Dynamic State Display: Empty State vs Results vs No-Results */}
        <div className="p-4 sm:p-6 max-h-[55vh] overflow-y-auto">
          {/* EMPTY STATE */}
          {!trimmed && (
            <div className="py-10 text-center space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#B7A17A] block">
                RAVIO Catalog Search
              </span>
              <p className="font-editorial text-2xl text-[#171717]">
                Search Considered Essentials
              </p>
              <p className="font-sans text-xs text-[#77736C] max-w-sm mx-auto font-light leading-relaxed">
                Type above to inspect product compositions, weaves, and sizing specifications for Edition 01 garments.
              </p>
            </div>
          )}

          {/* NO-RESULTS STATE */}
          {trimmed && filteredProducts.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <p className="font-editorial text-2xl text-[#171717]">
                No Pieces Matching “{query}”
              </p>
              <p className="font-sans text-xs text-[#77736C] max-w-sm mx-auto font-light leading-relaxed">
                We did not find any pieces matching your inquiry. Try searching for “Polo”, “Denim”, or “Twill”.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 bg-white border border-[#171717]/20 text-xs font-sans uppercase tracking-wider text-[#171717] hover:bg-[#FAF8F5]"
                >
                  Reset Search
                </button>
              </div>
            </div>
          )}

          {/* RESULTS STATE */}
          {trimmed && filteredProducts.length > 0 && (
            <div className="divide-y divide-[#171717]/10 space-y-1">
              <div className="pb-2 text-[10px] font-mono uppercase tracking-wider text-[#77736C]">
                {filteredProducts.length} Piece{filteredProducts.length > 1 ? 's' : ''} Found
              </div>

              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-full text-left py-3.5 flex items-center justify-between gap-4 cursor-pointer group hover:bg-white/50 px-2 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.imageUrls.hero}
                      alt={product.title}
                      width={48}
                      height={64}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-16 object-cover bg-[#E8E4DC] border border-[#171717]/10 flex-shrink-0"
                    />
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#B7A17A] block">
                        {customerProductKicker(product.editorialKicker)}
                      </span>
                      <h4 className="font-editorial text-lg text-[#171717] group-hover:text-[#B7A17A] transition-colors leading-snug">
                        {product.title}
                      </h4>
                      <p className="text-xs font-mono text-[#77736C] tabular-nums">
                        {customerPrice(currency === 'BDT' ? product.price.formattedBDT : product.price.formattedUSD)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-[#77736C] group-hover:text-[#171717] font-mono">
                    <span className="hidden sm:inline mr-1 text-[11px]">Inspect</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#171717]/10 flex items-center justify-between text-[10px] font-mono text-[#77736C]">
          <span>RAVIO CATALOG SEARCH</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Press ESC to close
          </span>
        </div>
      </div>
    </div>
  );
};
