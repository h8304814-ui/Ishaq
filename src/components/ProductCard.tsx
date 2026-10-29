import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  currency: 'PKR' | 'USD';
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [justAdded, setJustAdded] = useState(false);

  // Currency converter (approx PKR 278 = 1 USD)
  const formatPrice = (pkrPrice: number) => {
    if (currency === 'USD') {
      const usd = Math.round(pkrPrice / 278);
      return `$${usd}`;
    }
    return `Rs. ${pkrPrice.toLocaleString('en-PK')}`;
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0] || 'Default';
    onAddToCart(product, defaultSize, defaultColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      {/* Visual Image Container with fixed aspect ratio */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-stone-100 overflow-hidden">
        {imageLoaded ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageLoaded(false)}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-4 text-center">
            <span className="font-display text-sm font-semibold text-stone-700">{product.name}</span>
            <span className="text-xs text-stone-500 mt-1">{product.categoryLabel}</span>
          </div>
        )}

        {/* Status / Badge Kickers (Unboxed clean labels) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-stone-900/90 backdrop-blur-xs text-amber-300 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-amber-800/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm shadow-xs">
              New '26
            </span>
          )}
        </div>

        {/* Wishlist Button (Min 40x40px touch target on mobile) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/90 text-stone-700 hover:text-rose-600 hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover (desktop only) */}
        <div className="hidden lg:flex absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 hover:bg-white backdrop-blur-xs text-stone-900 text-xs font-semibold tracking-wider uppercase rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
        <div>
          {/* Category & Pieces */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="tracking-wider uppercase font-semibold text-amber-900/80">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-stone-600 font-medium">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="tabular-nums text-[11px]">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-display text-sm sm:text-base font-semibold text-stone-900 line-clamp-1 group-hover:text-amber-900 transition-colors">
            {product.name}
          </h3>

          {/* Fabric / Subtitle */}
          <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.fabric || product.subtitle}
          </p>

          {/* Available Sizes / Pieces count */}
          <div className="mt-2 text-[10px] sm:text-[11px] text-stone-500 flex items-center gap-1 flex-wrap">
            <span className="text-stone-400">Available:</span>
            <span className="font-medium text-stone-700 truncate">
              {product.sizes.slice(0, 3).join(', ')}
              {product.sizes.length > 3 ? ` +${product.sizes.length - 3}` : ''}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Price */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-bold text-sm sm:text-base text-stone-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] sm:text-xs text-stone-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart button (easy to hit on mobile) */}
          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to bag`}
            className={`w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 min-h-[38px] active:scale-95 ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-amber-900 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden min-[400px]:inline sm:hidden lg:inline">Add to Bag</span>
                <span className="min-[400px]:hidden sm:inline lg:hidden">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
