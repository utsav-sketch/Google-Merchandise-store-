import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Newsletter: React.FC = () => {
  const { trackGA4Event, applyPromoCode } = useShop();
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      applyPromoCode('GOOGLE10');
      trackGA4Event('sign_up', {
        method: 'newsletter_subscription',
        offer_code: 'GOOGLE10',
      });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('GOOGLE10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Get 10% Off Your First Order
        </h2>

        <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto">
          Sign up for new collections, exclusive drops, and Google merchandise news delivered straight to your inbox.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-neutral-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Sign Me Up
            </button>
          </form>
        ) : (
          <div className="mt-8 max-w-md mx-auto p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 font-semibold text-sm">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You're in! Use code for 10% off:</span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="font-mono text-base font-bold bg-white px-3 py-1 rounded-lg border border-emerald-300">
                GOOGLE10
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer transition-colors"
                title="Copy coupon code"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-emerald-700 mt-2">
              Promo code automatically applied to your active shopping cart!
            </p>
          </div>
        )}

        <span className="text-[11px] text-neutral-400 block mt-4">
          By signing up, you agree to Google's demo terms and privacy policy. Unsubscribe anytime.
        </span>

      </div>
    </section>
  );
};
