import React, { useState } from 'react';
import { ShoppingBag, Check, AlertCircle } from 'lucide-react';

export interface AddToCartButtonProps {
  onAddToCart: () => void;
  /** Retained for API compatibility; direct purchase is disabled pre-launch. */
  onBuyNow?: () => void;
  isAvailable?: boolean;
  disabled?: boolean;
  validationMessage?: string | null;
  className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onAddToCart,
  isAvailable = true,
  disabled = false,
  validationMessage,
  className = '',
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (disabled || !isAvailable) return;
    setIsAdded(true);
    onAddToCart();
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Validation Message Banner */}
      {validationMessage && (
        <div
          role="alert"
          className="flex items-center gap-2 p-2.5 bg-[#F9F2F2] border border-[#9E3B3B]/30 text-[#9E3B3B] text-xs font-sans"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#9E3B3B]" />
          <span>{validationMessage}</span>
        </div>
      )}

      {/* Main Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* ADD TO BAG BUTTON */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={!isAvailable || disabled}
          className={`flex-1 min-h-[48px] py-4 px-6 text-xs font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer whitespace-nowrap ${
            !isAvailable || disabled
              ? 'bg-[#E8E4DC] text-[#77736C] cursor-not-allowed border border-[#171717]/10'
              : isAdded
              ? 'bg-[#3D6E50] text-white border border-[#3D6E50]'
              : 'bg-[#171717] hover:bg-[#333333] text-[#F4F1EA] border border-[#171717] shadow-xs active:scale-[0.99]'
          }`}
          aria-label="Add product to shopping bag"
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-[#B7A17A]" />
              <span>{isAvailable ? 'Add to Bag' : 'Out of Stock'}</span>
            </>
          )}
        </button>

      </div>

    </div>
  );
};
