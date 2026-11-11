import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: 'ghost' | 'subtle' | 'charcoal' | 'ivory';
  size?: 'sm' | 'md' | 'lg';
  badgeCount?: number;
}

/**
 * IconButton
 * Minimalist accessible icon button for search, cart, user account, navigation.
 * Guarantees touch target >= 44px.
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  badgeCount,
  disabled,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9 min-w-[36px] min-h-[36px]',
    md: 'w-11 h-11 min-w-[44px] min-h-[44px]',
    lg: 'w-12 h-12 min-w-[48px] min-h-[48px]',
  };

  const variantClasses = {
    ghost:
      'bg-transparent text-[#171717] hover:bg-[#171717]/5 active:bg-[#171717]/10',
    subtle:
      'bg-[#FFFFFF] border border-[#171717]/10 text-[#171717] hover:bg-[#E8E4DC] active:bg-[#DFDBD3]',
    charcoal:
      'bg-[#171717] text-[#F4F1EA] hover:bg-[#2C2C2C] active:bg-[#000000]',
    ivory:
      'bg-transparent text-[#F4F1EA] hover:bg-[#F4F1EA]/10 active:bg-[#F4F1EA]/20',
  };

  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7A17A] disabled:opacity-40 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="flex items-center justify-center">{icon}</span>
      {typeof badgeCount === 'number' && badgeCount > 0 && (
        <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 flex items-center justify-center text-[9px] font-mono font-medium text-[#F4F1EA] bg-[#171717] border border-[#F4F1EA]/20 rounded-full">
          {badgeCount}
        </span>
      )}
    </button>
  );
};
