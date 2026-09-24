import React from 'react';
import { Leaf, Recycle, Droplets, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SustainabilitySection: React.FC = () => {
  const { setCurrentView, trackGA4Event } = useShop();

  const handleLearnMore = () => {
    trackGA4Event('campaign_click', {
      slot: 'sustainability_learn_more',
      target_url: '/about',
    });
    setCurrentView('about');
  };

  return (
    <section className="py-16 bg-neutral-50/70 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Leaf className="w-4 h-4" />
              <span>Environmental Responsibility</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
              Designed With a Better Future in Mind
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
              We hold ourselves to the highest environmental and social standards. Over 84% of our 2026 apparel catalogue is made from GOTS-certified organic ring-spun cotton and post-consumer recycled poly fibers, avoiding single-use plastics and harmful chemicals.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                <Recycle className="w-5 h-5 text-teal-600 mb-2" />
                <h4 className="font-semibold text-neutral-900 text-xs">Recycled Fibers</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Repurposed ocean-bound plastics and nylon ripstop.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                <Droplets className="w-5 h-5 text-blue-600 mb-2" />
                <h4 className="font-semibold text-neutral-900 text-xs">Water Stewardship</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Low-impact closed-loop dyeing saves 400+ gal/garment.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                <Leaf className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-semibold text-neutral-900 text-xs">Plastic-Free Mailers</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  100% biodegradable cornstarch and FSC kraft boxes.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleLearnMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
              >
                <span>Learn More About Our Supply Chain</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&auto=format&fit=crop&q=80"
                alt="Sustainable Organic Cotton Google Tote"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-neutral-200/80 text-xs text-neutral-800">
                <span className="font-bold text-neutral-900 block">
                  Campus Organic Tote &amp; Recycled Accessories
                </span>
                <span className="text-neutral-500 block text-[11px] mt-0.5">
                  Zero synthetic pesticides · Fair Trade Certified manufacturing
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
