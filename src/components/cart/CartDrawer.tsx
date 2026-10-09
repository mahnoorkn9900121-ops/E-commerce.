import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Truck,
  Check,
  Tag
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    discountPercent,
    promoCode,
    applyPromoCode,
    removePromoCode,
    shippingAmount,
    taxAmount,
    total,
    formatPrice,
    navigate
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!cartDrawerOpen) return null;

  const freeShippingThreshold = 250;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPct = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (res.success) {
      setPromoMessage({ text: res.message });
      setInputCode('');
    } else {
      setPromoMessage({ text: res.message, error: true });
    }
  };

  const handleProceedCheckout = () => {
    setCartDrawerOpen(false);
    navigate('checkout');
  };

  const handleViewFullCart = () => {
    setCartDrawerOpen(false);
    navigate('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col z-10 border-l border-stone-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Shopping Bag
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-stone-100 text-stone-700 rounded-full">
                {cartCount}
              </span>
            </div>

            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-stone-100/80 px-6 py-3 border-b border-stone-200">
            <div className="flex items-center justify-between text-xs font-medium text-stone-800">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-stone-700" />
                {remainingForFreeShipping > 0
                  ? `Add ${formatPrice(remainingForFreeShipping)} more for complimentary express delivery`
                  : 'Complimentary worldwide express unlocked'}
              </span>
              <span className="text-[11px] font-semibold text-stone-600">
                {Math.round(freeShippingPct)}%
              </span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-stone-900 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingPct}%` }}
              />
            </div>
          </div>

          {/* Cart Item List / Empty state */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-stone-200">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-200/70 flex items-center justify-center text-stone-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
                  Explore our curated creations spanning tailored apparel, Swiss horology, and Scandinavian acoustic objects.
                </p>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    navigate('shop');
                  }}
                  className="mt-6 px-6 py-3 bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setCartDrawerOpen(false);
                      navigate('product', { id: item.productId });
                    }}
                    className="w-20 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer border border-stone-200"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            setCartDrawerOpen(false);
                            navigate('product', { id: item.productId });
                          }}
                          className="font-serif text-sm font-semibold text-stone-900 hover:text-stone-700 cursor-pointer line-clamp-1"
                        >
                          {item.name}
                        </h4>
                        <span className="text-sm font-semibold text-stone-900 shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5 space-x-1.5">
                        <span>{item.color}</span>
                        {item.size && (
                          <>
                            <span>·</span>
                            <span>Size: {item.size}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls and delete */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 font-semibold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-semibold text-stone-900 min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 font-semibold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown (if items in cart) */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-stone-200">
              {/* Promo Code Entry */}
              <div className="mb-4">
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>
                        <strong>{promoCode}</strong> applied ({discountPercent}% off)
                      </span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-500 hover:text-stone-800 font-semibold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Promo code (e.g. VALOIR10)"
                        className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && !promoCode && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      promoMessage.error ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 mb-4 pb-4 border-b border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Courier Shipping</span>
                  <span>{shippingAmount === 0 ? 'Complimentary' : formatPrice(shippingAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Grand Total</span>
                  <span className="text-base">{formatPrice(total)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleViewFullCart}
                  className="w-full py-2.5 text-xs text-stone-600 hover:text-stone-900 font-medium text-center transition-colors"
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
