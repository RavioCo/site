import React from 'react';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'charcoal' | 'ivory' | 'white';
  showSubtitle?: boolean;
  showProvisionalNotice?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Logo Component
 * Temporary text-based wordmark for RAVIO & Co. with refined editorial tracking.
 * Identifies as provisional until official vector assets are provided.
 */
export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'charcoal',
  showSubtitle = true,
  showProvisionalNotice = false,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: { main: 'text-xl tracking-[0.24em]', sub: 'text-[9px] tracking-[0.22em]' },
    md: { main: 'text-2xl sm:text-3xl tracking-[0.26em]', sub: 'text-[10px] tracking-[0.25em]' },
    lg: { main: 'text-3xl sm:text-4xl tracking-[0.28em]', sub: 'text-[11px] tracking-[0.28em]' },
    xl: { main: 'text-4xl sm:text-5xl lg:text-6xl tracking-[0.3em]', sub: 'text-xs tracking-[0.3em]' },
  };

  const colorMap = {
    charcoal: { text: 'text-[#171717]', sub: 'text-[#77736C]' },
    ivory: { text: 'text-[#F4F1EA]', sub: 'text-[#F4F1EA]/70' },
    white: { text: 'text-[#FFFFFF]', sub: 'text-[#FFFFFF]/75' },
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center select-none transition-opacity duration-200 ${
        onClick ? 'cursor-pointer hover:opacity-85' : ''
      } ${className}`}
    >
      <span
        className={`font-editorial font-normal uppercase leading-none ${sizeMap[size].main} ${colorMap[variant].text}`}
        style={{ fontFeatureSettings: '"cpsp" 1, "kern" 1' }}
      >
        RAVIO
      </span>

      {showSubtitle && (
        <span
          className={`font-sans font-light uppercase mt-1 leading-none ${sizeMap[size].sub} ${colorMap[variant].sub}`}
        >
          RAVIO & CO.
        </span>
      )}

      {showProvisionalNotice && (
        <span className="mt-1 text-[8px] font-sans tracking-[0.14em] uppercase text-[#77736C] border-t border-[#171717]/10 pt-0.5">
          Provisional Typographical Mark
        </span>
      )}
    </div>
  );
};
