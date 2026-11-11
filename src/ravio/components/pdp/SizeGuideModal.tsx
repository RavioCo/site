import React, { useState, useEffect } from 'react';
import { CategorySlug } from '../../types/product';
import { SizeMeasurementRow, TrouserMeasurementRow } from './types';
import { X, Ruler, HelpCircle, CheckCircle2 } from 'lucide-react';

export interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categorySlug: CategorySlug;
  productTitle: string;
}

const TOPS_MEASUREMENTS: SizeMeasurementRow[] = [
  { size: 'S', chestCm: 96, chestIn: 37.8, shoulderCm: 43, shoulderIn: 16.9, lengthCm: 69, lengthIn: 27.2, sleeveCm: 21, sleeveIn: 8.3 },
  { size: 'M', chestCm: 102, chestIn: 40.2, shoulderCm: 45, shoulderIn: 17.7, lengthCm: 71, lengthIn: 28.0, sleeveCm: 22, sleeveIn: 8.7 },
  { size: 'L', chestCm: 108, chestIn: 42.5, shoulderCm: 47, shoulderIn: 18.5, lengthCm: 73, lengthIn: 28.7, sleeveCm: 23, sleeveIn: 9.1 },
  { size: 'XL', chestCm: 114, chestIn: 44.9, shoulderCm: 49, shoulderIn: 19.3, lengthCm: 75, lengthIn: 29.5, sleeveCm: 24, sleeveIn: 9.4 },
  { size: 'XXL', chestCm: 120, chestIn: 47.2, shoulderCm: 51, shoulderIn: 20.1, lengthCm: 77, lengthIn: 30.3, sleeveCm: 25, sleeveIn: 9.8 },
];

