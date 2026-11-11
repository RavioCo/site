import React, { useState } from 'react';
import { REUSABLE_COMPONENTS_INVENTORY } from '../../data/architectureBlueprint';
import { SAMPLE_CATALOG } from '../../data/sampleCatalog';
import { Container } from '../common/Container';
import { EditorialKicker, EditorialHeading, EditorialBody, EditorialQuote } from '../common/Typography';
import { Button } from '../common/Button';
import { BrandLogo } from '../common/BrandLogo';
import { HairlineDivider } from '../common/HairlineDivider';
import { ProductCard } from '../product/ProductCard';
import { Product } from '../../types/product';
import { Check, ShieldCheck, ArrowRight, Eye, Code2 } from 'lucide-react';

export const ComponentRegistry: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCurrency, setActiveCurrency] = useState<'BDT' | 'USD'>('BDT');
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);

  const categories = ['All', 'Foundation / Atoms', 'Molecules', 'Organisms', 'Commerce Modules'];

  const filteredComponents =
    selectedCategory === 'All'
      ? REUSABLE_COMPONENTS_INVENTORY
      : REUSABLE_COMPONENTS_INVENTORY.filter((c) => c.category === selectedCategory);

  return (
    <div className="py-12 space-y-16">
      {/* Introduction */}
      <Container width="content">
        <div className="space-y-4">
          <EditorialKicker variant="gold">Component Inventory</EditorialKicker>
          <EditorialHeading size="title" variant="charcoal">
            Reusable Component Registry & Live Sandboxes
          </EditorialHeading>
          <EditorialBody size="base" variant="muted">
            Every component is built mobile-first, strictly adheres to the Zero-Pill and Anti-Slop constitution, and is prepared for headless Shopify catalog data binding.
          </EditorialBody>
        </div>
      </Container>

      {/* Interactive Live Sandbox Section */}
      <Container width="flagship">
        <div className="space-y-6">
          <div className="border-b border-[#171717]/10 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-editorial text-2xl text-[#171717]">
                Live Component Sandbox
              </h3>
              <p className="text-xs text-[#7E776F] font-sans">
                Real interactive rendering of foundation atoms, buttons, and product cards.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#7E776F]">
                Currency Toggle:
              </span>
              <div className="flex items-center bg-[#E5E0D8] p-0.5 rounded-xs">
                <button
                  onClick={() => setActiveCurrency('BDT')}
                  className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                    activeCurrency === 'BDT' ? 'bg-[#171717] text-[#F4F1EA]' : 'text-[#171717]'
                  }`}
                >
                  BDT (৳)
                </button>
                <button
                  onClick={() => setActiveCurrency('USD')}
                  className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                    activeCurrency === 'USD' ? 'bg-[#171717] text-[#F4F1EA]' : 'text-[#171717]'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Buttons & Typography Primitives */}
            <div className="lg:col-span-5 space-y-6">
              {/* Brand Logo Sandbox */}
              <div className="bg-white p-6 border border-[#171717]/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#7E776F]">
                  <span>Component: BrandLogo.tsx</span>
                  <span className="text-[#B7A17A]">Temporary Text Identifier</span>
                </div>
                <div className="p-6 bg-[#FAF8F5] border border-[#171717]/5 flex flex-col items-center justify-center">
                  <BrandLogo size="md" showSubtitle={true} showTempIdentifier={true} />
                </div>
                <p className="text-xs text-[#7E776F]">
                  Clearly states "Temporary Typographic Identifier" per prompt rules. No fake invented vector shapes.
                </p>
              </div>

              {/* Button Variants Sandbox */}
              <div className="bg-white p-6 border border-[#171717]/10 space-y-5">
                <div className="flex items-center justify-between text-xs font-mono text-[#7E776F]">
                  <span>Component: Button.tsx</span>
                  <span className="text-[#B7A17A]">Anti-Pill Geometry</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#7E776F] block mb-1.5">Primary (Charcoal)</span>
                    <Button variant="primary" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Explore Collection
                    </Button>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#7E776F] block mb-1.5">Secondary (Ivory Canvas)</span>
                    <Button variant="secondary">
                      Inquire With Concierge
                    </Button>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#7E776F] block mb-1.5">Outline (1px Hairline)</span>
                    <Button variant="outline">
                      View Material Specification
                    </Button>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#7E776F] block mb-1.5">Editorial Underline</span>
                    <Button variant="underline">
                      The Story of Elevation Refined
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#171717]/5 text-xs text-[#7E776F]">
                  Strict 2:1 horizontal-to-vertical padding math, no bubbly pills, subtle 350ms easing.
                </div>
              </div>
            </div>

            {/* Right: Live Product Card Sandbox */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 border border-[#171717]/10 space-y-5">
                <div className="flex items-center justify-between text-xs font-mono text-[#7E776F]">
                  <span>Component: ProductCard.tsx</span>
                  <span className="text-emerald-800">Launch Archetype Preview</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {SAMPLE_CATALOG.slice(0, 2).map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      currency={activeCurrency}
                      onQuickView={(p) => setInspectedProduct(p)}
                    />
                  ))}
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 text-xs text-[#7E776F] flex items-center justify-between">
                  <span>Hover to test photography transition (Hero to Editorial).</span>
                  <span className="font-mono text-[11px] text-[#171717]">Local Market BDT ৳ Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Full Component Specifications Inventory Table */}
      <Container width="flagship">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#171717]/10 pb-4">
            <div>
              <h3 className="font-editorial text-2xl text-[#171717]">
                Core Component Inventory & Props Contracts
              </h3>
              <p className="text-xs text-[#7E776F] font-sans">
                Formalized interfaces guaranteeing clean maintainability across future development turns.
              </p>
            </div>

            {/* Category Filter Controls (Functional Button Tabs) */}
            <div className="flex flex-wrap gap-1 bg-[#EBE7DF] p-1 rounded-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#171717] text-[#F4F1EA] font-medium'
                      : 'text-[#7E776F] hover:text-[#171717]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredComponents.map((spec) => (
              <div
                key={spec.name}
                className="bg-white border border-[#171717]/10 p-6 flex flex-col justify-between space-y-4 hover:border-[#171717]/30 transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B7A17A]">
                      {spec.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 ${
                        spec.status === 'ready-in-foundation'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {spec.status === 'ready-in-foundation' ? 'Ready in Foundation' : 'Scaffolded'}
                    </span>
                  </div>

                  <h4 className="font-editorial text-xl text-[#171717]">{spec.name}</h4>
                  <p className="text-xs font-mono text-[#7E776F]">{spec.path}</p>
                  <p className="text-xs text-[#171717]/80 leading-relaxed">{spec.purpose}</p>

                  <div className="bg-[#FAF8F5] p-3 border border-[#171717]/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7E776F] block">
                      TypeScript Props Interface:
                    </span>
                    <code className="text-[11px] font-mono text-[#171717] break-all block">
                      {spec.propsContract}
                    </code>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#171717]/10 space-y-1.5">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#7E776F] block">
                    Anti-Slop Guarantees:
                  </span>
                  <div className="space-y-1">
                    {spec.antiSlopGuarantees.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#171717]/70">
                        <Check className="w-3 h-3 text-[#B7A17A] flex-shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Modal for Quick View Inspection */}
      {inspectedProduct && (
        <div className="fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full border border-[#171717]/20 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectedProduct(null)}
              className="absolute top-4 right-4 text-[#7E776F] hover:text-[#171717] text-xs font-mono p-1"
            >
              ✕ Close
            </button>

            <div className="flex items-start gap-6">
              <img
                src={inspectedProduct.imageUrls.hero}
                alt={inspectedProduct.title}
                className="w-32 h-40 object-cover bg-[#FAF8F5] border border-[#171717]/10 flex-shrink-0"
              />
              <div className="space-y-2">
                <EditorialKicker variant="gold">{inspectedProduct.editorialKicker}</EditorialKicker>
                <h3 className="font-editorial text-2xl text-[#171717]">{inspectedProduct.title}</h3>
                <p className="text-base font-sans font-medium text-[#171717]">
                  {activeCurrency === 'BDT' ? inspectedProduct.price.formattedBDT : inspectedProduct.price.formattedUSD}
                </p>
                <p className="text-xs text-[#7E776F]">{inspectedProduct.composition}</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#171717]/10">
              <h4 className="text-xs font-sans uppercase tracking-[0.18em] text-[#171717] font-semibold">
                Craft Details:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#171717]/80">
                {inspectedProduct.craftDetails.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#B7A17A]">—</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#171717]/10 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setInspectedProduct(null)}>
                Close Inspection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
