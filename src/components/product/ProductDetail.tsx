import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Check, 
  Share2, 
  Leaf, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    setIsCartOpen,
    products,
    trackGA4Event,
  } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'One Size');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery' | 'reviews'>('desc');
  const [showCopiedShare, setShowCopiedShare] = useState<boolean>(false);
  const [isBundleAdded, setIsBundleAdded] = useState<boolean>(false);

  const isFavorited = isInWishlist(product.id);

  // Recommendations: You May Also Like (Same category or brand)
  const recommendations = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  // Complete Your Look Bundle (PRD Section 25)
  const bundleItems = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.isCampaignItem))
    .slice(0, 2);

  const bundleTotalUSD = product.priceUSD + bundleItems.reduce((sum, item) => sum + item.priceUSD, 0);
  const bundleDiscountUSD = Math.round(bundleTotalUSD * 0.15);
  const bundleFinalUSD = bundleTotalUSD - bundleDiscountUSD;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(false);
    setCurrentView('checkout');
    trackGA4Event('begin_checkout', {
      source: 'pdp_buy_now_direct',
      item_id: product.id,
      value: product.priceUSD * quantity,
    });
  };

  const handleAddBundle = () => {
    addToCart(product, selectedSize, selectedColor, 1);
    bundleItems.forEach((b) => {
      addToCart(b, b.sizes[0] || 'One Size', b.colors[0]?.name || 'Standard', 1);
    });
    setIsBundleAdded(true);
    setTimeout(() => setIsBundleAdded(false), 2500);
    trackGA4Event('add_to_cart', {
      event_type: 'complete_your_look_bundle',
      items_count: bundleItems.length + 1,
      total_bundle_value: bundleFinalUSD,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopiedShare(true);
    setTimeout(() => setShowCopiedShare(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8 font-medium">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-blue-600 cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => setCurrentView('shop')}
            className="hover:text-blue-600 cursor-pointer"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout (PRD Section 22: Image Gallery + Product Configurator) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-neutral-200">
          
          {/* Left Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-neutral-100 shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-blue-600 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Stage */}
            <div className="flex-1 relative aspect-square rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Wishlist Floating Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                  isFavorited
                    ? 'bg-white text-red-500'
                    : 'bg-white/80 text-neutral-700 hover:bg-white hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500' : ''}`} />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {product.badges.map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase text-white bg-neutral-900/90 backdrop-blur-xs shadow-xs"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Product Configurator */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Brand & Subcategory */}
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span className="font-bold text-blue-600 uppercase tracking-widest text-[11px]">
                {product.brand}
              </span>
              <span className="text-neutral-400 font-mono text-[11px]">
                SKU: {product.id.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              {product.name}
            </h1>

            {/* Reviews Rating Header */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-800">
                {product.rating} / 5.0
              </span>
              <span className="text-neutral-400 text-xs">·</span>
              <span className="text-xs text-neutral-500 underline cursor-pointer" onClick={() => setActiveTab('reviews')}>
                {product.reviewCount} customer reviews
              </span>
            </div>

            {/* Price Header */}
            <div className="mt-5 pb-6 border-b border-neutral-100 flex items-baseline gap-3">
              <span className="text-3xl font-black text-neutral-950">
                {formatPrice(product.priceUSD)}
              </span>
              {product.compareAtPriceUSD && (
                <span className="text-base text-neutral-400 line-through">
                  {formatPrice(product.compareAtPriceUSD)}
                </span>
              )}
              {product.compareAtPriceUSD && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Save {Math.round(((product.compareAtPriceUSD - product.priceUSD) / product.compareAtPriceUSD) * 100)}%
                </span>
              )}
            </div>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-medium text-neutral-700 mb-2.5">
                  <span>Color: <strong className="text-neutral-900">{selectedColor}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-neutral-900 ring-2 ring-neutral-200'
                          : 'border-transparent hover:scale-105'
                      }`}
                      title={c.name}
                    >
                      <div
                        className="w-full h-full rounded-full border border-neutral-300"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size / Lid Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-700 mb-2.5">
                <span>Capacity &amp; Lid: <strong className="text-neutral-900">{selectedSize}</strong></span>
                <button
                  onClick={() => setActiveTab('specs')}
                  className="text-blue-600 hover:text-blue-800 text-xs font-semibold cursor-pointer underline"
                >
                  Tumbler Specs &amp; Dimensions
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-12 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <span className="text-xs font-medium text-neutral-700 block mb-2">
                Quantity
              </span>
              <div className="inline-flex items-center border border-neutral-300 rounded-xl bg-neutral-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-neutral-600 hover:text-neutral-950 rounded-lg hover:bg-white cursor-pointer transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-neutral-900 font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-neutral-600 hover:text-neutral-950 rounded-lg hover:bg-white cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart + Buy Now */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-99"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART · {formatPrice(product.priceUSD * quantity)}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-xs active:scale-99"
              >
                BUY NOW WITH 1-CLICK DEMO CHECKOUT
              </button>
            </div>

            {/* Delivery & Assurance Strip */}
            <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3 text-xs text-neutral-600">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Free Standard Shipping</strong> on orders over $60 (Delivers in 3-5 business days)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>30-Day Easy Returns:</strong> Free exchanges on unworn apparel
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>
                  <strong>Official Google Merchandise:</strong> Guaranteed authentic certified supply
                </span>
              </div>
            </div>

            {/* Share / Copy Link */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 hover:text-neutral-900 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{showCopiedShare ? 'Link Copied to Clipboard!' : 'Share this gear'}</span>
              </button>

              {product.sustainabilityNote && (
                <div className="flex items-center gap-1 text-teal-700 text-[11px] font-medium">
                  <Leaf className="w-3 h-3" />
                  <span>Eco-conscious packaging</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* PRD Section 25: COMPLETE YOUR LOOK (Data-driven bundle cross-sell improvement) */}
        {bundleItems.length > 0 && (
          <div className="py-12 border-b border-neutral-200">
            <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>GA4 Cross-Sell Optimization</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    Complete Your Look
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Save 15% when purchased as a matching 3-piece bundle.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 line-through block">
                      {formatPrice(bundleTotalUSD)}
                    </span>
                    <span className="text-lg font-black text-neutral-950 block">
                      {formatPrice(bundleFinalUSD)}
                    </span>
                  </div>
                  <button
                    onClick={handleAddBundle}
                    disabled={isBundleAdded}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5 ${
                      isBundleAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-900 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isBundleAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Bundle Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Bundle</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 3-Item Bundle Lineup */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Main Product */}
                <div className="bg-white p-3 rounded-xl border border-neutral-200 flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">This Item</span>
                    <h5 className="text-xs font-semibold text-neutral-900 truncate">{product.name}</h5>
                    <span className="text-xs font-bold text-neutral-900">{formatPrice(product.priceUSD)}</span>
                  </div>
                </div>

                {/* Bundle Item 1 */}
                {bundleItems[0] && (
                  <div className="bg-white p-3 rounded-xl border border-neutral-200 flex items-center gap-3">
                    <img
                      src={bundleItems[0].images[0]}
                      alt={bundleItems[0].name}
                      className="w-16 h-16 rounded-lg object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-bold text-blue-600 uppercase">Coordinating</span>
                      <h5 className="text-xs font-semibold text-neutral-900 truncate">{bundleItems[0].name}</h5>
                      <span className="text-xs font-bold text-neutral-900">{formatPrice(bundleItems[0].priceUSD)}</span>
                    </div>
                  </div>
                )}

                {/* Bundle Item 2 */}
                {bundleItems[1] && (
                  <div className="bg-white p-3 rounded-xl border border-neutral-200 flex items-center gap-3">
                    <img
                      src={bundleItems[1].images[0]}
                      alt={bundleItems[1].name}
                      className="w-16 h-16 rounded-lg object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-bold text-blue-600 uppercase">Coordinating</span>
                      <h5 className="text-xs font-semibold text-neutral-900 truncate">{bundleItems[1].name}</h5>
                      <span className="text-xs font-bold text-neutral-900">{formatPrice(bundleItems[1].priceUSD)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PRD Section 23: Specifications, Description, Delivery & Reviews Tabs */}
        <div className="py-12 border-b border-neutral-200">
          <div className="flex items-center gap-2 border-b border-neutral-200 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 px-4 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                activeTab === 'desc'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Description &amp; Highlights
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 px-4 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                activeTab === 'specs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Specifications &amp; Care
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`pb-3 px-4 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                activeTab === 'delivery'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Delivery &amp; Exchanges
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 px-4 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl">
            {activeTab === 'desc' && (
              <div className="space-y-4 text-sm text-neutral-700 leading-relaxed animate-in fade-in">
                <p>{product.description}</p>
                <h4 className="font-bold text-neutral-900 pt-2">Key Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4 text-sm text-neutral-700 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="text-xs font-semibold text-neutral-400 block mb-1">MATERIAL</span>
                    <span className="font-semibold text-neutral-900">{product.specifications.material}</span>
                  </div>
                  {product.specifications.fit && (
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="text-xs font-semibold text-neutral-400 block mb-1">FIT PROFILE</span>
                      <span className="font-semibold text-neutral-900">{product.specifications.fit}</span>
                    </div>
                  )}
                  {product.specifications.dimensions && (
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="text-xs font-semibold text-neutral-400 block mb-1">DIMENSIONS</span>
                      <span className="font-semibold text-neutral-900">{product.specifications.dimensions}</span>
                    </div>
                  )}
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="text-xs font-semibold text-neutral-400 block mb-1">CARE INSTRUCTIONS</span>
                    <span className="font-semibold text-neutral-900">{product.specifications.care}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-4 text-sm text-neutral-700 animate-in fade-in">
                <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl text-emerald-900">
                  <span className="font-bold block mb-1">Dispatch Speed</span>
                  <p className="text-xs">
                    In stock and ships within 24 hours from our regional fulfillment centers in North America, Europe, and Asia.
                  </p>
                </div>
                <div className="space-y-2 text-xs">
                  <p><strong>Standard Shipping:</strong> 3-5 business days (Free on orders $60+ / ₹4,980+)</p>
                  <p><strong>Express Air Shipping:</strong> 1-2 business days ($12.00 flat rate)</p>
                  <p><strong>Carbon-Neutral Delivery:</strong> 100% of transport emissions are offset via verified reforestation programs.</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <span className="text-4xl font-black text-neutral-950">{product.rating}</span>
                    <span className="text-neutral-400 text-sm"> / 5.0</span>
                    <div className="flex items-center justify-center sm:justify-start text-amber-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-500 block mt-1">
                      Based on {product.reviewCount} verified community reviews
                    </span>
                  </div>

                  <div className="w-full sm:w-64 space-y-1.5 text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <span>5★</span>
                      <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[84%]" />
                      </div>
                      <span>84%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>4★</span>
                      <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[12%]" />
                      </div>
                      <span>12%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>3★</span>
                      <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[3%]" />
                      </div>
                      <span>3%</span>
                    </div>
                  </div>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      author: 'Alex K. (Software Engineer)',
                      rating: 5,
                      date: '2 weeks ago',
                      comment: 'Unbelievable fabric quality. The heavyweight feel reminds me of high-end Scandinavian streetwear. Does not shrink after cold wash.',
                    },
                    {
                      author: 'Priya M. (Cloud Architect)',
                      rating: 5,
                      date: 'Last month',
                      comment: 'The embroidery is subtle and classy for office meetings. Fast shipping and the recyclable cardboard box was a very nice touch!',
                    },
                  ].map((rev, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-neutral-900">{rev.author}</span>
                        <span className="text-[11px] text-neutral-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400 mb-2">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PRD Section 25: YOU MAY ALSO LIKE */}
        {recommendations.length > 0 && (
          <div className="py-16">
            <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mb-8">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {recommendations.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* PRD Section 33: Sticky Mobile "Add to Cart" CTA Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 z-30 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-xs font-bold text-neutral-950 block">
            {formatPrice(product.priceUSD)}
          </span>
          <span className="text-[10px] text-neutral-500 font-medium truncate max-w-[120px] block">
            {selectedSize} · {product.name}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
