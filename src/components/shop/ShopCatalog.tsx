import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  RotateCcw, 
  SlidersHorizontal, 
  Check, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';
import { Category, Brand, SortOption } from '../../types';

export const ShopCatalog: React.FC = () => {
  const {
    products,
    filters,
    setFilters,
    resetFilters,
    setCurrentView,
    trackGA4Event,
  } = useShop();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories: (Category | 'All')[] = ['All', 'Apparel', 'Bags & Accessories', 'Lifestyle', 'Gifts'];
  const brands: (Brand | 'All')[] = ['All', 'Google', 'Google Cloud', 'Android', 'Gemini', 'YouTube', 'Chrome Dino'];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (filters.category !== 'All') {
      list = list.filter((p) => p.category === filters.category);
    }

    // Brand Filter
    if (filters.brand !== 'All') {
      list = list.filter((p) => p.brand === filters.brand);
    }

    // Price Filter
    if (filters.priceRange === 'under-25') {
      list = list.filter((p) => p.priceUSD < 25);
    } else if (filters.priceRange === '25-50') {
      list = list.filter((p) => p.priceUSD >= 25 && p.priceUSD <= 50);
    } else if (filters.priceRange === '50-100') {
      list = list.filter((p) => p.priceUSD > 50 && p.priceUSD <= 100);
    } else if (filters.priceRange === '100-plus') {
      list = list.filter((p) => p.priceUSD > 100);
    }

    // Availability
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // New only
    if (filters.newOnly) {
      list = list.filter((p) => p.isNew);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'popular':
        list.sort((a, b) => (b.ga4Metrics?.monthlyViews || 0) - (a.ga4Metrics?.monthlyViews || 0));
        break;
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        list.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'price-desc':
        list.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'recommended':
      default:
        list.sort((a, b) => (b.isDataPick ? 1 : 0) - (a.isDataPick ? 1 : 0));
        break;
    }

    return list;
  }, [products, filters]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortOption;
    setFilters((prev) => ({ ...prev, sortBy: newSort }));
    trackGA4Event('filter_change', { sort_option: newSort });
  };

  const handleCategorySelect = (cat: Category | 'All') => {
    setFilters((prev) => ({ ...prev, category: cat }));
    trackGA4Event('filter_change', { filter_category: cat });
  };

  const handleBrandSelect = (brand: Brand | 'All') => {
    setFilters((prev) => ({ ...prev, brand }));
    trackGA4Event('filter_change', { filter_brand: brand });
  };

  const handlePriceSelect = (range: typeof filters.priceRange) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
    trackGA4Event('filter_change', { price_range: range });
  };

  const activeFiltersCount = 
    (filters.category !== 'All' ? 1 : 0) +
    (filters.brand !== 'All' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.newOnly ? 1 : 0);

  return (
    <div className="bg-neutral-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation (PRD Section 17) */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-medium">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-semibold">
            {filters.category !== 'All' ? filters.category : 'Shop'}
          </span>
          {filters.brand !== 'All' && (
            <>
              <span>/</span>
              <span className="text-blue-600 font-semibold">{filters.brand}</span>
            </>
          )}
        </nav>

        {/* Page Heading & Dynamic Count */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-neutral-200 gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              {filters.category !== 'All' ? filters.category : 'Shop All Gear'}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Showing <span className="font-semibold text-neutral-800">{filteredProducts.length}</span> curated Google products
            </p>
          </div>

          {/* Desktop & Mobile Top Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 shadow-2xs cursor-pointer hover:bg-neutral-50"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sorting Dropdown (PRD Section 19) */}
            <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
              <span className="text-xs text-neutral-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="text-xs font-semibold text-neutral-800 bg-transparent focus:outline-none cursor-pointer pr-1"
              >
                <option value="recommended">Recommended</option>
                <option value="popular">Popular (GA4 Traffic)</option>
                <option value="newest">Newest Drops</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips / Reset */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-in fade-in">
            <span className="text-xs text-neutral-500 font-medium mr-1">Active filters:</span>
            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-800 shadow-2xs">
                <span>Category: {filters.category}</span>
                <button
                  onClick={() => handleCategorySelect('All')}
                  className="text-neutral-400 hover:text-neutral-800 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.brand !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-800 shadow-2xs">
                <span>Brand: {filters.brand}</span>
                <button
                  onClick={() => handleBrandSelect('All')}
                  className="text-neutral-400 hover:text-neutral-800 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-800 shadow-2xs">
                <span>Price: {filters.priceRange}</span>
                <button
                  onClick={() => handlePriceSelect('all')}
                  className="text-neutral-400 hover:text-neutral-800 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-800 shadow-2xs">
                <span>In Stock Only</span>
                <button
                  onClick={() => setFilters((p) => ({ ...p, inStockOnly: false }))}
                  className="text-neutral-400 hover:text-neutral-800 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.newOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-800 shadow-2xs">
                <span>New Items Only</span>
                <button
                  onClick={() => setFilters((p) => ({ ...p, newOnly: false }))}
                  className="text-neutral-400 hover:text-neutral-800 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold ml-2 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Grid: Left Sidebar (Desktop) + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar (PRD Section 18) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-neutral-600" />
                <span>Filters</span>
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Category
              </h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full text-left text-xs font-medium py-1 px-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      filters.category === cat
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{cat}</span>
                    {filters.category === cat && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Brand
              </h4>
              <div className="space-y-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => handleBrandSelect(b)}
                    className={`w-full text-left text-xs font-medium py-1 px-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      filters.brand === b
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{b}</span>
                    {filters.brand === b && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Price Range
              </h4>
              <div className="space-y-1.5 text-xs text-neutral-700 font-medium">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-25', label: 'Under $25 (₹2,000)' },
                  { id: '25-50', label: '$25 – $50 (₹2,000–₹4,000)' },
                  { id: '50-100', label: '$50 – $100 (₹4,000–₹8,000)' },
                  { id: '100-plus', label: '$100+ (₹8,000+)' },
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-neutral-50">
                    <input
                      type="radio"
                      name="priceTier"
                      checked={filters.priceRange === tier.id}
                      onChange={() => handlePriceSelect(tier.id as typeof filters.priceRange)}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs font-medium text-neutral-700">
              <label className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters((p) => ({ ...p, inStockOnly: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>In Stock Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={filters.newOnly}
                  onChange={(e) => setFilters((p) => ({ ...p, newOnly: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>New Arrivals Only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid (PRD Section 20: 4 desktop, 3 tablet, 2 mobile) */}
          <main className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty Fallback State (PRD Section 26) */
              <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200">
                <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-3">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  We couldn't find matching products
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  Try clearing some filters or exploring another category to discover Google gear.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filter Bottom Sheet / Modal (PRD Section 18) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-end justify-center lg:hidden">
          <div className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 animate-in slide-in-from-bottom duration-200 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Filters &amp; Refinements</span>
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-neutral-500 hover:text-neutral-800 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-6">
              {/* Category */}
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Category
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                        filters.category === cat
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Brand
                </span>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => handleBrandSelect(b)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                        filters.brand === b
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Price Range
                </span>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-25', label: 'Under $25' },
                    { id: '25-50', label: '$25 – $50' },
                    { id: '50-100', label: '$50 – $100' },
                    { id: '100-plus', label: '$100+' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => handlePriceSelect(tier.id as typeof filters.priceRange)}
                      className={`w-full text-left p-2 rounded-lg font-medium flex items-center justify-between ${
                        filters.priceRange === tier.id
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <span>{tier.label}</span>
                      {filters.priceRange === tier.id && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-1/3 py-3 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-2/3 py-3 rounded-xl bg-neutral-900 text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
