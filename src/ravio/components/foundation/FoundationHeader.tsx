import React from 'react';
import { BrandLogo } from '../common/BrandLogo';

export type FoundationTab =
  | 'overview'
  | 'tokens'
  | 'architecture'
  | 'components'
  | 'shopify'
  | 'categories'
  | 'checklist';

interface FoundationHeaderProps {
  activeTab: FoundationTab;
  onTabChange: (tab: FoundationTab) => void;
}

export const FoundationHeader: React.FC<FoundationHeaderProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { id: FoundationTab; label: string; tag: string }[] = [
    { id: 'overview', label: 'Brand & Requirements', tag: '01' },
    { id: 'tokens', label: 'Design Tokens', tag: '02' },
    { id: 'architecture', label: 'Frontend Architecture', tag: '03' },
    { id: 'components', label: 'Component Registry', tag: '04' },
    { id: 'shopify', label: 'Shopify Integration', tag: '05' },
    { id: 'categories', label: 'Category Roadmap', tag: '06' },
    { id: 'checklist', label: 'Stage 2 Audit', tag: '07' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#171717]/10">
      {/* Top brand status bar */}
      <div className="border-b border-[#171717]/5 py-2.5 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3 text-[#7E776F]">
            <span className="font-sans tracking-[0.2em] uppercase text-[10px] text-[#171717] font-semibold">
              RAVIO & CO.
            </span>
            <span className="text-[#171717]/30">/</span>
            <span className="font-sans text-[11px] tracking-wide text-[#7E776F]">
              ravioco.com
            </span>
            <span className="text-[#171717]/30">/</span>
            <span className="text-[10px] font-sans tracking-[0.15em] uppercase text-[#B7A17A] font-medium">
              ELEVATION REFINED.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#171717]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7A17A]"></span>
              Phase: Foundation & Architectural System
            </span>
            <span className="text-[#171717]/20">|</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#7E776F]">
              Market: Bangladesh (BDT ৳)
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand Logo & Editorial Header */}
      <div className="py-4 px-4 sm:px-8 border-b border-[#171717]/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <BrandLogo size="sm" showSubtitle={false} />
            <div className="hidden md:block pl-6 border-l border-[#171717]/10">
              <p className="font-editorial italic text-base text-[#171717]/80">
                Digital Flagship Architecture Blueprint
              </p>
              <p className="text-[10px] font-sans tracking-[0.18em] uppercase text-[#7E776F]">
                Reference Aesthetics: Hermès · Ralph Lauren · Brunello Cucinelli · Loro Piana
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-sans tracking-[0.18em] uppercase text-[#7E776F] block">
              Step 01 / Technical Base
            </span>
            <span className="text-xs font-serif text-[#171717] font-medium">
              7 Requirements Complete
            </span>
          </div>
        </div>
      </div>

      {/* Navigation tabs for the architectural explorer */}
      <nav className="overflow-x-auto scrollbar-none px-4 sm:px-8 bg-[#F4F1EA]">
        <div className="max-w-[1440px] mx-auto flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs font-sans tracking-[0.12em] uppercase transition-all duration-200 whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-[#171717] text-[#171717] font-medium'
                    : 'border-transparent text-[#7E776F] hover:text-[#171717] hover:border-[#171717]/20'
                }`}
              >
                <span
                  className={`text-[10px] font-mono transition-colors ${
                    isActive ? 'text-[#B7A17A]' : 'text-[#7E776F]/60'
                  }`}
                >
                  {tab.tag}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
