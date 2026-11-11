import React, { useState } from 'react';
import { SHOPIFY_INTEGRATION_ROADMAP } from '../../data/architectureBlueprint';
import { SHOPIFY_GRAPHQL_QUERIES } from '../../services/shopify/queries';
import { Container } from '../common/Container';
import { EditorialKicker, EditorialHeading, EditorialBody } from '../common/Typography';
import { HairlineDivider } from '../common/HairlineDivider';
import { ShoppingBag, ArrowRight, ShieldCheck, Lock, CreditCard, RefreshCw, Server, Code } from 'lucide-react';

export const ShopifyRoadmap: React.FC = () => {
  const [activeQueryKey, setActiveQueryKey] = useState<'collection' | 'product' | 'cart'>('cart');

  return (
    <div className="py-12 space-y-16">
      {/* Title & Introduction */}
      <Container width="content">
        <div className="space-y-4">
          <EditorialKicker variant="gold">Integration Architecture</EditorialKicker>
          <EditorialHeading size="title" variant="charcoal">
            Shopify Headless Commerce Specification
          </EditorialHeading>
          <EditorialBody size="base" variant="muted">
            RAVIO utilizes a headless commerce architecture. The frontend digital flagship delivers editorial storytelling, fluid layouts, and brand prestige, while Shopify powers inventory, catalog persistence, and PCI-DSS compliant checkout. No fabricated payment processing or mock backend illusions are built.
          </EditorialBody>
        </div>
      </Container>

      {/* High Level Architecture Flow Diagram */}
      <Container width="flagship">
        <div className="bg-[#171717] text-[#F4F1EA] p-8 sm:p-12 border border-[#171717] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F4F1EA]/15 pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B7A17A]">
                Headless Topology
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F1EA] mt-1">
                Data & Transaction Lifecycle
              </h3>
            </div>
            <span className="text-xs font-mono text-[#F4F1EA]/60">
              Clean Separation: Client UI ➔ Storefront API ➔ Shopify Checkout
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 bg-[#212121] border border-[#F4F1EA]/10 space-y-3 relative">
              <span className="text-xs font-mono text-[#B7A17A]">Step 01</span>
              <h4 className="font-editorial text-xl text-[#F4F1EA]">
                Editorial Client Discovery
              </h4>
              <p className="text-xs text-[#F4F1EA]/70 leading-relaxed">
                Client displays high-res lookbooks, material provenance, and currency-aware pricing in BDT (৳) and USD ($).
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#B7A17A]">
                React + TypeScript SPA
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-[#212121] border border-[#F4F1EA]/10 space-y-3 relative">
              <span className="text-xs font-mono text-[#B7A17A]">Step 02</span>
              <h4 className="font-editorial text-xl text-[#F4F1EA]">
                Storefront API GraphQL
              </h4>
              <p className="text-xs text-[#F4F1EA]/70 leading-relaxed">
                Cart mutations execute over HTTPS GraphQL using public Storefront API access token. Cart ID persists locally.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#B7A17A]">
                Shopify Storefront API 2025-01
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-[#212121] border border-[#F4F1EA]/10 space-y-3 relative">
              <span className="text-xs font-mono text-[#B7A17A]">Step 03</span>
              <h4 className="font-editorial text-xl text-[#F4F1EA]">
                Secure Hosted Checkout
              </h4>
              <p className="text-xs text-[#F4F1EA]/70 leading-relaxed">
                Customer is redirected to Shopify hosted checkout with Bangladesh localized payment gateway (bKash / Cards).
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#B7A17A]">
                SSLCommerz / bKash / Stripe
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 6-Phase Technical Integration Roadmap */}
      <Container width="flagship">
        <div className="space-y-6">
          <div className="border-b border-[#171717]/10 pb-3">
            <h3 className="font-editorial text-2xl text-[#171717]">
              Technical Milestones & Integration Deliverables
            </h3>
            <p className="text-xs text-[#7E776F] font-sans">
              Exact technical steps required when connecting the live Shopify admin credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOPIFY_INTEGRATION_ROADMAP.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white border border-[#171717]/10 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#B7A17A] font-semibold">
                      {step.stepNumber}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 ${
                        step.status === 'foundation-ready'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {step.status === 'foundation-ready' ? 'Ready in Code' : 'Credentials Needed'}
                    </span>
                  </div>

                  <h4 className="font-editorial text-lg text-[#171717]">{step.name}</h4>
                  <p className="text-xs font-mono text-[#7E776F]">Layer: {step.layer}</p>
                  <p className="text-xs text-[#171717]/80 leading-relaxed">{step.description}</p>
                </div>

                <div className="pt-3 border-t border-[#171717]/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7E776F] block mb-1">
                    Deliverable:
                  </span>
                  <p className="text-xs font-mono text-[#171717] bg-[#FAF8F5] p-2 border border-[#171717]/5 break-all">
                    {step.technicalDeliverable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bangladesh Market Commerce Protocol */}
      <Container width="flagship">
        <div className="bg-white border border-[#171717]/10 p-8 space-y-6">
          <div className="border-b border-[#171717]/10 pb-4 flex items-center justify-between">
            <div>
              <EditorialKicker variant="gold">Local Operations Protocol</EditorialKicker>
              <h3 className="font-editorial text-2xl text-[#171717]">
                Bangladesh Market Architecture (Dhaka Concierge & Nationwide)
              </h3>
            </div>
            <CreditCard className="w-6 h-6 text-[#B7A17A]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-editorial text-lg text-[#171717]">01. Currency & Pricing</h4>
              <p className="text-xs text-[#7E776F] leading-relaxed">
                Products have explicit BDT amounts (e.g. ৳ 6,500) formatted using Bengali numeral conventions without awkward decimals. Optional USD switch for international patrons.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-editorial text-lg text-[#171717]">02. Gateway Integration</h4>
              <p className="text-xs text-[#7E776F] leading-relaxed">
                Via Shopify Payment Gateways for Bangladesh (SSLCommerz, PortPos, or bKash Merchant API), enabling direct MFS (bKash, Nagad, Rocket) and credit card transactions.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-editorial text-lg text-[#171717]">03. Fulfillment & COD</h4>
              <p className="text-xs text-[#7E776F] leading-relaxed">
                Dhaka metro concierge delivery with Cash on Delivery (COD) threshold rules, combined with insured courier delivery for Chittagong, Sylhet, and nationwide districts.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* GraphQL Query Inspector */}
      <Container width="flagship">
        <div className="bg-white border border-[#171717]/10 p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#171717]/10 pb-3">
            <div>
              <h3 className="font-editorial text-xl text-[#171717]">
                GraphQL Query Specifications (/src/services/shopify/queries.ts)
              </h3>
              <p className="text-xs text-[#7E776F]">
                Standardized queries already committed to the repository for headless integration.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-[#EBE7DF] p-1 rounded-xs">
              <button
                onClick={() => setActiveQueryKey('cart')}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  activeQueryKey === 'cart' ? 'bg-[#171717] text-[#F4F1EA]' : 'text-[#7E776F]'
                }`}
              >
                cartCreate / cartLinesAdd
              </button>
              <button
                onClick={() => setActiveQueryKey('product')}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  activeQueryKey === 'product' ? 'bg-[#171717] text-[#F4F1EA]' : 'text-[#7E776F]'
                }`}
              >
                getProductByHandle
              </button>
              <button
                onClick={() => setActiveQueryKey('collection')}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  activeQueryKey === 'collection' ? 'bg-[#171717] text-[#F4F1EA]' : 'text-[#7E776F]'
                }`}
              >
                getCollectionByHandle
              </button>
            </div>
          </div>

          <pre className="p-4 bg-[#171717] text-[#B7A17A] text-xs font-mono overflow-x-auto max-h-72 border border-[#171717]/20">
            {activeQueryKey === 'cart'
              ? SHOPIFY_GRAPHQL_QUERIES.cartCreate
              : activeQueryKey === 'product'
              ? SHOPIFY_GRAPHQL_QUERIES.getProductByHandle
              : SHOPIFY_GRAPHQL_QUERIES.getCollectionByHandle}
          </pre>
        </div>
      </Container>
    </div>
  );
};
