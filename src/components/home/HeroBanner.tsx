import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const HeroBanner: React.FC = () => {
  const { setCurrentView, setFilterCategory, trackGA4Event } = useShop();

  const handleShopNow = () => {
    trackGA4Event('campaign_click', {
      campaign_name: 'hero_everyday_gear',
      creative_slot: 'primary_cta_shop_now',
    });
    setFilterCategory('All');
    setCurrentView('shop');
  };

  const handleExploreCollections = () => {
    trackGA4Event('campaign_click', {
      campaign_name: 'hero_everyday_gear',
      creative_slot: 'secondary_cta_explore',
    });
    setCurrentView('campaign');
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Background Graphic & Subtle Google Gradient Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-emerald-500 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Editorial Copy */}
        <div className="max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-neutral-200 mb-6 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>2026 Sustainable Merchandise Edition</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Google Gear, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-emerald-300">
              Made for Everyday
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
            Discover apparel, accessories, and collectibles inspired by the Google universe. Engineered with certified organic textiles, recycled materials, and authentic Silicon Valley craftsmanship.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button
              onClick={handleShopNow}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-neutral-900 font-semibold hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl active:scale-98"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExploreCollections}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-blue-300" />
              <span>Explore Collections</span>
            </button>
          </div>

          {/* Research Proof Badge (Satisfies PRD 48: "Why did you change this? Because our GA4 research showed...") */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>GA4 Redesign: Frictionless catalog browsing &amp; mobile-first checkout</span>
          </div>
        </div>

        {/* Right Lifestyle Product Hero Composition */}
        <div className="relative w-full max-w-lg lg:max-w-md">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900 group">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80"
              alt="Google Gear Apparel Lifestyle"
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Floating Product Highlight Card */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-white/15 flex items-center justify-between text-left">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider block">
                  COMMUNITY FAVORITE
                </span>
                <span className="text-sm font-semibold text-white block">
                  Google G Heavyweight Tee
                </span>
                <span className="text-xs text-neutral-400 block mt-0.5">
                  100% Organic Combed Cotton
                </span>
              </div>
              <button
                onClick={() => {
                  trackGA4Event('view_item', { item_id: 'prod-001', trigger: 'hero_badge' });
                  setCurrentView('product', 'prod-001');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
              >
                View
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
