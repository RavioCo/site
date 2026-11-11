import React, { useState, useEffect } from 'react';
import { FilterState, SortOption } from './types';
import { CategorySlug } from '../../types/product';
import { PrimaryButton } from '../common/PrimaryButton';
import { SecondaryButton } from '../common/SecondaryButton';
import { HairlineDivider } from '../common/HairlineDivider';
import { X, ChevronDown, Check } from 'lucide-react';

export interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterState: FilterState;
  onApplyFilters: (newState: FilterState) => void;
  onClearAll: () => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  filteredCount: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filterState,
  onApplyFilters,
  onClearAll,
  sortOption,
  onSortChange,
  filteredCount,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filterState);
  const [expandedSection, setExpandedSection] = useState<'category' | 'size' | 'color' | 'price' | 'sort' | null>('category');

  useEffect(() => {
    setLocalFilters(filterState);
  }, [filterState, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { slug: 'polo-shirts' as CategorySlug, label: 'Polo Shirts' },
    { slug: 'denim' as CategorySlug, label: 'Selvedge Denim' },
    { slug: 'twill-trousers' as CategorySlug, label: 'Twill Trousers' },
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '29', '30', '31', '32', '33', '34', '36', '38'];

  const colors = [
    { name: 'Deep Charcoal', hex: '#171717' },
    { name: 'Warm Ivory', hex: '#F4F1EA' },
    { name: 'Deep Indigo', hex: '#1B2430' },
    { name: 'Mineral Navy', hex: '#1E2530' },
    { name: 'Warm Sand', hex: '#D4C7B5' },
    { name: 'Muted Olive', hex: '#4B4E41' },
    { name: 'Raw Indigo', hex: '#111822' },
  ];

  const priceOptions = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-7000', label: 'Under ৳ 7,000' },
    { id: '7000-9000', label: '৳ 7,000 – ৳ 9,000' },
    { id: 'over-9000', label: 'Over ৳ 9,000' },
  ] as const;

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest Arrivals' },
  ] as const;

  const toggleCategory = (slug: CategorySlug) => {
    const list = [...localFilters.categories];
    const idx = list.indexOf(slug);
    if (idx > -1) list.splice(idx, 1);
    else list.push(slug);
    setLocalFilters({ ...localFilters, categories: list });
  };

  const toggleSize = (sz: string) => {
    const list = [...localFilters.sizes];
    const idx = list.indexOf(sz);
    if (idx > -1) list.splice(idx, 1);
    else list.push(sz);
    setLocalFilters({ ...localFilters, sizes: list });
  };

  const toggleColor = (clr: string) => {
    const list = [...localFilters.colors];
    const idx = list.indexOf(clr);
    if (idx > -1) list.splice(idx, 1);
    else list.push(clr);
    setLocalFilters({ ...localFilters, colors: list });
  };

  const toggleSection = (sec: 'category' | 'size' | 'color' | 'price' | 'sort') => {
    setExpandedSection(expandedSection === sec ? null : sec);
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter & Sort Options"
        className="relative w-full max-w-sm bg-[#F4F1EA] text-[#171717] h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#171717]/10 flex items-center justify-between bg-white">
          <div className="space-y-0.5">
            <h3 className="font-editorial text-xl text-[#171717]">Filter & Sort</h3>
            <span className="text-[10px] font-mono uppercase text-[#77736C]">
              {filteredCount} Pieces Matching
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#77736C] hover:text-[#171717] transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Accordion */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {/* 1. Sort Options */}
          <div className="bg-white border border-[#171717]/10 p-3.5 space-y-2">
            <button
              onClick={() => toggleSection('sort')}
              className="w-full flex items-center justify-between text-xs font-sans uppercase tracking-wider font-semibold text-[#171717]"
            >
              <span>Sort Order</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSection === 'sort' ? 'rotate-180' : ''}`} />
            </button>

            {expandedSection === 'sort' && (
              <div className="pt-2 space-y-1.5 border-t border-[#171717]/5 text-xs">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onSortChange(opt.id)}
                    className={`w-full text-left py-2 px-2 flex items-center justify-between ${
                      sortOption === opt.id ? 'bg-[#FAF8F5] text-[#171717] font-medium' : 'text-[#77736C]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortOption === opt.id && <Check className="w-3.5 h-3.5 text-[#B7A17A]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Category Accordion */}
          <div className="bg-white border border-[#171717]/10 p-3.5 space-y-2">
            <button
              onClick={() => toggleSection('category')}
              className="w-full flex items-center justify-between text-xs font-sans uppercase tracking-wider font-semibold text-[#171717]"
            >
              <span>Category ({localFilters.categories.length})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSection === 'category' ? 'rotate-180' : ''}`} />
            </button>

            {expandedSection === 'category' && (
              <div className="pt-2 space-y-2 border-t border-[#171717]/5 text-xs">
                {categories.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={localFilters.categories.includes(cat.slug)}
                      onChange={() => toggleCategory(cat.slug)}
                      className="rounded-none border-[#171717]/30 text-[#171717] focus:ring-0"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 3. Size Accordion */}
          <div className="bg-white border border-[#171717]/10 p-3.5 space-y-2">
            <button
              onClick={() => toggleSection('size')}
              className="w-full flex items-center justify-between text-xs font-sans uppercase tracking-wider font-semibold text-[#171717]"
            >
              <span>Size ({localFilters.sizes.length})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSection === 'size' ? 'rotate-180' : ''}`} />
            </button>

            {expandedSection === 'size' && (
              <div className="pt-2 grid grid-cols-4 gap-2 border-t border-[#171717]/5">
                {sizes.map((sz) => {
                  const isChecked = localFilters.sizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`py-2 text-xs font-mono border transition-all ${
                        isChecked ? 'border-[#171717] bg-[#171717] text-white font-medium' : 'border-[#171717]/20 text-[#171717]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Color Accordion */}
          <div className="bg-white border border-[#171717]/10 p-3.5 space-y-2">
            <button
              onClick={() => toggleSection('color')}
              className="w-full flex items-center justify-between text-xs font-sans uppercase tracking-wider font-semibold text-[#171717]"
            >
              <span>Colour ({localFilters.colors.length})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSection === 'color' ? 'rotate-180' : ''}`} />
            </button>

            {expandedSection === 'color' && (
              <div className="pt-2 space-y-2 border-t border-[#171717]/5 text-xs">
                {colors.map((c) => (
                  <label key={c.name} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={localFilters.colors.includes(c.name)}
                      onChange={() => toggleColor(c.name)}
                      className="rounded-none border-[#171717]/30 text-[#171717] focus:ring-0"
                    />
                    <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 5. Price Range Accordion — hidden until prices are announced */}
          <div className="hidden bg-white border border-[#171717]/10 p-3.5 space-y-2">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between text-xs font-sans uppercase tracking-wider font-semibold text-[#171717]"
            >
              <span>Price Range</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSection === 'price' ? 'rotate-180' : ''}`} />
            </button>

            {expandedSection === 'price' && (
              <div className="pt-2 space-y-1.5 border-t border-[#171717]/5 text-xs">
                {priceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setLocalFilters({ ...localFilters, priceRange: opt.id as any })}
                    className={`w-full text-left py-2 px-2 flex items-center justify-between ${
                      localFilters.priceRange === opt.id ? 'bg-[#FAF8F5] text-[#171717] font-medium' : 'text-[#77736C]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {localFilters.priceRange === opt.id && <Check className="w-3.5 h-3.5 text-[#B7A17A]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 6. In Stock Only */}
          <div className="bg-white border border-[#171717]/10 p-3.5">
            <label className="flex items-center justify-between cursor-pointer text-xs font-sans uppercase tracking-wider font-semibold text-[#171717]">
              <span>In Stock Only</span>
              <input
                type="checkbox"
                checked={localFilters.inStockOnly}
                onChange={(e) => setLocalFilters({ ...localFilters, inStockOnly: e.target.checked })}
                className="rounded-none border-[#171717]/30 text-[#171717] focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-white border-t border-[#171717]/10 space-y-2">
          <PrimaryButton fullWidth onClick={handleApply}>
            Apply Filters ({filteredCount})
          </PrimaryButton>

          <SecondaryButton
            fullWidth
            size="sm"
            onClick={() => {
              onClearAll();
              onClose();
            }}
          >
            Clear All Filters
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};
