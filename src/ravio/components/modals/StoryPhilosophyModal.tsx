import React, { useEffect } from 'react';
import { Logo } from '../common/Logo';
import { HairlineDivider } from '../common/HairlineDivider';
import { EditorialKicker } from '../common/Typography';
import { X } from 'lucide-react';

export interface StoryPhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: 'philosophy' | 'story' | 'craft';
}

export const StoryPhilosophyModal: React.FC<StoryPhilosophyModalProps> = ({
  isOpen,
  onClose,
  topic = 'philosophy',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/80 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#F4F1EA] text-[#171717] border border-[#171717]/20 shadow-2xl z-10 my-8 p-6 sm:p-12 space-y-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#77736C] hover:text-[#171717] p-2 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Logo size="md" showSubtitle={true} showProvisionalNotice={false} />
          <EditorialKicker variant="gold">
            {topic === 'philosophy' ? 'BRAND PHILOSOPHY' : topic === 'story' ? 'FOUNDING ESSAY' : 'ATELIER STANDARDS'}
          </EditorialKicker>
        </div>

        <HairlineDivider variant="subtle" />

        {/* Narrative Essay */}
        <div className="space-y-6 text-[#171717]/90 font-sans text-sm sm:text-base leading-relaxed font-light">
          <blockquote className="text-center max-w-xl mx-auto my-6">
            <p className="font-editorial italic text-2xl sm:text-3xl text-[#171717] leading-[1.3] font-normal">
              “We believe refinement is a lifelong pursuit. Not of perfection, but of progress. The quiet decision to choose better.”
            </p>
          </blockquote>

          <div className="space-y-4 text-xs sm:text-sm text-[#77736C] leading-relaxed">
            <p>
              RAVIO by Ravio & Co. was conceived not simply as a clothier, but as an enduring lifestyle house rooted in the discipline of intentional living.
            </p>
            <p>
              In our fast-paced world, ordinary things are too often treated as disposable. We believe ordinary things deserve more care, more thought, and higher standards. The collar that frames a face. The selvedge edge that breaks cleanly over leather. The subtle weight of combed Egyptian cotton that breathes with the wearer through long studio days.
            </p>
            <p>
              While our initial capsule introduces Essential Polos, Refined Mercerized Piqués, Kurabo shuttle-loom selvedge denim, and tailored twill trousers, our architecture is crafted for a multi-category lifestyle world—expanding thoughtfully into knitwear, unstructured tailoring, leather saddlery, and footwear.
            </p>
          </div>

          <div className="p-4 bg-[#FFFFFF] border border-[#171717]/10 space-y-2 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B7A17A] block">
              Flagship Commitment:
            </span>
            <p className="text-[#171717]/80">
              Based in Dhaka, Bangladesh. Delivery and fulfilment details will be confirmed before ordering opens.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#171717]/10 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#77736C]">
            RAVIO & CO. · ravioco.com
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#171717] text-[#F4F1EA] text-xs font-sans uppercase tracking-[0.18em] font-medium hover:bg-[#2C2C2C] transition-colors"
          >
            Return to Flagship
          </button>
        </div>
      </div>
    </div>
  );
};
