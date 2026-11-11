import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { GalleryImage } from './types';
import { getResponsiveImageAttrs } from '../../utils/imageOptimization';
import { Maximize2, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export interface ProductGalleryProps {
  product: Product;
  selectedColorName?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  product,
}) => {
  // Construct gallery list from product photography
  const images: GalleryImage[] = [
    {
      id: 'front',
      label: 'Studio Front',
      viewType: 'front',
      url: product.imageUrls.hero,
      alt: `${product.title} - Studio Front Profile`,
    },
    {
      id: 'model-front',
      label: 'Model Wear',
      viewType: 'model',
      url: product.imageUrls.modelFront,
      alt: `${product.title} - Model Front Fit`,
    },
    {
      id: 'detail',
      label: 'Fabric & Craft Detail',
      viewType: 'detail',
      url: product.imageUrls.detail,
      alt: `${product.title} - Close-up Weave & Stitching Detail`,
    },
    {
      id: 'lifestyle',
      label: 'Editorial Mood',
      viewType: 'lifestyle',
      url: product.imageUrls.editorial,
      alt: `${product.title} - Natural Daylight Editorial Setting`,
    },
    {
      id: 'model-back',
      label: 'Back Profile',
      viewType: 'back',
      url: product.imageUrls.modelBack,
      alt: `${product.title} - Back Silhouette and Drape`,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});

  // Touch Swipe tracking for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Desktop hover zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreenModalOpen) {
        if (e.key === 'Escape') setIsFullscreenModalOpen(false);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenModalOpen]);

  const activeImage = images[activeIndex] || images[0];
  const mainImgAttrs = getResponsiveImageAttrs(
    activeImage.url,
    [600, 900, 1200, 1600],
    '(max-width: 1024px) 100vw, 58vw'
  );

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 sm:gap-6 select-none">
      {/* Thumbnail Bar: Desktop vertical column, Mobile horizontal row */}
      <div
        role="tablist"
        aria-label="Product gallery thumbnails"
        className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[700px] no-scrollbar py-1"
      >
        {images.map((img, index) => {
          const isSelected = activeIndex === index;
          const thumbAttrs = getResponsiveImageAttrs(img.url, [160, 240], '80px');
          const hasFailed = Boolean(failedIds[img.id]);
          return (
            <button
              key={img.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 bg-[#E8E4DC] overflow-hidden border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#171717] ring-1 ring-[#171717]'
                  : 'border-[#171717]/10 opacity-75 hover:opacity-100 hover:border-[#171717]/30'
              }`}
              aria-label={`View ${img.label}`}
            >
              {!hasFailed ? (
                <img
                  src={thumbAttrs.src}
                  srcSet={thumbAttrs.srcSet}
                  sizes={thumbAttrs.sizes}
                  alt={img.alt}
                  width={80}
                  height={100}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedIds((prev) => ({ ...prev, [img.id]: true }))}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#E8E4DC] text-[9px] font-editorial uppercase tracking-widest text-[#171717]/70">
                  RAVIO
                </div>
              )}
              <span className="absolute bottom-0 inset-x-0 bg-[#171717]/80 text-[#F4F1EA] text-[8px] font-mono uppercase tracking-wider py-0.5 px-1 truncate text-center hidden sm:block">
                {img.viewType}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Canvas with Magnifier & Zoom Support */}
      <div className="relative flex-1 bg-[#E8E4DC] aspect-[3/4] overflow-hidden border border-[#171717]/10 group">
        {/* Interactive Desktop Zoom Canvas */}
        <div
          className="w-full h-full cursor-crosshair relative"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsFullscreenModalOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Base Image */}
          <img
            src={mainImgAttrs.src}
            srcSet={mainImgAttrs.srcSet}
            sizes={mainImgAttrs.sizes}
            alt={activeImage.alt}
            width={900}
            height={1200}
            referrerPolicy="no-referrer"
            fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
            decoding="async"
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
              isZoomed ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* High-Resolution Zoom Surface (Desktop Only) */}
          {isZoomed && (
            <div
              className="absolute inset-0 hidden lg:block bg-no-repeat pointer-events-none"
              style={{
                backgroundImage: `url(${activeImage.url})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: '240%',
              }}
            />
          )}
        </div>

        {/* View Details Label (Zero Pills) */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="bg-white/95 backdrop-blur-xs text-[#171717] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 border border-[#171717]/5 shadow-xs">
            {activeImage.label}
          </span>
        </div>

        {/* Fullscreen Expansion Button (44x44px touch target) */}
        <button
          type="button"
          onClick={() => setIsFullscreenModalOpen(true)}
          className="absolute top-3 right-3 z-10 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/95 hover:bg-white text-[#171717] border border-[#171717]/10 shadow-xs transition-colors cursor-pointer"
          aria-label="Expand image to fullscreen lightbox"
          title="Zoom image"
        >
          <Maximize2 className="w-4 h-4 text-[#171717]" />
        </button>

        {/* Desktop Loupe Hint Bar */}
        <div className="absolute bottom-4 left-4 right-4 hidden lg:flex items-center justify-between text-[10px] font-mono text-[#171717]/70 bg-white/90 backdrop-blur-xs px-3 py-1.5 border border-[#171717]/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5 text-[#B7A17A]" /> Hover canvas to inspect textile weave
          </span>
          <span>Click to expand</span>
        </div>

        {/* Mobile Carousel Navigation Arrows (44x44px Touch Targets) */}
        <button
          type="button"
          onClick={handlePrev}
          className="lg:hidden absolute left-2.5 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/90 text-[#171717] border border-[#171717]/10"
          aria-label="Previous product image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="lg:hidden absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/90 text-[#171717] border border-[#171717]/10"
          aria-label="Next product image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Mobile Swipe Pagination Dots */}
        <div className="lg:hidden absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10 pointer-events-none">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 transition-all ${
                activeIndex === i ? 'w-6 bg-[#171717]' : 'w-1.5 bg-[#171717]/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title} fullscreen gallery`}
          className="fixed inset-0 z-50 bg-[#171717]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B7A17A]">
                {product.title} · {activeImage.label}
              </span>
              <p className="text-xs text-white/70">
                Image {activeIndex + 1} of {images.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreenModalOpen(false)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Enlarged Image */}
          <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              referrerPolicy="no-referrer"
              className="max-h-[80vh] max-w-full object-contain shadow-2xl"
            />
            {/* Previous / Next buttons */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 p-3 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-none transition-colors"
              aria-label="Previous picture"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 p-3 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-none transition-colors"
              aria-label="Next picture"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex justify-center gap-3 overflow-x-auto pt-4 border-t border-white/10">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Select image ${i + 1}: ${img.label}`}
                className={`w-12 h-16 border transition-all ${
                  activeIndex === i ? 'border-[#B7A17A] scale-105' : 'border-white/20 opacity-60'
                }`}
              >
                <img src={img.url} alt={img.alt} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
