import React from 'react';
import { EditorialKicker } from './Typography';

export interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  variant?: 'charcoal' | 'ivory';
  action?: React.ReactNode;
  className?: string;
}

/**
 * SectionHeading
 * Editorial section header combining micro-tracked kicker, serif title, and sans-serif prose.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  alignment = 'center',
  variant = 'charcoal',
  action,
  className = '',
}) => {
  const isCentered = alignment === 'center';
  const isIvory = variant === 'ivory';

  return (
    <div
      className={`space-y-3 ${
        isCentered ? 'text-center max-w-2xl mx-auto' : 'text-left max-w-3xl'
      } ${className}`}
    >
      {kicker && (
        <EditorialKicker variant={isIvory ? 'gold' : 'gold'}>
          {kicker}
        </EditorialKicker>
      )}

      <h2
        className={`font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] tracking-[-0.015em] ${
          isIvory ? 'text-[#F4F1EA]' : 'text-[#171717]'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`font-sans text-sm sm:text-base leading-[1.65] font-light ${
            isIvory ? 'text-[#F4F1EA]/80' : 'text-[#77736C]'
          }`}
        >
          {subtitle}
        </p>
      )}

      {action && (
        <div className={`pt-2 ${isCentered ? 'flex justify-center' : 'flex justify-start'}`}>
          {action}
        </div>
      )}
    </div>
  );
};
