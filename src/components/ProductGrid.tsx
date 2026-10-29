import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  currency: 'PKR' | 'USD';
  wishlistIds: Set<string>;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  selectedCategory: ProductCategory;
  searchQuery: string;
  onResetFilters: () => void;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  selectedCategory,
  searchQuery,
  onResetFilters,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured maintains default catalog order
  });

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Grid Controls Header: Results Count & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-stone-200">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            {selectedCategory === 'all'
              ? 'Featured Masterpieces'
              : selectedCategory === 'pret'
              ? 'Luxury Festive Pret'
              : selectedCategory === 'unstitched'
              ? 'Unstitched Embroidered Suits'
              : selectedCategory === 'jewelry'
              ? 'Heirloom Kundan & Polki Jewelry'
              : selectedCategory === 'shawls'
              ? 'Artisanal Velvet Shawls'
              : 'Handcrafted Khussa & Clutches'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Showing <span className="font-semibold text-stone-800 tabular-nums">{sortedProducts.length}</span> curated authentic designs
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="sort-select" className="text-xs text-stone-500 font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden min-[480px]:inline">Sort by:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs sm:text-sm font-medium bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800 transition-all cursor-pointer min-h-[38px]"
          >
            <option value="featured">Featured Collection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid: 1 col on <360px, 2 cols on 360px-639px, 3 cols on 640px-1023px, 4 cols on >=1024px */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-xl border border-dashed border-stone-300 max-w-lg mx-auto">
          <SlidersHorizontal className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="font-display text-lg font-semibold text-stone-800 mb-1">
            No matching items found
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mb-5">
            We couldn't find any items matching your selected criteria. Try clearing search keywords or switching categories.
          </p>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-amber-900 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};
