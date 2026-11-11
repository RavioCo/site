import React from 'react';

interface HairlineDividerProps {
  variant?: 'charcoal' | 'ivory' | 'gold' | 'subtle';
  className?: string;
}

export const HairlineDivider: React.FC<HairlineDividerProps> = ({
  variant = 'charcoal',
  className = '',
}) => {
  const borderStyles = {
    charcoal: 'border-t border-[#171717]/10',
    ivory: 'border-t border-[#F4F1EA]/15',
    gold: 'border-t border-[#B7A17A]/30',
    subtle: 'border-t border-[#E6E1D7]',
  };

  return <hr className={`w-full my-0 border-0 ${borderStyles[variant]} ${className}`} />;
};
