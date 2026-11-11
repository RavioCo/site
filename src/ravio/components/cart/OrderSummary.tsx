import React from 'react';
import { useCart } from '../../context/CartContext';
import { PrimaryButton } from '../common/PrimaryButton';
import { HairlineDivider } from '../common/HairlineDivider';
import { PRICE_TO_BE_ANNOUNCED, PRE_LAUNCH_ORDERING_NOTICE } from '../../utils/customerCopy';
import { ArrowRight } from 'lucide-react';

// Pre-launch: monetary totals, delivery rates and promo codes stay in CartContext/commerceRules
// but are not shown to customers until pricing and fulfilment are confirmed.
export interface OrderSummaryProps {
  onCheckout?: () => void;
  ctaText?: string;
  showCheckoutButton?: boolean;
  showDeliverySelector?: boolean;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  onCheckout,
  ctaText = 'Ordering Information',
  showCheckoutButton = true,
  className = '',
}) => {
  const { items, totalItemCount } = useCart();

  return (
    <div
      className={`bg-white border border-[#171717]/10 p-6 sm:p-8 space-y-6 ${className}`}
      aria-label="Bag Summary"
    >
      <div className="border-b border-[#171717]/10 pb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B7A17A] block">
          Bag Summary
        </span>
        <h3 className="font-editorial text-2xl text-[#171717]">Your Selection</h3>
      </div>

      <div className="space-y-3.5 text-xs font-sans">
        <div className="flex items-center justify-between text-[#77736C]">
          <span>
            Garments ({totalItemCount} {totalItemCount === 1 ? 'piece' : 'pieces'})
          </span>
          <span className="font-mono text-[#171717] font-medium">{PRICE_TO_BE_ANNOUNCED}</span>
        </div>
      </div>

      <HairlineDivider variant="charcoal" />

      <p className="text-xs text-[#77736C] font-light leading-relaxed">{PRE_LAUNCH_ORDERING_NOTICE}</p>

      {showCheckoutButton && onCheckout && (
        <div className="pt-2">
          <PrimaryButton
            fullWidth
            onClick={onCheckout}
            disabled={items.length === 0}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {ctaText}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};
