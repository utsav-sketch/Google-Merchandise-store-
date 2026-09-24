import React from 'react';
import { ArrowRight, Zap, Play } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FeaturedCollection: React.FC = () => {
  const { setFilterBrand, setCurrentView, trackGA4Event } = useShop();

  const handleShopDino = () => {
    trackGA4Event('campaign_click', {
      campaign_name: 'chrome_dino_split_banner',
      creative_slot: 'homepage_featured_collection',
    });
    setFilterBrand('Chrome Dino');
  };

  return (
    <section className="py-16 sm:py-20 bg-neutral-900 text-white overflow-hidden relative">
      {/* 8-bit aesthetic decorative dots */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Large Collection Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80"
                alt="Chrome Dino Collection Showcase"
                className="w-full h-80 sm:h-[420px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              
              {/* Floating Pill on image */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-neutral-300 bg-neutral-900/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-400 font-bold">GAME OVER?</span>
                  <span>Not with the 2026 Dino Jacquard series</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">PRESS SPACEBAR</span>
              </div>
            </div>
          </div>

          {/* Right: Promotional Editorial Split */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono font-medium self-start mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>OFFLINE RUNNER CLUB</span>
            </div>

            <span className="text-sm font-semibold tracking-widest text-neutral-400 uppercase font-mono">
              CHROME DINO
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-2 text-white leading-tight font-sans">
              Ready. Set. Roar!
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              When the internet cuts out, the adventure begins. Explore our highest-engagement capsule collection featuring heavyweight embroidered crewnecks, pixel planters, and organic jacquard socks.
            </p>

            {/* Feature Points */}
            <div className="mt-6 space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Textured 8-bit chenille embroidery on heavyweight fleece</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Stoneware companion desk planter with drainage plug</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>GA4 validated: +142% search volume and low return rate</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleShopDino}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-400/20 active:scale-98"
              >
                <span>Shop Chrome Dino</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  trackGA4Event('view_item', { item_id: 'prod-002', trigger: 'dino_banner_quick' });
                  setCurrentView('product', 'prod-002');
                }}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-colors cursor-pointer"
              >
                View Crewneck
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
