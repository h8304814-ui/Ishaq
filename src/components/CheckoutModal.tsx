import React, { useState } from 'react';
import { X, Truck, CreditCard, Building2, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { CartItem, Order } from '../types';
import { PAKISTANI_CITIES } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'PKR' | 'USD';
  discountAmount: number;
  couponCode: string;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  discountAmount,
  couponCode,
  onOrderPlaced,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(PAKISTANI_CITIES[0]);
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const STANDARD_SHIPPING = 250;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING;
  const total = subtotal - discountAmount + shippingFee;

  const formatPrice = (pkrPrice: number) => {
    if (currency === 'USD') {
      const usd = Math.round(pkrPrice / 278);
      return `$${usd}`;
    }
    return `Rs. ${pkrPrice.toLocaleString('en-PK')}`;
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim()) errs.customerName = 'Please enter your full name';
    if (!phone.trim() || phone.trim().length < 10) {
      errs.phone = 'Please enter a valid Pakistani mobile/WhatsApp number (e.g. 0300-1234567)';
    }
    if (!address.trim()) errs.address = 'Please enter your street address and house/flat #';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomOrderNumber = Math.floor(10000 + Math.random() * 90000);
      const newOrder: Order = {
        id: `HSC-${randomOrderNumber}`,
        customerName,
        phone,
        email: email || 'not-provided@customer.pk',
        address,
        city,
        postalCode,
        paymentMethod,
        items: [...items],
        subtotal,
        shippingFee,
        discount: discountAmount,
        total,
        status: 'confirmed',
        date: new Date().toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-0 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white min-h-screen sm:min-h-0 sm:rounded-2xl shadow-2xl z-10 flex flex-col max-h-[96vh] sm:max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 -ml-1 text-stone-500 hover:text-stone-800 rounded sm:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                Express Checkout
              </h2>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                Cash on Delivery · TCS Courier Nationwide Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Customer & Delivery Details (7 cols on lg) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-stone-200 pb-1.5">
                  1. Delivery Information
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.customerName}</p>
                  )}
                </div>

                {/* Mobile / WhatsApp Number */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567 or +92 300 1234567"
                    className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
                  />
                  <p className="text-[10px] text-stone-500 mt-0.5">
                    We send tracking SMS & WhatsApp order confirmation updates to this number.
                  </p>
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address <span className="text-stone-400 font-normal">(Optional for receipt)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ayesha@example.com"
                    className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
                  />
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
                    >
                      {PAKISTANI_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Postal Code / Zip <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 75500"
                      className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
                    />
                  </div>
                </div>

                {/* Complete Street Address */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Complete Street Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Apartment #, Street, Phase/Block, Sector, Landmark..."
                    className="w-full px-3.5 py-2 text-sm sm:text-base border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
                  />
                  {errors.address && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div className="pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-stone-200 pb-1.5 mb-2.5">
                    2. Payment Method
                  </div>

                  <div className="space-y-2">
                    {/* Cash on Delivery (COD) */}
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-amber-900 bg-amber-900/5 ring-1 ring-amber-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-1 text-amber-900 focus:ring-amber-800"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-amber-800" />
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            Most Popular
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Pay cash to the TCS / Leopards courier rider when your parcel arrives at your doorstep.
                        </p>
                      </div>
                    </label>

                    {/* Direct Bank Transfer */}
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-amber-900 bg-amber-900/5 ring-1 ring-amber-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="mt-1 text-amber-900 focus:ring-amber-800"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-amber-800" />
                          Direct Bank Transfer / IBFT
                        </span>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Meezan Bank & HBL account details provided upon order completion.
                        </p>
                      </div>
                    </label>

                    {/* Debit / Credit Card */}
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-amber-900 bg-amber-900/5 ring-1 ring-amber-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="mt-1 text-amber-900 focus:ring-amber-800"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-amber-800" />
                          Debit / Credit Card (Visa & Mastercard)
                        </span>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Secured 256-bit encrypted card checkout for domestic and international cards.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary (5 cols on lg) */}
              <div className="lg:col-span-5 bg-stone-50 rounded-xl p-4 sm:p-5 border border-stone-200 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-700 border-b border-stone-200 pb-2">
                  Order Summary ({items.length} items)
                </div>

                {/* Items preview */}
                <div className="max-h-48 overflow-y-auto space-y-2.5 divide-y divide-stone-200/60 pr-1">
                  {items.map((item, idx) => (
                    <div key={idx} className="pt-2 first:pt-0 flex items-center gap-2.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover rounded bg-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="font-semibold text-stone-900 truncate">{item.product.name}</div>
                        <div className="text-[10px] text-stone-500">
                          {item.selectedSize} · {item.selectedColor} (Qty: {item.quantity})
                        </div>
                        <div className="font-bold text-stone-800 tabular-nums mt-0.5">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-1.5 text-xs border-t border-stone-200 pt-3">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900 tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount ({couponCode})</span>
                      <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping Fee</span>
                    <span className="font-semibold text-stone-900 tabular-nums">
                      {isFreeShipping ? <span className="text-emerald-700">FREE</span> : formatPrice(STANDARD_SHIPPING)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
                    <span>Total Amount</span>
                    <span className="text-amber-900 tabular-nums">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-stone-900 hover:bg-amber-900 active:scale-95 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span>Confirm & Place Order</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Official HS Collection Guarantee · Secure Pakistani E-Commerce</span>
                </div>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
