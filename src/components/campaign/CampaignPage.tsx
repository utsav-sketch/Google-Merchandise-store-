import React from 'react';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';

export const CampaignPage: React.FC = () => {
  const { products, setCurrentView, setFilterCategory, trackGA4Event } = useShop();

  const campaignProducts = products.filter((p) => p.isCampaignItem);

  return (
    <div className="bg-white min-h-screen">
      
      {/* Campaign Hero Banner */}
      <div className="relative bg-neutral-950 text-white overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-[32rem] h-[32rem] bg-indigo-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-neutral-200 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>2026 Capsule Lookbook · Decision 5 Implementation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Wear the Google Universe
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            A boundary-pushing merchandising capsule celebrating the software, code, and hardware icons shaping our era. Designed in Mountain View, certified climate-neutral.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('campaign-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Explore the Capsule
            </button>
          </div>
        </div>
      </div>

      {/* Narrative Editorial Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
              The Design Philosophy
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-900 leading-tight">
              Functional Minimalism Meets Tech Heritage
            </h2>
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              Every garment in the Universe Collection was sampled across Google engineer workspaces and global campuses. From weatherproof micro-ripstop textiles to retro 8-bit jacquard knits, each design embodies the balance of utilitarian daily performance and Silicon Valley nostalgia.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-neutral-700">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">GOTS Certified</span>
                <p className="text-neutral-500 text-[11px]">100% organic cotton free from toxic fertilizers.</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">Recycled Packaging</span>
                <p className="text-neutral-500 text-[11px]">Zero virgin plastic mailers or single-use wrapping.</p>
              </div>
            </div>
          </div>

          {/* Lookbook Composition */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/tumbler_cobalt_blue.jpg"
              alt="Gemini AI 750ml Cobalt Tumbler"
              referrerPolicy="no-referrer"
              className="w-full h-72 object-cover rounded-2xl shadow-sm"
            />
            <img
              src="/tumbler_sage_green.jpg"
              alt="Chrome Dino 750ml Sage Tumbler"
              referrerPolicy="no-referrer"
              className="w-full h-72 object-cover rounded-2xl shadow-sm mt-8"
            />
          </div>
        </div>
      </div>

      {/* Featured Campaign Products Grid */}
      <div id="campaign-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">Featured Campaign Styles</h3>
            <p className="text-xs text-neutral-500 mt-1">Official pieces from the "Wear the Google Universe" seasonal drop</p>
          </div>
          <button
            onClick={() => {
              setFilterCategory('All');
              setCurrentView('shop');
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {campaignProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
};
