import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../common/Logo';
import { X, Search, Globe, ChevronDown, ChevronRight, User, Mail } from 'lucide-react';

export type BrandEditorialRoute = 'our-story' | 'the-ravio-standard' | 'philosophy';

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeCurrency: 'BDT' | 'USD';
  onCurrencyToggle: (currency: 'BDT' | 'USD') => void;
  onOpenSearch?: () => void;
  onOpenAccount?: () => void;
  onOpenContact?: () => void;
  onNavigateHome?: () => void;
  onNavigateShop?: () => void;
  onNavigateCollection?: (slug: string) => void;
  onNavigateEditorial?: (route: BrandEditorialRoute) => void;
  activeEditorialRoute?: BrandEditorialRoute | null;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  activeCurrency,
  onCurrencyToggle,
  onOpenSearch,
  onOpenAccount,
  onOpenContact,
  onNavigateHome,
  onNavigateShop,
  onNavigateCollection,
  onNavigateEditorial,
  activeEditorialRoute,
}) => {
  const [expandedSection, setExpandedSection] = useState<'shop' | 'collections' | 'story' | null>(
    activeEditorialRoute ? 'story' : null
  );
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus management & Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const closeBtn = drawerRef.current?.querySelector('button');
        if (closeBtn) (closeBtn as HTMLElement).focus();
      }, 50);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigate = (hash: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleEditorialClick = (route: BrandEditorialRoute, fallbackHash: string) => {
    onClose();
    if (onNavigateEditorial) {
      onNavigateEditorial(route);
    } else {
      handleNavigate(fallbackHash);
    }
  };

  const toggleSection = (section: 'shop' | 'collections' | 'story') => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className="relative w-full max-w-sm bg-[#F4F1EA] text-[#171717] h-full flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#171717]/10 flex items-center justify-between bg-white">
          <button
            onClick={() => {
              onClose();
              if (onNavigateHome) onNavigateHome();
            }}
            className="text-left bg-transparent border-0 cursor-pointer"
            aria-label="Return to Homepage"
          >
            <Logo size="sm" showSubtitle={true} showProvisionalNotice={false} />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-[#77736C] hover:text-[#171717] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7A17A]"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Bar Entry */}
        <div className="p-4 border-b border-[#171717]/10 bg-[#FAF8F5]">
          <button
            onClick={() => {
              onClose();
              if (onOpenSearch) onOpenSearch();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 bg-white border border-[#171717]/15 text-xs text-[#77736C] hover:border-[#171717]/30 transition-colors"
          >
            <Search className="w-4 h-4 text-[#B7A17A]" />
            <span className="font-sans">Search catalog, polos, selvedge...</span>
          </button>
        </div>

        {/* Navigation Accordion Sections */}
        <nav aria-label="Mobile Primary Navigation" className="p-4 sm:p-6 space-y-2 flex-1 overflow-y-auto">
          {/* 1. SHOP SECTION */}
          <div className="border-b border-[#171717]/10 pb-2">
            <button
              onClick={() => toggleSection('shop')}
              className="w-full py-3 flex items-center justify-between text-left group"
              aria-expanded={expandedSection === 'shop'}
            >
              <div>
                <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#B7A17A] block">
                  Garment Catalog
                </span>
                <span className="font-editorial text-2xl text-[#171717] group-hover:text-[#B7A17A] transition-colors">
                  Shop
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#77736C] transition-transform duration-200 ${
                  expandedSection === 'shop' ? 'rotate-180 text-[#171717]' : ''
                }`}
              />
            </button>
            {expandedSection === 'shop' && (
              <div className="pl-3 pb-3 pt-1 space-y-2 text-xs font-sans">
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateShop) onNavigateShop();
                    else handleNavigate('#shop');
                  }}
                  className="w-full py-2 flex items-center justify-between text-left text-[#171717]/80 hover:text-[#171717]"
                >
                  <span>All Products</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateCollection) onNavigateCollection('new-arrivals');
                    else handleNavigate('#shop');
                  }}
                  className="w-full py-2 flex items-center justify-between text-left text-[#171717]/80 hover:text-[#171717]"
                >
                  <span>New Arrivals (Edition 01)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateCollection) onNavigateCollection('polo');
                    else handleNavigate('#shop');
                  }}
                  className="w-full py-2 flex items-center justify-between text-left text-[#171717]/80 hover:text-[#171717]"
                >
                  <span>Polo Collection (Essential & Refined)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateShop) onNavigateShop();
                    else handleNavigate('#shop');
                  }}
                  className="w-full py-2 flex items-center justify-between text-left text-[#171717]/80 hover:text-[#171717]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Bottomwear (Selvedge & Twill)</span>
                    <span className="invisible text-[9px] font-mono text-[#B7A17A]" aria-hidden="true">Preview</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                </button>
              </div>
            )}
          </div>

          {/* 2. COLLECTIONS SECTION */}
          <div className="border-b border-[#171717]/10 pb-2">
            <button
              onClick={() => toggleSection('collections')}
              className="w-full py-3 flex items-center justify-between text-left group"
              aria-expanded={expandedSection === 'collections'}
            >
              <div>
                <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#B7A17A] block">
                  Curated Releases
                </span>
                <span className="font-editorial text-2xl text-[#171717] group-hover:text-[#B7A17A] transition-colors">
                  Collections
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#77736C] transition-transform duration-200 ${
                  expandedSection === 'collections' ? 'rotate-180 text-[#171717]' : ''
                }`}
              />
            </button>
            {expandedSection === 'collections' && (
              <div className="pl-3 pb-3 pt-1 space-y-2 text-xs font-sans">
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateCollection) onNavigateCollection('polo');
                    else handleNavigate('#collections');
                  }}
                  className="w-full py-2 flex items-center justify-between text-left text-[#171717]/80 hover:text-[#171717]"
                >
                  <span>Featured Collection (Beyond the Ordinary)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateCollection) onNavigateCollection('essentials');
                    else handleNavigate('#shop');
                  }}
                  className="w-full py-2 flex items-center justify-between text-left text-[#171717]/80 hover:text-[#171717]"
                >
                  <span>Considered Essentials Capsule</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                </button>
              </div>
            )}
          </div>

          {/* 3. OUR STORY & BRAND EDITORIAL PAGES */}
          <div className="border-b border-[#171717]/10 pb-2">
            <button
              onClick={() => toggleSection('story')}
              className="w-full py-3 flex items-center justify-between text-left group"
              aria-expanded={expandedSection === 'story'}
            >
              <div>
                <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#B7A17A] block">
                  The House
                </span>
                <span className="font-editorial text-2xl text-[#171717] group-hover:text-[#B7A17A] transition-colors">
                  Our Story
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#77736C] transition-transform duration-200 ${
                  expandedSection === 'story' ? 'rotate-180 text-[#171717]' : ''
                }`}
              />
            </button>
            {expandedSection === 'story' && (
              <div className="pl-3 pb-3 pt-1 space-y-2 text-xs font-sans">
                <button
                  onClick={() => handleEditorialClick('our-story', '#our-story')}
                  aria-current={activeEditorialRoute === 'our-story' ? 'page' : undefined}
                  className={`w-full py-2 flex items-center justify-between text-left ${
                    activeEditorialRoute === 'our-story'
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#171717]/80 hover:text-[#171717]'
                  }`}
                >
                  <span>Our Story (Elevation Refined)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                </button>
                <button
                  onClick={() => handleEditorialClick('the-ravio-standard', '#craft')}
                  aria-current={activeEditorialRoute === 'the-ravio-standard' ? 'page' : undefined}
                  className={`w-full py-2 flex items-center justify-between text-left ${
                    activeEditorialRoute === 'the-ravio-standard'
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#171717]/80 hover:text-[#171717]'
                  }`}
                >
                  <span>The RAVIO Standard (Six Principles)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                </button>
                <button
                  onClick={() => handleEditorialClick('philosophy', '#philosophy')}
                  aria-current={activeEditorialRoute === 'philosophy' ? 'page' : undefined}
                  className={`w-full py-2 flex items-center justify-between text-left ${
                    activeEditorialRoute === 'philosophy'
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#171717]/80 hover:text-[#171717]'
                  }`}
                >
                  <span>Brand Philosophy (The Pursuit of Progress)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77736C]" />
                </button>
              </div>
            )}
          </div>

          {/* 4. UTILITY ENTRIES: Account, Contact */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onClose();
                if (onOpenAccount) onOpenAccount();
              }}
              className="w-full py-2.5 flex items-center gap-3 text-xs font-sans uppercase tracking-[0.16em] text-[#171717] hover:text-[#B7A17A] transition-colors"
            >
              <User className="w-4 h-4 text-[#B7A17A]" />
              <span>Client Account</span>
            </button>
            <button
              onClick={() => {
                onClose();
                if (onOpenContact) onOpenContact();
              }}
              className="w-full py-2.5 flex items-center gap-3 text-xs font-sans uppercase tracking-[0.16em] text-[#171717] hover:text-[#B7A17A] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#B7A17A]" />
              <span>Contact Concierge</span>
            </button>
          </div>
        </nav>

        {/* Footer Area with Currency Switcher & Brand Tagline */}
        <div className="p-4 sm:p-5 bg-[#E8E4DC] border-t border-[#171717]/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#77736C] flex items-center gap-1.5 font-sans">
              <Globe className="w-3.5 h-3.5 text-[#B7A17A]" /> Settlement Currency:
            </span>
            <div className="flex items-center bg-white border border-[#171717]/15 p-0.5">
              <button
                onClick={() => onCurrencyToggle('BDT')}
                className={`px-2.5 py-1 text-[11px] font-mono transition-colors ${
                  activeCurrency === 'BDT'
                    ? 'bg-[#171717] text-[#F4F1EA]'
                    : 'text-[#171717]'
                }`}
              >
                BDT (৳)
              </button>
              <button
                onClick={() => onCurrencyToggle('USD')}
                className={`px-2.5 py-1 text-[11px] font-mono transition-colors ${
                  activeCurrency === 'USD'
                    ? 'bg-[#171717] text-[#F4F1EA]'
                    : 'text-[#171717]'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="text-[10px] text-[#77736C] text-center font-sans tracking-[0.16em] uppercase">
            RAVIO & CO. · ELEVATION REFINED.
          </div>
        </div>
      </div>
    </div>
  );
};
