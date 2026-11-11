import React, { useEffect } from 'react';
import { HairlineDivider } from '../common/HairlineDivider';
import { EditorialKicker } from '../common/Typography';
import { X, ShieldCheck, Mail, MapPin, Truck, RotateCcw, HelpCircle, FileText, AlertCircle } from 'lucide-react';

export type CustomerCareTopic =
  | 'contact'
  | 'faqs'
  | 'shipping'
  | 'returns'
  | 'privacy'
  | 'terms';

export interface CustomerCareModalProps {
  isOpen: boolean;
  topic: CustomerCareTopic | null;
  onClose: () => void;
}

export const CustomerCareModal: React.FC<CustomerCareModalProps> = ({
  isOpen,
  topic,
  onClose,
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

  if (!isOpen || !topic) return null;

  const contentMap: Record<
    CustomerCareTopic,
    { title: string; kicker: string; icon: React.ReactNode; body: React.ReactNode }
  > = {
    contact: {
      title: 'Customer Care & Direct Inquiry',
      kicker: 'CUSTOMER CARE · ATELIER DIALOGUE',
      icon: <Mail className="w-5 h-5 text-[#B7A17A]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#171717]/85 font-light leading-relaxed">
          <p>
            Customer support details for sizing, garment care, and delivery will be published when available.
          </p>
          <div className="p-4 bg-white border border-[#171717]/10 space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#B7A17A]" />
              <span className="font-mono text-xs">Support email not yet available</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B7A17A]" />
              <span>Office address not yet available</span>
            </div>
          </div>
          <p className="text-xs text-[#77736C]">
            Customer service hours and phone contact details are not yet available.
          </p>
        </div>
      ),
    },
    faqs: {
      title: 'Frequently Asked Inquiries',
      kicker: 'CLIENT GUIDE · FAQ',
      icon: <HelpCircle className="w-5 h-5 text-[#B7A17A]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
          <div className="p-4 bg-white border border-[#171717]/10 space-y-1.5">
            <h4 className="font-editorial text-base text-[#171717] font-medium">Are garment specifications final?</h4>
            <p className="text-xs text-[#77736C] font-light">
              Product information is not yet final. Confirmed garment specifications and care instructions will be published when available.
            </p>
          </div>
          <div className="p-4 bg-white border border-[#171717]/10 space-y-1.5">
            <h4 className="font-editorial text-base text-[#171717] font-medium">What currencies and payment methods will be supported?</h4>
            <p className="text-xs text-[#77736C] font-light">
              Prices will be announced before release. Ordering and payments are not yet available; payment options will be confirmed before orders are accepted.
            </p>
          </div>
          <div className="p-4 bg-white border border-[#171717]/10 space-y-1.5">
            <h4 className="font-editorial text-base text-[#171717] font-medium">How do I find my garment size?</h4>
            <p className="text-xs text-[#77736C] font-light">
              Each product page includes a Size & Measurement Guide with centimeter and inch dimensions. Measurements are indicative; final sizing information is not yet available.
            </p>
          </div>
        </div>
      ),
    },
    shipping: {
      title: 'Shipping Information & Fulfillment',
      kicker: 'DELIVERY INFORMATION',
      icon: <Truck className="w-5 h-5 text-[#B7A17A]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#171717]/85 font-light leading-relaxed">
          <p>
            Delivery information for Bangladesh is indicative. Final delivery times, coverage areas, and fees are not yet confirmed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-white border border-[#171717]/10 space-y-1">
              <span className="font-medium text-[#171717] block">Dhaka Metropolitan Area (Provisional)</span>
              <p className="text-xs text-[#77736C]">Timing and fees to be confirmed.</p>
            </div>
            <div className="p-4 bg-white border border-[#171717]/10 space-y-1">
              <span className="font-medium text-[#171717] block">Nationwide Bangladesh (Provisional)</span>
              <p className="text-xs text-[#77736C]">Timing and fees to be confirmed.</p>
            </div>
          </div>
        </div>
      ),
    },
    returns: {
      title: 'Returns & Exchanges Protocol',
      kicker: 'RETURNS & EXCHANGES',
      icon: <RotateCcw className="w-5 h-5 text-[#B7A17A]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#171717]/85 font-light leading-relaxed">
          <p>
            Exchange and return information is not yet final. Final terms will be confirmed before orders are accepted:
          </p>
          <ul className="space-y-2 text-xs text-[#77736C]">
            <li className="flex items-start gap-2">
              <span className="text-[#B7A17A]">—</span>
              <span>Condition requirements for returned garments will be published with the final terms.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B7A17A]">—</span>
              <span>Return shipping fees and refund processing times are not yet confirmed.</span>
            </li>
          </ul>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy & Data Stewardship',
      kicker: 'PRIVACY INFORMATION',
      icon: <ShieldCheck className="w-5 h-5 text-[#B7A17A]" />,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-[#171717]/85 font-light leading-relaxed">
          <p>
            The official Ravio & Co. Privacy Policy is not yet available.
          </p>
          <p className="text-xs text-[#77736C]">
            The full policy covering personal information, cookies, and customer rights will be published before orders are accepted.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions of Service',
      kicker: 'TERMS & CONDITIONS',
      icon: <FileText className="w-5 h-5 text-[#B7A17A]" />,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-[#171717]/85 font-light leading-relaxed">
          <p>
            The official Terms & Conditions of Service for Ravio & Co. are not yet available.
          </p>
          <p className="text-xs text-[#77736C]">
            Final terms covering orders, pricing, and customer rights will be published before orders are accepted.
          </p>
        </div>
      ),
    },
  };

  const activeContent = contentMap[topic];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={activeContent.title}
        className="relative w-full max-w-2xl bg-[#F4F1EA] text-[#171717] border border-[#171717]/20 shadow-2xl z-10 my-8 p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#77736C] hover:text-[#171717] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2">
            {activeContent.icon}
            <EditorialKicker variant="gold">{activeContent.kicker}</EditorialKicker>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal">
            {activeContent.title}
          </h3>
        </div>

        {/* Provisional Template Disclosure Banner */}
        <div className="p-3 bg-white border border-[#B7A17A]/40 flex items-start gap-2.5 text-[11px] text-[#77736C]">
          <AlertCircle className="w-4 h-4 text-[#B7A17A] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#171717] font-medium">Pre-Launch Notice:</strong> Customer care information is not yet final. Confirmed policies will be published before orders are accepted.
          </span>
        </div>

        <HairlineDivider variant="subtle" />

        {/* Body */}
        {activeContent.body}

        {/* Footer */}
        <div className="pt-4 border-t border-[#171717]/10 flex items-center justify-between text-[10px] font-mono text-[#77736C]">
          <span>RAVIO & CO. · ravioco.com</span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-5 py-2 bg-[#171717] text-[#F4F1EA] text-xs font-sans uppercase tracking-wider hover:bg-[#2C2C2C] transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
