import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, PackageCheck, Phone } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenMobileMenu: () => void;
  onOpenOrderTracking: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  currency: 'PKR' | 'USD';
  onToggleCurrency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenMobileMenu,
  onOpenOrderTracking,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  currency,
  onToggleCurrency,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navItems: { label: string; category: ProductCategory }[] = [
    { label: 'All Collections', category: 'all' },
    { label: 'Luxury Pret', category: 'pret' },
    { label: 'Unstitched Lawn', category: 'unstitched' },
    { label: 'Kundan Jewelry', category: 'jewelry' },
    { label: 'Velvet Shawls', category: 'shawls' },
    { label: 'Footwear & Bags', category: 'accessories' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-shadow duration-200 shadow-xs">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 md:gap-8">
          
          {/* Zone 1: Mobile Hamburger & Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Hamburger Toggle (minimum 44px tap target) */}
            <button
              onClick={onOpenMobileMenu}
              aria-label="Open navigation menu"
              className="md:hidden flex items-center justify-center w-11 h-11 -ml-2 text-stone-800 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-amber-800"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Brand Title (Wordmark in display face) */}
            <button
              onClick={() => onSelectCategory('all')}
              className="text-left flex flex-col focus:outline-none group"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display text-lg min-[360px]:text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold tracking-[0.18em] sm:tracking-[0.22em] text-[#1C1917] group-hover:text-amber-900 transition-colors uppercase whitespace-nowrap">
                  HS Collection
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 hidden sm:inline-block mb-1"></span>
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-stone-500 font-medium whitespace-nowrap -mt-0.5 sm:-mt-1 hidden min-[375px]:block">
                Pakistani Fashion & Accessories
              </span>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-medium text-stone-700">
            {navItems.map((item) => {
              const isActive = selectedCategory === item.category;
              return (
                <button
                  key={item.category}
                  onClick={() => onSelectCategory(item.category)}
                  className={`relative py-1 whitespace-nowrap transition-colors hover:text-amber-900 ${
                    isActive ? 'text-amber-900 font-semibold' : 'text-stone-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-800 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Currency Toggle (PKR / USD) */}
            <button
              onClick={onToggleCurrency}
              title={`Switch currency to ${currency === 'PKR' ? 'USD' : 'PKR'}`}
              className="hidden sm:inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold rounded-md border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors whitespace-nowrap"
            >
              <span className="text-stone-400 mr-1 text-[10px]">CURRENCY:</span>
              <span className="text-amber-900">{currency}</span>
            </button>

            {/* Desktop Track Order Link */}
            <button
              onClick={onOpenOrderTracking}
              title="Track your order status"
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
            >
              <PackageCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>Track Order</span>
            </button>

            {/* Search Button Toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              aria-label="Toggle search input"
              className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors ${
                showSearchInput ? 'bg-stone-100 text-amber-900' : ''
              }`}
            >
              {showSearchInput ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button (Cart trigger) */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-900 text-white hover:bg-amber-900 transition-colors shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[11px] font-bold text-stone-900 bg-amber-300 rounded-full tabular-nums shadow-sm border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar (Mobile & Desktop) */}
        {showSearchInput && (
          <div className="py-2.5 pb-3 border-t border-stone-200 animate-in fade-in duration-150">
            <div className="relative max-w-2xl mx-auto flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search raw silk kurti, unstitched lawn, kundan jewelry, khussas..."
                className="w-full pl-10 pr-10 py-2.5 text-sm sm:text-base bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800 transition-all"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="absolute right-3 p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-center text-xs text-stone-500 mt-1.5">
                Filtering catalog results for "{searchQuery}"
              </p>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
