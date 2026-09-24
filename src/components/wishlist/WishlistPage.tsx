import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, addToCart, setCurrentView, formatPrice } = useShop();

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item.product, item.product.sizes[0] || 'One Size', item.product.colors[0]?.name || 'Standard', 1);
    });
    clearWishlist();
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mb-3">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Your wishlist is empty</h2>
        <p className="text-xs text-neutral-500 mt-2 max-w-sm">
          Click the heart icon on any Google merchandise card to save your favorite gear for later.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-6 px-6 py-3 bg-neutral-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wishlist Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider mb-1">
              <Heart className="w-4 h-4 fill-red-500" />
              <span>Saved Items</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              My Wishlist ({wishlist.length})
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Cart</span>
            </button>
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 border border-neutral-300 hover:border-neutral-400 text-neutral-600 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Wishlist Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((item) => (
            <ProductCard key={item.productId} product={item.product} />
          ))}
        </div>

      </div>
    </div>
  );
};
