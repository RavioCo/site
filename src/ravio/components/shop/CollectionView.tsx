import React, { useState, useMemo } from 'react';
import { SAMPLE_CATALOG, RAVIO_COLLECTIONS, CollectionMeta } from '../../data/sampleCatalog';
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
import { ChevronRight, ArrowLeft, SlidersHorizontal, RefreshCcw, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

import { BrandEditorialRoute } from '../navigation/MobileNavigation';

export interface CollectionViewProps {
  collectionKey: 'polo' | 'essentials' | 'new-arrivals';
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateCollection: (slug: string) => void;
  onSelectProduct?: (handle: string) => void;
  onNavigateCart?: () => void;
  onNavigateCheckout?: () => void;
  onNavigateEditorial?: (route: BrandEditorialRoute) => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  collectionKey,
  onNavigateHome,
  onNavigateShop,
  onNavigateCollection,
  onSelectProduct,
  onNavigateCart,
  onNavigateCheckout,
  onNavigateEditorial,
}) => {
  const collection: CollectionMeta =
    RAVIO_COLLECTIONS[collectionKey] || RAVIO_COLLECTIONS['all'];

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
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Get base products belonging to this collection
  const baseCollectionProducts = useMemo(() => {
    return SAMPLE_CATALOG.filter(collection.filterFn);
  }, [collection]);

  // Apply active filters on collection products
  const filteredProducts = useMemo(() => {
    return baseCollectionProducts.filter((product) => {
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
  }, [baseCollectionProducts, filterState]);

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

  const siblingCollections = [
    { key: 'polo', label: 'Polo Collection' },
    { key: 'essentials', label: 'Essential Collection' },
    { key: 'new-arrivals', label: 'New Arrivals' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171717] flex flex-col font-sans-clean selection:bg-[#B7A17A]/25">
      {/* Header */}
      <SiteHeader
        activeCurrency={activeCurrency}
        onCurrencyToggle={(c) => setActiveCurrency(c)}
        cartCount={totalItemCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={openBagDrawer}
        onOpenAccount={() => setIsAccountOpen(true)}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateCollection={onNavigateCollection}
        onNavigateEditorial={onNavigateEditorial}
      />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumb Navigation */}
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
              <button
                onClick={onNavigateShop}
                className="hover:text-[#171717] transition-colors uppercase tracking-widest text-[10px]"
              >
                Collections
              </button>
              <ChevronRight className="w-3 h-3 text-[#77736C]/60" />
              <span className="text-[#171717] uppercase tracking-widest text-[10px] font-medium">
                {collection.title}
              </span>
            </nav>

            <button
              onClick={onNavigateShop}
              className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-wider text-[#77736C] hover:text-[#171717] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to All Products</span>
            </button>
          </div>
        </div>

        {/* Editorial Campaign Banner */}
        <section className="relative bg-[#171717] text-[#F4F1EA] overflow-hidden border-b border-[#171717]">
          {/* Background Photography with atmospheric overlay */}
          <div className="absolute inset-0">
            <img
              src={collection.bannerImage}
              alt={collection.bannerAlt}
              width={1920}
              height={720}
              referrerPolicy="no-referrer"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/95 via-[#171717]/80 to-[#171717]/60" />
          </div>

          <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#B7A17A]">
                <Sparkles className="w-3 h-3" />
                <span>{collection.tagline}</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
                {collection.title}
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#F4F1EA]/80 font-light leading-relaxed">
                {collection.description}
              </p>

              {/* Sibling Collection Quick Switcher */}
              <div className="pt-4 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F4F1EA]/50 mr-2">
                  Explore Chapters:
                </span>
                {siblingCollections.map((sibling) => {
                  const isCurrent = sibling.key === collectionKey;
                  return (
                    <button
                      key={sibling.key}
                      onClick={() => onNavigateCollection(sibling.key)}
                      className={`px-3 py-1 text-xs font-sans uppercase tracking-wider transition-colors border ${
                        isCurrent
                          ? 'border-[#B7A17A] bg-[#B7A17A] text-[#171717] font-semibold'
                          : 'border-white/20 text-white/80 hover:border-white hover:text-white'
                      }`}
                    >
                      {sibling.label}
                    </button>
                  );
                })}
                <button
                  onClick={onNavigateShop}
                  className="px-3 py-1 text-xs font-sans uppercase tracking-wider text-white/70 hover:text-white border border-white/10 hover:border-white/30"
                >
                  View All ({SAMPLE_CATALOG.length})
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Sorting Controls */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-6">
          <FilterBar
            filterState={filterState}
            onFilterChange={setFilterState}
            onClearAll={handleClearAllFilters}
            sortOption={sortOption}
            onSortChange={setSortOption}
            totalProductsCount={baseCollectionProducts.length}
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
                No garments in this collection meet all the current filter criteria. Try resetting your filters to explore the complete chapter.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClearAllFilters}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#171717] hover:bg-[#333333] text-white text-xs font-sans uppercase tracking-[0.16em] transition-colors"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>Reset Chapter Filters</span>
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
            onNavigateShop();
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
        onExploreProducts={onNavigateShop}
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
