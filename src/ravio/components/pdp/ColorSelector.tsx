import React from 'react';

export interface ColorOption {
  name: string;
  hex: string;
}

export interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (colorName: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs font-sans">
        <span id="color-selector-label" className="uppercase tracking-[0.16em] text-[#77736C]">
          Colour: <strong className="text-[#171717] font-semibold">{selectedColor}</strong>
        </span>
        <span className="text-[10px] font-mono text-[#77736C]">
          {colors.length} Shade{colors.length !== 1 ? 's' : ''} Available
        </span>
      </div>

      <div
        role="radiogroup"
        aria-labelledby="color-selector-label"
        className="flex flex-wrap items-center gap-2.5"
      >
        {colors.map((color) => {
          const isSelected = selectedColor.toLowerCase() === color.name.toLowerCase();
          return (
            <button
              key={color.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select colour ${color.name}`}
              onClick={() => onSelectColor(color.name)}
              className={`group relative w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#171717] bg-white ring-1 ring-[#171717]'
                  : 'border-[#171717]/20 hover:border-[#171717]/60 bg-transparent'
              }`}
              title={color.name}
            >
              <span
                className="w-6 h-6 rounded-none border border-black/15 transition-transform group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              />
              {/* Tooltip on hover */}
              <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#171717] text-white text-[9px] font-mono uppercase tracking-wider py-0.5 px-1.5 whitespace-nowrap z-20 pointer-events-none">
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
