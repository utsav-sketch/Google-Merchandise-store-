import React from 'react';
import { ArrowRight, Globe, Layers, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CampaignBanner: React.FC = () => {
  const { setCurrentView, trackGA4Event } = useShop();

  const handleExploreCampaign = () => {
    trackGA4Event('campaign_click', {
      campaign_name: 'wear_the_google_universe',
      creative_slot: 'homepage_campaign_banner',
      target_url: '/campaign',
    });
    setCurrentView('campaign');
  };

  return (
    <section className="py-16 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white shadow-xl">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-600 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-purple-600 rounded-full blur-3xl" />
          </div>

          <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-neutral-200 mb-4 font-medium backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Decision 5 Marketing Campaign</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Wear the Google Universe
              </h2>

              <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
                Explore a collection made for people who live, work, and create with Google. Featuring iconic hardware accents, developer-grade apparel, and limited commemorative artifacts.
              </p>

              {/* Three Mini Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5 mb-1">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Everyday Utility</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Engineered for daily commute and workspace comfort.
                  </p>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5 mb-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ecosystem Badges</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Authentic Google Cloud, Android, Gemini &amp; Dino emblems.
                  </p>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Limited Drop</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Numbered packaging with collector backing cards.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-center lg:justify-start">
                <button
                  onClick={handleExploreCampaign}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-blue-500/25 active:scale-98"
                >
                  <span>Explore Campaign</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Teaser on Right */}
            <div className="w-full max-w-sm shrink-0">
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group">
                <img
                  src="/tumbler_cobalt_blue.jpg"
                  alt="Gemini AI Cosmic Spark 750ml Gradient Tumbler"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-neutral-200">
                  <span className="font-semibold text-white block">Gemini AI Spark 750ml Tumbler</span>
                  <span className="text-neutral-400">Cobalt Royal Blue · Triple Insulated</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
