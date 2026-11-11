import React, { useState, useMemo } from 'react';
import { SAMPLE_CATALOG, RAVIO_COLLECTIONS } from '../../data/sampleCatalog';
import { Product } from '../../types/product';
import { FilterBar } from './FilterBar';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { FilterState, SortOption, INITIAL_FILTER_STATE } from './types';
import { ProductCard } from '../product/ProductCard';
import { SiteHeader } from '../navigation/SiteHeader';
import { SiteFooter } from '../navigation/SiteFooter';
import { SearchModal } from '../modals/SearchModal';
import { BagDrawer } from '../modals/BagDrawer';
import { AccountModal } from '../modals/AccountModal';
import { CustomerCareModal, CustomerCareTopic } from '../modals/CustomerCareModal';
import { ProductQuickViewModal } from '../modals/ProductQuickViewModal';
import { ChevronRight, ArrowLeft, SlidersHorizontal, RefreshCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';

import { BrandEditorialRoute } from '../navigation/MobileNavigation';

export interface ShopViewProps {
  onNavigateHome: () => void;
  onNavigateCollection: (slug: string) => void;
  onSelectProduct?: (handle: string) => void;
  onNavigateCart?: () => void;
  onNavigateCheckout?: () => void;
  onNavigateEditorial?: (route: BrandEditorialRoute) => void;
  initialCollection?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onNavigateHome,
  onNavigateCollection,
  onSelectProduct,
  onNavigateCart,
  onNavigateCheckout,
  onNavigateEditorial,
  initialCollection = 'all',
}) => {
  const {
    totalItemCount,
    activeCurrency,
    setActiveCurrency,
    addToCart,
    openBagDrawer,
    isBagDrawerOpen,
    closeBagDrawer,
  } = useCart();

  // Navigation & Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [customerCareTopic, setCustomerCareTopic] = useState<CustomerCareTopic | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter & Sort State
  const [activeCollectionTab, setActiveCollectionTab] = useState<string>(initialCollection);
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Collection tabs definition
  const collectionTabs = [
    { id: 'all', label: 'All Products', count: SAMPLE_CATALOG.length },
    { id: 'new-arrivals', label: 'New Arrivals', count: SAMPLE_CATALOG.filter((p) => p.isNewArrival).length },
    { id: 'polo', label: 'Polo Collection', count: SAMPLE_CATALOG.filter((p) => p.categorySlug === 'polo-shirts').length },
    { id: 'essentials', label: 'Essential Collection', count: SAMPLE_CATALOG.filter((p) => p.isSignatureClassic).length },
  ];

  // Base catalog filtered by active collection tab
  const collectionBaseProducts = useMemo(() => {
    if (activeCollectionTab === 'new-arrivals') {
      return SAMPLE_CATALOG.filter((p) => p.isNewArrival);
    }
    if (activeCollectionTab === 'polo') {
      return SAMPLE_CATALOG.filter((p) => p.categorySlug === 'polo-shirts');
    }
    if (activeCollectionTab === 'essentials') {
      return SAMPLE_CATALOG.filter((p) => p.isSignatureClassic);
    }
    return SAMPLE_CATALOG;
  }, [activeCollectionTab]);

  // Apply granular filters
  const filteredProducts = useMemo(() => {
    return collectionBaseProducts.filter((product) => {
      // 1. Category Filter
      if (filterState.categories.length > 0) {
        if (!filterState.categories.includes(product.categorySlug)) {
          return false;
        }
      }

      // 2. Size Filter
      if (filterState.sizes.length > 0) {
        const hasMatchingSize = filterState.sizes.some((sz) =>
          product.availableSizes.includes(sz)
        );
        if (!hasMatchingSize) return false;
      }

      // 3. Color Filter
      if (filterState.colors.length > 0) {
        const hasMatchingColor = filterState.colors.some((c) =>
          product.availableColors.some((ac) => ac.name.toLowerCase() === c.toLowerCase())
        );
        if (!hasMatchingColor) return false;
      }

      // 4. Price Range Filter
      if (filterState.priceRange !== 'all') {
        const amount = product.price.amountBDT;
        if (filterState.priceRange === 'under-7000' && amount >= 7000) return false;
        if (filterState.priceRange === '7000-9000' && (amount < 7000 || amount > 9000)) return false;
        if (filterState.priceRange === 'over-9000' && amount <= 9000) return false;
      }

      // 5. In Stock Only
      if (filterState.inStockOnly) {
        const hasStock = product.variants.some((v) => v.inStock);
        if (!hasStock) return false;
      }

      return true;
    });
  }, [collectionBaseProducts, filterState]);

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case 'newest':
        return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      case 'price-low':
        return list.sort((a, b) => a.price.amountBDT - b.price.amountBDT);
      case 'price-high':
        return list.sort((a, b) => b.price.amountBDT - a.price.amountBDT);
      case 'featured':
      default:
        return list.sort((a, b) => (b.isSignatureClassic ? 1 : 0) - (a.isSignatureClassic ? 1 : 0));
    }
  }, [filteredProducts, sortOption]);

  const handleClearAllFilters = () => {
    setFilterState(INITIAL_FILTER_STATE);
  };

  const handleAddToBag = (product: Product, size: string, color: string) => {
    addToCart(product, color, size, 1);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171717] flex flex-col font-sans-clean selection:bg-[#B7A17A]/25">
      {/* Refined Header */}
      <SiteHeader
        activeCurrency={activeCurrency}
        onCurrencyToggle={(c) => setActiveCurrency(c)}
        cartCount={totalItemCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={openBagDrawer}
        onOpenAccount={() => setIsAccountOpen(true)}
        onNavigateHome={onNavigateHome}
        onNavigateShop={() => {
          setActiveCollectionTab('all');
          setFilterState(INITIAL_FILTER_STATE);
        }}
        onNavigateCollection={onNavigateCollection}
        onNavigateEditorial={onNavigateEditorial}
      />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumbs Navigation */}
        <div className="border-b border-[#171717]/10 bg-[#FAF8F5]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between text-xs font-sans text-[#77736C]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <button
                onClick={onNavigateHome}
                className="hover:text-[#171717] transition-colors uppercase tracking-widest text-[10px]"
              >
                Home
              </button>
              <ChevronRight className="w-3 h-3 text-[#77736C]/60" />
              <span className="text-[#171717] uppercase tracking-widest text-[10px] font-medium">
                Shop
              </span>
              {activeCollectionTab !== 'all' && (
                <>
                  <ChevronRight className="w-3 h-3 text-[#77736C]/60" />
                  <span className="text-[#B7A17A] uppercase tracking-widest text-[10px] font-medium">
                    {collectionTabs.find((t) => t.id === activeCollectionTab)?.label}
                  </span>
                </>
              )}
            </nav>

            <span className="font-mono text-[10px] tracking-wider text-[#77736C] hidden sm:inline">
              RAVIO & CO. · PERMANENT CATALOG
            </span>
          </div>
        </div>

        {/* Page Introduction (Strict adherence to Step 05 specifications) */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-8">
          <div className="max-w-3xl space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B7A17A]">
              THE RAVIO ATELIER · EDITION 01
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#171717] font-normal tracking-tight">
              SHOP
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-relaxed max-w-2xl">
              Discover considered essentials, thoughtfully created for everyday living. Woven with double-mercerized Egyptian yarns, shuttle-loom selvedge denim, and dense cotton twill.
            </p>
          </div>

          {/* Collection Navigation Tabs */}
          <div className="mt-8 border-b border-[#171717]/10 flex items-center gap-2 sm:gap-8 overflow-x-auto no-scrollbar">
            {collectionTabs.map((tab) => {
              const isActive = activeCollectionTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCollectionTab(tab.id);
                  }}
                  className={`py-3 text-xs sm:text-sm font-sans uppercase tracking-[0.16em] transition-all relative whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'text-[#171717] font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#171717]'
                      : 'text-[#77736C] hover:text-[#171717]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 ${
                      isActive ? 'bg-[#171717] text-white' : 'bg-[#FAF8F5] text-[#77736C] border border-[#171717]/10'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Filter & Sorting Controls */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <FilterBar
            filterState={filterState}
            onFilterChange={setFilterState}
            onClearAll={handleClearAllFilters}
            sortOption={sortOption}
            onSortChange={setSortOption}
            totalProductsCount={collectionBaseProducts.length}
            filteredCount={sortedProducts.length}
            onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
          />
        </div>

        {/* Product Grid Area */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-8">
          {sortedProducts.length === 0 ? (
            /* Refined Empty State */
            <div className="py-20 px-6 text-center bg-white border border-[#171717]/10 space-y-4 max-w-xl mx-auto my-12">
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-[#FAF8F5] border border-[#171717]/10">
                <SlidersHorizontal className="w-5 h-5 text-[#B7A17A]" />
              </div>
              <h3 className="font-editorial text-2xl text-[#171717]">
                No Pieces Match Your Selection
              </h3>
              <p className="font-sans text-xs text-[#77736C] leading-relaxed">
                We could not locate pieces matching all active filters. Try broadening your criteria or reset filters to view all considered garments.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClearAllFilters}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#171717] hover:bg-[#333333] text-white text-xs font-sans uppercase tracking-[0.16em] transition-colors"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            </div>
          ) : (
            /* Responsive 4-Column Large Desktop / 3-Column Desktop / 2-Column Mobile Grid */
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={activeCurrency}
                  onSelect={(p) => {
                    if (onSelectProduct) onSelectProduct(p.handle);
                    else setSelectedProduct(p);
                  }}
                  onQuickView={(p) => setSelectedProduct(p)}
                  showBadge={true}
                  showColorSwatches={true}
                  showPlaceholderNotice={true}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <SiteFooter
        onOpenCustomerCare={(topic) => setCustomerCareTopic(topic)}
        onNavigateEditorial={onNavigateEditorial}
        onNavigateSection={(hash) => {
          if (hash === '#shop') {
            setActiveCollectionTab('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            onNavigateHome();
          }
        }}
      />

      {/* Mobile Filter & Sort Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filterState={filterState}
        onApplyFilters={setFilterState}
        onClearAll={handleClearAllFilters}
        sortOption={sortOption}
        onSortChange={setSortOption}
        filteredCount={sortedProducts.length}
      />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={activeCurrency}
        onSelectProduct={(p) => {
          setIsSearchOpen(false);
          if (onSelectProduct) onSelectProduct(p.handle);
          else setSelectedProduct(p);
        }}
      />

      <BagDrawer
        isOpen={isBagDrawerOpen}
        onClose={closeBagDrawer}
        currency={activeCurrency}
        onExploreProducts={() => closeBagDrawer()}
        onViewBag={onNavigateCart}
        onProceedCheckout={onNavigateCheckout}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      <CustomerCareModal
        isOpen={customerCareTopic !== null}
        topic={customerCareTopic}
        onClose={() => setCustomerCareTopic(null)}
      />

      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={activeCurrency}
        onAddToBag={handleAddToBag}
      />
    </div>
  );
};
