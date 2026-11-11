import React, { useState } from 'react';
import { PrimaryButton } from '../common/PrimaryButton';
import { EditorialKicker } from '../common/Typography';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface NewsletterFormProps {
  title?: string;
  description?: string;
  variant?: 'charcoal' | 'ivory';
  className?: string;
}

/**
 * NewsletterForm
 * Dignified ledger subscription form with accessible feedback and zero spam promises.
 */
export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  title = 'The RAVIO Ledger',
  description = 'Private dispatches on material provenance, seasonal releases, and sartorial essays. Distributed with intention.',
  variant = 'charcoal',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isIvory = variant === 'ivory';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid personal email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 900);
  };

  return (
    <div
      className={`p-8 sm:p-12 border ${
        isIvory
          ? 'bg-[#171717] text-[#F4F1EA] border-[#F4F1EA]/15'
          : 'bg-[#FFFFFF] text-[#171717] border-[#171717]/10'
      } ${className}`}
    >
      <div className="max-w-xl mx-auto text-center space-y-4">
        <EditorialKicker variant="gold">Private Dispatches</EditorialKicker>

        <h3 className="font-editorial text-2xl sm:text-3xl font-normal">
          {title}
        </h3>

        <p
          className={`font-sans text-xs sm:text-sm leading-relaxed ${
            isIvory ? 'text-[#F4F1EA]/75' : 'text-[#77736C]'
          }`}
        >
          {description}
        </p>

        {status === 'success' ? (
          <div className="p-4 bg-[#F0F5F2] border border-[#3D6E50]/30 text-emerald-900 text-xs flex items-center justify-center gap-2 mt-6">
            <CheckCircle2 className="w-4 h-4 text-[#3D6E50]" />
            <span>Thank you. Newsletter sign-up is not yet active, so your address has not been saved.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your personal email address"
                aria-label="Email Address"
                className={`flex-1 px-4 py-3 text-xs font-sans tracking-wide border focus:outline-none focus:ring-1 focus:ring-[#B7A17A] transition-colors ${
                  isIvory
                    ? 'bg-[#212121] text-[#F4F1EA] border-[#F4F1EA]/20 placeholder-[#F4F1EA]/40'
                    : 'bg-[#F4F1EA] text-[#171717] border-[#171717]/15 placeholder-[#77736C]/60'
                } ${status === 'error' ? 'border-[#9E3B3B]' : ''}`}
              />
              <PrimaryButton
                type="submit"
                isLoading={status === 'loading'}
                loadingText="Inscribing..."
                className={isIvory ? 'bg-[#F4F1EA] text-[#171717] hover:bg-[#FFFFFF]' : ''}
              >
                Join Ledger
              </PrimaryButton>
            </div>

            {status === 'error' && (
              <p className="text-[11px] text-[#9E3B3B] flex items-center justify-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMessage}</span>
              </p>
            )}

            <p className="text-[10px] text-[#77736C] pt-2">
              We respect your privacy. No promotional inundation. Unsubscribe at any moment.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
