import React, { useState } from 'react';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { HairlineDivider } from '../common/HairlineDivider';
import { EditorialImage, AspectRatioType } from './EditorialImage';
import { SiteHeader } from '../navigation/SiteHeader';
import { SiteFooter } from '../navigation/SiteFooter';
import { SearchModal } from '../modals/SearchModal';
import { BagDrawer } from '../modals/BagDrawer';
import { AccountModal } from '../modals/AccountModal';
import { CustomerCareModal, CustomerCareTopic } from '../modals/CustomerCareModal';
import { useCart } from '../../context/CartContext';
import { getResponsiveImageAttrs } from '../../utils/imageOptimization';
import { ChevronRight, ArrowRight } from 'lucide-react';

export type BrandEditorialRoute = 'our-story' | 'the-ravio-standard' | 'philosophy';

export interface EditorialNavigationCallbacks {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateCollection: (slug: string) => void;
  onSelectProduct: (handle: string) => void;
  onNavigateCart: () => void;
  onNavigateCheckout: () => void;
  onNavigateEditorial: (route: BrandEditorialRoute) => void;
}

/**
 * 1. EditorialHero — Sophisticated opening campaign visual with semantic H1, kicker, and lead text
 */
export interface EditorialHeroProps {
  kicker: string;
  title: string;
  lead: string;
  imageSrc: string;
  imageAlt: string;
  placeholderSlotName?: string;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  kicker,
  title,
  lead,
  imageSrc,
  imageAlt,
  placeholderSlotName,
}) => {
  const [imgError, setImgError] = useState(false);
  const heroAttrs = getResponsiveImageAttrs(imageSrc, [640, 1024, 1600, 2400], '100vw');

  return (
    <section className="relative w-full min-h-[64vh] sm:min-h-[76vh] flex items-end bg-[#171717] text-[#F4F1EA] overflow-hidden border-b border-[#171717]">
      {/* Opening Campaign Visual */}
      <div className="absolute inset-0 z-0">
        {!imgError ? (
          <img
            src={heroAttrs.src}
            srcSet={heroAttrs.srcSet}
            sizes={heroAttrs.sizes}
            width={1920}
            height={900}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            fetchPriority="high"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center filter brightness-[0.65] transition-transform duration-1000 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#171717] via-[#24221F] to-[#171717]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/55 to-[#171717]/25 pointer-events-none" />
      </div>

      {/* Opening Editorial Text */}
      <Container width="flagship" className="relative z-10 py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-sans uppercase tracking-[0.24em] text-[#B7A17A]">
            <span>{kicker}</span>
            {false && placeholderSlotName && (
              <>
                <span aria-hidden="true" className="text-[#F4F1EA]/30">·</span>
                <span className="font-mono text-[10px] text-[#F4F1EA]/55 tracking-widest">
                  Campaign Slot: {placeholderSlotName}
                </span>
              </>
            )}
          </div>

          <h1
            className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-[-0.02em] text-[#F4F1EA]"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h1>

          <p className="font-sans text-base sm:text-xl text-[#F4F1EA]/90 font-light leading-[1.7] max-w-2xl">
            {lead}
          </p>
        </div>
      </Container>
    </section>
  );
};

/**
 * 2. EditorialLeadStatement — Focused reading column for strong brand introductions and essays
 */
export interface EditorialLeadStatementProps {
  kicker?: string;
  heading: string;
  paragraphs: string[];
  surface?: 'ivory' | 'white' | 'stone';
}

export const EditorialLeadStatement: React.FC<EditorialLeadStatementProps> = ({
  kicker,
  heading,
  paragraphs,
  surface = 'ivory',
}) => {
  const bgMap = {
    ivory: 'bg-[#F4F1EA]',
    white: 'bg-[#FFFFFF]',
    stone: 'bg-[#E8E4DC]',
  };

  return (
    <section className={`py-20 sm:py-28 border-b border-[#171717]/10 ${bgMap[surface]}`}>
      <Container width="editorial">
        <div className="space-y-8">
          {kicker && <EditorialKicker variant="gold">{kicker}</EditorialKicker>}
          <h2
            className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal leading-[1.14] tracking-[-0.015em]"
            style={{ textWrap: 'balance' }}
          >
            {heading}
          </h2>
          <HairlineDivider variant="gold" className="max-w-[80px]" />
          <div className="space-y-6 font-sans text-base sm:text-lg text-[#171717]/85 font-light leading-[1.75]">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

/**
 * 3. EditorialPullQuote — Restrained editorial pull quote block (zero thick left borders)
 */
export interface EditorialPullQuoteProps {
  kicker?: string;
  quote: string;
  attribution?: string;
  subtext?: string;
  variant?: 'light' | 'dark';
}

export const EditorialPullQuote: React.FC<EditorialPullQuoteProps> = ({
  kicker,
  quote,
  attribution,
  subtext,
  variant = 'dark',
}) => {
  const isDark = variant === 'dark';

  return (
    <section
      className={`py-24 sm:py-32 border-b ${
        isDark
          ? 'bg-[#171717] text-[#F4F1EA] border-[#F4F1EA]/10'
          : 'bg-[#FFFFFF] text-[#171717] border-[#171717]/10'
      }`}
    >
      <Container width="editorial" className="text-center space-y-8">
        {kicker && <EditorialKicker variant="gold">{kicker}</EditorialKicker>}

        <blockquote className="space-y-6">
          <p
            className={`font-editorial italic text-2xl sm:text-4xl lg:text-[42px] font-normal leading-[1.32] tracking-[-0.01em] ${
              isDark ? 'text-[#F4F1EA]' : 'text-[#171717]'
            }`}
            style={{ textWrap: 'balance' }}
          >
            “{quote}”
          </p>
          {attribution && (
            <footer className="pt-2 font-sans text-xs uppercase tracking-[0.22em] text-[#B7A17A]">
              — {attribution}
            </footer>
          )}
        </blockquote>

        {subtext && (
          <p
            className={`font-sans text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed pt-2 ${
              isDark ? 'text-[#F4F1EA]/70' : 'text-[#77736C]'
            }`}
          >
            {subtext}
          </p>
        )}
      </Container>
    </section>
  );
};

/**
 * 4. EditorialSplitSection — Image and text combination supporting left or right image placement
 */
export interface EditorialSplitSectionProps {
  kicker: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
  imageCredit?: string;
  placeholderSlotName?: string;
  aspectRatio?: AspectRatioType;
  imagePosition?: 'left' | 'right';
  surface?: 'ivory' | 'white' | 'stone';
  calloutTitle?: string;
  calloutBody?: string;
}

export const EditorialSplitSection: React.FC<EditorialSplitSectionProps> = ({
  kicker,
  title,
  subtitle,
  paragraphs,
  imageSrc,
  imageAlt,
  imageCaption,
  imageCredit,
  placeholderSlotName,
  aspectRatio = '4/5',
  imagePosition = 'left',
  surface = 'white',
  calloutTitle,
  calloutBody,
}) => {
  const bgMap = {
    ivory: 'bg-[#F4F1EA]',
    white: 'bg-[#FFFFFF]',
    stone: 'bg-[#E8E4DC]',
  };

  return (
    <section className={`py-20 sm:py-28 border-b border-[#171717]/10 ${bgMap[surface]}`}>
      <Container width="flagship">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div
            className={`lg:col-span-6 ${
              imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <EditorialImage
              src={imageSrc}
              alt={imageAlt}
              aspectRatio={aspectRatio}
              caption={imageCaption}
              credit={imageCredit}
              placeholderSlotName={placeholderSlotName}
            />
          </div>

          {/* Narrative Column */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div className="space-y-3">
              <EditorialKicker variant="gold">{kicker}</EditorialKicker>
              <h2
                className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal leading-[1.12] tracking-[-0.015em]"
                style={{ textWrap: 'balance' }}
              >
                {title}
              </h2>
              {subtitle && (
                <p className="font-editorial italic text-xl sm:text-2xl text-[#171717]/85">
                  {subtitle}
                </p>
              )}
            </div>

            <HairlineDivider variant="charcoal" />

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#171717]/85 font-light leading-[1.75]">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {calloutTitle && calloutBody && (
              <div className="p-6 bg-[#F4F1EA] border border-[#171717]/10 space-y-2 mt-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#B7A17A] font-semibold block">
                  {calloutTitle}
                </span>
                <p className="font-editorial text-lg sm:text-xl text-[#171717] leading-relaxed">
                  {calloutBody}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

/**
 * 5. EditorialFullWidthVisual — Full-width campaign visual section with restrained overlay prose
 */
export interface EditorialFullWidthVisualProps {
  kicker: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  placeholderSlotName?: string;
}

export const EditorialFullWidthVisual: React.FC<EditorialFullWidthVisualProps> = ({
  kicker,
  title,
  description,
  imageSrc,
  imageAlt,
  placeholderSlotName,
}) => {
  const [imgError, setImgError] = useState(false);
  const fullAttrs = getResponsiveImageAttrs(imageSrc, [640, 1024, 1600, 2400], '100vw');

  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[560px] bg-[#171717] text-[#F4F1EA] flex items-center overflow-hidden border-b border-[#171717]">
      <div className="absolute inset-0 z-0">
        {!imgError ? (
          <img
            src={fullAttrs.src}
            srcSet={fullAttrs.srcSet}
            sizes={fullAttrs.sizes}
            width={1920}
            height={1080}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center filter brightness-[0.55]"
          />
        ) : (
          <div className="w-full h-full bg-[#1C1B19]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/90 via-[#171717]/55 to-transparent pointer-events-none" />
      </div>

      <Container width="flagship" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-xl space-y-5">
          <div className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.22em] text-[#B7A17A]">
            <span>{kicker}</span>
            {false && placeholderSlotName && (
              <>
                <span aria-hidden="true" className="text-[#F4F1EA]/30">·</span>
                <span className="font-mono text-[10px] text-[#F4F1EA]/55">
                  {placeholderSlotName}
                </span>
              </>
            )}
          </div>

          <h2
            className="font-editorial text-3xl sm:text-5xl font-normal leading-[1.1] text-[#F4F1EA]"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#F4F1EA]/85 font-light leading-[1.7]">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
};

/**
 * 6. EditorialClosingStatement — Dignified closing brand statement with cross-page exploration links
 */
export interface EditorialClosingStatementProps {
  kicker?: string;
  statement: string;
  substatement?: string;
  activeRoute: BrandEditorialRoute;
  onNavigateEditorial: (route: BrandEditorialRoute) => void;
  onNavigateShop: () => void;
}

export const EditorialClosingStatement: React.FC<EditorialClosingStatementProps> = ({
  kicker = 'CLOSING STATEMENT',
  statement,
  substatement,
  activeRoute,
  onNavigateEditorial,
  onNavigateShop,
}) => {
  const brandPages: { route: BrandEditorialRoute; label: string; subtitle: string }[] = [
    {
      route: 'our-story',
      label: 'Our Story',
      subtitle: 'The meaning behind Elevation Refined',
    },
    {
      route: 'the-ravio-standard',
      label: 'The RAVIO Standard',
      subtitle: 'Six principles of quality and intention',
    },
    {
      route: 'philosophy',
      label: 'Brand Philosophy',
      subtitle: 'Refinement as a lifelong pursuit',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F4F1EA] border-t border-[#171717]/10">
      <Container width="flagship" className="space-y-16">
        {/* Closing Statement Centerpiece */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <EditorialKicker variant="gold">{kicker}</EditorialKicker>
          <h2
            className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal leading-[1.15] tracking-[-0.015em]"
            style={{ textWrap: 'balance' }}
          >
            {statement}
          </h2>
          {substatement && (
            <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-[1.7] max-w-xl mx-auto">
              {substatement}
            </p>
          )}
          <div className="pt-4">
            <button
              onClick={onNavigateShop}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#171717] text-[#F4F1EA] hover:bg-[#2C2C2C] text-xs font-sans uppercase tracking-[0.2em] font-medium transition-colors"
            >
              <span>Explore Considered Essentials</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B7A17A]" />
            </button>
          </div>
        </div>

        <HairlineDivider variant="charcoal" />

        {/* Editorial Chapter Cross-Navigation */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-sans uppercase tracking-[0.2em] text-[#77736C]">
            <span>Continue Reading — The House of RAVIO</span>
            <span className="font-mono text-[10px]">3 Editorial Chapters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brandPages.map((item, index) => {
              const isCurrent = item.route === activeRoute;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigateEditorial(item.route)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`text-left p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between space-y-6 group ${
                    isCurrent
                      ? 'bg-[#171717] text-[#F4F1EA] border-[#171717]'
                      : 'bg-[#FFFFFF] text-[#171717] border-[#171717]/10 hover:border-[#171717]/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em]">
                      <span className="text-[#B7A17A]">0{index + 1}</span>
                      <span>{isCurrent ? 'Current Reading' : 'Read Chapter'}</span>
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-normal">
                      {item.label}
                    </h3>
                    <p
                      className={`font-sans text-xs font-light leading-relaxed ${
                        isCurrent ? 'text-[#F4F1EA]/75' : 'text-[#77736C]'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.18em] text-[#B7A17A]">
                    <span>{isCurrent ? 'Active Page' : 'Explore'}</span>
                    {!isCurrent && (
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

/**
 * 7. EditorialPageTemplate — Complete page wrapper with Header, Breadcrumbs, Sub-Nav, Modals, and Footer
 */
export interface EditorialPageTemplateProps extends EditorialNavigationCallbacks {
  activeRoute: BrandEditorialRoute;
  breadcrumbLabel: string;
  children: React.ReactNode;
}

export const EditorialPageTemplate: React.FC<EditorialPageTemplateProps> = ({
  activeRoute,
  breadcrumbLabel,
  onNavigateHome,
  onNavigateShop,
  onNavigateCollection,
  onSelectProduct,
  onNavigateCart,
  onNavigateCheckout,
  onNavigateEditorial,
  children,
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

  const editorialTabs: { id: BrandEditorialRoute; label: string; path: string }[] = [
    { id: 'our-story', label: 'Our Story', path: '/our-story' },
    { id: 'the-ravio-standard', label: 'The RAVIO Standard', path: '/the-ravio-standard' },
    { id: 'philosophy', label: 'Brand Philosophy', path: '/philosophy' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171717] flex flex-col font-sans-clean selection:bg-[#B7A17A]/25">
      {/* Global Site Header */}
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
        activeEditorialRoute={activeRoute}
      />

      {/* Accessible Breadcrumb & Editorial Chapter Sub-Navigation */}
      <div className="bg-[#FAF8F5] border-b border-[#171717]/10">
        <Container width="flagship" className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#77736C]">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#171717] transition-colors uppercase tracking-widest text-[10px]"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#77736C]/60" aria-hidden="true" />
            <span className="text-[#77736C] uppercase tracking-widest text-[10px]">
              The House
            </span>
            <ChevronRight className="w-3 h-3 text-[#77736C]/60" aria-hidden="true" />
            <span
              aria-current="page"
              className="text-[#171717] uppercase tracking-widest text-[10px] font-medium"
            >
              {breadcrumbLabel}
            </span>
          </nav>

          {/* Editorial Route Switcher */}
          <nav aria-label="Brand Storytelling Pages" className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
            {editorialTabs.map((tab) => {
              const isActive = activeRoute === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigateEditorial(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-[10px] font-sans uppercase tracking-[0.18em] py-1 whitespace-nowrap shrink-0 transition-colors border-b ${
                    isActive
                      ? 'border-[#171717] text-[#171717] font-semibold'
                      : 'border-transparent text-[#77736C] hover:text-[#171717]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </Container>
      </div>

      {/* Main Semantic Editorial Content */}
      <main id="main-content" className="flex-1">
        <article>{children}</article>
      </main>

      {/* Global Site Footer */}
      <SiteFooter
        onOpenCustomerCare={(topic) => setCustomerCareTopic(topic)}
        onNavigateEditorial={onNavigateEditorial}
        onNavigateSection={(hash) => {
          if (hash === '#shop') onNavigateShop();
          else if (hash === '#collections') onNavigateCollection('polo');
          else if (hash === '#our-story') onNavigateEditorial('our-story');
          else if (hash === '#craft') onNavigateEditorial('the-ravio-standard');
          else if (hash === '#philosophy') onNavigateEditorial('philosophy');
          else onNavigateHome();
        }}
      />

      {/* Interactive Modals & Drawers */}
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
