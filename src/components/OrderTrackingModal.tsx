import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Package, MapPin } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
}) => {
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(
    recentOrders.length > 0 ? recentOrders[recentOrders.length - 1] : null
  );
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const trimmed = searchId.trim().toUpperCase();
    const found = recentOrders.find(
      (o) => o.id.toUpperCase() === trimmed || o.phone.replace(/\D/g, '') === trimmed.replace(/\D/g, '')
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      // Create a simulated order for demonstration if user searches an arbitrary ID
      setSearchedOrder({
        id: trimmed.startsWith('HSC-') ? trimmed : `HSC-${trimmed || '84920'}`,
        customerName: 'Valued Patron',
        phone: '+92 300 1234567',
        email: 'patron@example.pk',
        address: 'Defence Phase 5, Karachi',
        city: 'Karachi',
        paymentMethod: 'cod',
        items: [],
        subtotal: 24500,
        shippingFee: 0,
        discount: 0,
        total: 24500,
        status: 'shipped',
        date: 'Recent',
      });
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Received & Verified', completed: true, icon: CheckCircle2 },
    { title: 'Atelier Quality Inspection', desc: 'Handcraft & Stitch Check', completed: true, icon: Package },
    { title: 'Packed & Dispatched', desc: 'Handed to TCS Courier', completed: true, icon: Truck },
    { title: 'Out for Delivery', desc: 'Rider reaching doorstep', completed: false, icon: MapPin },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-800" />
            <h2 className="font-display text-base sm:text-lg font-bold text-stone-900 tracking-tight">
              Track Your HS Collection Order
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close tracking"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. HSC-94821) or Mobile #"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800 uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-stone-900 hover:bg-amber-900 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[42px]"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Tracking Details Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {searchedOrder ? (
            <div className="space-y-6">
              
              {/* Order Info Card */}
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="text-stone-400 uppercase text-[10px] font-semibold">Tracking Shipment</div>
                  <div className="font-bold text-sm text-stone-900 font-mono">{searchedOrder.id}</div>
                  <div className="text-stone-600 mt-0.5">Courier: TCS Express Priority Air (CN # 7829104820)</div>
                </div>
                <div className="text-right sm:text-right">
                  <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full font-bold uppercase text-[10px]">
                    In Transit
                  </span>
                  <div className="text-stone-500 text-[11px] mt-1">Est. Delivery: 2 Days</div>
                </div>
              </div>

              {/* Progress Steps Timeline (Responsive mobile vertical, tablet/desktop clean flow) */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Shipment Milestones
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
                  {steps.map((step, idx) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={idx} className="relative flex items-start gap-3">
                        <div
                          className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-white ring-4 ring-white ${
                            step.completed ? 'bg-emerald-600' : 'bg-stone-300'
                          }`}
                        >
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <div className="min-w-0">
                          <div className={`text-xs sm:text-sm font-semibold ${step.completed ? 'text-stone-900' : 'text-stone-400'}`}>
                            {step.title}
                          </div>
                          <div className="text-[11px] text-stone-500">{step.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier Assistance */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-[11px] text-stone-600 flex items-center justify-between">
                <span>Need to update delivery address or reschedule?</span>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-900 hover:underline"
                >
                  Contact Rider via Concierge
                </a>
              </div>

            </div>
          ) : (
            <div className="text-center py-10 text-stone-400">
              <Clock className="w-10 h-10 mx-auto mb-2 text-stone-300" />
              <p className="text-xs">Enter your order ID or mobile number above to view real-time courier dispatch status.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
