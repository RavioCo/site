import React, { useState } from 'react';
import { RAVIO_TOKENS } from '../../tokens/tokens';
import { SAMPLE_CATALOG } from '../../data/sampleCatalog';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';
import { PrimaryButton } from '../common/PrimaryButton';
import { SecondaryButton } from '../common/SecondaryButton';
import { OutlineButton } from '../common/OutlineButton';
import { TextLink } from '../common/TextLink';
import { IconButton } from '../common/IconButton';
import { SectionHeading } from '../common/SectionHeading';
import { HairlineDivider } from '../common/HairlineDivider';
import { EditorialKicker, EditorialHeading, EditorialBody } from '../common/Typography';
import { ProductCard } from '../product/ProductCard';
import { ProductGrid } from '../product/ProductGrid';
import { EditorialImage } from '../editorial/EditorialImage';
import { CollectionBanner } from '../editorial/CollectionBanner';
import { NewsletterForm } from '../editorial/NewsletterForm';
import { SiteHeader } from '../navigation/SiteHeader';
import { SiteFooter } from '../navigation/SiteFooter';
import { Product } from '../../types/product';
import {
  Palette,
  Type,
  MousePointerClick,
  Layout,
  Image as ImageIcon,
  Compass,
  FileCheck,
  Check,
  Copy,
  AlertTriangle,
  ArrowRight,
  Search,
  ShoppingBag,
  User,
  Sliders,
  ExternalLink,
} from 'lucide-react';

export type PreviewSection =
  | 'overview'
  | 'colors'
  | 'typography'
  | 'buttons'
  | 'navigation'
  | 'product-cards'
  | 'images'
  | 'spacing'
  | 'editorial-forms';

