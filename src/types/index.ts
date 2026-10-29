export type ProductCategory = 
  | 'all'
  | 'pret'
  | 'unstitched'
  | 'jewelry'
  | 'accessories'
  | 'shawls';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  subtitle: string;
  price: number; // in PKR
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  description: string;
  fabric?: string;
  pieces?: string;
  embroidery?: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode?: string;
  paymentMethod: 'cod' | 'card' | 'bank_transfer';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  date: string;
}
