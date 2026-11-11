import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { Container } from '../common/Container';
import { CustomerCareTopic } from '../modals/CustomerCareModal';
import { BrandEditorialRoute } from './MobileNavigation';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface SiteFooterProps {
  onOpenCustomerCare?: (topic: CustomerCareTopic) => void;
  onNavigateSection?: (hash: string) => void;
  onNavigateEditorial?: (route: BrandEditorialRoute) => void;
}

/**
 * SiteFooter
 * Sophisticated full-width footer adhering strictly to RAVIO specifications:
 * - Brand: RAVIO / ELEVATION REFINED.
 * - Brand statement: "Thoughtfully created around quality, intention, and enduring value."
 * - Columns: EXPLORE (including Shop, Collections, Our Story, The RAVIO Standard, Brand Philosophy), CUSTOMER CARE, LEGAL, CONNECT
 * - NEWSLETTER: Subscription field with basic validation and dignified feedback
 * - Copyright: © RAVIO. All rights reserved.
 */
export const SiteFooter: React.FC<SiteFooterProps> = ({
  onOpenCustomerCare,
  onNavigateSection,
  onNavigateEditorial,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterStatus('error');
      setNewsletterError('Please provide a valid personal email.');
      return;
    }
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }, 600);
  };

  const handleLinkClick = (e: React.MouseEvent, topic: CustomerCareTopic) => {
    e.preventDefault();
    if (onOpenCustomerCare) {
      onOpenCustomerCare(topic);
    }
  };

  const handleSectionClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(hash);
    } else {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEditorialLinkClick = (
    e: React.MouseEvent,
    route: BrandEditorialRoute,
    fallbackHash: string
  ) => {
    e.preventDefault();
    if (onNavigateEditorial) {
      onNavigateEditorial(route);
    } else if (onNavigateSection) {
      onNavigateSection(fallbackHash);
    } else {
      const target = document.querySelector(fallbackHash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#171717] text-[#F4F1EA] border-t border-[#171717]">
      <Container width="flagship" className="py-16 sm:py-24 space-y-16">
        {/* Top Tier: Brand Statement & Newsletter Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-[#F4F1EA]/10 pb-16 items-start">
          {/* Brand & Statement */}
          <div className="lg:col-span-5 space-y-5">
            <Logo size="md" variant="ivory" showSubtitle={true} showProvisionalNotice={false} />
            <div className="pt-2 text-[10px] font-sans uppercase tracking-[0.24em] text-[#B7A17A] font-semibold">
              ELEVATION REFINED.
            </div>
            <p className="font-editorial italic text-2xl sm:text-3xl text-[#F4F1EA]/90 leading-snug font-normal max-w-md">
              “Thoughtfully created around quality, intention, and enduring value.”
            </p>
            <p className="text-xs text-[#F4F1EA]/60 max-w-sm font-light leading-relaxed">
              RAVIO by Ravio & Co. A modern premium lifestyle house built around material truth and timeless sartorial archetypes.
            </p>
          </div>

          {/* Integrated Newsletter Subscription */}
          <div className="lg:col-span-7 bg-[#212121] p-6 sm:p-8 border border-[#F4F1EA]/10 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B7A17A] block">
                NEWSLETTER · PRIVATE DISPATCHES
              </span>
              <h4 className="font-editorial text-xl sm:text-2xl text-[#F4F1EA]">
                Receive the RAVIO Ledger
              </h4>
              <p className="text-xs text-[#F4F1EA]/70 font-light">
                Discover new collections, atelier stories, and considered perspectives. Distributed with discretion.
              </p>
            </div>

            {newsletterStatus === 'success' ? (
              <div className="p-3.5 bg-[#F0F5F2] border border-[#3D6E50]/40 text-emerald-950 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3D6E50] flex-shrink-0" />
                <span>Thank you. Newsletter sign-up is not yet active, so your address has not been saved.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-1">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus === 'error') setNewsletterStatus('idle');
                    }}
                    placeholder="Enter your personal email"
                    aria-label="Email address for newsletter"
                    className="flex-1 px-4 py-3 bg-[#171717] border border-[#F4F1EA]/20 text-xs font-sans text-[#F4F1EA] placeholder-[#F4F1EA]/40 focus:outline-none focus:ring-1 focus:ring-[#B7A17A]"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="px-6 py-3 bg-[#F4F1EA] text-[#171717] hover:bg-white text-xs font-sans uppercase tracking-[0.18em] font-medium transition-colors disabled:opacity-50"
                  >
                    {newsletterStatus === 'loading' ? 'Inscribing...' : 'Subscribe'}
                  </button>
                </div>

                {newsletterStatus === 'error' && (
                  <p className="text-[11px] text-[#E07A7A] flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{newsletterError}</span>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Four Required Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-xs font-sans border-b border-[#F4F1EA]/10 pb-16">
          {/* 1. EXPLORE */}
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#B7A17A] block font-semibold">
              EXPLORE
            </span>
            <ul className="space-y-2.5 text-[#F4F1EA]/75">
              <li>
                <button
                  onClick={(e) => handleSectionClick(e, '#shop')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleSectionClick(e, '#collections')}
                  className="hover:text-white transition-colors text-left"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleEditorialLinkClick(e, 'our-story', '#our-story')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleEditorialLinkClick(e, 'the-ravio-standard', '#craft')}
                  className="hover:text-white transition-colors text-left"
                >
                  The RAVIO Standard
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleEditorialLinkClick(e, 'philosophy', '#philosophy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Brand Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* 2. CUSTOMER CARE */}
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#B7A17A] block font-semibold">
              CUSTOMER CARE
            </span>
            <ul className="space-y-2.5 text-[#F4F1EA]/75">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'faqs')}
                  className="hover:text-white transition-colors text-left"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'shipping')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'returns')}
                  className="hover:text-white transition-colors text-left"
                >
                  Returns & Exchanges
                </button>
              </li>
            </ul>
          </div>

          {/* 3. LEGAL */}
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#B7A17A] block font-semibold">
              LEGAL
            </span>
            <ul className="space-y-2.5 text-[#F4F1EA]/75">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[#F4F1EA]/50">
                Official Domain: <span className="text-[#F4F1EA] font-mono">ravioco.com</span>
              </li>
            </ul>
          </div>

          {/* 4. CONNECT */}
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#B7A17A] block font-semibold">
              CONNECT
            </span>
            <ul className="space-y-2.5 text-[#F4F1EA]/75">
              <li>
                <a
                  href="https://www.instagram.com/ravioco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <span className="text-[10px] text-[#B7A17A]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/ravioco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Facebook</span>
                  <span className="text-[10px] text-[#B7A17A]">↗</span>
                </a>
              </li>
              <li className="pt-2 text-[10px] text-[#F4F1EA]/50 font-mono">
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Brand Legal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#F4F1EA]/50 font-sans">
          <p>© RAVIO. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span>Ravio & Co.</span>
            <span>·</span>
            <span className="text-[#B7A17A]">ELEVATION REFINED.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
