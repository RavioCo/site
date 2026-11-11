import { customerKickerNeutral as customerProductKicker, customerPrice, customerShortDescription, PENDING_PRODUCT_DETAILS } from '../../utils/customerCopy';
import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { EditorialKicker } from '../common/Typography';
import { PrimaryButton } from '../common/PrimaryButton';
import { SecondaryButton } from '../common/SecondaryButton';
import { HairlineDivider } from '../common/HairlineDivider';
import { X, Check, ShoppingBag, ShieldCheck } from 'lucide-react';

export interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  currency: 'BDT' | 'USD';
  onAddToBag: (product: Product, size: string, color: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  currency,
  onAddToBag,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      setSelectedSize(product.availableSizes[0] || 'M');
      setSelectedColor(product.availableColors[0]?.name || 'Default');
      setActiveImage(product.imageUrls.hero);
      setIsAdded(false);
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  const priceFormatted =
    currency === 'BDT' ? product.price.formattedBDT : product.price.formattedUSD;

  const handleAdd = () => {
    onAddToBag(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/80 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.title} quick view`}
        className="relative w-full max-w-4xl bg-white text-[#171717] border border-[#171717]/20 shadow-2xl z-10 my-8 overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#77736C] hover:text-[#171717] bg-white/85 backdrop-blur-xs transition-colors border border-[#171717]/10"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery & Photography */}
        <div className="md:w-1/2 bg-[#E8E4DC] flex flex-col justify-between p-6">
          <div className="aspect-[3/4] w-full overflow-hidden bg-white border border-[#171717]/10 relative">
            <img
              src={activeImage}
              alt={product.title}
              width={600}
              height={800}
              referrerPolicy="no-referrer"
              decoding="async"
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            <div aria-hidden="true" className="invisible absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#171717]">
              Demonstration Archetype
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-2 pt-4 overflow-x-auto">
            {[product.imageUrls.hero, product.imageUrls.editorial, product.imageUrls.detail].map(
              (img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  aria-label={`View ${product.title} image ${index + 1}`}
                  className={`w-14 h-16 flex-shrink-0 border transition-all ${
                    activeImage === img ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${index + 1}`}
                    width={56}
                    height={64}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* Right: Specifications & Add to Bag */}
        <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <EditorialKicker variant="gold">{customerProductKicker(product.editorialKicker)}</EditorialKicker>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-medium leading-snug">
                {product.title}
              </h2>
              <p className="text-base font-sans font-medium text-[#171717] pt-1">
                {customerPrice(priceFormatted)}
              </p>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#77736C] leading-relaxed font-light">
              {customerShortDescription()}
            </p>

            <HairlineDivider variant="subtle" />

            {/* Color Selection */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-sans text-[#171717] font-medium">
                  Color: <span className="text-[#77736C]">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      className={`px-3 py-1.5 text-xs font-sans border flex items-center gap-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-[#171717] bg-[#FAF8F5] font-medium text-[#171717]'
                          : 'border-[#171717]/15 text-[#77736C] hover:border-[#171717]/40'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: color.hex }} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="font-medium text-[#171717]">Select Size</span>
                <span className="text-[#77736C]">Sartorial Regular Fit</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-mono border transition-all ${
                      selectedSize === sz
                        ? 'border-[#171717] bg-[#171717] text-white font-medium'
                        : 'border-[#171717]/20 text-[#171717] hover:border-[#171717]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Craft Details Preview */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736C] block">
                Details:
              </span>
              <p className="text-xs text-[#171717]/80">{PENDING_PRODUCT_DETAILS}</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-[#171717]/10 space-y-2">
            <PrimaryButton
              fullWidth
              onClick={handleAdd}
              icon={<ShoppingBag className="w-4 h-4" />}
            >
              {isAdded ? 'Added to Bag ✓' : 'Add to Bag'}
            </PrimaryButton>

            <p aria-hidden="true" className="invisible text-[10px] font-mono text-[#77736C] text-center">
              Demonstration Archetype · Ready for Shopify Storefront API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
