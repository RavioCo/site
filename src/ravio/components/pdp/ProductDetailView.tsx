import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types/product';
import { SAMPLE_CATALOG } from '../../data/sampleCatalog';
import { ProductGallery } from './ProductGallery';
import { ProductInformation } from './ProductInformation';
import { ColorSelector } from './ColorSelector';
import { SizeSelector } from './SizeSelector';
import { SizeGuideModal } from './SizeGuideModal';
import { QuantitySelector } from './QuantitySelector';
import { AddToCartButton } from './AddToCartButton';
import { ProductDetailsAccordion } from './ProductDetailsAccordion';
import { RelatedProducts } from './RelatedProducts';
import { StickyMobileAddToCartBar } from './StickyMobileAddToCartBar';

import { SiteHeader } from '../navigation/SiteHeader';
import { SiteFooter } from '../navigation/SiteFooter';
import { SearchModal } from '../modals/SearchModal';
import { BagDrawer } from '../modals/BagDrawer';
import { AccountModal } from '../modals/AccountModal';
import { CustomerCareModal, CustomerCareTopic } from '../modals/CustomerCareModal';
import { ProductQuickViewModal } from '../modals/ProductQuickViewModal';

import { ChevronRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

import { BrandEditorialRoute } from '../navigation/MobileNavigation';

export interface ProductDetailViewProps {
  productHandle?: string;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateCollection: (slug: string) => void;
  onSelectProduct: (handle: string) => void;
  onNavigateCart?: () => void;
  onNavigateCheckout?: () => void;
  onNavigateEditorial?: (route: BrandEditorialRoute) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productHandle = 'essential-polo',
  onNavigateHome,
  onNavigateShop,
  onNavigateCollection,
  onSelectProduct,
  onNavigateCart,
  onNavigateCheckout,
  onNavigateEditorial,
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

  // Find product by handle or fallback to first product
  const product: Product =
    SAMPLE_CATALOG.find((p) => p.handle === productHandle) || SAMPLE_CATALOG[0];

  // Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [customerCareTopic, setCustomerCareTopic] = useState<CustomerCareTopic | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isDirectCheckoutOpen, setIsDirectCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Variant Selection State
  const [selectedColor, setSelectedColor] = useState<string>(
    product.availableColors[0]?.name || 'Deep Charcoal'
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeValidationError, setSizeValidationError] = useState(false);

  // Mobile Sticky Bar Observer State
  const [showStickyBar, setShowStickyBar] = useState(false);
  const purchaseControlsRef = useRef<HTMLDivElement>(null);

  // Sync state when product changes
  useEffect(() => {
    setSelectedColor(product.availableColors[0]?.name || 'Deep Charcoal');
    setSelectedSize(null);
    setQuantity(1);
    setSizeValidationError(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product.handle]);

  // Observer to trigger sticky mobile Add to Bag bar when scrolling past main controls
  useEffect(() => {
    const handleScroll = () => {
      if (!purchaseControlsRef.current) return;
      const rect = purchaseControlsRef.current.getBoundingClientRect();
      // Show sticky bar when the main button scrolled above viewport
      setShowStickyBar(rect.bottom < 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine current variant & stock status
  const currentVariant = product.variants.find(
    (v) =>
      v.colorName.toLowerCase() === selectedColor.toLowerCase() &&
      (selectedSize ? v.size === selectedSize : true)
  );

  // Mark XXL or last size as demo unavailable for interactive testing
  const unavailableSizes =
    product.categorySlug === 'polo-shirts' && selectedColor === 'Muted Olive'
      ? ['XL', 'XXL']
      : ['XXL'];

  const isCurrentSelectionAvailable =
    selectedSize ? !unavailableSizes.includes(selectedSize) : true;

  // Validation & Add to Bag handler
  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeValidationError(true);
      // Smooth scroll back to size selector if not visible
      if (purchaseControlsRef.current) {
        purchaseControlsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSizeValidationError(false);
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  // Buy Now handler
  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeValidationError(true);
      if (purchaseControlsRef.current) {
        purchaseControlsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSizeValidationError(false);
    addToCart(product, selectedColor, selectedSize, quantity);
    if (onNavigateCheckout) {
      onNavigateCheckout();
    } else {
      setIsDirectCheckoutOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171717] flex flex-col font-sans-clean selection:bg-[#B7A17A]/25">
      {/* 1. Header */}
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
            <nav aria-label="Breadcrumbs" className="flex items-center gap-2 flex-wrap">
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
                Shop
              </button>
              <ChevronRight className="w-3 h-3 text-[#77736C]/60" />
              <span className="uppercase tracking-widest text-[10px] text-[#77736C]">
                {product.categorySlug.replace('-', ' ')}
              </span>
              <ChevronRight className="w-3 h-3 text-[#77736C]/60" />
              <span className="text-[#171717] uppercase tracking-widest text-[10px] font-medium truncate max-w-[200px]">
                {product.title}
              </span>
            </nav>

            <button
              onClick={onNavigateShop}
              className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-wider text-[#77736C] hover:text-[#171717] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Shop</span>
            </button>
          </div>
        </div>

        {/* 2. Main Product Experience: Refined Two-Column Layout */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* ========================================================= */}
            {/* LEFT COLUMN: Large Image Gallery (7 cols on Desktop)      */}
            {/* ========================================================= */}
            <div className="lg:col-span-7">
              <ProductGallery
                product={product}
                selectedColorName={selectedColor}
              />
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: Product Information & Purchase Controls     */}
            {/* ========================================================= */}
            <div className="lg:col-span-5 space-y-7 lg:sticky lg:top-28">
              {/* Product Information */}
              <ProductInformation
                product={product}
                currency={activeCurrency}
                currentSku={currentVariant?.sku}
                isAvailable={isCurrentSelectionAvailable}
              />

              {/* Purchase Controls Section */}
              <div ref={purchaseControlsRef} className="space-y-6 pt-2">
                {/* Colour Selector */}
                <ColorSelector
                  colors={product.availableColors}
                  selectedColor={selectedColor}
                  onSelectColor={(colorName) => {
                    setSelectedColor(colorName);
                    setSizeValidationError(false);
                  }}
                />

                {/* Size Selector */}
                <SizeSelector
                  availableSizes={product.availableSizes}
                  selectedSize={selectedSize}
                  onSelectSize={(size) => {
                    setSelectedSize(size);
                    setSizeValidationError(false);
                  }}
                  onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
                  unavailableSizes={unavailableSizes}
                  showValidationError={sizeValidationError}
                />

                {/* Quantity Selector */}
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  min={1}
                  max={5}
                />

                {/* Add to Bag */}
                <AddToCartButton
                  onAddToCart={handleAddToCart}
                  isAvailable={isCurrentSelectionAvailable}
                  validationMessage={
                    sizeValidationError ? 'Please select a size before adding to bag.' : null
                  }
                />
              </div>

              {/* Expandable Information Panels */}
              <ProductDetailsAccordion
                product={product}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              />
            </div>
          </div>
        </section>

        {/* 3. Related Products Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-16 sm:mt-24">
          <RelatedProducts
            currentProduct={product}
            currency={activeCurrency}
            onSelectProduct={(p) => onSelectProduct(p.handle)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        </div>
      </main>

      {/* 4. Footer */}
      <SiteFooter
        onOpenCustomerCare={(topic) => setCustomerCareTopic(topic)}
        onNavigateEditorial={onNavigateEditorial}
        onNavigateSection={(hash) => {
          if (hash === '#shop') onNavigateShop();
          else onNavigateHome();
        }}
      />

      {/* Sticky Mobile Add To Bag Bar */}
      <StickyMobileAddToCartBar
        product={product}
        currency={activeCurrency}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onAddToCart={handleAddToCart}
        isAvailable={isCurrentSelectionAvailable}
        isVisible={showStickyBar}
      />

      {/* 5. Modals & Drawers */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        categorySlug={product.categorySlug}
        productTitle={product.title}
      />


      <BagDrawer
        isOpen={isBagDrawerOpen}
        onClose={closeBagDrawer}
        currency={activeCurrency}
        onExploreProducts={onNavigateShop}
        onViewBag={onNavigateCart}
        onProceedCheckout={onNavigateCheckout}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={activeCurrency}
        onSelectProduct={(p) => {
          setIsSearchOpen(false);
          onSelectProduct(p.handle);
        }}
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
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={activeCurrency}
        onAddToBag={(prod, sz, clr) => {
          addToCart(prod, clr, sz, 1);
        }}
      />
    </div>
  );
};
