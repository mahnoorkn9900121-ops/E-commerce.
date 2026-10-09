export type Department = 'apparel' | 'leather' | 'audio' | 'living';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  department: Department;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  description: string;
  story: string;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  specifications: ProductSpec[];
  origin: string;
  materials: string;
  dimensions?: string;
  care: string;
  reviews: ProductReview[];
}

export interface CartItem {
  cartItemId: string; // unique: productId + color + size
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size?: string;
  quantity: number;
  maxStock: number;
  category: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: Currency;
  shippingMethod: string;
  status: 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  customer: CustomerDetails;
  trackingNumber: string;
  estimatedDelivery: string;
  paymentMethod: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface FilterState {
  department: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
}
