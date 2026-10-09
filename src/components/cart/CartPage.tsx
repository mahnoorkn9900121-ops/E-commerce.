import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Check,
  Tag,
  ShieldCheck
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
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

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400 mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">Your Bag is Empty</h1>
        <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto">
          You haven&apos;t added any items to your shopping bag yet. Explore our curated collections.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="mt-8 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-lg transition-all"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-stone-200 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Shopping Bag
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Review your selected creations ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </p>
        </div>

        <button
          onClick={clearCart}
          className="mt-3 sm:mt-0 text-xs text-stone-400 hover:text-rose-600 transition-colors underline self-start sm:self-auto"
        >
          Clear entire bag
        </button>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-stone-100 p-4 rounded-2xl mb-8 border border-stone-200">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-stone-900" />
            {remainingForFreeShipping > 0
              ? `Add ${formatPrice(remainingForFreeShipping)} more for complimentary worldwide express delivery`
              : 'Complimentary worldwide express courier delivery qualified'}
          </span>
          <span>{Math.round(freeShippingPct)}%</span>
        </div>
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-stone-900 h-full rounded-full transition-all duration-500"
            style={{ width: `${freeShippingPct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 divide-y divide-stone-200">
          {cart.map((item) => (
            <div key={item.cartItemId} className="py-6 first:pt-0 flex gap-4 sm:gap-6">
              <div
                onClick={() => navigate('product', { id: item.productId })}
                className="w-24 h-32 sm:w-28 sm:h-36 rounded-2xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer border border-stone-200"
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                        {item.category}
                      </span>
                      <h3
                        onClick={() => navigate('product', { id: item.productId })}
                        className="font-serif text-base sm:text-lg font-bold text-stone-900 hover:text-stone-700 cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Color: {item.color} {item.size && `· Size: ${item.size}`}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-stone-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-stone-400">
                          {formatPrice(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-stone-900 min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-stone-400 hover:text-rose-600 p-2 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-6">
            <button
              onClick={() => navigate('shop')}
              className="text-xs text-stone-600 hover:text-stone-900 font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Summary (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md sticky top-28">
            <h2 className="font-serif text-xl font-bold text-stone-900 pb-4 border-b border-stone-200">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <div className="my-6">
              {promoCode ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>
                      Code <strong>{promoCode}</strong> applied ({discountPercent}% off)
                    </span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-stone-500 hover:text-stone-800 font-semibold underline text-xs"
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
                      placeholder="Promo code (e.g. LUXE20)"
                      className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-semibold rounded-xl"
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

            {/* Calculations */}
            <div className="space-y-3 text-xs text-stone-600 pb-6 border-b border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
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
                <span>Estimated Sales Tax (8%)</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-100">
                <span>Grand Total</span>
                <span className="text-xl font-serif">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => navigate('checkout')}
              className="w-full py-4 mt-6 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>Complimentary insured shipping & easy 30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
