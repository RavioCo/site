import { PENDING_CARE_DETAILS, PENDING_PRODUCT_DETAILS, customerShortDescription } from '../../utils/customerCopy';
import React, { useState } from 'react';
import { Product } from '../../types/product';
import { ChevronDown, Sparkles, Scissors, Droplets, Ruler, Truck } from 'lucide-react';

export interface ProductDetailsAccordionProps {
  product: Product;
  onOpenSizeGuide: () => void;
}

type AccordionSectionKey = 'description' | 'details' | 'materials' | 'sizeFit' | 'delivery' | null;

export const ProductDetailsAccordion: React.FC<ProductDetailsAccordionProps> = ({
  product,
  onOpenSizeGuide,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    details: true,
    materials: false,
    sizeFit: false,
    delivery: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="border-t border-[#171717]/15 divide-y divide-[#171717]/10 pt-2">
      {/* 1. PRODUCT DESCRIPTION */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('description')}
          className="w-full flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.18em] font-semibold text-[#171717] hover:text-[#B7A17A] transition-colors cursor-pointer"
          aria-expanded={openSections['description']}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B7A17A]" />
            <span>Product Description</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#77736C] transition-transform duration-200 ${
              openSections['description'] ? 'rotate-180 text-[#171717]' : ''
            }`}
          />
        </button>

        {openSections['description'] && (
          <div className="pt-3.5 text-xs sm:text-sm font-sans text-[#77736C] font-light leading-relaxed space-y-3">
            <p>{customerShortDescription()}</p>
          </div>
        )}
      </div>

      {/* 2. DETAILS & FEATURES */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('details')}
          className="w-full flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.18em] font-semibold text-[#171717] hover:text-[#B7A17A] transition-colors cursor-pointer"
          aria-expanded={openSections['details']}
        >
          <span className="flex items-center gap-2">
            <Scissors className="w-3.5 h-3.5 text-[#B7A17A]" />
            <span>Details & Craftsmanship</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#77736C] transition-transform duration-200 ${
              openSections['details'] ? 'rotate-180 text-[#171717]' : ''
            }`}
          />
        </button>

        {openSections['details'] && (
          <div className="pt-3.5 text-xs font-sans text-[#77736C] space-y-2">
            <p className="leading-relaxed">{PENDING_PRODUCT_DETAILS}</p>
          </div>
        )}
      </div>

      {/* 3. MATERIALS & CARE */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('materials')}
          className="w-full flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.18em] font-semibold text-[#171717] hover:text-[#B7A17A] transition-colors cursor-pointer"
          aria-expanded={openSections['materials']}
        >
          <span className="flex items-center gap-2">
            <Droplets className="w-3.5 h-3.5 text-[#B7A17A]" />
            <span>Materials & Atelier Care</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#77736C] transition-transform duration-200 ${
              openSections['materials'] ? 'rotate-180 text-[#171717]' : ''
            }`}
          />
        </button>

        {openSections['materials'] && (
          <div className="pt-3.5 text-xs font-sans text-[#77736C] space-y-3">
            <div className="p-3 bg-white border border-[#171717]/10 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B7A17A] block font-semibold">
                Fabric Composition
              </span>
              <p className="text-[#171717] font-medium">To be confirmed</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736C] block font-semibold">
                Care Instructions:
              </span>
              <p className="text-xs">{PENDING_CARE_DETAILS}</p>
            </div>
          </div>
        )}
      </div>

      {/* 4. SIZE & FIT */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('sizeFit')}
          className="w-full flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.18em] font-semibold text-[#171717] hover:text-[#B7A17A] transition-colors cursor-pointer"
          aria-expanded={openSections['sizeFit']}
        >
          <span className="flex items-center gap-2">
            <Ruler className="w-3.5 h-3.5 text-[#B7A17A]" />
            <span>Size & Fit Guidance</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#77736C] transition-transform duration-200 ${
              openSections['sizeFit'] ? 'rotate-180 text-[#171717]' : ''
            }`}
          />
        </button>

        {openSections['sizeFit'] && (
          <div className="pt-3.5 text-xs font-sans text-[#77736C] space-y-3">
            <p className="leading-relaxed">
              Designed with a contemporary relaxed-tailored silhouette. Cuts clean along the shoulders with comfortable drape through the torso.
            </p>
            <p className="leading-relaxed">
              Model wears size <strong>M</strong> (Height 186cm / 6'1", Chest 98cm / 38.5"). Fits true to size. For an oversized sartorial drape, we suggest selecting one size above your usual standard.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenSizeGuide}
                className="text-xs font-mono uppercase tracking-wider text-[#171717] hover:text-[#B7A17A] underline transition-colors cursor-pointer"
              >
                Inspect Complete Measurement Table →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. DELIVERY & RETURNS */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('delivery')}
          className="w-full flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.18em] font-semibold text-[#171717] hover:text-[#B7A17A] transition-colors cursor-pointer"
          aria-expanded={openSections['delivery']}
        >
          <span className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#B7A17A]" />
            <span>Delivery & Returns</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#77736C] transition-transform duration-200 ${
              openSections['delivery'] ? 'rotate-180 text-[#171717]' : ''
            }`}
          />
        </button>

        {openSections['delivery'] && (
          <div className="pt-3.5 text-xs font-sans text-[#77736C] space-y-2.5">
            <p>Ordering is not yet open. Delivery, exchange and return terms will be confirmed before release.</p>
          </div>
        )}
      </div>
    </div>
  );
};
