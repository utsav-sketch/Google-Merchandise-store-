import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Check, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotalUSD,
    cartTotalUSD,
    discountAmountUSD,
    shippingFeeUSD,
    formatPrice,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setCurrentView,
    trackGA4Event,
  } = useShop();

  const [promoInput, setPromoInput] = useState<string>('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const res = applyPromoCode(promoInput.trim());
      setPromoMessage(res.message);
      if (res.success) setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setCurrentView('checkout');
    trackGA4Event('begin_checkout', {
      source: 'full_cart_page',
      value: cartTotalUSD,
      coupon: appliedPromo || 'NONE',
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Your shopping bag is empty</h2>
        <p className="text-sm text-neutral-500 mt-2 max-w-sm">
          Looks like you haven't added any Google merchandise items to your cart yet.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-6 px-8 py-3.5 bg-neutral-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Explore All Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Shopping Cart
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Review your items and proceed to frictionless demo checkout.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Products Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-6 space-y-6 divide-y divide-neutral-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-6 first:pt-0 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-neutral-100 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase">
                        {item.product.brand}
                      </span>
                      <h3 className="font-semibold text-sm text-neutral-900 leading-snug">
                        {item.product.name}
                      </h3>
                      <span className="text-xs text-neutral-500 block mt-0.5">
                        Size: {item.size} · Color: {item.color}
                      </span>
                      <span className="text-xs font-bold text-neutral-950 sm:hidden mt-1 block">
                        {formatPrice(item.product.priceUSD)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="inline-flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold font-mono text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-20">
                      <span className="text-sm font-bold text-neutral-950 block">
                        {formatPrice(item.product.priceUSD * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-neutral-400 block">
                          {formatPrice(item.product.priceUSD)} each
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Summary Box */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs p-6 space-y-6">
            <h3 className="font-bold text-base text-neutral-900">Order Summary</h3>

            {/* Promo Code Form */}
            <div>
              {!appliedPromo ? (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (GOOGLE10)"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Promo <strong>{appliedPromo}</strong> active</span>
                  </span>
                  <button
                    onClick={removePromoCode}
                    className="text-emerald-700 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoMessage && !appliedPromo && (
                <span className="text-[11px] text-neutral-500 block mt-1">{promoMessage}</span>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span className="font-semibold text-neutral-900">{formatPrice(cartSubtotalUSD)}</span>
              </div>
              {discountAmountUSD > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promo Discount (10%)</span>
                  <span>-{formatPrice(discountAmountUSD)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Shipping</span>
                <span>
                  {shippingFeeUSD === 0 ? (
                    <strong className="text-emerald-600 uppercase text-[11px]">Free</strong>
                  ) : (
                    formatPrice(shippingFeeUSD)
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-200 text-base font-bold text-neutral-950">
                <span>Estimated Total</span>
                <span>{formatPrice(cartTotalUSD)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all active:scale-99"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Guarantee badges */}
            <div className="pt-4 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero real payment processed (Academic Prototype)</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Standard delivery in 3–5 business days</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
