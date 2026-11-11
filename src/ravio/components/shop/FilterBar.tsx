import React, { useState, useRef, useEffect } from 'react';
import { FilterState, SortOption } from './types';
import { CategorySlug } from '../../types/product';
import { ChevronDown, X, SlidersHorizontal, Check } from 'lucide-react';

export interface FilterBarProps {
  filterState: FilterState;
  onFilterChange: (newState: FilterState) => void;
  onClearAll: () => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalProductsCount: number;
  filteredCount: number;
  onOpenMobileFilter: () => void;
  availableCategories?: { slug: CategorySlug; label: string }[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterState,
  onFilterChange,
  onClearAll,
  sortOption,
  onSortChange,
  totalProductsCount,
  filteredCount,
  onOpenMobileFilter,
  availableCategories = [
    { slug: 'polo-shirts', label: 'Polo Shirts' },
    { slug: 'denim', label: 'Selvedge Denim' },
    { slug: 'twill-trousers', label: 'Twill Trousers' },
  ],
}) => {
  const [openDropdown, setOpenDropdown] = useState<'category' | 'size' | 'color' | 'price' | 'sort' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL', '29', '30', '31', '32', '33', '34', '36', '38'];
  const allColors = [
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

  // Toggle helpers
  const toggleCategory = (slug: CategorySlug) => {
    const current = [...filterState.categories];
    const index = current.indexOf(slug);
    if (index > -1) current.splice(index, 1);
    else current.push(slug);
    onFilterChange({ ...filterState, categories: current });
  };

  const toggleSize = (sz: string) => {
    const current = [...filterState.sizes];
    const index = current.indexOf(sz);
    if (index > -1) current.splice(index, 1);
    else current.push(sz);
    onFilterChange({ ...filterState, sizes: current });
  };

  const toggleColor = (clr: string) => {
    const current = [...filterState.colors];
    const index = current.indexOf(clr);
    if (index > -1) current.splice(index, 1);
    else current.push(clr);
    onFilterChange({ ...filterState, colors: current });
  };

  // Active filters count calculation
  const activeFiltersCount =
    filterState.categories.length +
    filterState.sizes.length +
    filterState.colors.length +
    (filterState.priceRange !== 'all' ? 1 : 0) +
    (filterState.inStockOnly ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Top Filter & Sort Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-[#171717]/10 py-3.5 bg-white px-4 sm:px-6">
        {/* Left: Desktop Filter Triggers */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-sans">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
              className={`flex items-center gap-1.5 uppercase tracking-[0.14em] font-medium transition-colors ${
                filterState.categories.length > 0 ? 'text-[#171717] font-semibold' : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              <span>Category {filterState.categories.length > 0 ? `(${filterState.categories.length})` : ''}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'category' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'category' && (
              <div className="absolute top-full left-0 mt-3 w-56 bg-white border border-[#171717]/15 shadow-xl p-3 z-30 space-y-2">
                {availableCategories.map((cat) => {
                  const isChecked = filterState.categories.includes(cat.slug);
                  return (
                    <label
                      key={cat.slug}
                      className="flex items-center gap-2.5 text-xs text-[#171717] cursor-pointer hover:bg-[#FAF8F5] p-1.5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat.slug)}
                        className="rounded-none border-[#171717]/30 text-[#171717] focus:ring-0"
                      />
                      <span>{cat.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Size Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'size' ? null : 'size')}
              className={`flex items-center gap-1.5 uppercase tracking-[0.14em] font-medium transition-colors ${
                filterState.sizes.length > 0 ? 'text-[#171717] font-semibold' : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              <span>Size {filterState.sizes.length > 0 ? `(${filterState.sizes.length})` : ''}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'size' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'size' && (
              <div className="absolute top-full left-0 mt-3 w-64 bg-white border border-[#171717]/15 shadow-xl p-3 z-30 space-y-2">
                <span className="text-[10px] font-mono text-[#77736C] block uppercase tracking-wider">Available Sizes:</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {allSizes.map((sz) => {
                    const isSelected = filterState.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`py-1 text-xs font-mono border transition-all ${
                          isSelected ? 'border-[#171717] bg-[#171717] text-white font-medium' : 'border-[#171717]/15 text-[#171717] hover:border-[#171717]/40'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Color Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'color' ? null : 'color')}
              className={`flex items-center gap-1.5 uppercase tracking-[0.14em] font-medium transition-colors ${
                filterState.colors.length > 0 ? 'text-[#171717] font-semibold' : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              <span>Colour {filterState.colors.length > 0 ? `(${filterState.colors.length})` : ''}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'color' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'color' && (
              <div className="absolute top-full left-0 mt-3 w-60 bg-white border border-[#171717]/15 shadow-xl p-3 z-30 space-y-1.5">
                {allColors.map((clr) => {
                  const isChecked = filterState.colors.includes(clr.name);
                  return (
                    <label
                      key={clr.name}
                      className="flex items-center gap-2.5 text-xs text-[#171717] cursor-pointer hover:bg-[#FAF8F5] p-1.5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleColor(clr.name)}
                        className="rounded-none border-[#171717]/30 text-[#171717] focus:ring-0"
                      />
                      <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: clr.hex }} />
                      <span>{clr.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price Range Dropdown — hidden until prices are announced */}
          <div className="relative hidden">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
              className={`flex items-center gap-1.5 uppercase tracking-[0.14em] font-medium transition-colors ${
                filterState.priceRange !== 'all' ? 'text-[#171717] font-semibold' : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              <span>Price Range</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'price' && (
              <div className="absolute top-full left-0 mt-3 w-52 bg-white border border-[#171717]/15 shadow-xl p-2 z-30 space-y-1">
                {priceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onFilterChange({ ...filterState, priceRange: opt.id as any });
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left p-2 text-xs flex items-center justify-between ${
                      filterState.priceRange === opt.id ? 'bg-[#FAF8F5] text-[#171717] font-medium' : 'text-[#77736C] hover:text-[#171717]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {filterState.priceRange === opt.id && <Check className="w-3.5 h-3.5 text-[#B7A17A]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* In Stock Only Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-[#77736C] hover:text-[#171717]">
            <input
              type="checkbox"
              checked={filterState.inStockOnly}
              onChange={(e) => onFilterChange({ ...filterState, inStockOnly: e.target.checked })}
              className="rounded-none border-[#171717]/30 text-[#171717] focus:ring-0"
            />
            <span className="uppercase tracking-[0.14em] text-[11px]">In Stock Only</span>
          </label>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <button
            onClick={onOpenMobileFilter}
            className="flex items-center gap-2 py-2 px-3 bg-[#FAF8F5] border border-[#171717]/15 text-xs font-sans uppercase tracking-wider text-[#171717]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B7A17A]" />
            <span>Filter Garments</span>
            {activeFiltersCount > 0 && (
              <span className="bg-[#171717] text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <span className="font-mono text-xs text-[#77736C]">
            {filteredCount} Piece{filteredCount !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Right: Dynamic Product Count & Sort Selector */}
        <div className="hidden lg:flex items-center gap-6">
          <span className="font-mono text-xs text-[#77736C]">
            Showing <strong className="text-[#171717]">{filteredCount}</strong> of {totalProductsCount} Piece{totalProductsCount !== 1 ? 's' : ''}
          </span>

          {/* Sort Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
              className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.14em] text-[#171717] font-medium hover:text-[#B7A17A] transition-colors"
            >
              <span className="text-[#77736C]">Sort By:</span>
              <span>{sortOptions.find((s) => s.id === sortOption)?.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'sort' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'sort' && (
              <div className="absolute top-full right-0 mt-3 w-52 bg-white border border-[#171717]/15 shadow-xl p-2 z-30 space-y-1">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onSortChange(opt.id);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left p-2 text-xs flex items-center justify-between ${
                      sortOption === opt.id ? 'bg-[#FAF8F5] text-[#171717] font-medium' : 'text-[#77736C] hover:text-[#171717]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortOption === opt.id && <Check className="w-3.5 h-3.5 text-[#B7A17A]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Indicators Bar (Strictly Zero Pills) */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-xs font-sans px-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736C]">
            Active Filters:
          </span>

          {filterState.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#171717]/15 text-[11px] text-[#171717] hover:border-[#9E3B3B] hover:text-[#9E3B3B] transition-colors"
            >
              <span>{cat.replace('-', ' ')}</span>
              <X className="w-3 h-3" />
            </button>
          ))}

          {filterState.sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => toggleSize(sz)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#171717]/15 text-[11px] text-[#171717] hover:border-[#9E3B3B] hover:text-[#9E3B3B] transition-colors"
            >
              <span>Size: {sz}</span>
              <X className="w-3 h-3" />
            </button>
          ))}

          {filterState.colors.map((clr) => (
            <button
              key={clr}
              onClick={() => toggleColor(clr)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#171717]/15 text-[11px] text-[#171717] hover:border-[#9E3B3B] hover:text-[#9E3B3B] transition-colors"
            >
              <span>Color: {clr}</span>
              <X className="w-3 h-3" />
            </button>
          ))}

          {filterState.priceRange !== 'all' && (
            <button
              onClick={() => onFilterChange({ ...filterState, priceRange: 'all' })}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#171717]/15 text-[11px] text-[#171717] hover:border-[#9E3B3B] hover:text-[#9E3B3B] transition-colors"
            >
              <span>{priceOptions.find((p) => p.id === filterState.priceRange)?.label}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {filterState.inStockOnly && (
            <button
              onClick={() => onFilterChange({ ...filterState, inStockOnly: false })}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#171717]/15 text-[11px] text-[#171717] hover:border-[#9E3B3B] hover:text-[#9E3B3B] transition-colors"
            >
              <span>In Stock Only</span>
              <X className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={onClearAll}
            className="text-[11px] font-mono text-[#77736C] hover:text-[#171717] underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
