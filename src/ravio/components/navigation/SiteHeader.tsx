import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../common/Logo';
import { IconButton } from '../common/IconButton';
import { MobileNavigation, BrandEditorialRoute } from './MobileNavigation';
import { Search, ShoppingBag, User, Menu, ChevronDown } from 'lucide-react';

export interface SiteHeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
  onOpenAccount?: () => void;
  activeCurrency?: 'BDT' | 'USD';
  onCurrencyToggle?: (currency: 'BDT' | 'USD') => void;
  onNavigateHome?: () => void;
  onNavigateShop?: () => void;
  onNavigateCollection?: (slug: string) => void;
  onNavigateEditorial?: (route: BrandEditorialRoute) => void;
  activeEditorialRoute?: BrandEditorialRoute | null;
  className?: string;
}

type DropdownKey = 'shop' | 'collections' | 'story' | null;

/**
 * SiteHeader
 * Refined desktop & mobile navigation header adhering to the three-zone balanced architecture:
 * LEFT: SHOP, COLLECTIONS, OUR STORY (with accessible dropdown flyouts including Our Story, The RAVIO Standard, and Brand Philosophy)
 * CENTER: Mathematically centered RAVIO logo
 * RIGHT: Search, Account, Shopping Bag with dynamic item count, Currency switcher
 */
