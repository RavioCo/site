import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { EditorialKicker } from '../common/Typography';
import { PrimaryButton } from '../common/PrimaryButton';
import { SecondaryButton } from '../common/SecondaryButton';
import { X, ShieldAlert, Info } from 'lucide-react';

export interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AccountModal
 * Visual entry point for client portal and account registration.
 * Explicitly identifies as a placeholder interface without pretending authentication exists.
 */
export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register' | 'concierge'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [conciergeMessage, setConciergeMessage] = useState('');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'submitted' | 'reset-notice'>('idle');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setFeedbackState('idle');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackState('submitted');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Client Account Portal"
        className="relative w-full max-w-lg bg-[#F4F1EA] text-[#171717] border border-[#171717]/20 shadow-2xl z-10 my-8 p-6 sm:p-10 space-y-6"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#77736C] hover:text-[#171717] transition-colors"
          aria-label="Close client account dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Logo size="sm" showSubtitle={true} showProvisionalNotice={false} />
          <EditorialKicker variant="gold">Client Portal & Services</EditorialKicker>
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal uppercase">
            Private Account
          </h3>
        </div>

        {/* Transparent Placeholder Disclosure */}
        <div className="p-3.5 bg-[#FFFFFF] border border-[#171717]/10 flex items-start gap-2.5 text-xs text-[#77736C]">
          <ShieldAlert className="w-4 h-4 text-[#B7A17A] flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-medium text-[#171717] block">Account availability:</span>
            <span>
              Sign-in and order history are not available yet. This form does not create an account or sign you in.
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div role="tablist" className="flex border-b border-[#171717]/15 text-xs font-sans uppercase tracking-[0.16em]">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'signin'}
            onClick={() => {
              setActiveTab('signin');
              setFeedbackState('idle');
            }}
            className={`flex-1 min-h-[44px] py-2.5 text-center transition-colors border-b-2 ${
              activeTab === 'signin'
                ? 'border-[#171717] text-[#171717] font-semibold'
                : 'border-transparent text-[#77736C] hover:text-[#171717]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'register'}
            onClick={() => {
              setActiveTab('register');
              setFeedbackState('idle');
            }}
            className={`flex-1 min-h-[44px] py-2.5 text-center transition-colors border-b-2 ${
              activeTab === 'register'
                ? 'border-[#171717] text-[#171717] font-semibold'
                : 'border-transparent text-[#77736C] hover:text-[#171717]'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'concierge'}
            onClick={() => {
              setActiveTab('concierge');
              setFeedbackState('idle');
            }}
            className={`flex-1 min-h-[44px] py-2.5 text-center transition-colors border-b-2 ${
              activeTab === 'concierge'
                ? 'border-[#171717] text-[#171717] font-semibold'
                : 'border-transparent text-[#77736C] hover:text-[#171717]'
            }`}
          >
            Concierge
          </button>
        </div>

        {/* Form Body */}
        {feedbackState === 'submitted' ? (
          <div className="p-6 bg-white border border-[#171717]/15 text-center space-y-3">
            <Info className="w-8 h-8 text-[#B7A17A] mx-auto" />
            <h4 className="font-editorial text-xl text-[#171717]">Account services unavailable</h4>
            <p className="text-xs text-[#77736C] leading-relaxed">
              Your request has not been submitted. Account and concierge services are not available yet.
            </p>
            <div className="pt-2">
              <SecondaryButton size="sm" onClick={() => setFeedbackState('idle')}>
                Return to Form
              </SecondaryButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {feedbackState === 'reset-notice' && (
              <div role="status" className="p-3 bg-white border border-[#B7A17A]/40 text-xs text-[#171717]">
                Password recovery is not available yet. No recovery email has been sent.
              </div>
            )}

            {activeTab === 'register' && (
              <div className="space-y-1">
                <label htmlFor="account-full-name" className="text-[11px] font-sans uppercase tracking-wider text-[#171717] block">
                  Full Name
                </label>
                <input
                  id="account-full-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-xs font-sans bg-white border border-[#171717]/15 focus:outline-none focus:ring-1 focus:ring-[#B7A17A]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="account-email" className="text-[11px] font-sans uppercase tracking-wider text-[#171717] block">
                Personal Email
              </label>
              <input
                id="account-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-xs font-sans bg-white border border-[#171717]/15 focus:outline-none focus:ring-1 focus:ring-[#B7A17A]"
              />
            </div>

            {activeTab !== 'concierge' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="account-password" className="text-[11px] font-sans uppercase tracking-wider text-[#171717]">
                    Password
                  </label>
                  {activeTab === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setFeedbackState('reset-notice')}
                      className="text-[10px] font-sans text-[#77736C] hover:text-[#171717] underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  id="account-password"
                  type="password"
                  autoComplete={activeTab === 'signin' ? 'current-password' : 'new-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-xs font-sans bg-white border border-[#171717]/15 focus:outline-none focus:ring-1 focus:ring-[#B7A17A]"
                />
              </div>
            )}

            {activeTab === 'concierge' && (
              <div className="space-y-1">
                <label htmlFor="account-concierge-note" className="text-[11px] font-sans uppercase tracking-wider text-[#171717] block">
                  Concierge Inquiries / Sizing Assistance
                </label>
                <textarea
                  id="account-concierge-note"
                  rows={3}
                  required
                  value={conciergeMessage}
                  onChange={(e) => setConciergeMessage(e.target.value)}
                  placeholder="Describe your inquiry or sizing question..."
                  className="w-full px-3.5 py-2.5 text-xs font-sans bg-white border border-[#171717]/15 focus:outline-none focus:ring-1 focus:ring-[#B7A17A]"
                />
              </div>
            )}

            <div className="pt-2">
              <PrimaryButton fullWidth type="submit">
                {activeTab === 'signin'
                  ? 'Review Sign-In Details'
                  : activeTab === 'register'
                  ? 'Review Account Details'
                  : 'Review Inquiry'}
              </PrimaryButton>
            </div>
          </form>
        )}

        <div className="pt-3 border-t border-[#171717]/10 flex items-center justify-between text-[10px] font-mono text-[#77736C]">
          <span>RAVIO & CO. · ravioco.com</span>
          <span aria-hidden="true" className="invisible">PROTOTYPE INTERFACE</span>
        </div>
      </div>
    </div>
  );
};
