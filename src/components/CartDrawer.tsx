import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'PKR' | 'USD';
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const STANDARD_SHIPPING = 250;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount + shippingFee;

  const formatPrice = (pkrPrice: number) => {
    if (currency === 'USD') {
      const usd = Math.round(pkrPrice / 278);
      return `$${usd}`;
    }
    return `Rs. ${pkrPrice.toLocaleString('en-PK')}`;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'HSFESTIVE10' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponSuccess('10% Festive discount applied!');
    } else if (code === 'HSVIP15') {
      setDiscountPercent(15);
      setCouponSuccess('15% VIP Patron discount applied!');
    } else {
      setCouponError('Invalid coupon code. Try "HSFESTIVE10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container (w-full on mobile, max-w-md on tablet/desktop) */}
      <div className="relative w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-800" />
            <h2 className="font-display text-lg font-bold text-stone-900 tracking-tight">
              Your Shopping Bag
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 tabular-nums">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#FAF8F5] px-4 py-3 border-b border-stone-200 text-xs">
          {subtotal >= FREE_SHIPPING_THRESHOLD ? (
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>You've unlocked FREE Express Shipping across Pakistan!</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-stone-600 mb-1.5">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck className="w-3.5 h-3.5 text-amber-800" />
                  <span>Free Shipping Progress</span>
                </span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-800 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-display text-base font-semibold text-stone-800 mb-1">
                Your bag is currently empty
              </h3>
              <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                Discover our luxurious embroidered pret, unstitched suits, and traditional Kundan adornments.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-amber-900 transition-colors"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="pt-4 first:pt-0 flex gap-3.5">
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-xs sm:text-sm font-semibold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        aria-label="Remove item"
                        className="text-stone-400 hover:text-rose-600 p-1 -mr-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 space-x-2 mt-0.5">
                      <span>Size: <strong className="text-stone-800">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span>Color: <strong className="text-stone-800">{item.selectedColor}</strong></span>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-stone-900 mt-1 tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>

                  {/* Quantity stepper (touch target >= 40px) */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 font-bold active:scale-95"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-7 text-center font-bold text-xs tabular-nums text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 font-bold active:scale-95"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal, Coupon & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/90 space-y-3">
            
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo Code (e.g. HSFESTIVE10)"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 uppercase focus:outline-none focus:ring-1 focus:ring-amber-800"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-stone-800 hover:bg-stone-950 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </form>

            {couponSuccess && (
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{couponSuccess}</span>
              </p>
            )}
            {couponError && (
              <p className="text-[11px] text-rose-600 font-medium">
                {couponError}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Festive Discount ({discountPercent}%)</span>
                  <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Nationwide Shipping</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {isFreeShipping ? <span className="text-emerald-700">FREE</span> : formatPrice(STANDARD_SHIPPING)}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
                <span>Estimated Total</span>
                <span className="tabular-nums">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => {
                onProceedToCheckout(discountAmount, couponCode);
              }}
              className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm min-h-[48px]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-stone-500">
              Cash on Delivery (COD) · Bank Transfer · Card Payment available at next step
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