export const SiteHeader: React.FC<SiteHeaderProps> = ({
  cartCount = 2,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  activeCurrency = 'BDT',
  onCurrencyToggle,
  onNavigateHome,
  onNavigateShop,
  onNavigateCollection,
  onNavigateEditorial,
  activeEditorialRoute = null,
  className = '',
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currency, setCurrency] = useState<'BDT' | 'USD'>(activeCurrency);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrency(activeCurrency);
  }, [activeCurrency]);

  // Scroll detection for sticky header behaviour
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCurrencyChange = (newCurrency: 'BDT' | 'USD') => {
    setCurrency(newCurrency);
    if (onCurrencyToggle) onCurrencyToggle(newCurrency);
  };

  const handleMouseEnter = (key: DropdownKey) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const scrollToAnchor = (hash: string) => {
    setActiveDropdown(null);
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEditorialRoute = (route: BrandEditorialRoute, fallbackHash: string) => {
    setActiveDropdown(null);
    if (onNavigateEditorial) {
      onNavigateEditorial(route);
    } else {
      scrollToAnchor(fallbackHash);
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#171717] focus:text-[#F4F1EA] focus:text-xs focus:font-sans focus:uppercase focus:tracking-widest focus:shadow-lg"
      >
        Skip to main content
      </a>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#171717]/10 shadow-xs'
            : 'bg-[#F4F1EA] border-b border-[#171717]/5'
        } ${className}`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Upper Announcement Bar — slim, brand statement only */}
        <div className="bg-[#171717] text-[#F4F1EA] py-1.5 px-4 text-center border-b border-[#171717]">
          <p className="text-[10px] tracking-[0.22em] uppercase font-sans font-medium truncate">
            ELEVATION REFINED. — RAVIO & CO.
          </p>
        </div>

        {/* Main 3-Zone Navigation Bar */}
        <div className="py-2 sm:py-3.5 px-3 sm:px-8">
          <div className="max-w-[1440px] mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* ========================================================= */}
            {/* ZONE 1 — LEFT: Desktop Nav Links (or Mobile Menu Icon)     */}
            {/* ========================================================= */}
            <div className="flex items-center justify-start">
              {/* Mobile Menu Icon (44x44px Touch Target) */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileNavOpen(true)}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#171717] hover:text-[#B7A17A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7A17A]"
                  aria-label="Open mobile navigation menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>

              {/* Desktop Nav Items with Dropdowns */}
              <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
                {/* 1. SHOP DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('shop')}
                >
                  <button
                    onClick={() => {
                      if (onNavigateShop) {
                        setActiveDropdown(null);
                        onNavigateShop();
                      } else {
                        scrollToAnchor('#shop');
                      }
                    }}
                    className={`font-sans text-xs font-medium uppercase tracking-[0.18em] py-2 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#171717] hover:after:w-full after:transition-all after:duration-300 ${
                      activeDropdown === 'shop' ? 'text-[#171717] after:w-full' : 'text-[#171717]/80 hover:text-[#171717]'
                    }`}
                    aria-expanded={activeDropdown === 'shop'}
                  >
                    <span>SHOP</span>
                    <ChevronDown className="w-3 h-3 text-[#77736C]" />
                  </button>

                  {activeDropdown === 'shop' && (
                    <div
                      className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#171717]/10 shadow-lg p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      onMouseEnter={() => handleMouseEnter('shop')}
                    >
                      <div className="text-[9px] font-mono uppercase tracking-widest text-[#B7A17A] pb-1 border-b border-[#171717]/5">
                        Garment Catalog
                      </div>
                      <div className="space-y-1.5 text-xs font-sans">
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onNavigateShop) onNavigateShop();
                            else scrollToAnchor('#shop');
                          }}
                          className="w-full text-left py-1 text-[#171717] hover:text-[#B7A17A] flex items-center justify-between group"
                        >
                          <span>All Products</span>
                          <span className="text-[10px] text-[#77736C] opacity-0 group-hover:opacity-100">→</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onNavigateCollection) onNavigateCollection('new-arrivals');
                            else scrollToAnchor('#shop');
                          }}
                          className="w-full text-left py-1 text-[#171717] hover:text-[#B7A17A] flex items-center justify-between group"
                        >
                          <span>New Arrivals</span>
                          <span className="text-[9px] font-mono text-[#B7A17A]">Ed. 01</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onNavigateCollection) onNavigateCollection('polo');
                            else scrollToAnchor('#shop');
                          }}
                          className="w-full text-left py-1 text-[#171717] hover:text-[#B7A17A] flex items-center justify-between group"
                        >
                          <span>Polo Collection</span>
                          <span className="text-[10px] text-[#77736C] opacity-0 group-hover:opacity-100">→</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onNavigateShop) onNavigateShop();
                            else scrollToAnchor('#shop');
                          }}
                          className="w-full text-left py-1 text-[#171717]/70 hover:text-[#171717] flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Bottomwear</span>
                            <span className="invisible text-[9px] font-mono text-[#77736C] bg-[#FAF8F5] px-1.5 py-0.2 border border-[#171717]/5" aria-hidden="true">Preview</span>
                          </div>
                          <span className="text-[10px] text-[#77736C] opacity-0 group-hover:opacity-100">→</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. COLLECTIONS DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('collections')}
                >
                  <button
                    onClick={() => {
                      if (onNavigateCollection) {
                        setActiveDropdown(null);
                        onNavigateCollection('polo');
                      } else {
                        scrollToAnchor('#collections');
                      }
                    }}
                    className={`font-sans text-xs font-medium uppercase tracking-[0.18em] py-2 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#171717] hover:after:w-full after:transition-all after:duration-300 ${
                      activeDropdown === 'collections' ? 'text-[#171717] after:w-full' : 'text-[#171717]/80 hover:text-[#171717]'
                    }`}
                    aria-expanded={activeDropdown === 'collections'}
                  >
                    <span>COLLECTIONS</span>
                    <ChevronDown className="w-3 h-3 text-[#77736C]" />
                  </button>

                  {activeDropdown === 'collections' && (
                    <div
                      className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#171717]/10 shadow-lg p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      onMouseEnter={() => handleMouseEnter('collections')}
                    >
                      <div className="text-[9px] font-mono uppercase tracking-widest text-[#B7A17A] pb-1 border-b border-[#171717]/5">
                        Curated Releases
                      </div>
                      <div className="space-y-1.5 text-xs font-sans">
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onNavigateCollection) onNavigateCollection('polo');
                            else scrollToAnchor('#collections');
                          }}
                          className="w-full text-left py-1 text-[#171717] hover:text-[#B7A17A] flex items-center justify-between group"
                        >
                          <span>Featured Collection</span>
                          <span className="text-[10px] text-[#77736C] opacity-0 group-hover:opacity-100">→</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onNavigateCollection) onNavigateCollection('essentials');
                            else scrollToAnchor('#shop');
                          }}
                          className="w-full text-left py-1 text-[#171717] hover:text-[#B7A17A] flex items-center justify-between group"
                        >
                          <span>Essential Collection</span>
                          <span className="text-[10px] text-[#77736C] opacity-0 group-hover:opacity-100">→</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. OUR STORY DROPDOWN (With Our Story, The RAVIO Standard, and Brand Philosophy) */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('story')}
                >
                  <button
                    onClick={() => handleEditorialRoute('our-story', '#our-story')}
                    aria-current={activeEditorialRoute ? 'page' : undefined}
                    className={`font-sans text-xs font-medium uppercase tracking-[0.18em] py-2 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#171717] hover:after:w-full after:transition-all after:duration-300 ${
                      activeDropdown === 'story' || Boolean(activeEditorialRoute)
                        ? 'text-[#171717] after:w-full'
                        : 'text-[#171717]/80 hover:text-[#171717] after:w-0'
                    }`}
                    aria-expanded={activeDropdown === 'story'}
                  >
                    <span>OUR STORY</span>
                    <ChevronDown className="w-3 h-3 text-[#77736C]" />
                  </button>

                  {activeDropdown === 'story' && (
                    <div
                      className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#171717]/10 shadow-lg p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      onMouseEnter={() => handleMouseEnter('story')}
                    >
                      <div className="text-[9px] font-mono uppercase tracking-widest text-[#B7A17A] pb-1 border-b border-[#171717]/5">
                        The House · Brand Editorial
                      </div>
                      <div className="space-y-1.5 text-xs font-sans">
                        <button
                          onClick={() => handleEditorialRoute('our-story', '#our-story')}
                          aria-current={activeEditorialRoute === 'our-story' ? 'page' : undefined}
                          className={`w-full text-left py-1.5 flex items-center justify-between group ${
                            activeEditorialRoute === 'our-story'
                              ? 'text-[#B7A17A] font-medium'
                              : 'text-[#171717] hover:text-[#B7A17A]'
                          }`}
                        >
                          <span>Our Story</span>
                          <span className="text-[10px] text-[#77736C] opacity-0 group-hover:opacity-100">→</span>
                        </button>
                        <button
                          onClick={() => handleEditorialRoute('the-ravio-standard', '#craft')}
                          aria-current={activeEditorialRoute === 'the-ravio-standard' ? 'page' : undefined}
                          className={`w-full text-left py-1.5 flex items-center justify-between group ${
                            activeEditorialRoute === 'the-ravio-standard'
                              ? 'text-[#B7A17A] font-medium'
                              : 'text-[#171717] hover:text-[#B7A17A]'
                          }`}
                        >
                          <span>The RAVIO Standard</span>
                          <span className="text-[10px] text-[#77736C] opacity-0 group-hover:opacity-100">→</span>
                        </button>
                        <button
                          onClick={() => handleEditorialRoute('philosophy', '#philosophy')}
                          aria-current={activeEditorialRoute === 'philosophy' ? 'page' : undefined}
                          className={`w-full text-left py-1.5 flex items-center justify-between group ${
                            activeEditorialRoute === 'philosophy'
                              ? 'text-[#B7A17A] font-medium'
                              : 'text-[#171717] hover:text-[#B7A17A]'
                          }`}
                        >
                          <span>Brand Philosophy</span>
                          <span className="text-[10px] text-[#77736C] opacity-0 group-hover:opacity-100">→</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* ========================================================= */}
            {/* ZONE 2 — CENTER: Mathematically Centered RAVIO Logo        */}
            {/* ========================================================= */}
            <div className="flex items-center justify-center text-center">
              <button
                onClick={() => {
                  if (onNavigateHome) onNavigateHome();
                }}
                className="inline-block group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7A17A] bg-transparent border-0 cursor-pointer"
                aria-label="Return to RAVIO Homepage"
              >
                <Logo size="md" showSubtitle={true} showProvisionalNotice={false} />
              </button>
            </div>

            {/* ========================================================= */}
            {/* ZONE 3 — RIGHT: Search, Account, Bag, Currency            */}
            {/* ========================================================= */}
            <div className="flex items-center justify-end gap-1 sm:gap-2">
              {/* Currency Switcher (Desktop) */}
              <div className="hidden lg:flex items-center text-[10px] font-mono border border-[#171717]/15 bg-white p-0.5 mr-2">
                <button
                  onClick={() => handleCurrencyChange('BDT')}
                  className={`px-2 py-0.5 transition-colors ${
                    currency === 'BDT'
                      ? 'bg-[#171717] text-[#F4F1EA] font-semibold'
                      : 'text-[#77736C] hover:text-[#171717]'
                  }`}
                  aria-label="Set currency to Bangladeshi Taka"
                >
                  BDT
                </button>
                <button
                  onClick={() => handleCurrencyChange('USD')}
                  className={`px-2 py-0.5 transition-colors ${
                    currency === 'USD'
                      ? 'bg-[#171717] text-[#F4F1EA] font-semibold'
                      : 'text-[#77736C] hover:text-[#171717]'
                  }`}
                  aria-label="Set currency to US Dollar"
                >
                  USD
                </button>
              </div>

              {/* Search Trigger */}
              <IconButton
                icon={<Search className="w-4 h-4 text-[#171717]" />}
                label="Search catalog"
                onClick={onOpenSearch}
              />

              {/* Account Trigger (Desktop) */}
              <div className="hidden sm:inline-flex">
                <IconButton
                  icon={<User className="w-4 h-4 text-[#171717]" />}
                  label="Client account"
                  onClick={onOpenAccount}
                />
              </div>

              {/* Shopping Bag Trigger with Dynamic Item Count */}
              <IconButton
                icon={<ShoppingBag className="w-4 h-4 text-[#171717]" />}
                label="Shopping bag"
                badgeCount={cartCount}
                onClick={onOpenCart}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Full-Height Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeCurrency={currency}
        onCurrencyToggle={handleCurrencyChange}
        onOpenSearch={onOpenSearch}
        onOpenAccount={onOpenAccount}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateCollection={onNavigateCollection}
        onNavigateEditorial={onNavigateEditorial}
        activeEditorialRoute={activeEditorialRoute}
        onOpenContact={() => {
          setIsMobileNavOpen(false);
          const footerContact = document.getElementById('contact');
          if (footerContact) footerContact.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </>
  );
};
