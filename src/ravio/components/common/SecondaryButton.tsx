import React from 'react';
import { ButtonProps } from './PrimaryButton';

/**
 * SecondaryButton
 * Secondary light button in Pure White (#FFFFFF) or Soft Stone (#E8E4DC) with Charcoal border and text.
 */
export const SecondaryButton: React.FC<ButtonProps> = ({
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
      className={`relative inline-flex items-center justify-center font-sans font-medium uppercase transition-all duration-300 border border-[#171717]/20 bg-[#FFFFFF] text-[#171717] hover:bg-[#E8E4DC] hover:border-[#171717]/40 active:bg-[#DFDBD3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7A17A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#FFFFFF] ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="animate-spin h-3.5 w-3.5 text-[#171717]"
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
          <span className="text-[10px] tracking-wider">{loadingText || 'Loading...'}</span>
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
