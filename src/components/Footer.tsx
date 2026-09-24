import React from 'react';
import { useShop } from '../context/ShopContext';
import { Category, Brand } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentView, setFilterCategory, setFilterBrand, setIsGA4HubOpen } = useShop();

  const handleCategoryNav = (cat: Category) => {
    setFilterCategory(cat);
  };

  const handleBrandNav = (brand: Brand) => {
    setFilterBrand(brand);
  };

  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main 5-column footer layout per PRD Section 16 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Column 1: SHOP */}
          <div>
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setFilterCategory('All');
                    setCurrentView('shop');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Apparel')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilterCategory('All');
                    setCurrentView('shop');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Apparel')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Apparel
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Bags & Accessories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Lifestyle')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lifestyle
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Gifts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gifts
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: BRANDS */}
          <div>
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4">
              BRANDS
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => handleBrandNav('Google')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Google
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleBrandNav('Google Cloud')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Google Cloud
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleBrandNav('Android')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Android
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleBrandNav('Gemini')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gemini
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleBrandNav('YouTube')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  YouTube
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleBrandNav('Chrome Dino')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Chrome Dino
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: HELP */}
          <div>
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => setCurrentView('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping &amp; Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('wishlist')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Status
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: INFORMATION */}
          <div>
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4">
              INFORMATION
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Google Merch Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainability Practices
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsGA4HubOpen(true)}
                  className="hover:text-emerald-400 transition-colors font-semibold text-neutral-300 cursor-pointer flex items-center gap-1"
                >
                  <span>GA4 Research Matrix</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: SOCIAL & GOOGLE BRAND ACCENT */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4">
              CONNECT
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="https://instagram.com/google" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://youtube.com/google" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://x.com/google" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  X (formerly Twitter)
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/google" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>

            {/* Google Brand Color Indicator */}
            <div className="mt-6 pt-4 border-t border-neutral-800">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-2 font-mono">
                GOOGLE PALETTE
              </span>
              <div className="flex gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#4285F4]" title="Google Blue" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#EA4335]" title="Google Red" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#FBBC05]" title="Google Yellow" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#34A853]" title="Google Green" />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright and Academic Notice */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white shadow-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
            </div>
            <span>© 2026 Google Merchandise Store — Academic Redesign Prototype.</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Built with GA4 Measurement Protocols</span>
            <span>·</span>
            <span>Zero Real Payments Collected</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
