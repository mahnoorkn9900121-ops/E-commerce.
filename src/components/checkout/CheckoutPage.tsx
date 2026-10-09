import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { CustomerDetails } from '../../types';
import {
  ShieldAlert,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  ChevronDown,
  ShoppingBag
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    discountPercent,
    promoCode,
    shippingAmount,
    taxAmount,
    total,
    formatPrice,
    placeOrder,
    navigate,
    showToast
  } = useShop();

  // Step state: 1: Shipping, 2: Method & Payment, 3: Review & Submit
  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields
  const [formData, setFormData] = useState<CustomerDetails>({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@residence.com',
    phone: '+1 (555) 782-9901',
    address: '450 Sutter Street',
    apartment: 'Suite 14B',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94108',
    country: 'United States'
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'express' | 'priority' | 'concierge'>('express');

  // Simulated Payment
  const [paymentType, setPaymentType] = useState<'card' | 'applepay' | 'klarna'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [cardName, setCardName] = useState('ELEANOR VANCE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-900">No Items to Checkout</h2>
        <p className="text-sm text-stone-500 mt-2">
          Your shopping bag is currently empty.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="mt-6 px-8 py-3 bg-stone-900 text-stone-100 rounded-xl text-xs font-semibold uppercase tracking-wider"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const validateShippingForm = (): boolean => {
    const errors: Partial<Record<keyof CustomerDetails, string>> = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Incomplete Address', 'Please correct the highlighted form fields.', 'warning');
    }
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    const shippingLabel =
      shippingMethod === 'express'
        ? 'Complimentary DHL Express Courier'
        : shippingMethod === 'priority'
        ? 'Priority Guaranteed Air Express'
        : 'White-Glove Personal Concierge Hand Delivery';

    const paymentLabel =
      paymentType === 'card'
        ? `Visa / Mastercard ending in ${cardNumber.slice(-4)}`
        : paymentType === 'applepay'
        ? 'Apple Pay (Simulated Authorized)'
        : 'Klarna 4 Interest-Free Split Payments';

    // Simulate network delay for realistic experience
    setTimeout(() => {
      const order = placeOrder(formData, shippingLabel, paymentLabel);
      setIsSubmitting(false);
      navigate('confirmation', { orderId: order.id });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Simulation Notice Banner */}
      <div className="mb-8 p-4 bg-amber-50/80 border border-amber-200/90 rounded-2xl flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-semibold">Simulated Demo Checkout Environment:</strong> This store is a portfolio
          demonstration. No real credit cards are charged. Submitting this form will safely generate an official order
          receipt and persist it to your browser&apos;s LocalStorage.
        </div>
      </div>

      {/* Progress Steps Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Secure Checkout
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            256-bit Encrypted Concierge Checkout
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span
            className={`px-3 py-1.5 rounded-lg ${
              step === 1 ? 'bg-stone-900 text-stone-50' : 'bg-stone-100 text-stone-700'
            }`}
          >
            1. Shipping Address
          </span>
          <span className="text-stone-300">→</span>
          <span
            className={`px-3 py-1.5 rounded-lg ${
              step === 2 ? 'bg-stone-900 text-stone-50' : 'bg-stone-100 text-stone-700'
            }`}
          >
            2. Payment & Confirmation
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Step Form (7 cols) */}
        <div className="lg:col-span-7">
          {step === 1 ? (
            /* Step 1: Address Form */
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-stone-500" />
                  <span>Contact & Delivery Address</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 focus:outline-none ${
                        formErrors.firstName ? 'border-rose-500' : 'border-stone-200'
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 focus:outline-none ${
                        formErrors.lastName ? 'border-rose-500' : 'border-stone-200'
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.lastName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 focus:outline-none ${
                        formErrors.email ? 'border-rose-500' : 'border-stone-200'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 focus:outline-none ${
                        formErrors.phone ? 'border-rose-500' : 'border-stone-200'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 focus:outline-none ${
                        formErrors.address ? 'border-rose-500' : 'border-stone-200'
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  {/* Apartment / Suite */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Apartment, Suite, Unit (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.apartment || ''}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 focus:outline-none ${
                        formErrors.city ? 'border-rose-500' : 'border-stone-200'
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.city}</p>
                    )}
                  </div>

                  {/* State / Province */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      State / Region
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Postal Code / ZIP *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 focus:outline-none ${
                        formErrors.postalCode ? 'border-rose-500' : 'border-stone-200'
                      }`}
                    />
                    {formErrors.postalCode && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.postalCode}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Italy">Italy</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                      <option value="Switzerland">Switzerland</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate('cart')}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-2 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Bag</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Continue to Shipping & Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Step 2: Delivery Method & Payment Simulation */
            <div className="space-y-6">
              {/* Shipping Method Selection */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-500" />
                  <span>Select Courier Dispatch Method</span>
                </h2>

                <div className="space-y-3">
                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-stone-900 bg-stone-50/50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="text-stone-900"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900">
                          DHL Carbon-Neutral Express Courier
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          2–3 business days · Tracked & insured
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900">
                      {shippingAmount === 0 ? 'Complimentary' : formatPrice(25)}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('priority')}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      shippingMethod === 'priority'
                        ? 'border-stone-900 bg-stone-50/50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingMethod === 'priority'}
                        onChange={() => setShippingMethod('priority')}
                        className="text-stone-900"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900">
                          Priority Saturday Morning Delivery
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Guaranteed weekend delivery slot with direct signature
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900">
                      {formatPrice(35)}
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-stone-500" />
                    <span>Payment Method</span>
                  </h2>
                  <span className="text-[11px] text-emerald-800 font-semibold px-2.5 py-1 bg-emerald-50 rounded-full">
                    Sandbox Demo Mode
                  </span>
                </div>

                {/* Payment Type Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 rounded-2xl mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentType('card')}
                    className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                      paymentType === 'card'
                        ? 'bg-stone-900 text-stone-50 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('applepay')}
                    className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                      paymentType === 'applepay'
                        ? 'bg-stone-900 text-stone-50 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('klarna')}
                    className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                      paymentType === 'klarna'
                        ? 'bg-stone-900 text-stone-50 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Klarna
                  </button>
                </div>

                {paymentType === 'card' && (
                  <div className="space-y-4">
                    {/* Visual Card Preview */}
                    <div className="p-5 rounded-2xl bg-gradient-to-tr from-stone-950 via-stone-900 to-stone-800 text-stone-100 shadow-xl border border-stone-700/60 max-w-sm mx-auto mb-6">
                      <div className="flex justify-between items-center text-xs tracking-widest text-stone-400 uppercase">
                        <span>Valoir Atelier Concierge</span>
                        <span className="font-bold text-stone-200">CHIP // 3D SECURE</span>
                      </div>
                      <div className="my-6 font-mono text-base tracking-widest text-stone-200">
                        {cardNumber}
                      </div>
                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-stone-400">Cardholder</p>
                          <p className="font-medium tracking-wider uppercase text-stone-200">{cardName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] uppercase tracking-wider text-stone-400">Expires</p>
                          <p className="font-medium font-mono text-stone-200">{cardExpiry}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-stone-700 block mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 uppercase focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-stone-700 block mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-700 block mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-700 block mb-1">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentType === 'applepay' && (
                  <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
                    <p className="font-serif text-lg font-bold text-stone-900">
                      Apple Pay Simulated Authorization
                    </p>
                    <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                      Click Complete Order below to simulate one-touch TouchID or FaceID payment authorization.
                    </p>
                  </div>
                )}

                {paymentType === 'klarna' && (
                  <div className="p-8 text-center bg-rose-50/50 rounded-2xl border border-rose-200">
                    <p className="font-serif text-lg font-bold text-stone-900">
                      Klarna: 4 Interest-Free Payments
                    </p>
                    <p className="text-xs text-stone-600 mt-1">
                      Pay {formatPrice(total / 4)} every 2 weeks. No hidden interest or account fees.
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Actions */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-2 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Shipping Address</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-stone-100 font-semibold text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Authorizing Order...</span>
                  ) : (
                    <>
                      <span>Complete Order · {formatPrice(total)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-stone-500" />
                <span>Your Order</span>
              </h3>
              <span className="text-xs text-stone-500">
                {cart.length} creations
              </span>
            </div>

            {/* Items Mini List */}
            <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto my-4 pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-3 flex gap-3">
                  <div className="w-14 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-stone-900 truncate">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-stone-500">
                      {item.color} {item.size && `· ${item.size}`} · Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-900 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-xs text-stone-600 pt-4 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promo Code ({promoCode})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Shipping</span>
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

            <div className="mt-6 p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500 text-center">
              Direct signature required upon DHL courier delivery.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
