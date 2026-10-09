import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, CartItem, Order, CustomerDetails, Currency, ToastNotification } from '../types';
import { PRODUCTS, CURRENCY_RATES } from '../data/products';

interface ShopContextType {
  // Navigation
  page: string;
  params: Record<string, string>;
  navigate: (page: string, params?: Record<string, string>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, colorName: string, sizeName?: string, quantity?: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shippingAmount: number;
  taxAmount: number;
  total: number;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently viewed
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (customer: CustomerDetails, shippingMethod: string, paymentMethod: string) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;

  // Quick view & Search
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastNotification[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const PROMO_CODES: Record<string, number> = {
  VALOIR10: 10,
  LUXE20: 20,
  ATELIER15: 15,
  WELCOME: 10
};

// Default mock initial orders for rich account demo experience
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'VAL-78219',
    date: '3 days ago',
    items: [
      {
        cartItemId: 'val-02-Cognac-Leather',
        productId: 'val-02',
        name: 'Palermo Automatic Chronograph',
        price: 2450,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
        color: 'Cognac Leather',
        quantity: 1,
        maxStock: 7,
        category: 'Horology'
      }
    ],
    subtotal: 2450,
    discount: 245,
    shipping: 0,
    tax: 176.4,
    total: 2381.4,
    currency: 'USD',
    shippingMethod: 'Express White-Glove Air',
    status: 'In Transit',
    customer: {
      firstName: 'Alexander',
      lastName: 'Hale',
      email: 'a.hale@residence.com',
      phone: '+1 (555) 234-8971',
      address: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'United States'
    },
    trackingNumber: 'DHL-EX-883920194',
    estimatedDelivery: 'Tomorrow, Oct 11',
    paymentMethod: 'American Express ending in 4092'
  }
];

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation state
  const [page, setPage] = useState<string>('home');
  const [params, setParams] = useState<Record<string, string>>({});

  // Currency
  const [currency, setCurrencyState] = useState<Currency>('USD');

