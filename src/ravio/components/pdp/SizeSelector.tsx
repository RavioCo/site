import React from 'react';
import { Ruler, AlertCircle } from 'lucide-react';

export interface SizeOption {
  size: string;
  isAvailable: boolean;
}

export interface SizeSelectorProps {
  availableSizes: string[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  onOpenSizeGuide: () => void;
  unavailableSizes?: string[];
  showValidationError?: boolean;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  availableSizes,
  selectedSize,
  onSelectSize,
  onOpenSizeGuide,
  unavailableSizes = [],
  showValidationError = false,
}) => {
  return (
    <div className="space-y-2.5">
      {/* Label and Size Guide Link */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
        <div className="flex items-center gap-2">
          <span id="size-selector-label" className="uppercase tracking-[0.16em] text-[#77736C]">
            Size: <strong className="text-[#171717] font-semibold">{selectedSize || 'Select Your Size'}</strong>
          </span>
          {showValidationError && (
            <span
              role="alert"
              className="text-[10px] font-mono text-[#9E3B3B] flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" /> Please select a size
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="min-h-[36px] inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#77736C] hover:text-[#171717] underline transition-colors cursor-pointer"
        >
          <Ruler className="w-3.5 h-3.5 text-[#B7A17A]" />
          <span>Size & Measurement Guide</span>
        </button>
      </div>

      {/* Size Buttons Grid (Minimum 44px height for thumb accessibility) */}
      <div
        role="radiogroup"
        aria-labelledby="size-selector-label"
        className="grid grid-cols-4 sm:grid-cols-5 gap-2"
      >
        {availableSizes.map((size) => {
          const isSelected = selectedSize === size;
          const isUnavailable = unavailableSizes.includes(size);

          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isUnavailable}
              onClick={() => onSelectSize(size)}
              className={`relative min-h-[44px] py-2.5 text-xs font-mono transition-all duration-150 cursor-pointer text-center flex items-center justify-center ${
                isUnavailable
                  ? 'bg-[#E8E4DC]/40 text-[#77736C]/40 border border-[#171717]/10 cursor-not-allowed line-through'
                  : isSelected
                  ? 'bg-[#171717] text-white border border-[#171717] font-semibold shadow-xs'
                  : 'bg-white text-[#171717] border border-[#171717]/20 hover:border-[#171717]'
              }`}
              title={isUnavailable ? `${size} - Currently out of stock` : `Select size ${size}`}
            >
              <span>{size}</span>
              {isUnavailable && <span className="sr-only">Unavailable</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
