import { customerPrice } from '../../utils/customerCopy';
import React from 'react';
import { Product } from '../../types/product';
import { ShoppingBag } from 'lucide-react';

export interface StickyMobileAddToCartBarProps {
  product: Product;
  currency?: 'BDT' | 'USD';
  selectedSize: string | null;
  selectedColor: string;
  onAddToCart: () => void;
  isAvailable?: boolean;
  isVisible: boolean;
}

export const StickyMobileAddToCartBar: React.FC<StickyMobileAddToCartBarProps> = ({
  product,
  currency = 'BDT',
  selectedSize,
  selectedColor,
  onAddToCart,
  isAvailable = true,
  isVisible,
}) => {
  if (!isVisible) return null;

  const activePrice =
    customerPrice();

  return (
    <div
      role="region"
      aria-label="Quick purchase bar"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#171717]/15 px-3 py-2.5 shadow-2xl animate-in slide-in-from-bottom duration-200"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.imageUrls.hero}
            alt={product.title}
            width={40}
            height={52}
            referrerPolicy="no-referrer"
            className="w-10 h-13 object-cover border border-[#171717]/10 flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-editorial text-sm text-[#171717] truncate leading-tight">
              {product.title}
            </h4>
            <div className="text-[10px] font-mono text-[#77736C] truncate">
              {selectedColor} · {selectedSize ? `Size ${selectedSize}` : 'Select Size'}
            </div>
            <div className="text-xs font-semibold text-[#171717] tabular-nums">
              {activePrice}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          disabled={!isAvailable}
          className="flex-shrink-0 min-h-[44px] px-5 bg-[#171717] hover:bg-[#333333] text-white text-[11px] font-sans uppercase tracking-[0.16em] font-medium flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-40"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#B7A17A]" />
          <span>{selectedSize ? 'Add to Bag' : 'Choose Size'}</span>
        </button>
      </div>
    </div>
  );
};
