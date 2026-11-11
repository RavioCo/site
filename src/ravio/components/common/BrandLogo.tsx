import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'charcoal' | 'ivory' | 'white';
  showSubtitle?: boolean;
  showTempIdentifier?: boolean;
  className?: string;
}

/**
 * BrandLogo Component
 * Implements a clearly identified temporary typographical wordmark for RAVIO
 * until official vector brand identity assets are supplied by Ravio & Co.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'charcoal',
  showSubtitle = true,
  showTempIdentifier = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { text: 'text-xl tracking-[0.22em]', subtext: 'text-[9px] tracking-[0.24em]' },
    md: { text: 'text-2xl sm:text-3xl tracking-[0.25em]', subtext: 'text-[10px] tracking-[0.28em]' },
    lg: { text: 'text-4xl sm:text-5xl tracking-[0.28em]', subtext: 'text-xs tracking-[0.3em]' },
    xl: { text: 'text-5xl sm:text-6xl tracking-[0.3em]', subtext: 'text-xs tracking-[0.32em]' },
  };

  const colorMap = {
    charcoal: { main: 'text-[#171717]', sub: 'text-[#7E776F]', badge: 'border-[#171717]/20 text-[#171717]/70' },
    ivory: { main: 'text-[#F4F1EA]', sub: 'text-[#F4F1EA]/70', badge: 'border-[#F4F1EA]/30 text-[#F4F1EA]/80' },
    white: { main: 'text-white', sub: 'text-white/70', badge: 'border-white/30 text-white/80' },
  };

  const selectedSize = sizeMap[size];
  const selectedColor = colorMap[variant];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-2">
        <span
          className={`font-editorial font-medium uppercase transition-colors duration-300 ${selectedSize.text} ${selectedColor.main}`}
          style={{ fontFeatureSettings: '"cpsp" 1, "kern" 1' }}
        >
          RAVIO
        </span>
      </div>

      {showSubtitle && (
        <span
          className={`font-sans font-light uppercase mt-0.5 transition-colors duration-300 ${selectedSize.subtext} ${selectedColor.sub}`}
        >
          RAVIO & CO.
        </span>
      )}

      {showTempIdentifier && (
        <span className="mt-1 text-[9px] font-sans tracking-[0.14em] uppercase text-[#7E776F] border-t border-[#171717]/10 pt-0.5">
          Temporary Typographic Identifier
        </span>
      )}
    </div>
  );
};
