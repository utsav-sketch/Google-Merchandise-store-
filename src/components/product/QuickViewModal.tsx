import React, { useState } from 'react';
import { X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    setCurrentView,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>(
    quickViewProduct?.sizes[0] || 'One Size'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    quickViewProduct?.colors[0]?.name || 'Standard'
  );

  if (!quickViewProduct) return null;

  const handleAddAndClose = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, 1);
    setQuickViewProduct(null);
  };

  const handleFullDetails = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    setCurrentView('product', id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 relative grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square bg-neutral-100">
          <img
            src={quickViewProduct.images[0]}
            alt={quickViewProduct.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Details & Configurator */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
              {quickViewProduct.brand}
            </span>
            <h3 className="text-xl font-bold text-neutral-900">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-neutral-800">{quickViewProduct.rating}</span>
              <span className="text-neutral-400">({quickViewProduct.reviewCount} reviews)</span>
            </div>

            <div className="mt-3 text-2xl font-black text-neutral-950">
              {formatPrice(quickViewProduct.priceUSD)}
            </div>

            <p className="mt-3 text-xs text-neutral-600 line-clamp-3 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Size Options */}
            <div className="mt-5">
              <span className="text-xs font-semibold text-neutral-700 block mb-2">Capacity &amp; Lid</span>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      selectedSize === s
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
            <button
              onClick={handleAddAndClose}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleFullDetails}
              className="w-full py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View Full Product Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
