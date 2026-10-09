import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Order } from '../../types';
import {
  Package,
  MapPin,
  Settings,
  Clock,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { orders, formatPrice, navigate, showToast, currency, setCurrency } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'preferences'>('orders');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Profile data
  const [collectorName, setCollectorName] = useState('Alexander Hale');
  const [collectorEmail, setCollectorEmail] = useState('a.hale@residence.com');

  const handleResetDemoData = () => {
    try {
      localStorage.removeItem('valoir_cart');
      localStorage.removeItem('valoir_wishlist');
      localStorage.removeItem('valoir_recently_viewed');
      localStorage.removeItem('valoir_orders');
      showToast('Data Reset', 'Demo data cleared. Reloading page...', 'info');
      setTimeout(() => window.location.reload(), 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Account Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-900 text-stone-100 font-brand text-2xl flex items-center justify-center font-bold">
            {collectorName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-stone-900">{collectorName}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md">
                VIP Circle Member
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{collectorEmail}</p>
            <p className="text-[11px] text-stone-400 mt-1">
              Collector since 2024 · European & Swiss Ateliers Tier
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-semibold uppercase tracking-wider self-start sm:self-auto shadow-md"
        >
          Explore Collection
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-8 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-stone-900 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'addresses'
              ? 'border-stone-900 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`pb-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'preferences'
              ? 'border-stone-900 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Preferences & Storage</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
              <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-stone-900">No Orders Yet</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Orders placed during your session will appear here with real-time tracking numbers and itemized receipts.
              </p>
              <button
                onClick={() => navigate('shop')}
                className="mt-6 px-6 py-2.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded-xl uppercase tracking-wider"
              >
                Start Curating
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-stone-900">
                        {order.id}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 bg-stone-100 text-stone-800 font-semibold rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1">Placed {order.date}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-serif text-lg font-bold text-stone-900">
                      {formatPrice(order.total)}
                    </span>
                    <p className="text-[11px] text-stone-400">
                      {order.items.length} {order.items.length === 1 ? 'creation' : 'creations'}
                    </p>
                  </div>
                </div>

                {/* Items preview */}
                <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.cartItemId}
                      onClick={() => navigate('product', { id: item.productId })}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-stone-900 truncate">{item.name}</p>
                        <p className="text-[11px] text-stone-400">
                          {item.color} {item.size && `· ${item.size}`} · Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking & Receipt Actions */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Courier Tracking: <strong>{order.trackingNumber}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedOrderDetails(order)}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-semibold transition-colors"
                    >
                      View Receipt Details
                    </button>
                    <button
                      onClick={() => navigate('confirmation', { orderId: order.id })}
                      className="text-stone-900 font-semibold underline flex items-center gap-1 hover:text-stone-600"
                    >
                      <span>Delivery Tracker</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border-2 border-stone-900 relative shadow-xs">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-stone-900 text-stone-100 rounded-md">
                Primary Residence
              </span>
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900">{collectorName}</h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              450 Sutter Street, Suite 14B <br />
              San Francisco, CA 94108 <br />
              United States
            </p>
            <p className="text-xs text-stone-500 mt-3">+1 (555) 782-9901</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md">
                Paris Pied-à-Terre
              </span>
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900">{collectorName}</h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              18 Place Vendôme, 3ème étage <br />
              75001 Paris <br />
              France
            </p>
            <p className="text-xs text-stone-500 mt-3">+33 1 42 68 00 20</p>
          </div>
        </div>
      )}

      {/* Tab 3: Preferences */}
      {activeTab === 'preferences' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 max-w-2xl space-y-8">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Display Currency</h3>
            <p className="text-xs text-stone-500 mb-4">
              Switch currency for instant dynamic re-conversion across all creations and receipts.
            </p>
            <div className="grid grid-cols-4 gap-2">
              {(['USD', 'EUR', 'GBP', 'JPY'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    currency === c
                      ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
              LocalStorage Browser Persistence
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              All your cart items, wishlist creations, and demo orders are securely stored inside
              your browser&apos;s LocalStorage. If you want to reset the store to initial demo state,
              click below.
            </p>
            <button
              onClick={handleResetDemoData}
              className="px-5 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors border border-rose-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Demo Data</span>
            </button>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-2"
            >
              ✕
            </button>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Receipt Summary
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              Order {selectedOrderDetails.id}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {selectedOrderDetails.date} · {selectedOrderDetails.paymentMethod}
            </p>

            <div className="divide-y divide-stone-100 my-6">
              {selectedOrderDetails.items.map((i) => (
                <div key={i.cartItemId} className="py-2.5 flex justify-between text-xs">
                  <div>
                    <span className="font-semibold text-stone-900">{i.name}</span>
                    <p className="text-[11px] text-stone-500">
                      {i.color} · Qty {i.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-stone-900">
                    {formatPrice(i.price * i.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(selectedOrderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Courier</span>
                <span>{formatPrice(selectedOrderDetails.shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-stone-100">
                <span>Grand Total</span>
                <span>{formatPrice(selectedOrderDetails.total)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full mt-6 py-3 bg-stone-900 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-xl"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
