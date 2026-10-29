import React, { useState } from 'react';
import { Sparkles, X, Truck, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1C1917] text-[#E7E5E4] text-[11px] sm:text-xs py-2 px-3 sm:px-6 relative border-b border-[#292524] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left Trust Indicator (hidden on tiny screens) */}
        <div className="hidden md:flex items-center gap-1.5 text-amber-200/90 shrink-0 font-medium tracking-wide">
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          <span>Cash on Delivery across Pakistan</span>
        </div>

        {/* Center Campaign Highlight */}
        <div className="flex-1 text-center truncate px-2 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0 inline" />
            <span className="text-amber-300 font-semibold">Festive Pret '26 Collection:</span>
            <span className="text-stone-300 hidden min-[480px]:inline">Free Express Delivery on orders over Rs. 5,000</span>
            <span className="text-stone-300 min-[480px]:hidden">Free Express Delivery &gt; Rs. 5,000</span>
          </span>
        </div>

        {/* Right International Note & Dismiss */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-stone-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Worldwide DHL Shipping</span>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-stone-100 p-1 -mr-1 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
