import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-sans uppercase font-medium tracking-[0.16em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7A17A] disabled:opacity-40 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'text-[10px] py-2 px-4 gap-2',
    md: 'text-[11px] py-3 px-6 gap-2.5',
    lg: 'text-xs py-4 px-8 gap-3',
  };

  const variantClasses = {
    // Primary: Deep charcoal with crisp contrast
    primary:
      'bg-[#171717] text-[#F4F1EA] hover:bg-[#2A2A2A] active:bg-[#000000] border border-[#171717]',
    // Secondary: Warm Ivory canvas with subtle charcoal border
    secondary:
      'bg-[#F4F1EA] text-[#171717] hover:bg-[#EBE7DF] border border-[#171717]/20',
    // Outline: Transparent with clean 1px hairline border
    outline:
      'bg-transparent text-[#171717] border border-[#171717]/30 hover:border-[#171717] hover:bg-[#171717]/5',
    // Underline: Pure editorial link style (no button block)
    underline:
      'bg-transparent text-[#171717] px-0 py-1 border-b border-[#171717]/40 hover:border-[#171717] hover:text-black gap-2 tracking-[0.18em]',
  };

  return (
    <button
      className={`${baseClasses} ${variant !== 'underline' ? sizeClasses[size] : 'text-[11px]'} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};
