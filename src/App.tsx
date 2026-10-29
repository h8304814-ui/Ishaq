import React, { useState, useEffect } from 'react';
import { ProductCategory, Product, CartItem, Order } from './types';
import { PRODUCTS } from './data/products';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { ResponsiveTesterBar } from './components/ResponsiveTesterBar';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');

  // Cart State (hydrated from localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hs_collection_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (hydrated from localStorage)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('hs_collection_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set(['hs-01', 'hs-03']);
    } catch {
      return new Set(['hs-01', 'hs-03']);
    }
  });

  // Orders State
  const [recentOrders, setRecentOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('hs_collection_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Checkout discounts
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>('');

  // Simulated Device Screen Tester
  const [simulatedWidth, setSimulatedWidth] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hs_collection_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hs_collection_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hs_collection_orders', JSON.stringify(recentOrders));
    } catch {
      // ignore
    }
  }, [recentOrders]);

  // Cart actions
  const handleAddToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist actions
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  // Buy Now via Cash on Delivery
  const handleBuyNowCOD = (product: Product, size: string, color: string, quantity = 1) => {
    handleAddToCart(product, size, color, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Proceed to Checkout from cart
  const handleProceedToCheckout = (discount: number, coupon: string) => {
    setAppliedDiscount(discount);
    setCouponCode(coupon);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order Placement
  const handleOrderPlaced = (newOrder: Order) => {
    setRecentOrders((prev) => [...prev, newOrder]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));

  // Render website content
  const content = (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 overflow-x-hidden w-full relative">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Responsive Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        currency={currency}
        onToggleCurrency={() => setCurrency(currency === 'PKR' ? 'USD' : 'PKR')}
      />

      {/* 3. Hero Section (Shown when no search query is active) */}
      {!searchQuery && (
        <Hero
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const gridEl = document.getElementById('catalog-grid');
            gridEl?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* 4. Category Filter Navigation Bar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 5. Product Grid (Responsive columns: 1 on <360px, 2 on 360-639px, 3 on 640-1023px, 4 on >=1024px) */}
      <main id="catalog-grid" className="flex-1">
        <ProductGrid
          products={PRODUCTS}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
          onAddToCart={(product, size, color) => handleAddToCart(product, size, color, 1)}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onResetFilters={() => {
            setSelectedCategory('all');
            setSearchQuery('');
          }}
        />
      </main>

      {/* 6. Heritage Craftsmanship Section */}
      <CraftsmanshipSection />

      {/* 7. Footer */}
      <Footer />

      {/* Drawers and Modals */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        currency={currency}
        onToggleCurrency={() => setCurrency(currency === 'PKR' ? 'USD' : 'PKR')}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        currency={currency}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(product, size, color) => handleAddToCart(product, size, color, 1)}
        onOpenQuickView={setQuickViewProduct}
      />

      <ProductDetailModal
        product={quickViewProduct}
        currency={currency}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNowCOD={handleBuyNowCOD}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        discountAmount={appliedDiscount}
        couponCode={couponCode}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        currency={currency}
        onClose={() => setConfirmedOrder(null)}
      />

      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        recentOrders={recentOrders}
      />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-stone-900 flex flex-col items-center">
      {/* If simulating a specific mobile or tablet width */}
      {simulatedWidth ? (
        <div className="w-full min-h-screen flex flex-col items-center justify-start py-4 sm:py-8 bg-stone-900/90 overflow-x-auto">
          <div className="text-center text-xs text-amber-300 font-mono mb-3 bg-stone-950/80 px-4 py-1.5 rounded-full border border-stone-800 shadow-md">
            Viewport Simulation: <strong className="text-white">{simulatedWidth}</strong> · HS Collection Responsive View
          </div>
          <div
            className="bg-[#FAF8F5] shadow-2xl rounded-2xl overflow-hidden border-4 border-stone-700 transition-all duration-300"
            style={{ width: simulatedWidth, maxWidth: '100%' }}
          >
            {content}
          </div>
        </div>
      ) : (
        <div className="w-full">
          {content}
        </div>
      )}

      {/* Floating Responsive Viewport Tester */}
      <ResponsiveTesterBar
        currentSimulatedWidth={simulatedWidth}
        onSetSimulatedWidth={setSimulatedWidth}
      />
    </div>
  );
}
