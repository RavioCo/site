import React from 'react';

export interface TextLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorVariant?: 'charcoal' | 'ivory' | 'gold' | 'grey';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  underlineHoverOnly?: boolean;
  children: React.ReactNode;
}

/**
 * TextLink
 * Pure editorial link button with refined letter tracking and hairline underline.
 */
export const TextLink: React.FC<TextLinkProps> = ({
  colorVariant = 'charcoal',
  size = 'md',
  icon,
  iconPosition = 'right',
  underlineHoverOnly = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const sizeMap = {
    sm: 'text-[10px] tracking-[0.16em]',
    md: 'text-[11px] tracking-[0.18em]',
    lg: 'text-xs tracking-[0.2em]',
  };

  const colorMap = {
    charcoal:
      'text-[#171717] hover:text-[#000000] border-[#171717]/40 hover:border-[#171717]',
    ivory:
      'text-[#F4F1EA] hover:text-[#FFFFFF] border-[#F4F1EA]/50 hover:border-[#FFFFFF]',
    gold:
      'text-[#B7A17A] hover:text-[#C5AF86] border-[#B7A17A]/50 hover:border-[#B7A17A]',
    grey:
      'text-[#77736C] hover:text-[#171717] border-[#77736C]/40 hover:border-[#171717]',
  };

  const underlineClass = underlineHoverOnly
    ? 'border-b border-transparent hover:border-current'
    : 'border-b pb-0.5';

  return (
    <button
      disabled={disabled}
      className={`group inline-flex items-center gap-2 font-sans font-medium uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7A17A] disabled:opacity-40 disabled:cursor-not-allowed ${sizeMap[size]} ${colorMap[colorVariant]} ${underlineClass} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-200 group-hover:translate-x-1">{icon}</span>
      )}
    </button>
  );
};
