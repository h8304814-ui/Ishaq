import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Truck, ShieldCheck, Ruler, Check, Star, MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  currency: 'PKR' | 'USD';
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onBuyNowCOD: (product: Product, size: string, color: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onClose,
  onAddToCart,
  onBuyNowCOD,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Default');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const formatPrice = (pkrPrice: number) => {
    if (currency === 'USD') {
      const usd = Math.round(pkrPrice / 278);
      return `$${usd}`;
    }
    return `Rs. ${pkrPrice.toLocaleString('en-PK')}`;
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  const handleDirectBuy = () => {
    onBuyNowCOD(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-0 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog (Full screen on mobile <640px, rounded card on tablet/desktop) */}
      <div className="relative w-full max-w-4xl bg-white min-h-screen sm:min-h-0 sm:rounded-2xl shadow-2xl z-10 flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden">
        
        {/* Floating Close Button for Mobile & Desktop */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-white/90 sm:bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">
            
            {/* Left Column: Image Presentation */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <button
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-xs transition-transform active:scale-90"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>

            {/* Right Column: Details & Contiguous Purchase Module */}
            <div className="flex flex-col">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                <span className="font-semibold uppercase tracking-wider text-amber-900">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-stone-700">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold tabular-nums">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight text-balance">
                {product.name}
              </h2>

              {/* SKU & Availability */}
              <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                <span>SKU: {product.sku}</span>
                <span>·</span>
                <span className="text-emerald-700 font-medium">In Stock (Lahore Atelier)</span>
              </div>

              {/* Price Block */}
              <div className="my-4 p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-bold text-stone-950 tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-base text-stone-400 line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded ml-auto">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Fabric Specs Breakdown */}
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 text-xs space-y-1.5 mb-5">
                {product.fabric && (
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-medium">Fabric:</span>
                    <span className="text-stone-800 font-semibold text-right">{product.fabric}</span>
                  </div>
                )}
                {product.pieces && (
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-medium">Pieces:</span>
                    <span className="text-stone-800 font-semibold text-right">{product.pieces}</span>
                  </div>
                )}
                {product.embroidery && (
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-medium">Embellishment:</span>
                    <span className="text-stone-800 font-semibold text-right">{product.embroidery}</span>
                  </div>
                )}
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-stone-700 mb-2 flex items-center justify-between">
                    <span>Select Color / Shade:</span>
                    <span className="text-amber-900 font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-2 text-xs rounded-lg border font-medium transition-all ${
                          selectedColor === color
                            ? 'border-amber-900 bg-amber-900/10 text-amber-950 font-bold ring-1 ring-amber-900'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection & Size Guide */}
              {product.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                    <span>Select Size:</span>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-amber-800 hover:text-amber-900 flex items-center gap-1 font-medium underline"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{showSizeGuide ? 'Hide Measurements' : 'Size Guide (Inches)'}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-all min-h-[44px] flex items-center justify-center ${
                          selectedSize === size
                            ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Size Guide Accordion */}
                  {showSizeGuide && (
                    <div className="mt-3 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs animate-in fade-in">
                      <div className="font-semibold text-stone-800 mb-1.5">Standard Pakistani Sizing Chart (Inches):</div>
                      <div className="grid grid-cols-4 gap-2 text-center text-[11px] border-b border-stone-200 pb-1.5 font-bold text-stone-600">
                        <div>Size</div>
                        <div>Chest</div>
                        <div>Waist</div>
                        <div>Length</div>
                      </div>
                      <div className="divide-y divide-stone-200/60 text-stone-600 text-[11px]">
                        <div className="grid grid-cols-4 gap-2 text-center py-1">
                          <span className="font-semibold text-stone-900">XS</span>
                          <span>34"</span>
                          <span>28"</span>
                          <span>42"</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center py-1">
                          <span className="font-semibold text-stone-900">S</span>
                          <span>36"</span>
                          <span>30"</span>
                          <span>42"</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center py-1">
                          <span className="font-semibold text-stone-900">M</span>
                          <span>40"</span>
                          <span>34"</span>
                          <span>43"</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center py-1">
                          <span className="font-semibold text-stone-900">L</span>
                          <span>44"</span>
                          <span>38"</span>
                          <span>44"</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-2 italic">
                        *Need customized measurements or armhole alteration? Select "Custom Stitching" or contact our WhatsApp atelier.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-stone-600 hover:text-stone-900 font-bold active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-stone-600 hover:text-stone-900 font-bold active:scale-95"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons (Desktop & Tablet) */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAdd}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 min-h-[48px] active:scale-95 ${
                      addedAnimation
                        ? 'bg-emerald-700 text-white shadow-md'
                        : 'bg-stone-900 hover:bg-amber-900 text-white shadow-sm'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDirectBuy}
                    className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase bg-amber-600 hover:bg-amber-700 active:scale-95 text-white transition-all flex items-center justify-center gap-2 min-h-[48px] shadow-sm"
                  >
                    <span>Order via COD</span>
                  </button>
                </div>

                {/* WhatsApp Direct Inquiry */}
                <a
                  href={`https://wa.me/923001234567?text=Hi%20HS%20Collection,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}%20(SKU:%20${product.sku})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Inquire with Fashion Consultant on WhatsApp</span>
                </a>
              </div>

              {/* Delivery & Assurance Highlights */}
              <div className="mt-6 pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span>3-5 Days Delivery across Pakistan via TCS Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span>100% Original Brand Guarantee & Lahore Handcrafted Embroidery</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