  // Modals & drawers
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Cart & checkout
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['val-01', 'val-06']);

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(['val-01', 'val-03']);

  // Orders
  const [orders, setOrders] = useState<Order[]>(INITIAL_DEMO_ORDERS);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Initial load from LocalStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('valoir_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem('valoir_wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedRecent = localStorage.getItem('valoir_recently_viewed');
      if (storedRecent) setRecentlyViewed(JSON.parse(storedRecent));

      const storedOrders = localStorage.getItem('valoir_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedCurrency = localStorage.getItem('valoir_currency');
      if (storedCurrency && ['USD', 'EUR', 'GBP', 'JPY'].includes(storedCurrency)) {
        setCurrencyState(storedCurrency as Currency);
      }

      // Check URL hash for direct links (e.g. #shop?category=outerwear or #product?id=val-01)
      const parseHash = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          const [hashPage, query] = hash.split('?');
          const newParams: Record<string, string> = {};
          if (query) {
            new URLSearchParams(query).forEach((v, k) => {
              newParams[k] = v;
            });
          }
          if (hashPage) {
            setPage(hashPage);
            setParams(newParams);
          }
        }
      };

      parseHash();
      window.addEventListener('hashchange', parseHash);
      return () => window.removeEventListener('hashchange', parseHash);
    } catch (e) {
      console.warn('LocalStorage access warning:', e);
    }
  }, []);

  // Save to LocalStorage
  const saveCart = (items: CartItem[]) => {
    setCart(items);
    try {
      localStorage.setItem('valoir_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const saveWishlist = (items: string[]) => {
    setWishlist(items);
    try {
      localStorage.setItem('valoir_wishlist', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const saveRecent = (items: string[]) => {
    setRecentlyViewed(items);
    try {
      localStorage.setItem('valoir_recently_viewed', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const saveOrders = (items: Order[]) => {
    setOrders(items);
    try {
      localStorage.setItem('valoir_orders', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('valoir_currency', c);
    } catch (e) {
      console.error(e);
    }
  };

  // Toast Notification
  const showToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    const newToast: ToastNotification = { id, title, message, type };
    setToasts(prev => [...prev.slice(-3), newToast]); // keep max 4 toasts
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigate function that syncs hash and scrolls to top
  const navigate = useCallback((targetPage: string, targetParams: Record<string, string> = {}) => {
    setPage(targetPage);
    setParams(targetParams);
    const queryString = new URLSearchParams(targetParams).toString();
    const hash = targetPage + (queryString ? `?${queryString}` : '');
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Add to Cart
  const addToCart = (product: Product, colorName: string, sizeName?: string, quantity: number = 1) => {
    const cartItemId = `${product.id}-${colorName}${sizeName ? `-${sizeName}` : ''}`;
    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      const newQty = Math.min(product.stock, updatedCart[existingIndex].quantity + quantity);
      updatedCart[existingIndex].quantity = newQty;
    } else {
      const selectedColorObj = product.colors.find(c => c.name === colorName);
      const imgIdx = selectedColorObj?.imageIndex ?? 0;
      const img = product.images[imgIdx] || product.images[0];

      const newItem: CartItem = {
        cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: img,
        color: colorName,
        size: sizeName,
        quantity,
        maxStock: product.stock,
        category: product.category
      };
      updatedCart = [newItem, ...cart];
    }

    saveCart(updatedCart);
    showToast('Added to Cart', `${product.name} (${colorName}${sizeName ? `, ${sizeName}` : ''})`, 'success');
    setCartDrawerOpen(true);
  };

  // Update Cart Quantity
  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const updated = cart.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: Math.min(item.maxStock, quantity) };
      }
      return item;
    });
    saveCart(updated);
  };

  // Remove Cart Item
  const removeFromCart = (cartItemId: string) => {
    const item = cart.find(i => i.cartItemId === cartItemId);
    const updated = cart.filter(i => i.cartItemId !== cartItemId);
    saveCart(updated);
    if (item) {
      showToast('Item Removed', `${item.name} removed from your bag.`, 'info');
    }
  };

  // Clear Cart
  const clearCart = () => {
    saveCart([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  // Promo Code
  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      const pct = PROMO_CODES[clean];
      setPromoCode(clean);
      setDiscountPercent(pct);
      showToast('Promo Code Applied', `${clean} applied for ${pct}% off your order.`, 'success');
      return { success: true, message: `${pct}% discount applied!` };
    }
    showToast('Invalid Code', 'Please enter a valid promotional code (try VALOIR10 or LUXE20).', 'warning');
    return { success: false, message: 'Invalid or expired promo code.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    showToast('Promo Removed', 'Promotional code has been removed.', 'info');
  };

  // Wishlist Toggle
  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    const productName = product?.name || 'Item';

    if (wishlist.includes(productId)) {
      const updated = wishlist.filter(id => id !== productId);
      saveWishlist(updated);
      showToast('Removed from Wishlist', `${productName} removed from saved items.`, 'info');
    } else {
      const updated = [...wishlist, productId];
      saveWishlist(updated);
      showToast('Saved to Wishlist', `${productName} added to your wishlist.`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Recently Viewed
  const addRecentlyViewed = (productId: string) => {
    const filtered = recentlyViewed.filter(id => id !== productId);
    const updated = [productId, ...filtered].slice(0, 8);
    saveRecent(updated);
  };

  // Price calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const afterDiscount = subtotal - discountAmount;
  const shippingAmount = afterDiscount >= 250 || afterDiscount === 0 ? 0 : 25;
  const taxAmount = Math.round(afterDiscount * 0.08 * 100) / 100;
  const total = Math.max(0, afterDiscount + shippingAmount + taxAmount);

  // Format Price in Active Currency
  const formatPrice = (amountInUSD: number) => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = amountInUSD * rateInfo.rate;
    if (currency === 'JPY') {
      return `${rateInfo.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${rateInfo.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Place Order Simulation
  const placeOrder = (customer: CustomerDetails, shippingMethod: string, paymentMethod: string): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `VAL-${randomSuffix}`,
      date: 'Just now',
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: shippingAmount,
      tax: taxAmount,
      total,
      currency,
      shippingMethod,
      status: 'Processing',
      customer,
      trackingNumber: `DHL-EX-${Math.floor(100000000 + Math.random() * 900000000)}`,
      estimatedDelivery: '3–4 business days via Express Courier',
      paymentMethod
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    setCurrentOrder(newOrder);
    clearCart();
    showToast('Order Placed!', `Your order ${newOrder.id} has been confirmed.`, 'success');
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  return (
    <ShopContext.Provider
      value={{
        page,
        params,
        navigate,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        discountPercent,
        promoCode,
        applyPromoCode,
        removePromoCode,
        shippingAmount,
        taxAmount,
        total,
        cartDrawerOpen,
        setCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        addRecentlyViewed,
        orders,
        currentOrder,
        placeOrder,
        getOrderById,
        currency,
        setCurrency,
        formatPrice,
        quickViewProduct,
        setQuickViewProduct,
        searchModalOpen,
        setSearchModalOpen,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
