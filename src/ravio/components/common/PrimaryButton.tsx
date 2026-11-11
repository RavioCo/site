import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * PrimaryButton
 * Primary dark button in Charcoal (#171717) with Warm Ivory text (#F4F1EA).
 * Strict anti-pill geometry with 2:1 horizontal padding.
 */
export const PrimaryButton: React.FC<ButtonProps> = ({
  size = 'md',
  isLoading = false,
  loadingText,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-[10px] py-2 px-4 gap-2 tracking-[0.16em]',
    md: 'text-[11px] py-3.5 px-7 gap-2.5 tracking-[0.18em]',
    lg: 'text-xs py-4 px-9 gap-3 tracking-[0.2em]',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center font-sans font-medium uppercase transition-all duration-300 border border-[#171717] bg-[#171717] text-[#F4F1EA] hover:bg-[#2C2C2C] hover:border-[#2C2C2C] active:bg-[#000000] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7A17A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#171717] ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="animate-spin h-3.5 w-3.5 text-[#B7A17A]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-[10px] tracking-wider">{loadingText || 'Processing...'}</span>
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
        </>
      )}
    </button>
  );
};
