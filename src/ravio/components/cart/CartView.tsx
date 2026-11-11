import { PRICE_TO_BE_ANNOUNCED, PRE_LAUNCH_ORDERING_NOTICE } from '../../utils/customerCopy';
import { customerProductKicker } from '../../utils/customerCopy';
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { OrderSummary } from './OrderSummary';
import { SiteHeader } from '../navigation/SiteHeader';
import { SiteFooter } from '../navigation/SiteFooter';
import { SearchModal } from '../modals/SearchModal';
import { BagDrawer } from '../modals/BagDrawer';
import { AccountModal } from '../modals/AccountModal';
import { CustomerCareModal, CustomerCareTopic } from '../modals/CustomerCareModal';
import { PrimaryButton } from '../common/PrimaryButton';
import { HairlineDivider } from '../common/HairlineDivider';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Package,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';

import { BrandEditorialRoute } from '../navigation/MobileNavigation';

export interface CartViewProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateCollection: (slug: string) => void;
  onNavigateCheckout: () => void;
  onSelectProduct: (handle: string) => void;
  onNavigateEditorial?: (route: BrandEditorialRoute) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateCollection,
  onNavigateCheckout,
  onSelectProduct,
  onNavigateEditorial,
}) => {
  const {
    items,
    totalItemCount,
    activeCurrency,
    setActiveCurrency,
    updateQuantity,
    removeItem,
    clearCart,
    openBagDrawer,
    isBagDrawerOpen,
    closeBagDrawer,
  } = useCart();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [customerCareTopic, setCustomerCareTopic] = useState<CustomerCareTopic | null>(null);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171717] flex flex-col font-sans-clean selection:bg-[#B7A17A]/25">
      {/* 1. Refined Header */}
      <SiteHeader
        activeCurrency={activeCurrency}
        onCurrencyToggle={(c) => setActiveCurrency(c)}
        cartCount={totalItemCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={openBagDrawer}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateCollection={onNavigateCollection}
        onNavigateEditorial={onNavigateEditorial}
      />

      {/* 2. Main Cart Content */}
      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumb Bar */}
        <div className="border-b border-[#171717]/10 bg-[#FAF8F5]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between text-xs font-sans text-[#77736C]">
            <nav aria-label="Breadcrumbs" className="flex items-center gap-2">
              <button
                onClick={onNavigateHome}
                className="hover:text-[#171717] transition-colors uppercase tracking-widest text-[10px]"
              >
                Home
              </button>
              <span>/</span>
              <button
                onClick={onNavigateShop}
                className="hover:text-[#171717] transition-colors uppercase tracking-widest text-[10px]"
              >
                Shop
              </button>
              <span>/</span>
              <span className="text-[#171717] font-medium uppercase tracking-widest text-[10px]">
                Shopping Bag
              </span>
            </nav>

            <button
              onClick={onNavigateShop}
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#77736C] hover:text-[#171717] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-10 pb-8 border-b border-[#171717]/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#B7A17A] block font-semibold mb-1">
                Selected Garments · Edition 01
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] tracking-tight">
                SHOPPING BAG
              </h1>
              <p className="text-xs sm:text-sm text-[#77736C] font-light max-w-xl mt-2 leading-relaxed">
                Review your selected garments. Pricing and ordering will open with the first RAVIO edition.
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={clearCart}
                  className="text-xs font-sans text-[#77736C] hover:text-[#9E3B3B] underline underline-offset-4 transition-colors"
                >
                  Clear Bag
                </button>
                <span className="text-xs font-mono bg-white px-3 py-1.5 border border-[#171717]/10 text-[#171717]">
                  {totalItemCount} {totalItemCount === 1 ? 'Garment' : 'Garments'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Body: Product Listing + Order Summary */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
          {items.length === 0 ? (
            /* Refined Empty Cart State */
            <div className="bg-white border border-[#171717]/10 p-12 sm:p-20 text-center max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 mx-auto bg-[#FAF8F5] border border-[#171717]/10 flex items-center justify-center text-[#B7A17A]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#171717]">
                  Your Shopping Bag is Currently Empty
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#77736C] font-light leading-relaxed max-w-md mx-auto">
                  You have not added any garments to your bag yet. Explore our Considered Essentials collection, crafted from double-mercerized Egyptian cotton and Japanese selvedge denim.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <PrimaryButton
                  onClick={onNavigateShop}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Explore All Products
                </PrimaryButton>
                <button
                  onClick={() => onNavigateCollection('polo')}
                  className="px-6 py-3 border border-[#171717]/20 text-[#171717] hover:border-[#171717] hover:bg-[#FAF8F5] text-xs font-sans uppercase tracking-wider transition-colors"
                >
                  View Polo Collection
                </button>
              </div>

              {/* Guarantees */}
              <div className="pt-8 border-t border-[#171717]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-3 bg-[#FAF8F5] border border-[#171717]/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#B7A17A] block font-semibold">
                    01 · Pure Materials
                  </span>
                  <p className="text-[11px] text-[#77736C] leading-snug">
                    Double-mercerized 100% long-staple cotton with zero synthetic blends.
                  </p>
                </div>
                <div className="p-3 bg-[#FAF8F5] border border-[#171717]/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#B7A17A] block font-semibold">
                    02 · Hand-Inspected
                  </span>
                  <p className="text-[11px] text-[#77736C] leading-snug">
                    Every seam, collar tension, and button is individually examined in Dhaka.
                  </p>
                </div>
                <div className="p-3 bg-[#FAF8F5] border border-[#171717]/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#B7A17A] block font-semibold">
                    03 · Effortless Returns
                  </span>
                  <p className="text-[11px] text-[#77736C] leading-snug">
                    7-day size exchange guarantee with doorstep pickup across Dhaka.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Populated Cart Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Product Table (8 Columns) */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                {/* Desktop Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-[#171717]/15 text-[10px] font-mono uppercase tracking-[0.18em] text-[#77736C]">
                  <div className="col-span-6">Garment Description</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#171717]/10 border-b border-[#171717]/10">
                  {items.map((item) => {

                    return (
                      <div
                        key={item.id}
                        className="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white sm:bg-transparent p-4 sm:p-0 border sm:border-0 border-[#171717]/10"
                      >
                        {/* Col 1: Product Thumbnail & Meta (6 Cols) */}
                        <div className="sm:col-span-6 flex gap-4">
                          <button
                            onClick={() => onSelectProduct(item.product.handle)}
                            className="w-20 h-24 sm:w-24 sm:h-28 bg-[#E8E4DC] border border-[#171717]/10 flex-shrink-0 overflow-hidden group cursor-pointer text-left"
                            aria-label={`View ${item.product.title}`}
                          >
                            <img
                              src={item.product.imageUrls.hero}
                              alt={item.product.title}
                              width={96}
                              height={112}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </button>

                          <div className="space-y-1.5 flex-1">
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#B7A17A] block">
                              {customerProductKicker(item.product.editorialKicker)}
                            </span>
                            <button
                              type="button"
                              onClick={() => onSelectProduct(item.product.handle)}
                              className="font-editorial text-base sm:text-lg text-[#171717] hover:text-[#B7A17A] transition-colors text-left font-medium block"
                            >
                              {item.product.title}
                            </button>

                            <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-[#77736C]">
                              <span className="bg-[#FAF8F5] px-2 py-0.5 border border-[#171717]/10 text-[#171717] font-medium">
                                Size: {item.selectedSize}
                              </span>
                              <span className="bg-[#FAF8F5] px-2 py-0.5 border border-[#171717]/10 text-[#171717]">
                                {item.selectedColor}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="min-h-[36px] pt-1 flex items-center gap-1 text-[11px] text-[#77736C] hover:text-[#9E3B3B] transition-colors"
                              aria-label={`Remove ${item.product.title} from shopping bag`}
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* Col 2: Unit Price (2 Cols) */}
                        <div className="sm:col-span-2 sm:text-right font-mono text-xs text-[#77736C] tabular-nums">
                          <span className="sm:hidden text-[10px] font-sans uppercase tracking-wider text-[#77736C] mr-2">
                            Price:
                          </span>
                          <span className="text-[#171717] font-medium">
                            {PRICE_TO_BE_ANNOUNCED}
                          </span>
                        </div>

                        {/* Col 3: Quantity Controls (2 Cols) */}
                        <div className="sm:col-span-2 flex sm:justify-center items-center">
                          <div className="flex items-center border border-[#171717]/20 bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-[#77736C] hover:text-[#171717] hover:bg-[#FAF8F5] transition-colors"
                              aria-label={`Decrease quantity of ${item.product.title}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-9 text-center font-mono text-xs text-[#171717] font-medium tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-[#77736C] hover:text-[#171717] hover:bg-[#FAF8F5] transition-colors"
                              aria-label={`Increase quantity of ${item.product.title}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Col 4: Line Total (2 Cols) */}
                        <div className="sm:col-span-2 sm:text-right font-mono text-sm font-semibold text-[#171717] tabular-nums">
                          <span className="sm:hidden text-[10px] font-sans uppercase tracking-wider text-[#77736C] mr-2 font-normal">
                            Total:
                          </span>
                          <span>
                            {PRICE_TO_BE_ANNOUNCED}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Return Shopping CTA & Notice */}
                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    onClick={onNavigateShop}
                    className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#171717] hover:text-[#B7A17A] transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Continue Shopping Collections</span>
                  </button>

                  <div className="text-[11px] font-sans text-[#77736C] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#B7A17A]" />
                    <span>Your selections are saved on this device.</span>
                  </div>
                </div>

                {/* Luxury Packaging Assurance */}
                <div className="mt-8 p-6 bg-white border border-[#171717]/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 bg-[#FAF8F5] border border-[#171717]/10 flex items-center justify-center text-[#B7A17A] flex-shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-editorial text-lg text-[#171717]">
                      Ordering Opens Soon
                    </h4>
                    <p className="text-xs text-[#77736C] font-light leading-relaxed">
                      {PRE_LAUNCH_ORDERING_NOTICE}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary (4-5 Columns) */}
              <div className="lg:col-span-5 xl:col-span-4 sticky top-20 space-y-4">
                <OrderSummary
                  onCheckout={onNavigateCheckout}
                  ctaText="Ordering Information"
                  showCheckoutButton={true}
                  showDeliverySelector={false}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. Footer */}
      <SiteFooter
        onOpenCustomerCare={(topic) => setCustomerCareTopic(topic)}
        onNavigateEditorial={onNavigateEditorial}
        onNavigateSection={(hash) => {
          if (hash === '#shop') onNavigateShop();
          else onNavigateHome();
        }}
      />

      {/* Supporting Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={activeCurrency}
        onSelectProduct={(p) => {
          setIsSearchOpen(false);
          onSelectProduct(p.handle);
        }}
      />

      <BagDrawer
        isOpen={isBagDrawerOpen}
        onClose={closeBagDrawer}
        currency={activeCurrency}
        onExploreProducts={onNavigateShop}
        onViewBag={closeBagDrawer}
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
    </div>
  );
};