const TROUSER_MEASUREMENTS: TrouserMeasurementRow[] = [
  { size: '29', waistCm: 76, waistIn: 29.9, inseamCm: 81, inseamIn: 31.9, riseCm: 26, riseIn: 10.2, thighCm: 58, thighIn: 22.8, openingCm: 36, openingIn: 14.2 },
  { size: '30', waistCm: 79, waistIn: 31.1, inseamCm: 81, inseamIn: 31.9, riseCm: 26.5, riseIn: 10.4, thighCm: 60, thighIn: 23.6, openingCm: 37, openingIn: 14.6 },
  { size: '31', waistCm: 81.5, waistIn: 32.1, inseamCm: 82, inseamIn: 32.3, riseCm: 27, riseIn: 10.6, thighCm: 61, thighIn: 24.0, openingCm: 37.5, openingIn: 14.8 },
  { size: '32', waistCm: 84, waistIn: 33.1, inseamCm: 82, inseamIn: 32.3, riseCm: 27.5, riseIn: 10.8, thighCm: 62, thighIn: 24.4, openingCm: 38, openingIn: 15.0 },
  { size: '33', waistCm: 86.5, waistIn: 34.1, inseamCm: 84, inseamIn: 33.1, riseCm: 28, riseIn: 11.0, thighCm: 64, thighIn: 25.2, openingCm: 38.5, openingIn: 15.2 },
  { size: '34', waistCm: 89, waistIn: 35.0, inseamCm: 84, inseamIn: 33.1, riseCm: 28.5, riseIn: 11.2, thighCm: 65, thighIn: 25.6, openingCm: 39, openingIn: 15.4 },
  { size: '36', waistCm: 94, waistIn: 37.0, inseamCm: 84, inseamIn: 33.1, riseCm: 29.5, riseIn: 11.6, thighCm: 68, thighIn: 26.8, openingCm: 40, openingIn: 15.7 },
  { size: '38', waistCm: 99, waistIn: 39.0, inseamCm: 84, inseamIn: 33.1, riseCm: 30.5, riseIn: 12.0, thighCm: 71, thighIn: 28.0, openingCm: 41, openingIn: 16.1 },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  categorySlug,
  productTitle,
}) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const isBottomwear = categorySlug === 'denim' || categorySlug === 'twill-trousers';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Garment Sizing and Measurements Guide"
        className="relative bg-white text-[#171717] w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#171717]/15 shadow-2xl p-6 sm:p-8 space-y-6 z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#171717]/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#B7A17A]">
              <Ruler className="w-3.5 h-3.5" />
              <span>Garment Sizing Table</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#171717]">
              Size & Fit Guide
            </h2>
            <p className="font-sans text-xs text-[#77736C]">
              Reference for {productTitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#77736C] hover:text-[#171717] transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype Sample Disclaimer Notice */}
        <div className="p-3 bg-[#FAF8F5] border border-[#171717]/10 text-xs font-sans text-[#77736C] space-y-1">
          <div className="font-mono text-[9px] uppercase tracking-wider text-[#B7A17A] font-semibold">
            Measurement Information
          </div>
          <p>
            Measurements are indicative. Final sizing information is not yet available.
          </p>
        </div>

        {/* Unit Selector Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-sans uppercase tracking-wider text-[#77736C]">
            Measurement Units:
          </span>
          <div className="flex items-center bg-[#FAF8F5] border border-[#171717]/15 p-0.5">
            <button
              type="button"
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer ${
                unit === 'cm'
                  ? 'bg-[#171717] text-white font-semibold'
                  : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              Centimeters (cm)
            </button>
            <button
              type="button"
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer ${
                unit === 'in'
                  ? 'bg-[#171717] text-white font-semibold'
                  : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-[#171717]/10">
          {!isBottomwear ? (
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#FAF8F5] border-b border-[#171717]/10 text-[10px] font-mono uppercase tracking-wider text-[#77736C]">
                <tr>
                  <th scope="col" className="p-3">Size</th>
                  <th scope="col" className="p-3">Chest ({unit})</th>
                  <th scope="col" className="p-3">Shoulder ({unit})</th>
                  <th scope="col" className="p-3">Body Length ({unit})</th>
                  <th scope="col" className="p-3">Sleeve ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/5 font-mono tabular-nums">
                {TOPS_MEASUREMENTS.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="p-3 font-semibold text-[#171717]">{row.size}</td>
                    <td className="p-3 text-[#77736C]">
                      {unit === 'cm' ? row.chestCm : row.chestIn}
                    </td>
                    <td className="p-3 text-[#77736C]">
                      {unit === 'cm' ? row.shoulderCm : row.shoulderIn}
                    </td>
                    <td className="p-3 text-[#77736C]">
                      {unit === 'cm' ? row.lengthCm : row.lengthIn}
                    </td>
                    <td className="p-3 text-[#77736C]">
                      {unit === 'cm' ? row.sleeveCm : row.sleeveIn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#FAF8F5] border-b border-[#171717]/10 text-[10px] font-mono uppercase tracking-wider text-[#77736C]">
                <tr>
                  <th scope="col" className="p-3">Waist</th>
                  <th scope="col" className="p-3">Waist Cir. ({unit})</th>
                  <th scope="col" className="p-3">Inseam ({unit})</th>
                  <th scope="col" className="p-3">Front Rise ({unit})</th>
                  <th scope="col" className="p-3">Thigh ({unit})</th>
                  <th scope="col" className="p-3">Leg Opening ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/5 font-mono tabular-nums">
                {TROUSER_MEASUREMENTS.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="p-3 font-semibold text-[#171717]">{row.size}</td>
                    <td className="p-3 text-[#77736C]">
                      {unit === 'cm' ? row.waistCm : row.waistIn}
                    </td>
                    <td className="p-3 text-[#77736C]">
                      {unit === 'cm' ? row.inseamCm : row.inseamIn}
                    </td>
                    <td className="p-3 text-[#77736C]">
                      {unit === 'cm' ? row.riseCm : row.riseIn}
                    </td>
                    <td className="p-3 text-[#77736C]">
                      {unit === 'cm' ? row.thighCm : row.thighIn}
                    </td>
                    <td className="p-3 text-[#77736C]">
                      {unit === 'cm' ? row.openingCm : row.openingIn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* How to Measure Section */}
        <div className="space-y-3 pt-2 border-t border-[#171717]/10">
          <h3 className="font-editorial text-lg text-[#171717] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#B7A17A]" />
            <span>How to Take Measurements Accurately</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#77736C]">
            <div className="p-3 bg-[#FAF8F5] border border-[#171717]/5 space-y-1">
              <strong className="text-[#171717] block font-medium">Chest / Bust</strong>
              <p>Measure horizontally around the fullest part of your chest, keeping the tape straight across your back.</p>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#171717]/5 space-y-1">
              <strong className="text-[#171717] block font-medium">Shoulder Width</strong>
              <p>Measure from the tip of one shoulder bone across the natural curve of the neck to the other shoulder bone.</p>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#171717]/5 space-y-1">
              <strong className="text-[#171717] block font-medium">Waistline</strong>
              <p>Measure around your natural waistline, where your trousers typically sit comfortably without pinching.</p>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#171717]/5 space-y-1">
              <strong className="text-[#171717] block font-medium">Inseam Length</strong>
              <p>Measure from the top inside of your leg right at the crotch seam straight down to the bottom ankle hem.</p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#171717] text-white text-xs font-sans uppercase tracking-[0.16em] hover:bg-[#333333] transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
