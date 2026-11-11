import React, { useState } from 'react';
import { useCart, DELIVERY_OPTIONS } from '../../context/CartContext';
import { OrderSummary } from '../cart/OrderSummary';
import { SiteHeader } from '../navigation/SiteHeader';
import { SiteFooter } from '../navigation/SiteFooter';
import { SearchModal } from '../modals/SearchModal';
import { BagDrawer } from '../modals/BagDrawer';
import { AccountModal } from '../modals/AccountModal';
import { CustomerCareModal, CustomerCareTopic } from '../modals/CustomerCareModal';
import { PrimaryButton } from '../common/PrimaryButton';
import { BrandEditorialRoute } from '../navigation/MobileNavigation';
import {
  Truck,
  CreditCard,
  Banknote,
  ArrowLeft,
  ArrowRight,
  Info,
  MapPin,
  User,
  ChevronRight,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';

export interface CheckoutViewProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateCollection: (slug: string) => void;
  onNavigateCart: () => void;
  onSelectProduct: (handle: string) => void;
  onNavigateEditorial?: (route: BrandEditorialRoute) => void;
}

interface CustomerFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  cityDistrict: string;
  thanaArea: string;
  streetAddress: string;
  deliveryNotes: string;
  paymentMethod: 'cod' | 'digital';
}

const BANGLADESH_DISTRICTS = [
  'Dhaka (Metropolitan)',
  'Dhaka (Suburbs / Savar / Gazipur)',
  'Chittagong (Chattogram)',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Comilla (Cumilla)',
  "Cox's Bazar",
  'Narayanganj',
  'Bogra (Bogura)',
  'Jessore (Jashore)',
];

const INITIAL_DEMO_FORM: CustomerFormData = {
  fullName: 'Arifin Rahman',
  email: 'arifin.rahman@example.com',
  phoneNumber: '+880 1711-234567',
  cityDistrict: 'Dhaka (Metropolitan)',
  thanaArea: 'Gulshan 2',
  streetAddress: 'House 14, Road 71, Apartment 4B',
  deliveryNotes: 'Please ring the concierge bell upon arrival.',
  paymentMethod: 'cod',
};

