import React, { useState } from 'react';
import { PROPOSED_FOLDER_TREE } from '../../data/architectureBlueprint';
import { FolderNode } from '../../types/architecture';
import { Container } from '../common/Container';
import { EditorialKicker, EditorialHeading, EditorialBody } from '../common/Typography';
import { Folder, FolderOpen, FileCode, CheckCircle2, CircleDashed, Layers, Database, Shield, Layout } from 'lucide-react';

export const ArchitectureExplorer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<FolderNode>(PROPOSED_FOLDER_TREE);

  const renderTree = (node: FolderNode, depth: number = 0) => {
    const isFolder = node.type === 'folder';
    const isSelected = selectedNode.path === node.path;

    return (
      <div key={node.path} className="select-none">
        <div
          onClick={() => setSelectedNode(node)}
          className={`flex items-center justify-between py-2 px-3 cursor-pointer text-xs transition-colors duration-150 ${
            isSelected
              ? 'bg-[#171717] text-[#F4F1EA]'
              : 'hover:bg-[#171717]/5 text-[#171717]'
          }`}
          style={{ paddingLeft: `${depth * 1.25 + 0.75}rem` }}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {isFolder ? (
              isSelected ? (
                <FolderOpen className="w-4 h-4 text-[#B7A17A] flex-shrink-0" />
              ) : (
                <Folder className="w-4 h-4 text-[#7E776F] flex-shrink-0" />
              )
            ) : (
              <FileCode className="w-3.5 h-3.5 text-[#B7A17A] flex-shrink-0" />
            )}
            <span className="font-mono truncate">{node.name}</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {node.isEstablishedInFoundation ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-mono">
                <CheckCircle2 className="w-3 h-3" />
                <span className="hidden sm:inline">Active</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-amber-700 font-mono">
                <CircleDashed className="w-3 h-3" />
                <span className="hidden sm:inline">Scaffold</span>
              </span>
            )}
          </div>
        </div>

        {node.children && (
          <div className="border-l border-[#171717]/10 ml-4">
            {node.children.map((child) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-12 space-y-16">
      {/* Title & Introduction */}
      <Container width="content">
        <div className="space-y-4">
          <EditorialKicker variant="gold">Frontend Architecture</EditorialKicker>
          <EditorialHeading size="title" variant="charcoal">
            Scalable Enterprise Directory & Concern Separation
          </EditorialHeading>
          <EditorialBody size="base" variant="muted">
            Engineered with strict separation between brand data, atomic UI components, design tokens, and future Shopify GraphQL bridges. Allows seamless expansion from the 3 launch categories into leather goods, fragrance, and tailoring without refactoring core logic.
          </EditorialBody>
        </div>
      </Container>

      {/* Layer Hierarchy Architecture Cards */}
      <Container width="flagship">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 border border-[#171717]/10 space-y-3">
            <div className="w-8 h-8 flex items-center justify-center border border-[#171717]/10 text-[#171717]">
              <Layers className="w-4 h-4 text-[#B7A17A]" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7E776F]">Layer 01</span>
            <h4 className="font-editorial text-lg text-[#171717]">Design Tokens</h4>
            <p className="text-xs text-[#7E776F] leading-relaxed">
              Chromatic values, typography scales, hairline borders, and fluid clamp() math located in <code className="text-[#171717] font-mono">/src/tokens</code>.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#171717]/10 space-y-3">
            <div className="w-8 h-8 flex items-center justify-center border border-[#171717]/10 text-[#171717]">
              <Database className="w-4 h-4 text-[#B7A17A]" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7E776F]">Layer 02</span>
            <h4 className="font-editorial text-lg text-[#171717]">Domain Schemas</h4>
            <p className="text-xs text-[#7E776F] leading-relaxed">
              Strict TypeScript contracts in <code className="text-[#171717] font-mono">/src/types</code> for products, variants, prices (BDT/USD), and brand storytelling.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#171717]/10 space-y-3">
            <div className="w-8 h-8 flex items-center justify-center border border-[#171717]/10 text-[#171717]">
              <Layout className="w-4 h-4 text-[#B7A17A]" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7E776F]">Layer 03</span>
            <h4 className="font-editorial text-lg text-[#171717]">Reusable UI Elements</h4>
            <p className="text-xs text-[#7E776F] leading-relaxed">
              Atomic primitives in <code className="text-[#171717] font-mono">/src/components/common</code> and modular domain widgets in product, editorial, and cart folders.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#171717]/10 space-y-3">
            <div className="w-8 h-8 flex items-center justify-center border border-[#171717]/10 text-[#171717]">
              <Shield className="w-4 h-4 text-[#B7A17A]" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7E776F]">Layer 04</span>
            <h4 className="font-editorial text-lg text-[#171717]">Commerce Bridges</h4>
            <p className="text-xs text-[#7E776F] leading-relaxed">
              Headless Shopify Storefront API GraphQL queries and cart state management isolated in <code className="text-[#171717] font-mono">/src/services/shopify</code>.
            </p>
          </div>
        </div>
      </Container>

      {/* Interactive Folder Tree Inspector */}
      <Container width="flagship">
        <div className="bg-white border border-[#171717]/10 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-[#171717]/10 bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-editorial text-xl text-[#171717]">
                Interactive Project Directory Explorer
              </h3>
              <p className="text-xs text-[#7E776F] font-sans">
                Click any file or directory to inspect its architectural responsibility.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Active Foundation
              </span>
              <span className="flex items-center gap-1.5 text-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Stage 2 Target
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Left: Tree View */}
            <div className="lg:col-span-6 border-r border-[#171717]/10 p-4 max-h-[520px] overflow-y-auto">
              {renderTree(PROPOSED_FOLDER_TREE)}
            </div>

            {/* Right: Selected Node Detail */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#FCFBF8]">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B7A17A]">
                    Node Inspection
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-semibold text-[#171717]">
                      {selectedNode.name}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 bg-[#171717]/5 text-[#7E776F]">
                      {selectedNode.type}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#7E776F] break-all">
                    {selectedNode.path}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#171717]/10">
                  <h4 className="text-xs font-sans uppercase tracking-[0.15em] text-[#171717] font-semibold">
                    Architectural Responsibility:
                  </h4>
                  <p className="text-sm font-sans text-[#171717]/85 leading-relaxed bg-white p-4 border border-[#171717]/10">
                    {selectedNode.responsibility}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-sans uppercase tracking-[0.15em] text-[#171717] font-semibold">
                    Foundation Status:
                  </h4>
                  <p className="text-xs text-[#7E776F]">
                    {selectedNode.isEstablishedInFoundation ? (
                      <span className="text-emerald-800 font-medium">
                        ✓ Fully established in current step. Available for immediate development.
                      </span>
                    ) : (
                      <span className="text-amber-800 font-medium">
                        ⏳ Scaffolded for Stage 2 (Homepage & Product Catalog development).
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#171717]/10 text-xs text-[#7E776F] flex items-center justify-between">
                <span>RAVIO Architecture Guide</span>
                <span className="font-mono text-[10px]">Strict Zero-Slop Standard</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
