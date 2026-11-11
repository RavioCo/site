import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 10,
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val < min) onQuantityChange(min);
      else if (val > max) onQuantityChange(max);
      else onQuantityChange(val);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-sans">
        <label htmlFor="pdp-quantity-input" className="uppercase tracking-[0.16em] text-[#77736C]">
          Quantity:
        </label>
        <span className="text-[10px] font-mono text-[#77736C]">Max {max} per client</span>
      </div>

      <div className="inline-flex items-center border border-[#171717]/20 bg-white">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || quantity <= min}
          className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#171717] hover:bg-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <input
          id="pdp-quantity-input"
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={quantity}
          onChange={handleChange}
          disabled={disabled}
          className="w-12 h-11 text-center text-xs font-mono font-semibold text-[#171717] focus:outline-none tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          aria-label="Garment quantity"
        />

        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || quantity >= max}
          className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#171717] hover:bg-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Increase quantity"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
