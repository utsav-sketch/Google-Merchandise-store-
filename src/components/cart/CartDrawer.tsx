import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  Tag, 
  Check 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
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
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_LIMIT = 60;
  const progressPercent = Math.min(100, Math.round((cartSubtotalUSD / FREE_SHIPPING_LIMIT) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - cartSubtotalUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const res = applyPromoCode(promoInput.trim());
      setPromoFeedback(res);
      if (res.success) setPromoInput('');
    }
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    trackGA4Event('begin_checkout', {
      value: cartTotalUSD,
      coupon: appliedPromo || 'NONE',
      items: cart.map((c) => ({ item_id: c.product.id, quantity: c.quantity })),
    });
  };

  const handleGoToFullCart = () => {
    setIsCartOpen(false);
    setCurrentView('cart');
    trackGA4Event('view_cart', { value: cartTotalUSD });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base font-bold text-neutral-900">
                Your Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter (PRD Section 28 & Data-driven cart booster) */}
          <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-100">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <div className="flex items-center gap-1.5 text-neutral-700">
                <Truck className="w-4 h-4 text-blue-600" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more for Free Shipping
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold">
                    You have unlocked FREE Standard Shipping! 🎉
                  </span>
                )}
              </div>
              <span className="text-neutral-400 text-[11px] font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Line Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Your cart is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Discover Google apparel, accessories, and Chrome Dino collectibles to fill your bag.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="mt-5 px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-blue-600 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-neutral-200/80 bg-white hover:border-neutral-300 transition-colors"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase">
                          {item.product.brand}
                        </span>
                        <h4 className="text-xs font-semibold text-neutral-900 truncate leading-snug">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-neutral-500 block mt-0.5">
                          Size: {item.size} · {item.color}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                      {/* Quantity Modifiers */}
                      <div className="inline-flex items-center border border-neutral-200 rounded-md bg-neutral-50">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-neutral-800 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-neutral-950">
                        {formatPrice(item.product.priceUSD * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-white space-y-4">
              
              {/* Promo code bar */}
              <div>
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (e.g. GOOGLE10)"
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code <strong>{appliedPromo}</strong> applied</span>
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-emerald-700 hover:text-emerald-950 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoFeedback && !appliedPromo && (
                  <span className={`text-[11px] block mt-1 ${promoFeedback.success ? 'text-emerald-600' : 'text-red-500'}`}>
                    {promoFeedback.message}
                  </span>
                )}
              </div>

              {/* Order Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(cartSubtotalUSD)}</span>
                </div>
                {discountAmountUSD > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>
                    {shippingFeeUSD === 0 ? (
                      <strong className="text-emerald-600 uppercase text-[11px]">Free</strong>
                    ) : (
                      formatPrice(shippingFeeUSD)
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-100 text-sm font-bold text-neutral-950">
                  <span>Total</span>
                  <span>{formatPrice(cartTotalUSD)}</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-2">
                <button
                  onClick={handleGoToCheckout}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all active:scale-99"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleGoToFullCart}
                  className="w-full py-2.5 text-xs font-semibold text-neutral-700 hover:text-neutral-950 cursor-pointer"
                >
                  View Full Cart Page
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