const EMPTY_FORM: CustomerFormData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  cityDistrict: 'Dhaka (Metropolitan)',
  thanaArea: '',
  streetAddress: '',
  deliveryNotes: '',
  paymentMethod: 'cod',
};

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateCollection,
  onNavigateCart,
  onSelectProduct,
  onNavigateEditorial,
}) => {
  const {
    items,
    totalItemCount,
    subtotalBDT,
    subtotalUSD,
    activeCurrency,
    setActiveCurrency,
    selectedDeliveryOption,
    setSelectedDeliveryOption,
    appliedPromo,
    openBagDrawer,
    isBagDrawerOpen,
    closeBagDrawer,
  } = useCart();

  // Navigation & Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [customerCareTopic, setCustomerCareTopic] = useState<CustomerCareTopic | null>(null);

  // Form State
  const [formData, setFormData] = useState<CustomerFormData>(INITIAL_DEMO_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState<1 | 2>(1); // 1: Details & Validation, 2: Order Summary Review
  const [handoffVerified, setHandoffVerified] = useState(false);

  // Calculations
  const isDeliveryFreeBDT =
    selectedDeliveryOption.freeThresholdBDT &&
    subtotalBDT >= selectedDeliveryOption.freeThresholdBDT;

  const deliveryCostBDT = isDeliveryFreeBDT ? 0 : selectedDeliveryOption.priceBDT;
  const deliveryCostUSD = isDeliveryFreeBDT ? 0 : selectedDeliveryOption.priceUSD;

  const discountAmountBDT = appliedPromo
    ? Math.round((subtotalBDT * appliedPromo.discountPercentage) / 100)
    : 0;
  const discountAmountUSD = appliedPromo
    ? Math.round((subtotalUSD * appliedPromo.discountPercentage) / 100)
    : 0;

  const totalBDT = Math.max(0, subtotalBDT - discountAmountBDT + deliveryCostBDT);
  const totalUSD = Math.max(0, subtotalUSD - discountAmountUSD + deliveryCostUSD);

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.replace(/\D/g, '').length < 10) {
      errors.phoneNumber = 'Please provide a valid Bangladesh mobile number (minimum 10 digits).';
    }
    if (!formData.cityDistrict) {
      errors.cityDistrict = 'Please select your delivery district.';
    }
    if (!formData.thanaArea.trim()) {
      errors.thanaArea = 'Please specify your area or thana.';
    }
    if (!formData.streetAddress.trim()) {
      errors.streetAddress = 'Please enter your complete street address.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setHandoffVerified(false);
      setCurrentStep(2);
      window.scrollTo({ top: 160, behavior: 'smooth' });
    }
  };

  const handleVerifyDemoHandoff = () => {
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }
    setHandoffVerified(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171717] flex flex-col font-sans-clean selection:bg-[#B7A17A]/25">
      {/* 1. Header */}
      <SiteHeader
        activeCurrency={activeCurrency}
        onCurrencyToggle={(c) => setActiveCurrency(c)}
        cartCount={totalItemCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={openBagDrawer}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateCollection={onNavigateCollection}
        onNavigateEditorial={onNavigateEditorial}
      />

      {/* 2. Main Content */}
      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-[#171717]/10 bg-[#FAF8F5]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between text-xs font-sans text-[#77736C]">
            <nav aria-label="Breadcrumbs" className="flex items-center gap-2">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-[#171717] transition-colors uppercase tracking-widest text-[10px]"
              >
                Home
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                onClick={onNavigateCart}
                className="hover:text-[#171717] transition-colors uppercase tracking-widest text-[10px]"
              >
                Shopping Bag
              </button>
              <span aria-hidden="true">/</span>
              <span className="text-[#171717] font-medium uppercase tracking-widest text-[10px]">
                Ordering
              </span>
            </nav>

            <button
              type="button"
              onClick={onNavigateCart}
              className="flex items-center gap-1.5 text-xs text-[#77736C] hover:text-[#171717] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Bag</span>
            </button>
          </div>
        </div>

        {/* Pre-launch: no customer details, delivery, payment or order submission are collected. */}
        <div className="max-w-2xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#B7A17A] block font-semibold">
            Edition 01 · Pre-Launch
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] tracking-tight">
            Ordering Opens Soon
          </h1>
          <p className="font-sans text-sm text-[#77736C] font-light leading-relaxed max-w-lg mx-auto">
            RAVIO is preparing its first edition. Pricing, ordering and payment are not yet available, and no order can be placed at this time.
          </p>
          <p className="font-sans text-xs text-[#77736C] font-light leading-relaxed max-w-lg mx-auto">
            {items.length > 0
              ? `Your bag (${totalItemCount} ${totalItemCount === 1 ? 'piece' : 'pieces'}) is saved on this device so you can revisit your selections at release.`
              : 'Your bag is empty. Explore the collection and save the pieces you would like to revisit at release.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {items.length > 0 && (
              <PrimaryButton onClick={onNavigateCart}>Return to Bag</PrimaryButton>
            )}
            <button
              type="button"
              onClick={onNavigateShop}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 border border-[#171717]/20 text-[#171717] hover:border-[#171717] text-xs font-sans uppercase tracking-wider transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <SiteFooter
        onOpenCustomerCare={(topic) => setCustomerCareTopic(topic)}
        onNavigateEditorial={onNavigateEditorial}
        onNavigateSection={(hash) => {
          if (hash === '#shop') onNavigateShop();
          else onNavigateHome();
        }}
      />

      {/* Supporting Modals & Drawers */}
      <BagDrawer
        isOpen={isBagDrawerOpen}
        onClose={closeBagDrawer}
        currency={activeCurrency}
        onExploreProducts={onNavigateShop}
        onViewBag={onNavigateCart}
        onProceedCheckout={closeBagDrawer}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={activeCurrency}
        onSelectProduct={(p) => {
          setIsSearchOpen(false);
          onSelectProduct(p.handle);
        }}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      <CustomerCareModal
        isOpen={customerCareTopic !== null}
        topic={customerCareTopic}
        onClose={() => setCustomerCareTopic(null)}
      />
    </div>
  );
};
