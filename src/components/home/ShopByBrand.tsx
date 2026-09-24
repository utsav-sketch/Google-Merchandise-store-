import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Brand } from '../../types';

interface BrandInfo {
  name: Brand;
  tagline: string;
  badge: string;
  bgGradient: string;
  accentColor: string;
  logoSvg: React.ReactNode;
}

export const ShopByBrand: React.FC = () => {
  const { setFilterBrand, trackGA4Event } = useShop();

  const brands: BrandInfo[] = [
    {
      name: 'Google',
      tagline: 'Timeless campus classics & heritage typography',
      badge: 'Core Collection',
      bgGradient: 'from-blue-50 to-indigo-50/40',
      accentColor: '#4285F4',
      logoSvg: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
        </svg>
      ),
    },
    {
      name: 'Google Cloud',
      tagline: 'High-utility gear for systems architects & developers',
      badge: 'Architecture',
      bgGradient: 'from-sky-50 to-blue-50/40',
      accentColor: '#1a73e8',
      logoSvg: (
        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
          ☁
        </div>
      ),
    },
    {
      name: 'Android',
      tagline: 'Playful apparel and collectibles celebrating Bugdroid',
      badge: 'Open Platform',
      bgGradient: 'from-emerald-50 to-green-50/40',
      accentColor: '#3ddc84',
      logoSvg: (
        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
          🤖
        </div>
      ),
    },
    {
      name: 'Gemini',
      tagline: 'Next-generation tech-wear with cosmic luminescent details',
      badge: 'AI Drop',
      bgGradient: 'from-violet-50 to-purple-50/40',
      accentColor: '#8b5cf6',
      logoSvg: (
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs">
          ✦
        </div>
      ),
    },
    {
      name: 'YouTube',
      tagline: 'Studio drinkware and accessories built for content creators',
      badge: 'Creator Studio',
      bgGradient: 'from-red-50 to-rose-50/40',
      accentColor: '#ef4444',
      logoSvg: (
        <div className="w-6 h-6 rounded-md bg-red-600 text-white flex items-center justify-center font-bold text-xs">
          ▶
        </div>
      ),
    },
    {
      name: 'Chrome Dino',
      tagline: '8-bit retro gaming nostalgia for when the WiFi goes down',
      badge: '+142% GA4 CTR',
      bgGradient: 'from-amber-50 to-orange-50/40',
      accentColor: '#f59e0b',
      logoSvg: (
        <div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-xs">
          🦖
        </div>
      ),
    },
  ];

  const handleBrandClick = (brandName: Brand) => {
    trackGA4Event('campaign_click', { brand_selected: brandName, source: 'homepage_brands_grid' });
    setFilterBrand(brandName);
  };

  return (
    <section className="py-16 bg-neutral-50/60 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
            Ecosystem Merchandising
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Shop by Brand
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Each branch of the Google universe carries distinct design language, tailored apparel, and functional gear.
          </p>
        </div>

        {/* 6 Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brands.map((brand) => (
            <div
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className={`p-6 rounded-2xl border border-neutral-200/80 bg-gradient-to-br ${brand.bgGradient} hover:border-neutral-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-white rounded-xl shadow-2xs border border-neutral-200/60 flex items-center justify-center">
                    {brand.logoSvg}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border border-neutral-200/50 text-neutral-700">
                    {brand.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  {brand.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/50 flex items-center justify-between text-xs font-semibold text-neutral-800 group-hover:text-blue-600 transition-colors">
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
