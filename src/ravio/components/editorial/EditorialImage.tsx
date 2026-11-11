import React, { useState } from 'react';
import { getResponsiveImageAttrs } from '../../utils/imageOptimization';

export type AspectRatioType = '3/4' | '4/5' | '1/1' | '16/9' | '21/9';

export interface EditorialImageProps {
  src: string;
  alt: string;
  aspectRatio?: AspectRatioType;
  caption?: string;
  categoryTag?: string;
  credit?: string;
  placeholderSlotName?: string;
  priority?: boolean;
  interactiveZoom?: boolean;
  className?: string;
  imageClassName?: string;
}

/**
 * EditorialImage
 * High-fidelity image component honoring the brand's aspect ratio system.
 * Includes responsive WebP srcSet, explicit dimensions to prevent CLS, resilient fallback rendering,
 * and replaceable campaign placeholder slot identification.
 */
export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  aspectRatio = '3/4',
  caption,
  categoryTag,
  credit,
  placeholderSlotName,
  priority = false,
  interactiveZoom = true,
  className = '',
  imageClassName = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const ratioClasses = {
    '3/4': 'aspect-[3/4]',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
    '16/9': 'aspect-[16/9]',
    '21/9': 'aspect-[21/9]',
  };

  const dimensionMap: Record<AspectRatioType, { width: number; height: number }> = {
    '3/4': { width: 900, height: 1200 },
    '4/5': { width: 960, height: 1200 },
    '1/1': { width: 1000, height: 1000 },
    '16/9': { width: 1600, height: 900 },
    '21/9': { width: 2100, height: 900 },
  };

  const dims = dimensionMap[aspectRatio];
  const imgAttrs = getResponsiveImageAttrs(
    src,
    [400, 800, 1200, 1600],
    aspectRatio === '16/9' || aspectRatio === '21/9'
      ? '100vw'
      : '(max-width: 1024px) 100vw, 50vw'
  );

  return (
    <figure className={`group flex flex-col space-y-2.5 ${className}`}>
      <div
        className={`relative w-full overflow-hidden bg-[#E8E4DC] border border-[#171717]/10 ${
          ratioClasses[aspectRatio]
        }`}
      >
        {!hasError ? (
          <img
            src={imgAttrs.src}
            srcSet={imgAttrs.srcSet}
            sizes={imgAttrs.sizes}
            alt={alt}
            width={dims.width}
            height={dims.height}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              interactiveZoom ? 'group-hover:scale-[1.03]' : ''
            } ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F4F1EA] via-[#E8E4DC] to-[#DFDBD3]">
            <span className="font-editorial text-2xl tracking-[0.25em] uppercase text-[#171717]/75">
              RAVIO
            </span>
            <span className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#77736C]">
              {alt}
            </span>
            {false && placeholderSlotName && (
              <span className="mt-3 font-mono text-[9px] uppercase tracking-wider text-[#B7A17A]">
                Slot: {placeholderSlotName}
              </span>
            )}
          </div>
        )}

        {categoryTag && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#171717]">
            {categoryTag}
          </div>
        )}
      </div>

      {(caption || credit) && (
        <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-[#77736C] pt-1">
          {caption && <span className="font-editorial italic text-[#171717]/80">{caption}</span>}
          {credit && !/placeholder|replaceable asset/i.test(credit) && (
            <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#77736C]">
              {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
