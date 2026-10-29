import React from 'react';
import { X, Sparkles, PackageCheck, Phone, ChevronRight, MessageCircle } from 'lucide-react';
import { ProductCategory } from '../types';
import { CATEGORIES } from '../data/products';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  currency: 'PKR' | 'USD';
  onToggleCurrency: () => void;
  onOpenOrderTracking: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  currency,
  onToggleCurrency,
  onOpenOrderTracking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container (fits 320px smoothly with max-w-[85vw] or 320px) */}
      <div className="relative w-full max-w-[320px] bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50">
          <div>
            <div className="font-display text-lg font-bold tracking-widest text-[#1C1917]">
              HS COLLECTION
            </div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500">
              Pakistani Fashion & Accessories
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-stone-400 px-3 py-1">
            Shop By Collection
          </div>

          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id as ProductCategory);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors text-left ${
                  isActive
                    ? 'bg-amber-900/10 text-amber-950 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100 font-medium'
                }`}
              >
                <span>{cat.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400 tabular-nums font-normal">
                    {cat.count}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </div>
              </button>
            );
          })}

          <div className="pt-4 border-t border-stone-200 my-4 space-y-2">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-stone-400 px-3 py-1">
              Customer Services
            </div>

            {/* Track Order */}
            <button
              onClick={() => {
                onOpenOrderTracking();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-700 hover:bg-stone-100 transition-colors text-left"
            >
              <PackageCheck className="w-4 h-4 text-amber-800" />
              <span>Track Your Order</span>
            </button>

            {/* Currency Switcher */}
            <div className="flex items-center justify-between px-3 py-2 text-sm text-stone-700">
              <span className="text-stone-600">Store Currency</span>
              <button
                onClick={onToggleCurrency}
                className="px-3 py-1 text-xs font-semibold rounded-md border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800"
              >
                {currency} ({currency === 'PKR' ? 'Pakistani Rupee' : 'US Dollar'})
              </button>
            </div>

            {/* WhatsApp Concierge */}
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="font-semibold block text-xs">WhatsApp Concierge</span>
                <span className="text-[11px] text-emerald-700">+92 300 1234567</span>
              </div>
            </a>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 text-[11px] text-stone-500 space-y-1">
          <div className="flex items-center gap-1.5 text-stone-700 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Lahore Atelier · Karachi Flagship</span>
          </div>
          <p className="text-stone-400 text-[10px]">
            Cash on Delivery across Pakistan · Worldwide DHL
          </p>
        </div>
      </div>
    </div>
  );
};
