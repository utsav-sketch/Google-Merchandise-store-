import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  showDataInsight?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showDataInsight = false }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    setQuickViewProduct,
    trackGA4Event,
  } = useShop();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImg = product.images[0];
  const hoverImg = product.images[1] || primaryImg;

  const handleCardClick = () => {
    trackGA4Event('view_item', {
      item_id: product.id,
      item_name: product.name,
      item_brand: product.brand,
      item_category: product.category,
      price: product.priceUSD,
    });
    setCurrentView('product', product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'One Size';
    const defaultColor = product.colors[0]?.name || 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackGA4Event('view_item', {
      item_id: product.id,
      item_name: product.name,
      trigger: 'quick_view_modal',
    });
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        {/* Main Image */}
        <img
          src={primaryImg}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover object-center transition-opacity duration-300 ${
            isHovered ? 'opacity-0 lg:opacity-0' : 'opacity-100'
          }`}
        />
        {/* Hover Secondary Image (Desktop only swap) */}
        <img
          src={hoverImg}
          alt={`${product.name} angle preview`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.badges.includes('NEW') && (
            <span className="bg-blue-600 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm uppercase shadow-xs">
              New
            </span>
          )}
          {product.badges.includes('BEST SELLER') && (
            <span className="bg-amber-500 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm uppercase shadow-xs">
              Best Seller
            </span>
          )}
          {product.badges.includes('DATA PICK') && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm uppercase shadow-xs">
              GA4 Pick
            </span>
          )}
          {product.badges.includes('ECO') && (
            <span className="bg-teal-700 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm uppercase shadow-xs">
              Eco-Conscious
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-all z-10 cursor-pointer shadow-xs ${
            isFavorited
              ? 'bg-white text-red-500 hover:bg-neutral-50'
              : 'bg-white/80 text-neutral-600 hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500' : ''}`} />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <button
          onClick={handleQuickView}
          aria-label="Quick View"
          className={`hidden lg:flex absolute bottom-2.5 left-1/2 -translate-x-1/2 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-neutral-800 text-xs font-medium shadow-md transition-all duration-200 hover:bg-white cursor-pointer ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span className="font-medium text-neutral-600 tracking-wide uppercase text-[10px]">
              {product.brand}
            </span>
            <span className="text-[11px] text-neutral-400">
              {product.subcategory}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-neutral-900 text-sm sm:text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-semibold text-neutral-800">
              {product.rating}
            </span>
            <span className="text-[11px] text-neutral-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* GA4 Insight Badge if enabled */}
        {(showDataInsight || product.isDataPick) && product.ga4Metrics && (
          <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-1.5 text-[11px] text-blue-800">
            <span className="font-semibold">GA4 Metric:</span> {product.ga4Metrics.conversionRate}% CVR · {product.ga4Metrics.monthlyViews.toLocaleString()} views
          </div>
        )}

        {/* Price & Quick Add Button */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-100 mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-neutral-950 text-base sm:text-lg">
              {formatPrice(product.priceUSD)}
            </span>
            {product.compareAtPriceUSD && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.compareAtPriceUSD)}
              </span>
            )}
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 text-white hover:bg-blue-600'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
