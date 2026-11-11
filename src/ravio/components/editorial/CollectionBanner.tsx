import React from 'react';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { PrimaryButton } from '../common/PrimaryButton';
import { OutlineButton } from '../common/OutlineButton';

export interface CollectionBannerProps {
  imageSrc: string;
  imageAlt: string;
  kicker: string;
  title: string;
  description: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  aspectRatio?: '16/9' | '21/9' | 'auto';
  className?: string;
}

/**
 * CollectionBanner
 * Editorial hero / collection banner featuring generous photography with restrained typographic scrim.
 */
export const CollectionBanner: React.FC<CollectionBannerProps> = ({
  imageSrc,
  imageAlt,
  kicker,
  title,
  description,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  aspectRatio = '21/9',
  className = '',
}) => {
  const aspectClass =
    aspectRatio === '21/9'
      ? 'aspect-[21/9] min-h-[460px]'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9] min-h-[420px]'
      : 'min-h-[440px]';

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#171717] border-y border-[#171717]/10 flex items-center ${aspectClass} ${className}`}
    >
      {/* Background Image with refined linear scrim */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.82] transition-transform duration-1000 ease-out hover:scale-[1.02]"
      />

      {/* Atmospheric gradient overlay for contrast compliance */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/90 via-[#171717]/50 to-transparent pointer-events-none" />

      {/* Text Content */}
      <Container width="flagship" className="relative z-10 py-12">
        <div className="max-w-xl space-y-4 text-[#F4F1EA]">
          <EditorialKicker variant="gold">{kicker}</EditorialKicker>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-[-0.02em]">
            {title}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed font-light max-w-lg">
            {description}
          </p>

          {(primaryActionLabel || secondaryActionLabel) && (
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {primaryActionLabel && (
                <PrimaryButton
                  onClick={onPrimaryAction}
                  className="bg-[#F4F1EA] text-[#171717] hover:bg-[#FFFFFF] border-transparent"
                >
                  {primaryActionLabel}
                </PrimaryButton>
              )}
              {secondaryActionLabel && (
                <OutlineButton
                  colorVariant="ivory"
                  onClick={onSecondaryAction}
                >
                  {secondaryActionLabel}
                </OutlineButton>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
