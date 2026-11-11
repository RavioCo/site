import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * EditorialHeading: Refined serif headline with slight negative letter tracking
 */
export const EditorialHeading: React.FC<
  TextProps & { size?: 'display' | 'title' | 'subhead'; variant?: 'charcoal' | 'ivory' | 'gold' }
> = ({ children, size = 'title', variant = 'charcoal', as, className = '' }) => {
  const sizeClasses = {
    display: 'font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em]',
    title: 'font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.18] tracking-[-0.015em]',
    subhead: 'font-editorial text-xl sm:text-2xl font-normal leading-[1.25]',
  };

  const colorClasses = {
    charcoal: 'text-[#171717]',
    ivory: 'text-[#F4F1EA]',
    gold: 'text-[#B7A17A]',
  };

  const Component = as || (size === 'display' ? 'h1' : size === 'title' ? 'h2' : 'h3');

  return (
    <Component className={`${sizeClasses[size]} ${colorClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
};

/**
 * EditorialKicker: Micro-tracked uppercase sans-serif subhead / category identifier
 * (Zero pills - strictly clean unboxed typography)
 */
export const EditorialKicker: React.FC<TextProps & { variant?: 'muted' | 'gold' | 'charcoal' | 'ivory' }> = ({
  children,
  variant = 'muted',
  as: Component = 'span',
  className = '',
}) => {
  const colorClasses = {
    muted: 'text-[#7E776F]',
    gold: 'text-[#B7A17A]',
    charcoal: 'text-[#171717]',
    ivory: 'text-[#F4F1EA]/80',
  };

  return (
    <Component
      className={`font-sans text-[11px] font-medium uppercase tracking-[0.22em] inline-block ${colorClasses[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

/**
 * EditorialBody: Modern clean sans-serif body copy with generous line-height
 */
export const EditorialBody: React.FC<
  TextProps & { size?: 'lg' | 'base' | 'sm'; variant?: 'charcoal' | 'ivory' | 'muted' }
> = ({ children, size = 'base', variant = 'charcoal', as: Component = 'p', className = '' }) => {
  const sizeClasses = {
    lg: 'text-lg sm:text-xl leading-[1.7] font-light',
    base: 'text-sm sm:text-base leading-[1.65] font-normal',
    sm: 'text-xs sm:text-sm leading-[1.6] font-normal',
  };

  const colorClasses = {
    charcoal: 'text-[#171717]/90',
    ivory: 'text-[#F4F1EA]/85',
    muted: 'text-[#7E776F]',
  };

  return (
    <Component className={`font-sans ${sizeClasses[size]} ${colorClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
};

/**
 * EditorialQuote: Refined blockquote style for brand philosophy
 */
export const EditorialQuote: React.FC<TextProps & { attribution?: string }> = ({
  children,
  attribution,
  className = '',
}) => {
  return (
    <blockquote className={`my-8 max-w-2xl mx-auto text-center ${className}`}>
      <p className="font-editorial italic text-2xl sm:text-3xl text-[#171717] leading-[1.35] tracking-[-0.01em]">
        “{children}”
      </p>
      {attribution && (
        <footer className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-[#7E776F]">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
};
