import React, { useState } from 'react';
import { SiteHeader } from '../navigation/SiteHeader';
import { BrandEditorialRoute } from '../navigation/MobileNavigation';
import { HeroCampaign } from './HeroCampaign';
import { FeaturedCollection } from './FeaturedCollection';
import { BrandPhilosophySection } from './BrandPhilosophySection';
import { RavioStandardSection } from './RavioStandardSection';
import { EditorialCampaignSection } from './EditorialCampaignSection';
import { BrandStorySection } from './BrandStorySection';
import { NewsletterSection } from './NewsletterSection';
import { SiteFooter } from '../navigation/SiteFooter';
import { SearchModal } from '../modals/SearchModal';
import { BagDrawer } from '../modals/BagDrawer';
import { AccountModal } from '../modals/AccountModal';
import { CustomerCareModal, CustomerCareTopic } from '../modals/CustomerCareModal';
import { StoryPhilosophyModal } from '../modals/StoryPhilosophyModal';
import { ProductQuickViewModal } from '../modals/ProductQuickViewModal';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

export interface HomepageViewProps {
  onNavigateShop?: () => void;
  onNavigateCollection?: (slug: string) => void;
  onSelectProduct?: (handle: string) => void;
  onNavigateCart?: () => void;
  onNavigateCheckout?: () => void;
  onNavigateEditorial?: (route: BrandEditorialRoute) => void;
}

export const HomepageView: React.FC<HomepageViewProps> = ({
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

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [customerCareTopic, setCustomerCareTopic] = useState<CustomerCareTopic | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [storyModalTopic, setStoryModalTopic] = useState<'philosophy' | 'story' | 'craft' | null>(null);

  const handleAddToBag = (product: Product, size: string, color: string) => {
    addToCart(product, color, size, 1);
  };

  const handleNavigateSection = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171717] flex flex-col font-sans-clean selection:bg-[#B7A17A]/25">
      {/* SECTION 01 — REFINED 3-ZONE HEADER */}
      <SiteHeader
        activeCurrency={activeCurrency}
        onCurrencyToggle={(c) => setActiveCurrency(c)}
        cartCount={totalItemCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={openBagDrawer}
        onOpenAccount={() => setIsAccountOpen(true)}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateShop={onNavigateShop}
        onNavigateCollection={onNavigateCollection}
        onNavigateEditorial={onNavigateEditorial}
      />

      {/* MAIN HOMEPAGE SECTIONS IN EXACT REQUIRED SEQUENCE */}
      <main id="main-content" className="flex-1">
        {/* SECTION 02 — HERO CAMPAIGN */}
        <HeroCampaign
          onExplore={onNavigateShop || (() => handleNavigateSection('#shop'))}
        />

        {/* SECTION 03 — FEATURED COLLECTION */}
        <FeaturedCollection
          currency={activeCurrency}
          onSelectProduct={(p) => {
            if (onSelectProduct) onSelectProduct(p.handle);
            else setSelectedProduct(p);
          }}
          onQuickView={(p) => setSelectedProduct(p)}
          onExploreAll={onNavigateShop}
        />

        {/* SECTION 04 — BRAND PHILOSOPHY */}
        <BrandPhilosophySection
          onOpenPhilosophyModal={() => {
            if (onNavigateEditorial) onNavigateEditorial('philosophy');
            else setStoryModalTopic('philosophy');
          }}
        />

        {/* SECTION 05 — THE RAVIO STANDARD */}
        <RavioStandardSection
          onExploreStandard={
            onNavigateEditorial ? () => onNavigateEditorial('the-ravio-standard') : undefined
          }
        />

        {/* SECTION 06 — EDITORIAL CAMPAIGN */}
        <EditorialCampaignSection
          onExploreRavio={
            onNavigateEditorial
              ? () => onNavigateEditorial('our-story')
              : onNavigateShop || (() => handleNavigateSection('#shop'))
          }
        />

        {/* SECTION 07 — BRAND STORY */}
        <BrandStorySection
          onOpenStoryModal={() => {
            if (onNavigateEditorial) onNavigateEditorial('our-story');
            else setStoryModalTopic('story');
          }}
        />

        {/* SECTION 08 — NEWSLETTER */}
        <NewsletterSection />
      </main>

      {/* SECTION 09 — REFINED PREMIUM FOOTER */}
      <SiteFooter
        onOpenCustomerCare={(topic) => setCustomerCareTopic(topic)}
        onNavigateEditorial={onNavigateEditorial}
        onNavigateSection={(hash) => {
          if (hash === '#shop' && onNavigateShop) {
            onNavigateShop();
          } else if (hash === '#our-story' && onNavigateEditorial) {
            onNavigateEditorial('our-story');
          } else if (hash === '#craft' && onNavigateEditorial) {
            onNavigateEditorial('the-ravio-standard');
          } else if (hash === '#philosophy' && onNavigateEditorial) {
            onNavigateEditorial('philosophy');
          } else {
            handleNavigateSection(hash);
          }
        }}
      />

      {/* INTERACTIVE MODALS & DRAWERS */}
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
        onExploreProducts={() => handleNavigateSection('#shop')}
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

      <StoryPhilosophyModal
        isOpen={storyModalTopic !== null}
        onClose={() => setStoryModalTopic(null)}
        topic={storyModalTopic || 'philosophy'}
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
