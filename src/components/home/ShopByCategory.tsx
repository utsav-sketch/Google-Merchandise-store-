import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Category } from '../../types';

interface CategoryCardItem {
  name: Category;
  tagline: string;
  image: string;
  itemCount: string;
}

export const ShopByCategory: React.FC = () => {
  const { setFilterCategory, trackGA4Event } = useShop();

  const categories: CategoryCardItem[] = [
    {
      name: 'Apparel',
      tagline: 'Wear your favourite Google designs.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      itemCount: '7 Styles',
    },
    {
      name: 'Bags & Accessories',
      tagline: 'Carry a little Google everywhere.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      itemCount: '5 Products',
    },
    {
      name: 'Lifestyle',
      tagline: 'Google-inspired everyday essentials.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      itemCount: '6 Essentials',
    },
    {
      name: 'Gifts',
      tagline: 'Something for every Google fan.',
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
      itemCount: '4 Collectibles',
    },
  ];

  const handleCategoryClick = (categoryName: Category) => {
    trackGA4Event('campaign_click', {
      category_selected: categoryName,
      source: 'homepage_category_tiles',
    });
    setFilterCategory(categoryName);
  };

  return (
    <section className="py-16 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
              Browse Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md">
            From technical backpacks to certified organic apparel, explore products structured around your daily workflow.
          </p>
        </div>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-100 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-80"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent" />

              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <span className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md self-start border border-white/10">
                  {cat.itemCount}
                </span>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    {cat.tagline}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-white transition-colors">
                    <span>Explore {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
