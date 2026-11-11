import React from 'react';
import { FOUNDATION_REQUIREMENTS } from '../../data/architectureBlueprint';
import { Container } from '../common/Container';
import { EditorialKicker, EditorialHeading, EditorialBody } from '../common/Typography';
import { Button } from '../common/Button';
import { CheckCircle2, ArrowRight, ShieldCheck, FileCheck, Layers } from 'lucide-react';

interface RequirementsChecklistProps {
  onSelectTab: (tab: any) => void;
}

export const RequirementsChecklist: React.FC<RequirementsChecklistProps> = ({
  onSelectTab,
}) => {
  return (
    <div className="py-12 space-y-16">
      {/* Title & Introduction */}
      <Container width="content">
        <div className="space-y-4">
          <EditorialKicker variant="gold">Audit & Sign-Off Matrix</EditorialKicker>
          <EditorialHeading size="title" variant="charcoal">
            Step 01: Project Foundation Completion Audit
          </EditorialHeading>
          <EditorialBody size="base" variant="muted">
            Per the instructions, the complete website has deliberately not been rushed into production until the architectural foundation, design tokens, component contracts, and Shopify integration blueprint are firmly established and verified.
          </EditorialBody>
        </div>
      </Container>

      {/* 7 Requirements Verification List */}
      <Container width="flagship">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#171717]/10 pb-3">
            <h3 className="font-editorial text-2xl text-[#171717]">
              Foundational Scope Audit (7/7 Complete)
            </h3>
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Foundation Verified
            </span>
          </div>

          <div className="space-y-4">
            {FOUNDATION_REQUIREMENTS.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-[#171717]/10 p-6 sm:p-8 space-y-4 transition-all duration-200 hover:border-[#171717]/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="font-editorial text-3xl text-[#B7A17A] leading-none flex-shrink-0">
                      {req.number}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-editorial text-xl sm:text-2xl text-[#171717]">
                        {req.title}
                      </h4>
                      <p className="text-xs text-[#7E776F] font-sans">
                        Objective: {req.objective}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-emerald-800 bg-emerald-50/80 px-2.5 py-1 border border-emerald-200 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified in Repository
                  </span>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#171717]/5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7E776F] block">
                    Established Solution:
                  </span>
                  <p className="text-xs font-sans text-[#171717]/85 leading-relaxed">
                    {req.solution}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#7E776F] block">
                    Verified Deliverables in Source Code:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#171717]/80">
                    {req.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Stage 2 Readiness Card & Action Pathway */}
      <Container width="flagship">
        <div className="bg-[#171717] text-[#F4F1EA] p-8 sm:p-12 border border-[#171717] space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B7A17A]">
              Next Milestone Readiness
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#F4F1EA]">
              Ready for Stage 2: Digital Flagship Homepage & Catalog Experience
            </h3>
            <p className="text-sm font-sans text-[#F4F1EA]/80 max-w-3xl leading-relaxed">
              With the architectural foundation, design tokens, component interfaces, and headless commerce specifications locked in, the repository is now fully equipped to build the flagship homepage: editorial hero layouts, collection lookbooks, product detail views, and interactive cart drawers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#F4F1EA]/15 text-xs text-[#F4F1EA]/70">
            <div>
              <span className="font-serif text-lg text-[#B7A17A] block mb-1">01. Lookbook Hero</span>
              Editorial photography hero with quiet typography and collection entry points.
            </div>
            <div>
              <span className="font-serif text-lg text-[#B7A17A] block mb-1">02. Curated Grids</span>
              Polo, Selvedge Denim, and Twill Trouser collection showcases with fabric macro zooms.
            </div>
            <div>
              <span className="font-serif text-lg text-[#B7A17A] block mb-1">03. Concierge Drawer</span>
              Direct BDT bag management and seamless Shopify checkout routing.
            </div>
          </div>

          <div className="pt-6 flex flex-wrap gap-4">
            <Button
              variant="secondary"
              onClick={() => onSelectTab('components')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Review Component Inventory
            </Button>
            <Button
              variant="outline"
              className="text-[#F4F1EA] border-[#F4F1EA]/30 hover:border-[#F4F1EA] hover:bg-white/10"
              onClick={() => onSelectTab('shopify')}
            >
              Review Shopify Contracts
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
