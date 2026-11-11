/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { HomepageView } from './components/homepage/HomepageView';
import { BrandEditorialRoute } from './components/navigation/MobileNavigation';
import { FoundationTab } from './components/foundation/FoundationHeader';
import { SAMPLE_CATALOG } from './data/sampleCatalog';
import {
  ROUTE_SEO_CONFIG,
  VIEW_TO_PATH,
  WorkflowView,
  parseRouteFromPathname,
  getProductSEOConfig,
  usePageSEO,
} from './utils/seo';

// Route-level code splitting for secondary, catalog, PDP, and editorial views
const ShopView = lazy(() =>
  import('./components/shop/ShopView').then((m) => ({ default: m.ShopView }))
);
const CollectionView = lazy(() =>
  import('./components/shop/CollectionView').then((m) => ({ default: m.CollectionView }))
);
const ProductDetailView = lazy(() =>
  import('./components/pdp/ProductDetailView').then((m) => ({ default: m.ProductDetailView }))
);
const OurStoryView = lazy(() =>
  import('./components/editorial/OurStoryView').then((m) => ({ default: m.OurStoryView }))
);
const RavioStandardView = lazy(() =>
  import('./components/editorial/RavioStandardView').then((m) => ({
    default: m.RavioStandardView,
  }))
);
const PhilosophyView = lazy(() =>
  import('./components/editorial/PhilosophyView').then((m) => ({ default: m.PhilosophyView }))
);
const CartView = lazy(() =>
  import('./components/cart/CartView').then((m) => ({ default: m.CartView }))
);
const CheckoutView = lazy(() =>
  import('./components/checkout/CheckoutView').then((m) => ({ default: m.CheckoutView }))
);
const NotFoundView = lazy(() =>
  import('./components/common/NotFoundView').then((m) => ({ default: m.NotFoundView }))
);
const DesignSystemPreview = lazy(() =>
  import('./components/preview/DesignSystemPreview').then((m) => ({
    default: m.DesignSystemPreview,
  }))
);
const FoundationHeader = lazy(() =>
  import('./components/foundation/FoundationHeader').then((m) => ({
    default: m.FoundationHeader,
  }))
);
const BrandSummaryView = lazy(() =>
  import('./components/foundation/BrandSummaryView').then((m) => ({
    default: m.BrandSummaryView,
  }))
);
const TokensExplorer = lazy(() =>
  import('./components/foundation/TokensExplorer').then((m) => ({
    default: m.TokensExplorer,
  }))
);
const ArchitectureExplorer = lazy(() =>
  import('./components/foundation/ArchitectureExplorer').then((m) => ({
    default: m.ArchitectureExplorer,
  }))
);
const ComponentRegistry = lazy(() =>
  import('./components/foundation/ComponentRegistry').then((m) => ({
    default: m.ComponentRegistry,
  }))
);
const ShopifyRoadmap = lazy(() =>
  import('./components/foundation/ShopifyRoadmap').then((m) => ({
    default: m.ShopifyRoadmap,
  }))
);
const CategoryRoadmap = lazy(() =>
  import('./components/foundation/CategoryRoadmap').then((m) => ({
    default: m.CategoryRoadmap,
  }))
);
const RequirementsChecklist = lazy(() =>
  import('./components/foundation/RequirementsChecklist').then((m) => ({
    default: m.RequirementsChecklist,
  }))
);

export type { WorkflowView };

const PageSuspenseFallback: React.FC = () => (
  <div
    role="status"
    aria-live="polite"
    className="min-h-[70vh] bg-[#F4F1EA] flex items-center justify-center p-8"
  >
    <div className="text-center space-y-2">
      <span className="font-editorial text-2xl tracking-[0.25em] uppercase text-[#171717] block">
        RAVIO
      </span>
      <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#77736C] block">
        Loading Flagship Experience...
      </span>
    </div>
  </div>
);

