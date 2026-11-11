import React, { useState } from 'react';
import { Container } from '../common/Container';
import { EditorialKicker } from '../common/Typography';
import { PrimaryButton } from '../common/PrimaryButton';
import { CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * SECTION 08 — NEWSLETTER
 * Refined email subscription interface with honest client-side state handling.
 */
export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid personal email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 700);
  };

  return (
    <section id="newsletter" className="py-20 sm:py-28 bg-[#F4F1EA]">
      <Container width="narrow">
        <div className="bg-white border border-[#171717]/10 p-8 sm:p-14 text-center space-y-6">
          <EditorialKicker variant="gold">PRIVATE DISPATCHES</EditorialKicker>

          <div className="space-y-2">
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal tracking-[-0.015em] uppercase">
              STAY CONNECTED WITH RAVIO.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#77736C] font-light leading-relaxed">
              “Discover new collections, stories, and perspectives.”
            </p>
          </div>

          {status === 'success' ? (
            <div className="p-4 bg-[#F0F5F2] border border-[#3D6E50]/30 text-emerald-900 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3D6E50] flex-shrink-0" />
              <span>Thank you. Newsletter sign-up is not yet active, so your address has not been saved.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your personal email address"
                  aria-label="Email address for RAVIO newsletter"
                  className={`flex-1 px-4 py-3.5 text-xs font-sans tracking-wide bg-[#F4F1EA] border text-[#171717] placeholder-[#77736C]/60 focus:outline-none focus:ring-1 focus:ring-[#B7A17A] ${
                    status === 'error' ? 'border-[#9E3B3B]' : 'border-[#171717]/15'
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-3.5 bg-[#171717] text-[#F4F1EA] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#2C2C2C] transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Inscribing...' : 'JOIN LEDGER'}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-[11px] text-[#9E3B3B] flex items-center justify-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMessage}</span>
                </p>
              )}

              <p className="text-[10px] text-[#77736C] font-sans pt-2">
                Distributed with discretion. No promotional noise. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
};
