import { customerPrice } from '../../utils/customerCopy';
import { customerKickerNeutral as customerProductKicker, customerShortDescription } from '../../utils/customerCopy';
import React from 'react';
import { Product } from '../../types/product';
import { EditorialKicker } from '../common/Typography';
import { Sparkles } from 'lucide-react';

export interface ProductInformationProps {
  product: Product;
  currency?: 'BDT' | 'USD';
  currentSku?: string;
  isAvailable?: boolean;
}

export const ProductInformation: React.FC<ProductInformationProps> = ({
  product,
  currency = 'BDT',
  currentSku,
  isAvailable = true,
}) => {
  const activePrice = customerPrice();

  return (
    <div className="space-y-5">
      {/* Editorial Kicker & Prototype Notice */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#171717]/10 pb-3">
        <EditorialKicker variant="gold" className="text-[10px] tracking-[0.22em]">
          {customerProductKicker(product.editorialKicker)}
        </EditorialKicker>

        <span aria-hidden="true" className="invisible text-[9px] font-mono uppercase tracking-wider text-[#77736C] bg-white px-2 py-0.5 border border-[#171717]/10">
          Archetype Concept
        </span>
      </div>

      {/* Title & Reference */}
      <div className="space-y-1.5">
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal tracking-[-0.015em] leading-tight">
          {product.title}
        </h1>

        <div className="flex items-center gap-3 text-xs font-mono text-[#77736C]">
          {/* Internal SKU retained in props and catalog, not shown to customers. */}
          
          <span>Atelier Edition 01</span>
        </div>
      </div>

      {/* Pricing Zone */}
      <div className="py-3 border-y border-[#171717]/10 flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2.5 tabular-nums">
          <span className="font-sans text-2xl sm:text-3xl font-semibold text-[#171717] tracking-tight whitespace-nowrap">
            {activePrice}
          </span>
        </div>

        {/* Stock / Availability Status (Zero decorative pulsing dots) */}
        <div className="flex items-center gap-1.5 text-xs font-sans">
          <span
            className={`font-medium uppercase tracking-wider text-[11px] ${
              isAvailable ? 'text-[#3D6E50]' : 'text-[#9E3B3B]'
            }`}
          >
            {isAvailable ? 'In Stock · Atelier Stock' : 'Currently Unavailable'}
          </span>
        </div>
      </div>

      {/* Short Description */}
      <p className="font-sans text-sm sm:text-base text-[#171717]/85 font-light leading-relaxed">
        {customerShortDescription()}
      </p>

      {/* Editorial Note Highlight Box (All-around 1px hairline border) */}
      {false && product.editorialNote && (
        <div className="p-4 bg-[#FAF8F5] border border-[#171717]/10 text-xs font-sans text-[#77736C] space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#B7A17A] font-semibold">
            Atelier Note
          </div>
          <p className="italic leading-relaxed font-serif text-[#171717]/90 text-sm">
            “{product.editorialNote}”
          </p>
        </div>
      )}

    </div>
  );
};
