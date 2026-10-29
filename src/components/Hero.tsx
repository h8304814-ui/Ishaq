import React from 'react';
import { ArrowRight, Sparkles, Shield, Award, Truck } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory }) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Hero Banner with Measured Scrim */}
      <div className="relative min-h-[460px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px] flex items-center">
        <img
          src="/src/assets/images/hs_hero_couture_1793217657476.jpg"
          alt="HS Collection Luxury Festive Couture Editorial"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-[center_28%] scale-100 transition-transform duration-700 ease-out"
        />
        
        {/* Measured Contrast Scrims for text legibility across all screen sizes */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-900/40 md:bg-gradient-to-r md:from-stone-950/90 md:via-stone-950/60 md:to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 w-full">
          <div className="max-w-xl lg:max-w-2xl">
            
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="h-px w-6 sm:w-10 bg-amber-400"></span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-amber-300 uppercase">
                Festive Luxury '26 Collection
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-3 sm:mb-5 text-balance">
              The Heritage of <br className="hidden sm:inline" />
              <span className="italic font-normal text-amber-200">Pakistani Couture</span> & Handcrafted Adornments
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-stone-200 leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Explore exquisite embroidered raw silks, three-piece unstitched lawn, heirloom Kundan bridal jewelry, and artisanal velvet khussas handcrafted by Lahore and Karachi master artisans.
            </p>

            {/* Action Buttons (Touch-friendly 44px+ height on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onSelectCategory('pret')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-500 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-lg shadow-lg hover:shadow-amber-900/20 transition-all min-h-[46px]"
              >
                <span>Shop Festive Pret</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectCategory('jewelry')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white backdrop-blur-md border border-white/30 font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-all min-h-[46px]"
              >
                <span>Explore Kundan Jewelry</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Strip (Mobile-first responsive 1 to 4 cols) */}
      <div className="bg-[#141210] border-t border-stone-800/80 py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-stone-300">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-950/60 border border-amber-800/40 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-stone-100 truncate">Nationwide COD</div>
              <div className="text-[10px] text-stone-400 truncate">Delivery via TCS & Leopards</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-950/60 border border-amber-800/40 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-stone-100 truncate">100% Pure Fabrics</div>
              <div className="text-[10px] text-stone-400 truncate">Pure Raw Silk, Lawn & Organza</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-950/60 border border-amber-800/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-stone-100 truncate">Custom Stitching</div>
              <div className="text-[10px] text-stone-400 truncate">Made to your exact measurements</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-950/60 border border-amber-800/40 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-stone-100 truncate">Worldwide Shipping</div>
              <div className="text-[10px] text-stone-400 truncate">USA, UK, UAE & Canada via DHL</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
