import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Calendar, 
  ArrowRight, 
  Printer, 
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrder, setCurrentView, formatPrice, setIsGA4HubOpen } = useShop();

  if (!lastOrder) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <Package className="w-12 h-12 text-neutral-400 mb-3" />
        <h2 className="text-xl font-bold text-neutral-900">No recent order found</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-4 px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          Browse Merchandise
        </button>
      </div>
    );
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + (lastOrder.deliveryMethod === 'express' ? 2 : 4));
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-neutral-50/60 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden text-center p-8 sm:p-12">
          
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-xs animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>GA4 'purchase' Conversion Logged</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            Order Confirmed!
          </h1>
          <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">
            Thanks for shopping with us. We've sent an order confirmation and tracking details to <strong className="text-neutral-800">{lastOrder.customer.email}</strong>.
          </p>

          {/* Quick Metrics Tile */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80">
            <div>
              <span className="text-[11px] text-neutral-400 font-mono block uppercase">Order ID</span>
              <span className="text-xs font-bold text-neutral-900 font-mono">{lastOrder.orderId}</span>
            </div>
            <div>
              <span className="text-[11px] text-neutral-400 font-mono block uppercase">Estimated Delivery</span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDeliveryDate}</span>
              </span>
            </div>
            <div>
              <span className="text-[11px] text-neutral-400 font-mono block uppercase">Total Paid</span>
              <span className="text-xs font-bold text-neutral-900">{formatPrice(lastOrder.total)}</span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="mt-8 text-left border-t border-neutral-100 pt-6">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
              Order Items ({lastOrder.items.length})
            </h3>
            <div className="divide-y divide-neutral-100">
              {lastOrder.items.map((item: any) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-100"
                    />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{item.product.name}</h4>
                      <span className="text-[11px] text-neutral-500">
                        Qty: {item.quantity} · Size: {item.size} · {item.color}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {formatPrice(item.product.priceUSD * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Delivery Address */}
          <div className="mt-8 p-4 rounded-xl border border-neutral-200 text-left text-xs text-neutral-600 bg-neutral-50/50 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <span className="font-bold text-neutral-900 block mb-1">Shipping Destination</span>
              <p>{lastOrder.customer.name}</p>
              <p>{lastOrder.customer.address}</p>
              <p>{lastOrder.customer.city}, {lastOrder.customer.state} {lastOrder.customer.pinCode}</p>
              <p>{lastOrder.customer.country}</p>
            </div>
            <div className="sm:text-right">
              <span className="font-bold text-neutral-900 block mb-1">Fulfillment Mode</span>
              <p className="capitalize">{lastOrder.deliveryMethod} Priority ({lastOrder.shipping === 0 ? 'Free' : formatPrice(lastOrder.shipping)})</p>
              <p className="mt-2 text-emerald-600 font-semibold">Ready for dispatch in 24h</p>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setIsGA4HubOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Inspect GA4 Realtime Event Stream</span>
            </button>

            <button
              onClick={() => setCurrentView('shop')}
              className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
