import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: 'PKR' | 'USD';
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenQuickView,
}) => {
  if (!isOpen) return null;

  const formatPrice = (pkrPrice: number) => {
    if (currency === 'USD') {
      const usd = Math.round(pkrPrice / 278);
      return `$${usd}`;
    }
    return `Rs. ${pkrPrice.toLocaleString('en-PK')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container (w-full on mobile, max-w-md on tablet/desktop) */}
      <div className="relative w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 className="font-display text-lg font-bold text-stone-900 tracking-tight">
              Saved Wishlist
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 tabular-nums">
              {wishlistProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-3 text-rose-400">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-display text-base font-semibold text-stone-800 mb-1">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                Save your favorite festive luxury pret, bridal Kundan jewelry, and handmade khussas to review later.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-amber-900 transition-colors"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="pt-4 first:pt-0 flex gap-3.5">
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    onOpenQuickView(product);
                    onClose();
                  }}
                  className="w-20 h-24 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => {
                          onOpenQuickView(product);
                          onClose();
                        }}
                        className="font-display text-xs sm:text-sm font-semibold text-stone-900 truncate hover:text-amber-900 cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        aria-label="Remove item"
                        className="text-stone-400 hover:text-rose-600 p-1 -mr-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {product.categoryLabel}
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-stone-900 mt-1 tabular-nums">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  {/* Add to Bag button */}
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        onAddToCart(product, product.sizes[0] || 'Standard', product.colors[0] || 'Default');
                      }}
                      className="w-full py-2 px-3 bg-stone-900 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors active:scale-95 min-h-[38px]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
