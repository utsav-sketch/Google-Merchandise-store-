import React, { useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  Send, 
  Check, 
  ShieldCheck, 
  Leaf, 
  Truck, 
  BarChart3, 
  ChevronDown 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { setIsGA4HubOpen } = useShop();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
          About the Project
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          Google Merchandise Store <br />
          <span className="text-neutral-500 font-medium">Data-Driven Redesign Prototype</span>
        </h1>

        <div className="mt-8 prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-6 text-sm sm:text-base">
          <p>
            Welcome to the <strong>Google Merchandise Store Data-Driven Clone</strong>. This web application bridges rigorous Google Analytics 4 (GA4) ecommerce analysis with contemporary front-end design, delivering an authentic merchandise shopping experience.
          </p>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl not-prose">
            <h3 className="text-base font-bold text-blue-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>The GA4 Research Foundation</span>
            </h3>
            <p className="text-xs text-blue-800 mt-2 leading-relaxed">
              Rather than copying the original Merch Shop blindly, every architectural layout choice was informed by behavioral GA4 insights: elevated mobile performance, reduced multi-step checkout drop-offs, promoted Chrome Dino engagement, and bundled cross-sells.
            </p>
            <button
              onClick={() => setIsGA4HubOpen(true)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
            >
              Explore Viva Voce Data Hub
            </button>
          </div>

          <h2 className="text-xl font-bold text-neutral-900 pt-4">Sustainable Merchandising Standards</h2>
          <p>
            Google merchandise is designed with environmental responsibility at its core. Our apparel uses 100% GOTS-certified organic cotton, recycled polyester from certified post-consumer plastic bottles, and zero single-use plastic packaging.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose pt-4">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <Leaf className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="font-bold text-xs text-neutral-900">Certified Organic</h4>
              <p className="text-[11px] text-neutral-500 mt-1">Zero harmful synthetic pesticides or harsh chemical dyes.</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <ShieldCheck className="w-5 h-5 text-blue-600 mb-2" />
              <h4 className="font-bold text-xs text-neutral-900">Fair Labor</h4>
              <p className="text-[11px] text-neutral-500 mt-1">Ethical manufacturing partner audits across all brand gear.</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <Truck className="w-5 h-5 text-teal-600 mb-2" />
              <h4 className="font-bold text-xs text-neutral-900">Carbon Offset</h4>
              <p className="text-[11px] text-neutral-500 mt-1">100% carbon-neutral fulfillment on standard shipping lanes.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this an official store where I can buy items with a real credit card?',
      a: 'This website is a high-fidelity academic redesign and functional prototype of the Google Merchandise Store. It runs in demo mode with sandbox checkout—no real monetary payments are collected.',
    },
    {
      q: 'How does this redesign differ from the standard Google Merchandise Store?',
      a: 'This redesign introduces five GA4 data-driven enhancements: an optimized mobile sticky CTA, Chrome Dino high-CTR spotlighting, high-AOV "Complete Your Look" bundle mechanics, a frictionless single-page checkout, and real-time GA4 event streaming.',
    },
    {
      q: 'What shipping options are simulated?',
      a: 'Standard Carbon-Neutral Delivery (free for orders over $60 / ₹4,980, otherwise $6) and Express Priority Air Shipping ($12.00). Orders simulate dispatch within 24 hours.',
    },
    {
      q: 'What is the return and exchange policy?',
      a: 'We simulate a 30-day hassle-free return and exchange guarantee on unworn, unwashed apparel with original labels attached.',
    },
    {
      q: 'Can I switch currencies?',
      a: 'Yes! Use the currency toggle in the top announcement bar to switch instantly between USD ($) and INR (₹) across the entire store.',
    },
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
          Help Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-neutral-500 mt-2 mb-8">
          Find answers regarding ordering, merchandise quality, delivery logistics, and GA4 tracking.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 text-left font-semibold text-sm text-neutral-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    openIndex === idx ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Order Query', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
          Customer Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Contact the Merch Shop Team
        </h1>
        <p className="text-sm text-neutral-500 mt-2 mb-8">
          Have a question about Google merchandise or an active order? Reach out to our campus team.
        </p>

        {submitted ? (
          <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center text-emerald-900">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Message Received!</h3>
            <p className="text-xs text-emerald-700 mt-1 max-w-sm mx-auto">
              Thank you, {form.name}. Our support team typically responds within 4 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-neutral-50 rounded-3xl border border-neutral-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-medium text-neutral-700 mb-1">Inquiry Topic</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>Order Query &amp; Tracking</option>
                <option>Sizing &amp; Fabric Specifications</option>
                <option>Sustainability &amp; Materials</option>
                <option>GA4 Research Questions (Viva Voce)</option>
              </select>
            </div>

            <div className="text-xs">
              <label className="block font-medium text-neutral-700 mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we assist with your Google gear order?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
