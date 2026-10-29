import React from 'react';
import { Sparkles, Scissors, Gem, Feather } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const pillars = [
    {
      title: 'Zardozi & Tilla Handcraft',
      origin: 'Lahore & Multan Ateliers',
      description: 'Intricate metallic bullion wire, dabka, sitara, and resham needlework executed painstakingly by generational karigars.',
      icon: Scissors,
    },
    {
      title: 'Mughal Kundan Jadau',
      origin: 'Walled City Craftsmen',
      description: 'Hand-faceted glass polki gems set into 22-karat micro gold foil over sterling silver bases with vibrant reverse meenakari.',
      icon: Gem,
    },
    {
      title: 'Pure Organza & Raw Silks',
      origin: 'Historic Weaving Guilds',
      description: 'Natural breathable fibers woven to exceptional thread-counts, dyed in bespoke regal jewel tones and heirloom pastels.',
      icon: Feather,
    },
    {
      title: 'Bespoke Alteration & Stitching',
      origin: 'Master Tailoring Studios',
      description: 'Every peshwas, kurti, and trouser tailored with reinforced seams, pure mulmul linings, and custom measurements.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="bg-stone-100/70 border-t border-b border-stone-200/90 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800 mb-2">
            Heirloom Quality & Heritage
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight text-balance">
            The Art of Authentic Pakistani Craftsmanship
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
            At HS Collection, each garment and piece of jewelry is conceived as a living work of cultural heritage, bridging centuries of artisanal excellence with modern occasion silhouettes.
          </p>
        </div>

        {/* 4-Pillar Grid (1 col on mobile, 2 cols on tablet, 4 cols on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-900/10 text-amber-900 flex items-center justify-center mb-4">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800/80 mb-1">
                    {pillar.origin}
                  </div>
                  <h3 className="font-display text-base font-bold text-stone-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
