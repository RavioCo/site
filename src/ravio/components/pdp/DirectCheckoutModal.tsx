import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { X, ShieldCheck, ArrowRight, Lock, Info } from 'lucide-react';

export interface DirectCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  currency: 'BDT' | 'USD';
}

export const DirectCheckoutModal: React.FC<DirectCheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedColor,
  selectedSize,
  quantity,
  currency,
}) => {
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowDemoNotice(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const unitPrice =
    currency === 'BDT' ? product.price.amountBDT : product.price.amountUSD;
  const totalPrice = unitPrice * quantity;
  const formattedTotal =
    currency === 'BDT'
      ? `৳ ${totalPrice.toLocaleString()}`
      : `$${totalPrice.toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Direct Checkout Preparation"
        className="relative bg-white text-[#171717] w-full max-w-lg border border-[#171717]/15 shadow-2xl p-6 sm:p-8 space-y-6 z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#171717]/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#B7A17A]">
              <Lock className="w-3.5 h-3.5" />
              <span>Direct Checkout</span>
            </div>
            <h3 className="font-editorial text-2xl text-[#171717]">
              Order Summary
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#77736C] hover:text-[#171717] transition-colors cursor-pointer"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Product Summary Card */}
        <div className="flex gap-4 p-4 bg-[#FAF8F5] border border-[#171717]/10">
          <img
            src={product.imageUrls.hero}
            alt={product.title}
            width={64}
            height={80}
            referrerPolicy="no-referrer"
            className="w-16 h-20 object-cover border border-[#171717]/10 flex-shrink-0"
          />
          <div className="space-y-1 flex-1 min-w-0">
            <h4 className="font-editorial text-lg text-[#171717] truncate leading-tight">
              {product.title}
            </h4>
            <div className="text-xs font-mono text-[#77736C] space-y-0.5">
              <div>Shade: <span className="text-[#171717] font-medium">{selectedColor}</span></div>
              <div>Size: <span className="text-[#171717] font-medium">{selectedSize}</span></div>
              <div>Quantity: <span className="text-[#171717] font-medium">{quantity}</span></div>
            </div>
            <div className="text-sm font-semibold text-[#171717] pt-1 tabular-nums">
              Estimated Subtotal: {formattedTotal}
            </div>
          </div>
        </div>

        {/* Transparent Shopify Integration Notice */}
        <div className="p-4 border border-[#B7A17A]/40 bg-[#FAF8F5] space-y-2 text-xs font-sans text-[#77736C]">
          <div className="flex items-center gap-2 text-[#171717] font-medium uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#B7A17A]" />
            <span>Ordering availability</span>
          </div>
          <p className="leading-relaxed">
            Checkout is not available yet. You can review your selected garment here.
          </p>
          <p className="text-[10px] font-mono text-[#B7A17A]">
            No order or payment will be processed.
          </p>
        </div>

        {showDemoNotice && (
          <div
            role="status"
            className="p-3.5 bg-[#171717] text-[#F4F1EA] text-xs font-sans flex items-start gap-2.5"
          >
            <Info className="w-4 h-4 text-[#B7A17A] shrink-0 mt-0.5" />
            <span>
              Selection reviewed for <strong>{product.title}</strong> ({selectedColor}, Size {selectedSize}, Qty {quantity}). No order has been placed.
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 min-h-[44px] py-3 px-4 border border-[#171717]/20 text-[#171717] text-xs font-sans uppercase tracking-[0.16em] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            Return to Garment
          </button>
          <button
            type="button"
            onClick={() => setShowDemoNotice(true)}
            className="flex-1 min-h-[44px] py-3 px-4 bg-[#171717] hover:bg-[#333333] text-white text-xs font-sans uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Review Selection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
