import { customerProductKicker, PRICE_TO_BE_ANNOUNCED, PRE_LAUNCH_ORDERING_NOTICE } from '../../utils/customerCopy';
import React, { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { PrimaryButton } from '../common/PrimaryButton';
import { HairlineDivider } from '../common/HairlineDivider';
import { getResponsiveImageAttrs } from '../../utils/imageOptimization';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Info } from 'lucide-react';

export interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'BDT' | 'USD';
  onViewBag?: () => void;
  onProceedCheckout?: () => void;
  onExploreProducts?: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  currency,
  onViewBag,
  onProceedCheckout,
  onExploreProducts,
}) => {
  const {
    items,
    totalItemCount,
    updateQuantity,
    removeItem,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const closeBtn = drawerRef.current?.querySelector('button');
        if (closeBtn) (closeBtn as HTMLElement).focus();
      }, 50);
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
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag Drawer"
        className="relative w-full max-w-md bg-[#F4F1EA] text-[#171717] h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#171717]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#B7A17A]" />
            <h3 className="font-editorial text-xl sm:text-2xl text-[#171717]">
              Shopping Bag ({totalItemCount})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#77736C] hover:text-[#171717] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7A17A]"
            aria-label="Close bag drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Item List / Empty State */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <ShoppingBag className="w-10 h-10 text-[#77736C]/40 mx-auto" />
              <p className="font-editorial text-2xl text-[#171717]">Your Bag is Empty</p>
              <p className="font-sans text-xs text-[#77736C] max-w-xs mx-auto font-light leading-relaxed">
                Explore the Considered Essentials capsule to inspect our double-mercerized polos and selvedge denim.
              </p>
              <div className="pt-2">
                <PrimaryButton
                  size="sm"
                  onClick={() => {
                    onClose();
                    if (onExploreProducts) onExploreProducts();
                  }}
                >
                  Explore Collection
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const thumbAttrs = getResponsiveImageAttrs(item.product.imageUrls.hero, [160, 240], '64px');

                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white border border-[#171717]/10 transition-colors"
                  >
                    <img
                      src={thumbAttrs.src}
                      srcSet={thumbAttrs.srcSet}
                      sizes={thumbAttrs.sizes}
                      alt={item.product.title}
                      width={64}
                      height={80}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-20 object-cover bg-[#E8E4DC] border border-[#171717]/10 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[9px] font-sans uppercase tracking-[0.18em] text-[#B7A17A] block truncate">
                            {customerProductKicker(item.product.editorialKicker)}
                          </span>
                          <h4 className="font-editorial text-base text-[#171717] font-medium leading-snug truncate">
                            {item.product.title}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="w-9 h-9 min-w-[36px] min-h-[36px] -mr-1 -mt-1 flex items-center justify-center text-[#77736C] hover:text-[#9E3B3B] transition-colors shrink-0"
                          title="Remove piece from bag"
                          aria-label={`Remove ${item.product.title} from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#77736C] font-sans">
                        <span>
                          Size: <strong className="text-[#171717] font-medium">{item.selectedSize}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{item.selectedColor}</span>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-2">
                        {/* Touch-Friendly Quantity Selector */}
                        <div className="flex items-center border border-[#171717]/15 bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#77736C] hover:text-[#171717]"
                            aria-label={`Decrease quantity of ${item.product.title}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs text-[#171717] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#77736C] hover:text-[#171717]"
                            aria-label={`Increase quantity of ${item.product.title}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right tabular-nums">
                          <span className="font-mono text-xs font-semibold text-[#171717] block">
                            {PRICE_TO_BE_ANNOUNCED}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Bottom Actions & Subtotal Area */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 bg-white border-t border-[#171717]/10 space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#77736C]">
                <span>Bag ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</span>
                <span className="font-mono text-[#171717] font-semibold text-xs tabular-nums">
                  {PRICE_TO_BE_ANNOUNCED}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#77736C]">
                <p className="leading-relaxed">{PRE_LAUNCH_ORDERING_NOTICE}</p>
              </div>
            </div>

            <HairlineDivider variant="subtle" />

            {/* Actions: View Bag + pre-launch ordering notice */}
            <div className="space-y-2">
              <PrimaryButton
                fullWidth
                onClick={() => {
                  onClose();
                  if (onProceedCheckout) onProceedCheckout();
                }}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Ordering Information
              </PrimaryButton>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onViewBag) onViewBag();
                  }}
                  className="w-full min-h-[44px] py-2.5 px-3 border border-[#171717] text-[#171717] bg-white hover:bg-[#171717] hover:text-[#F4F1EA] transition-colors font-sans text-xs uppercase tracking-wider font-medium text-center"
                >
                  View Bag
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full min-h-[44px] py-2.5 px-3 border border-[#171717]/15 text-[#77736C] bg-transparent hover:text-[#171717] hover:border-[#171717]/40 transition-colors font-sans text-xs uppercase tracking-wider text-center"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Transparent Protocol Notice */}
            <div className="p-2.5 bg-[#FAF8F5] border border-[#171717]/10 flex items-start gap-2 text-[10px] text-[#77736C]">
              <Info className="w-3.5 h-3.5 text-[#B7A17A] flex-shrink-0 mt-0.5" />
              <span>
                Ordering is not available yet. No orders or payments are processed.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
