import React, { useState } from 'react';
import { Container } from './Container';
import { EditorialKicker } from './Typography';
import { HairlineDivider } from './HairlineDivider';
import { SiteHeader } from '../navigation/SiteHeader';
import { SiteFooter } from '../navigation/SiteFooter';
import { SearchModal } from '../modals/SearchModal';
import { BagDrawer } from '../modals/BagDrawer';
import { AccountModal } from '../modals/AccountModal';
import { CustomerCareModal, CustomerCareTopic } from '../modals/CustomerCareModal';
import { BrandEditorialRoute } from '../navigation/MobileNavigation';
import { useCart } from '../../context/CartContext';
import { ArrowRight, Compass } from 'lucide-react';

export interface NotFoundViewProps {
  requestedPath?: string;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateCollection: (slug: string) => void;
  onSelectProduct: (handle: string) => void;
  onNavigateCart: () => void;
  onNavigateCheckout: () => void;
  onNavigateEditorial: (route: BrandEditorialRoute) => void;
}

/**
 * NotFoundView (404 Page)
 * Quiet luxury 404 experience providing clear recovery paths to the homepage,
 * garment catalog, and brand storytelling chapters.
 */
export const NotFoundView: React.FC<NotFoundViewProps> = ({
  requestedPath,
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
    openBagDrawer,
    isBagDrawerOpen,
    closeBagDrawer,
  } = useCart();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [customerCareTopic, setCustomerCareTopic] = useState<CustomerCareTopic | null>(null);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171717] flex flex-col font-sans-clean selection:bg-[#B7A17A]/25">
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

      <main id="main-content" className="flex-1 flex items-center py-20 sm:py-32">
        <Container width="editorial">
          <div className="bg-[#FFFFFF] border border-[#171717]/10 p-8 sm:p-16 text-center space-y-8">
            <div className="space-y-3">
              <EditorialKicker variant="gold">404 · PAGE NOT FOUND</EditorialKicker>
              <h1
                className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#171717] font-normal leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                This Destination Could Not Be Found.
              </h1>
              {requestedPath && (
                <p className="font-mono text-xs text-[#77736C]">
                  Requested path: <span className="text-[#171717]">{requestedPath}</span>
                </p>
              )}
            </div>

            <HairlineDivider variant="gold" className="max-w-[80px] mx-auto" />

            <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-relaxed max-w-lg mx-auto">
              The page you are looking for may have moved or no longer exists. Return to the RAVIO digital flagship or explore our considered collections and editorial chapters below.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onNavigateHome}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 bg-[#171717] text-[#F4F1EA] hover:bg-[#2C2C2C] text-xs font-sans uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center justify-center gap-2.5"
              >
                <span>Return to Homepage</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B7A17A]" />
              </button>

              <button
                onClick={onNavigateShop}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 bg-[#F4F1EA] text-[#171717] border border-[#171717]/20 hover:border-[#171717] text-xs font-sans uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-[#B7A17A]" />
                <span>Explore Shop</span>
              </button>
            </div>

            <div className="pt-8 border-t border-[#171717]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <button
                onClick={() => onNavigateEditorial('our-story')}
                className="p-4 bg-[#F4F1EA] border border-[#171717]/10 hover:border-[#171717]/40 transition-colors space-y-1"
              >
                <span className="text-[10px] font-mono text-[#B7A17A] uppercase tracking-widest block">
                  01 · Editorial
                </span>
                <span className="font-editorial text-xl text-[#171717] block">Our Story</span>
              </button>
              <button
                onClick={() => onNavigateEditorial('the-ravio-standard')}
                className="p-4 bg-[#F4F1EA] border border-[#171717]/10 hover:border-[#171717]/40 transition-colors space-y-1"
              >
                <span className="text-[10px] font-mono text-[#B7A17A] uppercase tracking-widest block">
                  02 · Principles
                </span>
                <span className="font-editorial text-xl text-[#171717] block">The RAVIO Standard</span>
              </button>
              <button
                onClick={() => onNavigateEditorial('philosophy')}
                className="p-4 bg-[#F4F1EA] border border-[#171717]/10 hover:border-[#171717]/40 transition-colors space-y-1"
              >
                <span className="text-[10px] font-mono text-[#B7A17A] uppercase tracking-widest block">
                  03 · Ethos
                </span>
                <span className="font-editorial text-xl text-[#171717] block">Brand Philosophy</span>
              </button>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter
        onOpenCustomerCare={(topic) => setCustomerCareTopic(topic)}
        onNavigateEditorial={onNavigateEditorial}
        onNavigateSection={(hash) => {
          if (hash === '#shop') onNavigateShop();
          else onNavigateHome();
        }}
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
    </div>
  );
};
