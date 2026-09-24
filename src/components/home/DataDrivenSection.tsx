import React, { useState } from 'react';
import { BarChart3, TrendingUp, Info, HelpCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';

export const DataDrivenSection: React.FC = () => {
  const { products, setIsGA4HubOpen, trackGA4Event } = useShop();
  const [activeTab, setActiveTab] = useState<'high-cvr' | 'high-revenue' | 'viral-impulse'>('high-cvr');

  // Filter products by data pick
  const dataPickProducts = products.filter((p) => p.isDataPick);

  // Split into curated data clusters
  const displayedProducts = (() => {
    switch (activeTab) {
      case 'high-cvr':
        return dataPickProducts.filter((p) => (p.ga4Metrics?.conversionRate || 0) >= 4.5);
      case 'high-revenue':
        return dataPickProducts.filter((p) => p.priceUSD >= 35);
      case 'viral-impulse':
        return dataPickProducts.filter((p) => p.priceUSD < 35);
      default:
        return dataPickProducts;
    }
  })();

  return (
    <section className="py-16 bg-blue-50/40 border-b border-blue-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Data Section Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-200/80 shadow-xs mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>GA4 Ecommerce Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Picked From the Data
              </h2>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                Unlike a generic template, this merchandising grid is driven by Google Analytics 4 ecommerce events (<code className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800 text-xs font-mono">view_item</code>, <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800 text-xs font-mono">add_to_cart</code>, and <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800 text-xs font-mono">purchase</code>). Products below demonstrate top conversion velocity and proven customer affinity.
              </p>
            </div>

            {/* Viva Question Callout Card */}
            <div className="bg-neutral-900 text-white p-4 sm:p-5 rounded-xl flex flex-col justify-between max-w-sm border border-neutral-800 shadow-sm">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">
                    Viva Defense Rationale
                  </span>
                  <p className="text-xs text-neutral-300 mt-1">
                    "This section was created based on our ecommerce data analysis to eliminate guesswork and feature products with high purchase velocity."
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsGA4HubOpen(true);
                  trackGA4Event('campaign_click', { action: 'open_viva_hub_from_section' });
                }}
                className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Open GA4 Research Matrix</span>
              </button>
            </div>
          </div>

          {/* Interactive Filter Segments (Buttons / Tabs allowed per Constitution) */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
              <button
                onClick={() => setActiveTab('high-cvr')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === 'high-cvr'
                    ? 'bg-white text-neutral-950 font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                High Conversion Rate (&gt;4.5% CVR)
              </button>
              <button
                onClick={() => setActiveTab('high-revenue')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === 'high-revenue'
                    ? 'bg-white text-neutral-950 font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                High AOV Revenue Drivers
              </button>
              <button
                onClick={() => setActiveTab('viral-impulse')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === 'viral-impulse'
                    ? 'bg-white text-neutral-950 font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Low Friction / Under $35
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span>Real-time GA4 parameters attached to cards</span>
            </div>
          </div>
        </div>

        {/* Product Grid with Data Insight Pill Highlight */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} showDataInsight={true} />
          ))}
        </div>

      </div>
    </section>
  );
};
