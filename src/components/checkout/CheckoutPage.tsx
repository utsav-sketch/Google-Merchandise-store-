import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Info 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CustomerOrder } from '../../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotalUSD,
    cartTotalUSD,
    discountAmountUSD,
    shippingFeeUSD,
    formatPrice,
    placeOrder,
    setCurrentView,
    currency,
  } = useShop();

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'card' | 'cod'>('gpay');

  const [customer, setCustomer] = useState<CustomerOrder['customer']>({
    name: 'Alex Developer',
    email: 'alex.developer@example.com',
    phone: '+1 (555) 019-2834',
    address: '1600 Amphitheatre Pkwy',
    city: 'Mountain View',
    state: 'CA',
    pinCode: '94043',
    country: 'United States',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold text-neutral-900">Your cart is empty</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-4 px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const shippingCost = deliveryMethod === 'express' ? 12 : shippingFeeUSD;
  const finalOrderTotal = cartSubtotalUSD - discountAmountUSD + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(customer, deliveryMethod, paymentMethod);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="bg-neutral-50/60 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('cart')}
              className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-neutral-900">
                Frictionless Checkout
              </h1>
              <span className="text-xs text-neutral-500">
                GA4 Optimized Single-Page Checkout (Friction-Free Flow)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-neutral-700">256-Bit SSL Demo Sandbox</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Customer, Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Details */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">
                  1
                </span>
                <span>Customer Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">
                  2
                </span>
                <span>Shipping Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-medium mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">State / Province</label>
                  <input
                    type="text"
                    required
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">PIN / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={customer.pinCode}
                    onChange={(e) => setCustomer({ ...customer, pinCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Country</label>
                  <select
                    value={customer.country}
                    onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Options */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">
                  3
                </span>
                <span>Delivery Method</span>
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-neutral-900 bg-neutral-50/50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">
                        Standard Carbon-Neutral Delivery
                      </span>
                      <span className="text-[11px] text-neutral-500 block">
                        Estimated arrival in 3–5 business days
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    {shippingFeeUSD === 0 ? 'FREE' : formatPrice(shippingFeeUSD)}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-neutral-900 bg-neutral-50/50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">
                        Express Priority Air Shipping
                      </span>
                      <span className="text-[11px] text-neutral-500 block">
                        Guaranteed arrival in 1–2 business days
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    {formatPrice(12)}
                  </span>
                </label>
              </div>
            </div>

            {/* Step 4: Demo Payment Interface (Academic Prototype) */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">
                  4
                </span>
                <span>Payment Method (Demo Mode)</span>
              </h2>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs mb-4 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Academic Project Demonstration:</strong> No real payment information or credit cards are collected. Click "Place Demo Order" to test GA4 purchase conversion.
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gpay')}
                  className={`p-3 rounded-xl border-2 text-center text-xs font-bold cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'gpay'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-1 font-sans">
                    <span className="text-blue-600 font-black">G</span>
                    <span className="text-neutral-700">Pay</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-normal">Instant 1-Click</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border-2 text-center text-xs font-bold cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-neutral-700" />
                  <span className="text-[10px] text-neutral-500 font-normal">Demo Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border-2 text-center text-xs font-bold cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  <span className="text-neutral-700">📦 COD</span>
                  <span className="text-[10px] text-neutral-500 font-normal">Pay on Delivery</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs space-y-6 h-fit sticky top-24">
            <h3 className="font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
              Order Items ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>

            {/* Compact item list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-medium text-neutral-900 truncate max-w-[170px]">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-neutral-500 block">
                        Qty: {item.quantity} · Size: {item.size}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-950 shrink-0">
                    {formatPrice(item.product.priceUSD * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">{formatPrice(cartSubtotalUSD)}</span>
              </div>
              {discountAmountUSD > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promo Discount</span>
                  <span>-{formatPrice(discountAmountUSD)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({deliveryMethod === 'express' ? 'Express' : 'Standard'})</span>
                <span className="font-semibold text-neutral-900">
                  {shippingCost === 0 ? (
                    <strong className="text-emerald-600 uppercase text-[11px]">Free</strong>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-200 text-base font-bold text-neutral-950">
                <span>Total Amount Due</span>
                <span>{formatPrice(finalOrderTotal)}</span>
              </div>
            </div>

            {/* Final CTA (PRD Section 29) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-99"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Processing Demo Order...' : 'Place Demo Order'}</span>
            </button>

            <p className="text-[11px] text-neutral-400 text-center">
              Triggering GA4 <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-800 font-mono">purchase</code> event on confirmation.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
