import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
  CheckCircle2,
  Package,
  Printer,
  ArrowRight,
  Truck,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const { params, getOrderById, currentOrder, formatPrice, navigate } = useShop();

  const orderId = params.orderId || currentOrder?.id;
  const order = (orderId ? getOrderById(orderId) : currentOrder) || currentOrder;

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-900">Order Not Located</h2>
        <p className="text-xs text-stone-500 mt-2">
          Please check your account order history or return to the collection.
        </p>
        <button
          onClick={() => navigate('account')}
          className="mt-6 px-6 py-3 bg-stone-900 text-stone-100 rounded-xl text-xs font-semibold uppercase tracking-wider"
        >
          View Account Orders
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Confirmation Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden p-6 sm:p-10">
        {/* Top Success Badge */}
        <div className="text-center pb-8 border-b border-stone-200">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Payment Authorized · Order Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Thank you, {order.customer.firstName}.
          </h1>

          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
            Your acquisition has been recorded in the Maison archive. A confirmation summary has
            been prepared for your records.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-xl text-xs font-mono font-bold text-stone-800">
            <span>Order Reference:</span>
            <span className="text-amber-800">{order.id}</span>
          </div>
        </div>

        {/* Dispatch Timeline Progress Tracker */}
        <div className="py-8 border-b border-stone-200">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-6 text-center sm:text-left">
            Dispatch Progression
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
            <div className="flex sm:flex-col items-center gap-3 text-center sm:text-center">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Order Placed</p>
                <p className="text-[11px] text-stone-400">Authorized</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center gap-3 text-center sm:text-center">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-xs font-bold shrink-0 animate-pulse">
                2
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Atelier Packaging</p>
                <p className="text-[11px] text-stone-500">Inspection underway</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center gap-3 text-center sm:text-center opacity-60">
              <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-bold shrink-0">
                3
              </div>
              <div>
                <p className="text-xs font-bold text-stone-700">Courier Handover</p>
                <p className="text-[11px] text-stone-400">DHL Express Air</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center gap-3 text-center sm:text-center opacity-60">
              <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-bold shrink-0">
                4
              </div>
              <div>
                <p className="text-xs font-bold text-stone-700">Doorstep Delivery</p>
                <p className="text-[11px] text-stone-400">Direct signature</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-stone-50 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-stone-900" />
              <span>Tracking Number: <strong>{order.trackingNumber}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-stone-900" />
              <span>Estimated Delivery: <strong>{order.estimatedDelivery}</strong></span>
            </div>
          </div>
        </div>

        {/* Itemized Order Receipt */}
        <div className="py-8 border-b border-stone-200">
          <h3 className="font-serif text-lg font-bold text-stone-900 mb-4">
            Itemized Acquisitions
          </h3>

          <div className="divide-y divide-stone-100">
            {order.items.map((item) => (
              <div key={item.cartItemId} className="py-3 flex items-center gap-4">
                <div className="w-14 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-semibold text-stone-900 truncate">
                    {item.name}
                  </h5>
                  <p className="text-[11px] text-stone-500">
                    {item.color} {item.size && `· Size ${item.size}`} · Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-bold text-stone-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="mt-6 pt-4 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Promotional Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery</span>
              <span>{order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
              <span>Grand Total</span>
              <span className="text-base font-serif">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address & Payment Summary */}
        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-600 border-b border-stone-200">
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
              Delivery Destination
            </h4>
            <p className="font-medium text-stone-800">
              {order.customer.firstName} {order.customer.lastName}
            </p>
            <p>{order.customer.address}</p>
            {order.customer.apartment && <p>{order.customer.apartment}</p>}
            <p>
              {order.customer.city}, {order.customer.state} {order.customer.postalCode}
            </p>
            <p>{order.customer.country}</p>
            <p className="mt-1">{order.customer.phone}</p>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
              Payment & Dispatch
            </h4>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p className="mt-1">
              <strong>Delivery Mode:</strong> {order.shippingMethod}
            </p>
            <div className="mt-4 flex items-center gap-2 text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full shipment value protected by Valoir Concierge Guarantee</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Receipt</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('account')}
              className="flex-1 sm:flex-initial px-5 py-3 border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              View In Account
            </button>

            <button
              onClick={() => navigate('shop')}
              className="flex-1 sm:flex-initial px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
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
