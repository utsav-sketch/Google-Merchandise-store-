import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';

export const PopularProducts: React.FC = () => {
  const { products, setCurrentView, setFilterCategory, trackGA4Event } = useShop();

  // Filter products by popularity / GA4 metrics
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 8);

  return (
    <section className="py-16 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Community Staples</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Popular on the Merch Shop
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Selected using real GA4 ecommerce velocity: highest repeat purchases and verified customer satisfaction.
            </p>
          </div>

          <button
            onClick={() => {
              setFilterCategory('All');
              setCurrentView('shop');
              trackGA4Event('campaign_click', { slot: 'popular_section_view_all' });
            }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group self-start sm:self-auto"
          >
            <span>View All Popular</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4-column desktop, 3-column tablet, 2-column mobile grid (PRD Section 20) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
