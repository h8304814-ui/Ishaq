import React from 'react';
import { CheckCircle2, Truck, MessageCircle, Printer, ShoppingBag, MapPin, Calendar } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  currency: 'PKR' | 'USD';
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  currency,
  onClose,
}) => {
  if (!order) return null;

  const formatPrice = (pkrPrice: number) => {
    if (currency === 'USD') {
      const usd = Math.round(pkrPrice / 278);
      return `$${usd}`;
    }
    return `Rs. ${pkrPrice.toLocaleString('en-PK')}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Success Header Banner */}
        <div className="bg-emerald-800 text-white p-6 sm:p-8 text-center relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-200" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
            Order Confirmed! Shukriya!
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Your HS Collection order has been received and sent to our Lahore atelier.
          </p>
          <div className="mt-3 inline-block bg-white/15 px-3 py-1 rounded-full text-xs font-mono tracking-wider font-bold">
            Order ID: {order.id}
          </div>
        </div>

        {/* Order Details Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-stone-700">
          
          {/* Dispatch Notice Card */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 sm:p-4 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <Truck className="w-4 h-4 text-amber-800" />
              <span>Estimated Delivery: 3 to 5 Business Days</span>
            </div>
            <p className="text-amber-900 leading-relaxed">
              Our concierge team will contact you on WhatsApp / SMS at <strong className="font-semibold">{order.phone}</strong> before TCS dispatch.
            </p>
          </div>

          {/* Bank Transfer Details (if applicable) */}
          {order.paymentMethod === 'bank_transfer' && (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2">
              <div className="font-bold text-stone-900">Meezan Bank Transfer Details:</div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-stone-500">Bank:</span> <strong>Meezan Bank Ltd</strong></div>
                <div><span className="text-stone-500">Account Title:</span> <strong>HS Collection Pvt Ltd</strong></div>
                <div><span className="text-stone-500">Account #:</span> <strong>0102-0105829102</strong></div>
                <div><span className="text-stone-500">IBAN:</span> <strong>PK45MEZN0001020105829102</strong></div>
              </div>
              <p className="text-[10px] text-stone-500 italic">
                *Please share your transfer receipt screenshot with order #{order.id} on WhatsApp: +92 300 1234567.
              </p>
            </div>
          )}

          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-3.5 rounded-xl border border-stone-200">
            <div>
              <div className="text-stone-400 font-semibold uppercase text-[10px] flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3" />
                <span>Shipping To</span>
              </div>
              <div className="font-bold text-stone-900">{order.customerName}</div>
              <div className="text-stone-600 line-clamp-2">{order.address}</div>
              <div className="text-stone-600">{order.city}</div>
              <div className="text-stone-600">{order.phone}</div>
            </div>

            <div>
              <div className="text-stone-400 font-semibold uppercase text-[10px] flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3" />
                <span>Payment & Status</span>
              </div>
              <div className="text-stone-700">
                Method: <strong className="font-bold uppercase text-stone-900">{order.paymentMethod}</strong>
              </div>
              <div className="text-stone-700">
                Date: <strong className="font-medium text-stone-900">{order.date}</strong>
              </div>
              <div className="text-stone-700">
                Status: <span className="text-emerald-700 font-bold capitalize">{order.status}</span>
              </div>
            </div>
          </div>

          {/* Purchased Items */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Items Ordered
            </div>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
              {order.items.map((item, i) => (
                <div key={i} className="p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-12 object-cover rounded bg-stone-100 shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-semibold text-stone-900 truncate">{item.product.name}</div>
                      <div className="text-[10px] text-stone-500">
                        Size: {item.selectedSize} · Color: {item.selectedColor} (Qty: {item.quantity})
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-stone-900 tabular-nums shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-bold text-stone-900">
            <span>Total Payable:</span>
            <span className="text-base text-amber-900 tabular-nums">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-amber-900 text-white text-xs font-semibold uppercase tracking-wider transition-colors min-h-[42px]"
            >
              Continue Shopping
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
