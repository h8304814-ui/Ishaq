import React from 'react';
import { ProductCategory } from '../types';
import { CATEGORIES } from '../data/products';

interface CategoryNavProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  activeFilterCount?: number;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full bg-[#FAF8F5] border-b border-stone-200/80 sticky top-16 sm:top-20 z-30 py-3 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Scrollable Container on Mobile, Centered on Desktop */}
        <div className="w-full overflow-x-auto no-scrollbar flex items-center gap-1.5 sm:gap-2 pb-1 sm:pb-0 scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className={`whitespace-nowrap shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[38px] flex items-center gap-1.5 active:scale-95 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm font-semibold'
                    : 'bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