export default function App() {
  const initialRoute = parseRouteFromPathname(window.location.pathname);
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowView>(initialRoute.view);
  const [selectedProductHandle, setSelectedProductHandle] = useState<string>(
    initialRoute.productHandle || 'essential-polo'
  );
  const [activeFoundationTab, setActiveFoundationTab] = useState<FoundationTab>('overview');

  // Dynamic SEO & Metadata per active route (including product-specific Schema.org JSON-LD on PDP)
  const seoConfig = useMemo(() => {
    if (activeWorkflow === 'pdp') {
      const product =
        SAMPLE_CATALOG.find((p) => p.handle === selectedProductHandle) || SAMPLE_CATALOG[0];
      return getProductSEOConfig(product);
    }
    return ROUTE_SEO_CONFIG[activeWorkflow] || ROUTE_SEO_CONFIG['homepage'];
  }, [activeWorkflow, selectedProductHandle]);

  usePageSEO(seoConfig);

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromPathname(window.location.pathname);
      setActiveWorkflow(parsed.view);
      if (parsed.productHandle) {
        setSelectedProductHandle(parsed.productHandle);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: WorkflowView, customPath?: string) => {
    setActiveWorkflow(view);
    const targetPath =
      customPath ||
      (view === 'pdp' ? `/product/${selectedProductHandle}` : VIEW_TO_PATH[view]) ||
      '/';
    if (window.location.pathname !== targetPath) {
      try {
        window.history.pushState({}, '', targetPath);
      } catch {
        // Fallback if sandbox blocks pushState
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectProduct = (handle: string) => {
    setSelectedProductHandle(handle);
    navigateTo('pdp', `/product/${handle}`);
  };

  const handleNavigateCollection = (slug: string) => {
    if (slug === 'polo') navigateTo('collection-polo');
    else if (slug === 'essentials') navigateTo('collection-essentials');
    else if (slug === 'new-arrivals') navigateTo('collection-new-arrivals');
    else navigateTo('shop');
  };

  const handleNavigateEditorial = (route: BrandEditorialRoute) => {
    navigateTo(route);
  };

  const sharedEditorialProps = {
    onNavigateHome: () => navigateTo('homepage'),
    onNavigateShop: () => navigateTo('shop'),
    onNavigateCollection: handleNavigateCollection,
    onSelectProduct: handleSelectProduct,
    onNavigateCart: () => navigateTo('cart'),
    onNavigateCheckout: () => navigateTo('checkout'),
    onNavigateEditorial: handleNavigateEditorial,
  };

  return (
    <CartProvider>
      <div className="ravio-theme min-h-screen bg-[#F4F1EA] text-[#171717] flex flex-col font-sans-clean selection:bg-[#B7A17A]/25">
        {/* Main Workflow View with Route-Level Suspense */}
        <Suspense fallback={<PageSuspenseFallback />}>
          {activeWorkflow === 'our-story' ? (
            <OurStoryView {...sharedEditorialProps} />
          ) : activeWorkflow === 'the-ravio-standard' ? (
            <RavioStandardView {...sharedEditorialProps} />
          ) : activeWorkflow === 'philosophy' ? (
            <PhilosophyView {...sharedEditorialProps} />
          ) : activeWorkflow === 'cart' ? (
            <CartView
              onNavigateHome={() => navigateTo('homepage')}
              onNavigateShop={() => navigateTo('shop')}
              onNavigateCollection={handleNavigateCollection}
              onNavigateCheckout={() => navigateTo('checkout')}
              onSelectProduct={handleSelectProduct}
              onNavigateEditorial={handleNavigateEditorial}
            />
          ) : activeWorkflow === 'checkout' ? (
            <CheckoutView
              onNavigateHome={() => navigateTo('homepage')}
              onNavigateShop={() => navigateTo('shop')}
              onNavigateCollection={handleNavigateCollection}
              onNavigateCart={() => navigateTo('cart')}
              onSelectProduct={handleSelectProduct}
              onNavigateEditorial={handleNavigateEditorial}
            />
          ) : activeWorkflow === 'pdp' ? (
            <ProductDetailView
              productHandle={selectedProductHandle}
              onNavigateHome={() => navigateTo('homepage')}
              onNavigateShop={() => navigateTo('shop')}
              onNavigateCollection={handleNavigateCollection}
              onSelectProduct={handleSelectProduct}
              onNavigateCart={() => navigateTo('cart')}
              onNavigateCheckout={() => navigateTo('checkout')}
              onNavigateEditorial={handleNavigateEditorial}
            />
          ) : activeWorkflow === 'homepage' ? (
            <HomepageView
              onNavigateShop={() => navigateTo('shop')}
              onNavigateCollection={handleNavigateCollection}
              onSelectProduct={handleSelectProduct}
              onNavigateCart={() => navigateTo('cart')}
              onNavigateCheckout={() => navigateTo('checkout')}
              onNavigateEditorial={handleNavigateEditorial}
            />
          ) : activeWorkflow === 'shop' ? (
            <ShopView
              onNavigateHome={() => navigateTo('homepage')}
              onNavigateCollection={handleNavigateCollection}
              onSelectProduct={handleSelectProduct}
              onNavigateCart={() => navigateTo('cart')}
              onNavigateCheckout={() => navigateTo('checkout')}
              onNavigateEditorial={handleNavigateEditorial}
              initialCollection="all"
            />
          ) : activeWorkflow === 'collection-polo' ? (
            <CollectionView
              collectionKey="polo"
              onNavigateHome={() => navigateTo('homepage')}
              onNavigateShop={() => navigateTo('shop')}
              onNavigateCollection={handleNavigateCollection}
              onSelectProduct={handleSelectProduct}
              onNavigateCart={() => navigateTo('cart')}
              onNavigateCheckout={() => navigateTo('checkout')}
              onNavigateEditorial={handleNavigateEditorial}
            />
          ) : activeWorkflow === 'collection-essentials' ? (
            <CollectionView
              collectionKey="essentials"
              onNavigateHome={() => navigateTo('homepage')}
              onNavigateShop={() => navigateTo('shop')}
              onNavigateCollection={handleNavigateCollection}
              onSelectProduct={handleSelectProduct}
              onNavigateCart={() => navigateTo('cart')}
              onNavigateCheckout={() => navigateTo('checkout')}
              onNavigateEditorial={handleNavigateEditorial}
            />
          ) : activeWorkflow === 'collection-new-arrivals' ? (
            <CollectionView
              collectionKey="new-arrivals"
              onNavigateHome={() => navigateTo('homepage')}
              onNavigateShop={() => navigateTo('shop')}
              onNavigateCollection={handleNavigateCollection}
              onSelectProduct={handleSelectProduct}
              onNavigateCart={() => navigateTo('cart')}
              onNavigateCheckout={() => navigateTo('checkout')}
              onNavigateEditorial={handleNavigateEditorial}
            />
          ) : activeWorkflow === 'design-system' ? (
            <DesignSystemPreview />
          ) : activeWorkflow === 'foundation-architecture' ? (
            <>
              <FoundationHeader
                activeTab={activeFoundationTab}
                onTabChange={setActiveFoundationTab}
              />

              <main id="main-content" className="flex-1">
                {activeFoundationTab === 'overview' && <BrandSummaryView />}
                {activeFoundationTab === 'tokens' && <TokensExplorer />}
                {activeFoundationTab === 'architecture' && <ArchitectureExplorer />}
                {activeFoundationTab === 'components' && <ComponentRegistry />}
                {activeFoundationTab === 'shopify' && <ShopifyRoadmap />}
                {activeFoundationTab === 'categories' && <CategoryRoadmap />}
                {activeFoundationTab === 'checklist' && (
                  <RequirementsChecklist onSelectTab={(tab) => setActiveFoundationTab(tab)} />
                )}
              </main>
            </>
          ) : (
            <NotFoundView
              requestedPath={window.location.pathname}
              {...sharedEditorialProps}
            />
          )}
        </Suspense>
      </div>
    </CartProvider>
  );
}