export const DesignSystemPreview: React.FC = () => {
  const [activeSection, setActiveSection] = useState<PreviewSection>('overview');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [testCurrency, setTestCurrency] = useState<'BDT' | 'USD'>('BDT');
  const [buttonLoadingState, setButtonLoadingState] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const sections: { id: PreviewSection; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'System Overview & Decisions', icon: <Compass className="w-4 h-4" /> },
    { id: 'colors', label: 'Color System', icon: <Palette className="w-4 h-4" /> },
    { id: 'typography', label: 'Typography Hierarchy', icon: <Type className="w-4 h-4" /> },
    { id: 'buttons', label: 'Button States (5 States)', icon: <MousePointerClick className="w-4 h-4" /> },
    { id: 'navigation', label: 'Navigation System', icon: <Layout className="w-4 h-4" /> },
    { id: 'product-cards', label: 'Product Card & Grid', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'images', label: 'Image Ratios & Banners', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'spacing', label: 'Spacing & Containers', icon: <Sliders className="w-4 h-4" /> },
    { id: 'editorial-forms', label: 'Editorial & Newsletter', icon: <FileCheck className="w-4 h-4" /> },
  ];

  const primaryColors = [
    { key: 'charcoal', name: 'Charcoal', hex: '#171717', rgb: '23, 23, 23', role: 'Primary Dark, Text, Inverted Canvas, Buttons' },
    { key: 'ivory', name: 'Warm Ivory', hex: '#F4F1EA', rgb: '244, 241, 234', role: 'Signature Atmospheric Canvas, Primary Background' },
    { key: 'white', name: 'Pure White', hex: '#FFFFFF', rgb: '255, 255, 255', role: 'Product Display Planes, High-Clarity Surfaces' },
  ];

  const secondaryColors = [
    { key: 'gold', name: 'Muted Gold', hex: '#B7A17A', rgb: '183, 161, 122', role: 'Restrained Craft Accent, Active Marker. Used sparingly.' },
    { key: 'stone', name: 'Soft Stone', hex: '#E8E4DC', rgb: '232, 228, 220', role: 'Secondary Background, Neutral Card Fill, Dividers' },
    { key: 'grey', name: 'Warm Grey', hex: '#77736C', rgb: '119, 115, 108', role: 'Secondary Typography, Metadata, Hairlines' },
  ];

  const feedbackColors = [
    { key: 'error', name: 'Restrained Bordeaux', hex: '#9E3B3B', role: 'Error notices, validation alerts (non-garish)' },
    { key: 'success', name: 'Forest Sage', hex: '#3D6E50', role: 'Success confirmations, order inscription status' },
    { key: 'warning', name: 'Brass Amber', hex: '#A37237', role: 'Low inventory advisories, attention markers' },
  ];

  const unresolvedDecisions = [
    {
      id: 'dec-1',
      title: 'Official Vector Logo Asset Approval',
      status: 'Pending Brand Owner',
      description: 'The current implementation uses a clearly identified provisional text-based logo ("RAVIO & CO."). The official vector logotype, monogram icon, and trademark registrations from Ravio & Co. will replace this component upon delivery.',
      actionNeeded: 'Ravio & Co. creative team to supply official SVG/EPS vector brand package.',
    },
    {
      id: 'dec-2',
      title: 'Official Pantone / Hex Lock & Dye Matching',
      status: 'Provisional References Active',
      description: 'The current palette references (#171717 Charcoal, #F4F1EA Warm Ivory, #B7A17A Muted Gold, #E8E4DC Soft Stone, #77736C Warm Grey) are provisional. They must be cross-referenced with physical garment fabric dye lots and packaging papers.',
      actionNeeded: 'Sign-off on digital color coordinates matched to physical fabric swatches.',
    },
    {
      id: 'dec-3',
      title: 'Bangladesh Local Gateway & COD Thresholds',
      status: 'Integration Blueprint Prepared',
      description: 'Technical contracts are ready for SSLCommerz / PortPos / bKash merchant gateway. Brand owner must decide whether to mandate advance prepayment for high-value selvedge and tailoring orders in Dhaka.',
      actionNeeded: 'Finance & fulfillment policy confirmation on Cash-On-Delivery threshold limits.',
    },
    {
      id: 'dec-4',
      title: 'Typography Web Font Licensing Confirmation',
      status: 'Google Fonts Active (Cormorant Garamond & Plus Jakarta Sans)',
      description: 'Cormorant Garamond and Plus Jakarta Sans provide exceptional editorial presence. If Ravio & Co. holds proprietary corporate font licenses (e.g. Canela, GT America, Minion Pro), font-family mappings will be adjusted.',
      actionNeeded: 'Confirm whether Google Fonts pairing is approved or proprietary web fonts are required.',
    },
    {
      id: 'dec-5',
      title: 'Photography Art Direction Guidelines',
      status: 'Aspect Ratios Standardized (3:4, 4:5, 1:1, 16:9, 21:9)',
      description: 'The 5 standard aspect ratios are locked into the design system. Production photoshoots must provide raw 3:4 crops with warm neutral studio backdrops honoring the warm ivory (#F4F1EA) ambient light.',
      actionNeeded: 'Supply official lookbook image assets for the launch collection.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171717] pb-24">
      {/* Internal Design System Preview Bar */}
      <div className="bg-[#171717] text-[#F4F1EA] py-2 px-4 border-b border-[#F4F1EA]/10">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#B7A17A] bg-[#2A2A2A] px-2 py-0.5 uppercase tracking-wider">
              Internal Reference
            </span>
            <span className="font-sans font-medium text-xs">
              RAVIO Design System Specification (Step 02)
            </span>
          </div>
          <div className="text-[11px] font-sans text-[#F4F1EA]/60">
            For Creative Director, UI/UX, & Engineering Alignment · Not a Public Customer Page
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="border-b border-[#171717]/10 bg-white py-10 px-4 sm:px-8">
        <Container width="flagship">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <EditorialKicker variant="gold">Creative Direction & UI/UX</EditorialKicker>
              <h1 className="font-editorial text-4xl sm:text-5xl text-[#171717] font-normal leading-tight">
                RAVIO Visual Design System
              </h1>
              <p className="font-sans text-sm sm:text-base text-[#77736C] font-light leading-relaxed">
                Production-quality tokens, semantic color models, responsive typography, 5-state buttons, navigation architecture, and reusable editorial components for Ravio & Co.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#FAF8F5] p-3 border border-[#171717]/10">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#77736C] block">
                  Interactive Currency Test
                </span>
                <span className="text-xs font-mono font-medium text-[#171717]">
                  Pricing Mode: {testCurrency}
                </span>
              </div>
              <div className="flex items-center bg-[#E8E4DC] p-0.5 border border-[#171717]/10">
                <button
                  onClick={() => setTestCurrency('BDT')}
                  className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                    testCurrency === 'BDT' ? 'bg-[#171717] text-[#F4F1EA]' : 'text-[#77736C]'
                  }`}
                >
                  BDT (৳)
                </button>
                <button
                  onClick={() => setTestCurrency('USD')}
                  className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                    testCurrency === 'USD' ? 'bg-[#171717] text-[#F4F1EA]' : 'text-[#77736C]'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Sticky Sub-Navigation for the 9 Design System Sections */}
      <nav className="sticky top-0 z-30 bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#171717]/10 overflow-x-auto scrollbar-none py-1 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center gap-1 sm:gap-2">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs font-sans uppercase tracking-[0.12em] whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-[#171717] text-[#171717] font-semibold bg-white/40'
                    : 'border-transparent text-[#77736C] hover:text-[#171717] hover:border-[#171717]/20'
                }`}
              >
                <span className={isActive ? 'text-[#B7A17A]' : 'text-[#77736C]/70'}>
                  {sec.icon}
                </span>
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Preview Content */}
      <main className="pt-10">
        {/* ============================================================== */}
        {/* 1. OVERVIEW & UNRESOLVED DECISIONS                             */}
        {/* ============================================================== */}
        {activeSection === 'overview' && (
          <div className="space-y-16">
            <Container width="flagship">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Brand Positioning */}
                <div className="lg:col-span-5 bg-white border border-[#171717]/10 p-8 space-y-6">
                  <Logo size="lg" showSubtitle={true} showProvisionalNotice={true} />
                  <EditorialKicker variant="gold">Positioning & Aesthetics</EditorialKicker>
                  <h3 className="font-editorial text-3xl text-[#171717]">
                    Quiet Luxury Without Artificial Pretense
                  </h3>
                  <p className="font-sans text-sm text-[#171717]/85 leading-relaxed font-light">
                    RAVIO is established as a modern premium lifestyle house built around refinement, quality, intention, craftsmanship, and enduring value.
                  </p>
                  <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736C] block">
                      Core Visual Attributes:
                    </span>
                    <ul className="text-xs text-[#171717]/80 space-y-1.5">
                      <li className="flex items-center gap-2"><span className="text-[#B7A17A] font-bold">—</span> Quiet confidence & timeless sophistication</li>
                      <li className="flex items-center gap-2"><span className="text-[#B7A17A] font-bold">—</span> Modern refinement & authentic quality</li>
                      <li className="flex items-center gap-2"><span className="text-[#B7A17A] font-bold">—</span> Understated luxury & editorial elegance</li>
                      <li className="flex items-center gap-2"><span className="text-[#B7A17A] font-bold">—</span> Zero artificial luxury slop (no cheap gradients, no fake countdowns)</li>
                    </ul>
                  </div>
                </div>

                {/* 5 Unresolved Decisions Requiring Brand-Owner Approval */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="border-b border-[#171717]/10 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#171717]">
                        Decisions Requiring Brand-Owner Approval
                      </h3>
                      <p className="text-xs text-[#77736C]">
                        Key items to confirm before launching Stage 3 (Full Homepage & Catalog).
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-1 border border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      5 Governance Items
                    </span>
                  </div>

                  <div className="space-y-4">
                    {unresolvedDecisions.map((dec) => (
                      <div
                        key={dec.id}
                        className="bg-white border border-[#171717]/10 p-5 space-y-2.5 transition-all hover:border-[#171717]/30"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="font-editorial text-lg text-[#171717] font-medium">
                            {dec.title}
                          </h4>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#FAF8F5] border border-[#171717]/10 text-[#77736C]">
                            {dec.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#171717]/80 leading-relaxed font-sans">
                          {dec.description}
                        </p>
                        <div className="pt-2 border-t border-[#171717]/5 flex items-start gap-1.5 text-[11px] text-[#B7A17A] font-mono">
                          <span className="font-bold">Next Action:</span>
                          <span>{dec.actionNeeded}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. COLOR SYSTEM                                                */}
        {/* ============================================================== */}
        {activeSection === 'colors' && (
          <div className="space-y-12">
            <Container width="content">
              <SectionHeading
                kicker="Section 02"
                title="The Restrained Color System"
                subtitle="Charcoal, Warm Ivory, and Pure White form the foundational canvas. Soft Stone and Warm Grey provide structural neutrality. Muted Gold is reserved exclusively for fine craft accents."
              />
            </Container>

            {/* Primary Colors */}
            <Container width="flagship">
              <div className="space-y-4">
                <div className="border-b border-[#171717]/10 pb-2 flex items-center justify-between">
                  <h3 className="font-editorial text-2xl text-[#171717]">Primary Palette</h3>
                  <span className="text-xs font-mono text-[#77736C]">3 Foundational Tokens</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {primaryColors.map((color) => (
                    <div key={color.key} className="bg-white border border-[#171717]/10 p-5 space-y-4">
                      <div
                        className="h-32 w-full flex items-end justify-between p-3 border border-[#171717]/10"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span
                          className={`text-xs font-mono font-medium px-2 py-0.5 ${
                            color.hex === '#171717' ? 'text-white bg-black/40' : 'text-[#171717] bg-white/80'
                          }`}
                        >
                          {color.hex}
                        </span>
                        <button
                          onClick={() => handleCopy(color.hex, color.key)}
                          className={`text-[10px] font-mono px-2 py-0.5 flex items-center gap-1 ${
                            color.hex === '#171717' ? 'text-white hover:bg-white/10' : 'text-[#171717] hover:bg-black/5'
                          }`}
                        >
                          {copiedToken === color.key ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedToken === color.key ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-editorial text-xl text-[#171717]">{color.name}</h4>
                        <p className="text-xs text-[#77736C] leading-relaxed">{color.role}</p>
                        <div className="pt-2 text-[11px] font-mono text-[#171717]/60">
                          RGB: {color.rgb}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>

            {/* Secondary Colors */}
            <Container width="flagship">
              <div className="space-y-4">
                <div className="border-b border-[#171717]/10 pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#171717]">Secondary Palette</h3>
                    <p className="text-xs text-[#77736C]">Muted Gold (#B7A17A), Soft Stone (#E8E4DC), Warm Grey (#77736C)</p>
                  </div>
                  <span className="text-xs font-mono text-[#77736C]">3 Secondary Tokens</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {secondaryColors.map((color) => (
                    <div key={color.key} className="bg-white border border-[#171717]/10 p-5 space-y-4">
                      <div
                        className="h-32 w-full flex items-end justify-between p-3 border border-[#171717]/10"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="text-xs font-mono font-medium px-2 py-0.5 text-[#171717] bg-white/80">
                          {color.hex}
                        </span>
                        <button
                          onClick={() => handleCopy(color.hex, color.key)}
                          className="text-[10px] font-mono px-2 py-0.5 flex items-center gap-1 text-[#171717] hover:bg-black/5"
                        >
                          {copiedToken === color.key ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedToken === color.key ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-editorial text-xl text-[#171717]">{color.name}</h4>
                        <p className="text-xs text-[#77736C] leading-relaxed">{color.role}</p>
                        <div className="pt-2 text-[11px] font-mono text-[#171717]/60">
                          RGB: {color.rgb}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>

            {/* Restrained Feedback / State Palette */}
            <Container width="flagship">
              <div className="bg-white border border-[#171717]/10 p-6 sm:p-8 space-y-6">
                <div className="border-b border-[#171717]/10 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-editorial text-xl text-[#171717]">
                      Restrained Feedback & Semantic State Colors
                    </h3>
                    <p className="text-xs text-[#77736C]">
                      Deliberately muted and earthy to prevent discordant neon flashes.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#77736C]">Accessible WCAG AA Compliant</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {feedbackColors.map((fb) => (
                    <div key={fb.key} className="p-4 border border-[#171717]/10 bg-[#FAF8F5] space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: fb.hex }} />
                        <span className="font-editorial text-lg text-[#171717]">{fb.name}</span>
                      </div>
                      <p className="text-xs text-[#77736C]">{fb.role}</p>
                      <div className="text-[11px] font-mono text-[#171717]">HEX: {fb.hex}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. TYPOGRAPHY SYSTEM                                           */}
        {/* ============================================================== */}
        {activeSection === 'typography' && (
          <div className="space-y-12">
            <Container width="content">
              <SectionHeading
                kicker="Section 03"
                title="Editorial Typography System"
                subtitle="Cormorant Garamond creates literary grandeur and sartorial reverence for headings, while Plus Jakarta Sans delivers crisp legibility for product details, prices, and navigation."
              />
            </Container>

            <Container width="flagship">
              <div className="bg-white border border-[#171717]/10 divide-y divide-[#171717]/5">
                {/* Display */}
                <div className="p-6 sm:p-8 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#77736C] font-mono gap-1">
                    <span>Display Heading · Cormorant Garamond · clamp(2.75rem, 5.5vw, 4.5rem)</span>
                    <span className="text-[#B7A17A]">Campaign Statement</span>
                  </div>
                  <p className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#171717] leading-[1.06] tracking-[-0.025em]">
                    Elevation Refined.
                  </p>
                </div>

                {/* H1 */}
                <div className="p-6 sm:p-8 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#77736C] font-mono gap-1">
                    <span>Heading 1 (H1) · Cormorant Garamond · clamp(2.25rem, 4vw, 3.25rem)</span>
                    <span className="text-[#B7A17A]">Collection Page Hero</span>
                  </div>
                  <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] leading-[1.12] tracking-[-0.02em]">
                    The Double-Mercerized Cotton Piqué
                  </h1>
                </div>

                {/* H2 */}
                <div className="p-6 sm:p-8 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#77736C] font-mono gap-1">
                    <span>Heading 2 (H2) · Cormorant Garamond · clamp(1.75rem, 3vw, 2.5rem)</span>
                    <span className="text-[#B7A17A]">Section Major Title</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#171717] leading-[1.2] tracking-[-0.015em]">
                    Slow-Woven on Restored Vintage Shuttle Looms
                  </h2>
                </div>

                {/* H3 & H4 */}
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="text-xs text-[#77736C] font-mono">
                      Heading 3 (H3) · Cormorant Garamond · 22px - 28px
                    </div>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#171717]">
                      Tailored Twill in Dense Gabardine
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-[#77736C] font-mono">
                      Heading 4 (H4) · Cormorant Garamond Medium · 18px
                    </div>
                    <h4 className="font-editorial text-lg text-[#171717] font-medium">
                      Natural Australian Mother-of-Pearl Fasteners
                    </h4>
                  </div>
                </div>

                {/* Body Variations */}
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <div className="text-xs text-[#77736C] font-mono">Body Large · 18px / Light</div>
                    <p className="font-sans text-lg font-light text-[#171717] leading-relaxed">
                      “We believe refinement is a lifelong pursuit. Not of perfection, but of progress. The quiet decision to choose better.”
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-[#77736C] font-mono">Body Regular · 15px / Regular</div>
                    <p className="font-sans text-sm text-[#171717]/85 leading-relaxed">
                      Double-combed long-staple cotton twill with an immaculate drape and internal sartorial curtain waistband. Tailored for comfort in movement.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-[#77736C] font-mono">Body Small · 13px / Regular</div>
                    <p className="font-sans text-xs text-[#77736C] leading-relaxed">
                      Machine wash gentle cold (30°C). Turn inside out before immersion. Lay flat in shade to dry naturally. Warm press if desired.
                    </p>
                  </div>
                </div>

                {/* Product Meta Typographies */}
                <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#FAF8F5]">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#77736C] block">Product Title</span>
                    <p className="font-editorial text-lg text-[#171717] font-medium">
                      The Enduring Selvedge Denim
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#77736C] block">Price (BDT & USD)</span>
                    <p className="font-sans text-sm font-medium text-[#171717] tracking-wide">
                      ৳ 9,800 · $85 USD
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#77736C] block">Navigation Link</span>
                    <p className="font-sans text-xs uppercase tracking-[0.16em] font-medium text-[#171717]">
                      POLO SHIRTS
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#77736C] block">Overline / Kicker</span>
                    <p className="font-sans text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B7A17A]">
                      EDITION 01 · 60/2 PIQUÉ
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. BUTTON SYSTEM & 5 STATES                                    */}
        {/* ============================================================== */}
        {activeSection === 'buttons' && (
          <div className="space-y-12">
            <Container width="content">
              <SectionHeading
                kicker="Section 04"
                title="Button System & Interactive State Matrix"
                subtitle="Engineered with strict anti-pill geometric discipline (2:1 horizontal padding, sharp 1px-2px radius). Each button variant supports all 5 operational states: Normal, Hover, Focus, Disabled, and Loading."
              />
            </Container>

            {/* Global State Controller */}
            <Container width="flagship">
              <div className="bg-white p-4 sm:p-6 border border-[#171717]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-editorial text-lg text-[#171717]">Interactive State Simulation</h4>
                  <p className="text-xs text-[#77736C]">Toggle the global loading state across all button primitives.</p>
                </div>
                <button
                  onClick={() => setButtonLoadingState(!buttonLoadingState)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors border ${
                    buttonLoadingState
                      ? 'bg-[#B7A17A] text-white border-[#B7A17A]'
                      : 'bg-[#FAF8F5] text-[#171717] border-[#171717]/20 hover:border-[#171717]'
                  }`}
                >
                  {buttonLoadingState ? 'Stop Loading State' : 'Simulate Loading State'}
                </button>
              </div>
            </Container>

            {/* Matrix of 4 Button Types across 5 States */}
            <Container width="flagship">
              <div className="bg-white border border-[#171717]/10 divide-y divide-[#171717]/10">
                {/* 1. Primary Dark Button */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-editorial text-2xl text-[#171717]">1. Primary Dark Button (`PrimaryButton.tsx`)</h4>
                      <p className="text-xs text-[#77736C]">Charcoal (#171717) background with Warm Ivory (#F4F1EA) text.</p>
                    </div>
                    <span className="text-xs font-mono text-[#B7A17A]">Primary Call to Action</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-3">
                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Normal</span>
                      <PrimaryButton>Explore Garments</PrimaryButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">With Icon</span>
                      <PrimaryButton icon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Explore Collection
                      </PrimaryButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Focus State</span>
                      <PrimaryButton className="ring-1 ring-[#B7A17A] ring-offset-2 ring-offset-[#F4F1EA]">
                        Focused Action
                      </PrimaryButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Disabled</span>
                      <PrimaryButton disabled>Sold Out</PrimaryButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Loading</span>
                      <PrimaryButton isLoading={true} loadingText="Inscribing...">
                        Action
                      </PrimaryButton>
                    </div>
                  </div>
                </div>

                {/* 2. Secondary Light Button */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-editorial text-2xl text-[#171717]">2. Secondary Light Button (`SecondaryButton.tsx`)</h4>
                      <p className="text-xs text-[#77736C]">Pure White surface with Charcoal 1px border and text.</p>
                    </div>
                    <span className="text-xs font-mono text-[#B7A17A]">Alternative Action</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-3">
                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Normal</span>
                      <SecondaryButton>Inquire Concierge</SecondaryButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">With Icon</span>
                      <SecondaryButton icon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Select Sizing
                      </SecondaryButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Focus State</span>
                      <SecondaryButton className="ring-1 ring-[#B7A17A] ring-offset-2 ring-offset-[#F4F1EA]">
                        Focused Action
                      </SecondaryButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Disabled</span>
                      <SecondaryButton disabled>Unavailable</SecondaryButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Loading</span>
                      <SecondaryButton isLoading={true} loadingText="Verifying...">
                        Action
                      </SecondaryButton>
                    </div>
                  </div>
                </div>

                {/* 3. Outline Button */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-editorial text-2xl text-[#171717]">3. Outline Button (`OutlineButton.tsx`)</h4>
                      <p className="text-xs text-[#77736C]">Transparent background with subtle 1px hairline border.</p>
                    </div>
                    <span className="text-xs font-mono text-[#B7A17A]">Subtle Action</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-3">
                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Normal</span>
                      <OutlineButton>View Weave Spec</OutlineButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Gold Accent</span>
                      <OutlineButton colorVariant="gold">Craft Details</OutlineButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Focus State</span>
                      <OutlineButton className="ring-1 ring-[#B7A17A]">
                        Focused Outline
                      </OutlineButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Disabled</span>
                      <OutlineButton disabled>Archive Only</OutlineButton>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Loading</span>
                      <OutlineButton isLoading={true} loadingText="Connecting...">
                        Action
                      </OutlineButton>
                    </div>
                  </div>
                </div>

                {/* 4. Text-Only Link & Icon Buttons */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-editorial text-2xl text-[#171717]">4. Text-Only Link (`TextLink.tsx`) & Icon Buttons (`IconButton.tsx`)</h4>
                      <p className="text-xs text-[#77736C]">Pure editorial links and touch-compliant icon controls (&gt;= 44px).</p>
                    </div>
                    <span className="text-xs font-mono text-[#B7A17A]">Editorial & Controls</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">TextLink (Charcoal)</span>
                      <div>
                        <TextLink icon={<ArrowRight className="w-3.5 h-3.5" />}>
                          The Story of Refinement
                        </TextLink>
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">TextLink (Gold)</span>
                      <div>
                        <TextLink colorVariant="gold" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                          Selvedge Looms of Kurabo
                        </TextLink>
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">IconButton Variants</span>
                      <div className="flex items-center gap-2">
                        <IconButton icon={<Search className="w-4 h-4" />} label="Search" />
                        <IconButton icon={<User className="w-4 h-4" />} label="Account" variant="subtle" />
                        <IconButton icon={<ShoppingBag className="w-4 h-4" />} label="Bag" badgeCount={3} />
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#77736C] block">Touch Accessibility</span>
                      <p className="text-xs text-[#77736C]">
                        Guarantees minimum 44px × 44px tap target on all handheld touch screens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* ============================================================== */}
        {/* 5. NAVIGATION SYSTEM                                           */}
        {/* ============================================================== */}
        {activeSection === 'navigation' && (
          <div className="space-y-12">
            <Container width="content">
              <SectionHeading
                kicker="Section 05"
                title="Navigation System Architecture"
                subtitle="Live interactive simulation of the responsive desktop header and mobile navigation drawer. Understated typography, temporary brand wordmark, currency switcher, and search trigger."
              />
            </Container>

            {/* Live Component Preview */}
            <Container width="flagship">
              <div className="bg-white border border-[#171717]/10 p-4 sm:p-8 space-y-8">
                <div className="flex items-center justify-between border-b border-[#171717]/10 pb-3">
                  <h3 className="font-editorial text-xl text-[#171717]">
                    SiteHeader Component Preview (`SiteHeader.tsx`)
                  </h3>
                  <span className="text-xs font-mono text-[#77736C]">Interactive Preview Canvas</span>
                </div>

                {/* Render the actual SiteHeader component */}
                <div className="border border-[#171717]/15 shadow-sm">
                  <SiteHeader
                    activeCurrency={testCurrency}
                    onCurrencyToggle={(c) => setTestCurrency(c)}
                    cartCount={2}
                    onOpenCart={() => setActiveSection('product-cards')}
                    onOpenSearch={() => setActiveSection('product-cards')}
                    onOpenAccount={() => setActiveSection('editorial-forms')}
                  />
                  <div className="p-12 text-center bg-[#FAF8F5] text-xs text-[#77736C] space-y-2">
                    <p className="font-editorial text-lg text-[#171717]">Flagship Viewport Active</p>
                    <p>Resize browser window or switch to mobile viewport to test the hamburger menu and drawer.</p>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* ============================================================== */}
        {/* 6. PRODUCT CARD & GRID                                         */}
        {/* ============================================================== */}
        {activeSection === 'product-cards' && (
          <div className="space-y-12">
            <Container width="content">
              <SectionHeading
                kicker="Section 06"
                title="Product Card & Catalog Grid"
                subtitle="Image-led, minimal presentation with zero pill badges. Displays authentic demonstration specifications: 60/2 Mercerized Polo, 13.5oz Shuttle-Loom Selvedge, and 280gsm Tailored Twill."
              />
            </Container>

            <Container width="flagship">
              <div className="bg-white border border-[#171717]/10 p-6 sm:p-10 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#171717]/10 pb-4">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#171717]">
                      The ProductGrid Component (`ProductGrid.tsx`)
                    </h3>
                    <p className="text-xs text-[#77736C]">
                      Demonstration Archetypes rendered with live hover transitions and currency toggling.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#77736C]">Currency:</span>
                    <button
                      onClick={() => setTestCurrency(testCurrency === 'BDT' ? 'USD' : 'BDT')}
                      className="px-3 py-1 text-xs font-mono border border-[#171717]/20 bg-[#FAF8F5] text-[#171717] hover:bg-[#E8E4DC]"
                    >
                      Toggle to {testCurrency === 'BDT' ? 'USD ($)' : 'BDT (৳)'}
                    </button>
                  </div>
                </div>

                <ProductGrid
                  products={SAMPLE_CATALOG}
                  currency={testCurrency}
                  showPlaceholderNotice={true}
                  onProductQuickView={(prod) => setInspectedProduct(prod)}
                  onProductSelect={(prod) => setInspectedProduct(prod)}
                />
              </div>
            </Container>
          </div>
        )}

        {/* ============================================================== */}
        {/* 7. IMAGE RATIOS & BANNERS                                      */}
        {/* ============================================================== */}
        {activeSection === 'images' && (
          <div className="space-y-12">
            <Container width="content">
              <SectionHeading
                kicker="Section 07"
                title="Standardized Image Presentation"
                subtitle="Five strict aspect ratios enforce consistent editorial balance. Free from stock photo tropes, emphasizing natural fibers, workshop craftsmanship, and unhurried drape."
              />
            </Container>

            {/* 5 Aspect Ratios Inspector */}
            <Container width="flagship">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. 3:4 Portrait */}
                <div className="bg-white p-5 border border-[#171717]/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#77736C]">
                    <span>Portrait Tall (3:4)</span>
                    <span className="text-[#B7A17A]">Garment Catalog</span>
                  </div>
                  <EditorialImage
                    src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"
                    alt="Polo Shirt Model Standing"
                    aspectRatio="3/4"
                    categoryTag="Archetype 01"
                    caption="Double Mercerized Piqué in Deep Charcoal"
                    credit="Dhaka Studio · 35mm"
                  />
                </div>

                {/* 2. 4:5 Portrait */}
                <div className="bg-white p-5 border border-[#171717]/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#77736C]">
                    <span>Portrait Lookbook (4:5)</span>
                    <span className="text-[#B7A17A]">Editorial Drape</span>
                  </div>
                  <EditorialImage
                    src="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80"
                    alt="Selvedge Denim Stride"
                    aspectRatio="4/5"
                    categoryTag="Selvedge Denim"
                    caption="Vintage Low-Tension Shuttle Weave"
                    credit="Natural Daylight"
                  />
                </div>

                {/* 3. 1:1 Square */}
                <div className="bg-white p-5 border border-[#171717]/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#77736C]">
                    <span>Square Detail (1:1)</span>
                    <span className="text-[#B7A17A]">Material Macro</span>
                  </div>
                  <EditorialImage
                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
                    alt="Fabric Weave Detail"
                    aspectRatio="1/1"
                    categoryTag="Macro Detail"
                    caption="Australian Mother-of-Pearl Button Cross-Stitch"
                    credit="Atelier Lens"
                  />
                </div>
              </div>
            </Container>

            {/* 4. 21:9 Collection Banner Preview */}
            <Container width="flagship">
              <div className="space-y-4">
                <div className="border-b border-[#171717]/10 pb-2 flex items-center justify-between">
                  <h3 className="font-editorial text-2xl text-[#171717]">
                    Cinematic Banner Component (`CollectionBanner.tsx`)
                  </h3>
                  <span className="text-xs font-mono text-[#77736C]">21:9 Aspect Ratio</span>
                </div>

                <CollectionBanner
                  imageSrc="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
                  imageAlt="RAVIO Atelier & Collection"
                  kicker="Edition 01 · Launch Chapter"
                  title="The Quiet Pursuit of Progress"
                  description="A study in high-twist mercerized Egyptian cottons, restored shuttle-loom selvedge denim, and dense tailored gabardines. Built for enduring wear."
                  primaryActionLabel="Inspect Garments"
                  onPrimaryAction={() => setActiveSection('product-cards')}
                  secondaryActionLabel="Read Philosophy"
                  onSecondaryAction={() => setActiveSection('overview')}
                />
              </div>
            </Container>
          </div>
        )}

        {/* ============================================================== */}
        {/* 8. SPACING & CONTAINERS                                        */}
        {/* ============================================================== */}
        {activeSection === 'spacing' && (
          <div className="space-y-12">
            <Container width="content">
              <SectionHeading
                kicker="Section 08"
                title="Spacing Geometry & Layout Containers"
                subtitle="Based on a 4px modular grid. Generous whitespace creates editorial breathing room without wasteful layout sprawl."
              />
            </Container>

            <Container width="flagship">
              <div className="bg-white border border-[#171717]/10 p-6 sm:p-10 space-y-8">
                {/* Spacing Scale Ruler */}
                <div className="space-y-4">
                  <h3 className="font-editorial text-xl text-[#171717]">
                    Modular Spacing Scale (4px Base Grid)
                  </h3>

                  <div className="space-y-2 font-mono text-xs text-[#77736C]">
                    {[
                      { token: 'space-1', px: '4px', w: 'w-1' },
                      { token: 'space-2', px: '8px', w: 'w-2' },
                      { token: 'space-3', px: '12px', w: 'w-3' },
                      { token: 'space-4', px: '16px', w: 'w-4' },
                      { token: 'space-6', px: '24px', w: 'w-6' },
                      { token: 'space-8', px: '32px', w: 'w-8' },
                      { token: 'space-12', px: '48px', w: 'w-12' },
                      { token: 'space-16', px: '64px', w: 'w-16' },
                      { token: 'space-24', px: '96px', w: 'w-24' },
                    ].map((step) => (
                      <div key={step.token} className="flex items-center gap-4">
                        <span className="w-20 text-[#171717]">{step.token}</span>
                        <span className="w-16 text-[#77736C]">{step.px}</span>
                        <div className="h-4 bg-[#B7A17A]" style={{ width: step.px }} />
                      </div>
                    ))}
                  </div>
                </div>

                <HairlineDivider variant="subtle" />

                {/* Container System */}
                <div className="space-y-4">
                  <h3 className="font-editorial text-xl text-[#171717]">
                    Container Max-Widths & Viewport Rules
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/10 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#B7A17A] block">Flagship Max</span>
                      <p className="font-editorial text-lg text-[#171717]">1440px</p>
                      <p className="text-xs text-[#77736C]">Maximum screen enclosure for desktop ultra-wides.</p>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/10 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#B7A17A] block">Content Standard</span>
                      <p className="font-editorial text-lg text-[#171717]">1200px</p>
                      <p className="text-xs text-[#77736C]">Standard catalog grid and section layouts.</p>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/10 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#B7A17A] block">Editorial Column</span>
                      <p className="font-editorial text-lg text-[#171717]">880px</p>
                      <p className="text-xs text-[#77736C]">Reading width for brand essays and philosophy.</p>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#171717]/10 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#B7A17A] block">Narrow Form</span>
                      <p className="font-editorial text-lg text-[#171717]">640px</p>
                      <p className="text-xs text-[#77736C]">Form dialogs, newsletter, and checkout summaries.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* ============================================================== */}
        {/* 9. EDITORIAL FORMS & NEWSLETTER                                */}
        {/* ============================================================== */}
        {activeSection === 'editorial-forms' && (
          <div className="space-y-12">
            <Container width="content">
              <SectionHeading
                kicker="Section 09"
                title="Editorial Sectioning & Private Ledger"
                subtitle="Section headings in both center and left alignments paired with the private ledger subscription form."
              />
            </Container>

            <Container width="flagship">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Charcoal Newsletter */}
                <NewsletterForm variant="charcoal" />

                {/* Inverted / Dark Newsletter */}
                <NewsletterForm variant="ivory" />
              </div>
            </Container>

            {/* SiteFooter Component Live Showcase */}
            <div className="pt-8">
              <Container width="flagship">
                <div className="border-b border-[#171717]/10 pb-3 mb-6">
                  <h3 className="font-editorial text-2xl text-[#171717]">
                    SiteFooter Component Preview (`SiteFooter.tsx`)
                  </h3>
                  <p className="text-xs text-[#77736C]">
                    Complete production-grade footer in Charcoal (#171717) with Warm Ivory typography.
                  </p>
                </div>
              </Container>
              <SiteFooter />
            </div>
          </div>
        )}
      </main>

      {/* Modal for Quick View Inspection in Component Demo */}
      {inspectedProduct && (
        <div className="fixed inset-0 z-50 bg-[#171717]/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full border border-[#171717]/20 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectedProduct(null)}
              className="absolute top-4 right-4 text-[#77736C] hover:text-[#171717] text-xs font-mono p-1"
            >
              ✕ Close
            </button>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img
                src={inspectedProduct.imageUrls.hero}
                alt={inspectedProduct.title}
                className="w-full sm:w-48 aspect-[3/4] object-cover bg-[#E8E4DC] border border-[#171717]/10 flex-shrink-0"
              />
              <div className="space-y-2 flex-1">
                <EditorialKicker variant="gold">{inspectedProduct.editorialKicker}</EditorialKicker>
                <h3 className="font-editorial text-2xl text-[#171717]">{inspectedProduct.title}</h3>
                <p className="text-base font-sans font-medium text-[#171717]">
                  {testCurrency === 'BDT' ? inspectedProduct.price.formattedBDT : inspectedProduct.price.formattedUSD}
                </p>
                <p className="text-xs text-[#77736C] font-light leading-relaxed pt-1">
                  {inspectedProduct.shortDescription}
                </p>
                <div className="pt-2 text-xs text-[#171717] font-mono">
                  {inspectedProduct.composition}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#171717]/10">
              <h4 className="text-xs font-sans uppercase tracking-[0.18em] text-[#171717] font-semibold">
                Sartorial Craft Details:
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

            <div className="pt-4 border-t border-[#171717]/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#77736C]">
                Component Inspection Mode
              </span>
              <PrimaryButton size="sm" onClick={() => setInspectedProduct(null)}>
                Dismiss Inspection
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
