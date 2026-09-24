import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setCurrentView,
    trackGA4Event,
  } = useShop();

  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchSuggestions = [
    'T-shirt',
    'Hoodie',
    'Chrome Dino',
    'Gemini',
    'Backpack',
    'Tumbler',
    'Android',
    'Cap',
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Real-time search matching
  const matchingProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      const matchFeat = p.features.some((f) => f.toLowerCase().includes(q));
      return matchName || matchBrand || matchCat || matchSub || matchFeat;
    });
  }, [query, products]);

  const handleSelectSuggestion = (term: string) => {
    setQuery(term);
    trackGA4Event('search', { search_term: term, source: 'suggestion_chip' });
  };

  const handleClose = () => {
    setIsSearchOpen(false);
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="min-h-screen px-4 text-center">
        {/* Alignment spacer */}
        <span className="inline-block h-12 align-middle" aria-hidden="true">&#8203;</span>

        <div className="inline-block w-full max-w-4xl p-6 sm:p-8 my-8 text-left align-top transition-all transform bg-white rounded-3xl shadow-2xl">
          
          {/* Top Search Input Bar */}
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.length > 2) {
                  trackGA4Event('search', { search_term: e.target.value });
                }
              }}
              placeholder="Search Google gear, apparel, backpacks, Chrome Dino..."
              className="w-full text-base sm:text-lg font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleClose}
              className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 cursor-pointer transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Popular Search Suggestions */}
          <div className="py-4 border-b border-neutral-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending:</span>
            </span>
            {searchSuggestions.map((term) => (
              <button
                key={term}
                onClick={() => handleSelectSuggestion(term)}
                className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  query.toLowerCase() === term.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {term}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="py-6 max-h-[65vh] overflow-y-auto pr-1">
            {query.trim() === '' ? (
              <div className="py-12 text-center text-neutral-500">
                <Search className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-neutral-700">
                  Search across 20+ Google merchandise styles
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Type a keyword like "crewneck", "tumbler", or click a trending term above.
                </p>
              </div>
            ) : matchingProducts.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    {matchingProducts.length} Results Found for "{query}"
                  </span>
                  <button
                    onClick={() => {
                      handleClose();
                      setCurrentView('shop');
                    }}
                    className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View in Full Catalog</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {matchingProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            ) : (
              /* No Results State (PRD Section 26) */
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  No matching merchandise found
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  We couldn't find any products matching "{query}". Check spelling or browse our popular categories.
                </p>
                <div className="mt-5 flex justify-center gap-2">
                  <button
                    onClick={() => setQuery('')}
                    className="px-4 py-2 bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-xl hover:bg-neutral-200 cursor-pointer"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => {
                      handleClose();
                      setCurrentView('shop');
                    }}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-xl hover:bg-neutral-800 cursor-pointer"
                  >
                    Browse Catalog
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
