import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product, CartItem, WishlistItem, Currency, GA4Event, FilterState, CustomerOrder, Brand, Category } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  products: Product[];
  currentView: string;
  setCurrentView: (view: string, productId?: string) => void;
  selectedProductId: string | null;
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalUSD: number;
  cartTotalUSD: number;
  discountAmountUSD: number;
  shippingFeeUSD: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceUSD: number) => string;

  // Filters & Catalog
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  setFilterCategory: (category: Category | 'All') => void;
  setFilterBrand: (brand: Brand | 'All') => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  executeSearch: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
  ga4Events: GA4Event[];
  trackGA4Event: (eventName: GA4Event['event_name'], parameters?: Record<string, unknown>) => void;
  isGA4HubOpen: boolean;
  setIsGA4HubOpen: (open: boolean) => void;
  clearGA4Events: () => void;

  // Checkout & Orders
  latestOrder: CustomerOrder | null;
  lastOrder: CustomerOrder | null;
  placeOrder: (customer: CustomerOrder['customer'], deliveryMethod: 'standard' | 'express', paymentMethod: 'gpay' | 'card' | 'cod') => CustomerOrder;

  // Recently Viewed
  recentlyViewed: Product[];

  // Announcement
  announcementText: string;
  setAnnouncementText: (text: string) => void;
  showAnnouncement: boolean;
  setShowAnnouncement: (show: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const USD_TO_INR_RATE = 83;
const FREE_SHIPPING_THRESHOLD_USD = 60;

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentViewState] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isGA4HubOpen, setIsGA4HubOpen] = useState<boolean>(false);
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [announcementText, setAnnouncementText] = useState<string>(
    'Free worldwide shipping on orders over $60 | Discover the all-new 750ml Vacuum Insulated Tumbler Collection'
  );
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(true);

  // Cart state persisted
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gms_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('gms_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed product IDs
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gms_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // GA4 Events stream
  const [ga4Events, setGa4Events] = useState<GA4Event[]>(() => {
    return [
      {
        id: `ga4-init-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        event_name: 'page_view',
        parameters: {
          page_location: window.location.href,
          page_title: 'Google Merchandise Store — Home',
          page_path: '/',
          user_agent_category: window.innerWidth < 768 ? 'mobile' : 'desktop',
        },
      },
    ];
  });

  const [latestOrder, setLatestOrder] = useState<CustomerOrder | null>(() => {
    try {
      const saved = localStorage.getItem('gms_latest_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Catalog Filters
  const initialFilters: FilterState = {
    category: 'All',
    brand: 'All',
    priceRange: 'all',
    inStockOnly: false,
    newOnly: false,
    searchQuery: '',
    sortBy: 'recommended',
  };
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('gms_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('gms_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Persist Recently Viewed
  useEffect(() => {
    try {
      localStorage.setItem('gms_recent', JSON.stringify(recentlyViewedIds));
    } catch {
      // ignore
    }
  }, [recentlyViewedIds]);

  // Track GA4 Event
  const trackGA4Event = useCallback((eventName: GA4Event['event_name'], parameters: Record<string, unknown> = {}) => {
    const newEvent: GA4Event = {
      id: `ga4-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString(),
      event_name: eventName,
      parameters: {
        ...parameters,
        currency,
        timestamp_ms: Date.now(),
      },
    };

    setGa4Events((prev) => [newEvent, ...prev.slice(0, 49)]); // keep latest 50 events

    // Also push to standard dataLayer if browser supports it
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ecommerce: parameters,
      });
    }

    // Log cleanly in dev console
    // eslint-disable-next-line no-console
    console.log(`%c[GA4] ${eventName}`, 'color: #1a73e8; font-weight: bold; background: #e8f0fe; padding: 2px 6px; border-radius: 4px;', parameters);
  }, [currency]);

  // Navigation router
  const setCurrentView = useCallback((view: string, productId?: string) => {
    setCurrentViewState(view);
    if (productId) {
      setSelectedProductId(productId);
      // Track recently viewed
      setRecentlyViewedIds((prev) => {
        const filtered = prev.filter((id) => id !== productId);
        return [productId, ...filtered].slice(0, 8);
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track GA4 Page View
    trackGA4Event('page_view', {
      page_path: `/${view}${productId ? `/${productId}` : ''}`,
      page_title: `Google Merch Shop — ${view.toUpperCase()}`,
      page_location: `${window.location.origin}/#/${view}${productId ? `/${productId}` : ''}`,
    });
  }, [trackGA4Event]);

  // Selected product lookup
  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return PRODUCTS.find((p) => p.id === selectedProductId || p.slug === selectedProductId) || null;
  }, [selectedProductId]);

  // Currency Formatter
  const formatPrice = useCallback((priceUSD: number): string => {
    if (currency === 'INR') {
      const inrValue = Math.round(priceUSD * USD_TO_INR_RATE);
      return `₹${inrValue.toLocaleString('en-IN')}`;
    }
    return `$${priceUSD.toFixed(2)}`;
  }, [currency]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    trackGA4Event('filter_change', { filter_type: 'currency', currency_value: c });
  };

  // Add To Cart
  const addToCart = useCallback((product: Product, size?: string, color?: string, quantity: number = 1) => {
    const chosenSize = size || product.sizes[0] || 'One Size';
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const instanceId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === instanceId);
      if (existing) {
        return prev.map((item) =>
          item.id === instanceId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: instanceId,
          product,
          size: chosenSize,
          color: chosenColor,
          quantity,
        },
      ];
    });

    // GA4 add_to_cart schema
    trackGA4Event('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      item_brand: product.brand,
      item_category: product.category,
      price: product.priceUSD,
      quantity,
      size: chosenSize,
      color: chosenColor,
      value: product.priceUSD * quantity,
    });

    setIsCartOpen(true);
  }, [trackGA4Event]);

  // Remove From Cart
  const removeFromCart = useCallback((itemId: string) => {
    const item = cart.find((i) => i.id === itemId);
    if (item) {
      trackGA4Event('remove_from_cart', {
        item_id: item.product.id,
        item_name: item.product.name,
        quantity: item.quantity,
        value: item.product.priceUSD * item.quantity,
      });
    }
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  }, [cart, trackGA4Event]);

  // Update Quantity
  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Wishlist Toggle
  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.productId === product.id);
      if (exists) {
        return prev.filter((w) => w.productId !== product.id);
      }
      trackGA4Event('add_to_wishlist', {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_brand: product.brand,
        price: product.priceUSD,
      });
      return [
        ...prev,
        {
          productId: product.id,
          product,
          addedAt: new Date().toISOString(),
        },
      ];
    });
  }, [trackGA4Event]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some((w) => w.productId === productId);
  }, [wishlist]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  // Promo Code
  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'GOOGLE10' || normalized === 'SAVE10' || normalized === 'MERCH10') {
      setAppliedPromo(normalized);
      trackGA4Event('filter_change', { promo_code: normalized, status: 'applied' });
      return { success: true, message: '10% discount applied to order!' };
    }
    if (normalized === 'FREESHIP') {
      setAppliedPromo(normalized);
      return { success: true, message: 'Free express shipping activated!' };
    }
    return { success: false, message: 'Invalid promo code. Try "GOOGLE10"' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotalUSD = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  }, [cart]);

  const discountAmountUSD = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo === 'GOOGLE10' || appliedPromo === 'SAVE10' || appliedPromo === 'MERCH10') {
      return cartSubtotalUSD * 0.1;
    }
    return 0;
  }, [appliedPromo, cartSubtotalUSD]);

  const shippingFeeUSD = useMemo(() => {
    if (cartSubtotalUSD === 0) return 0;
    if (appliedPromo === 'FREESHIP') return 0;
    if (cartSubtotalUSD >= FREE_SHIPPING_THRESHOLD_USD) return 0;
    return 6.0;
  }, [cartSubtotalUSD, appliedPromo]);

  const cartTotalUSD = useMemo(() => {
    return Math.max(0, cartSubtotalUSD - discountAmountUSD + shippingFeeUSD);
  }, [cartSubtotalUSD, discountAmountUSD, shippingFeeUSD]);

  // Filter setters
  const resetFilters = () => {
    setFilters(initialFilters);
    trackGA4Event('filter_change', { filter_action: 'reset_all' });
  };

  const setFilterCategory = (category: Category | 'All') => {
    setFilters((prev) => ({ ...prev, category }));
    setCurrentView('shop');
    trackGA4Event('filter_change', { filter_type: 'category', value: category });
  };

  const setFilterBrand = (brand: Brand | 'All') => {
    setFilters((prev) => ({ ...prev, brand }));
    setCurrentView('shop');
    trackGA4Event('filter_change', { filter_type: 'brand', value: brand });
  };

  const executeSearch = (q: string) => {
    const trimmed = q.trim();
    setSearchQuery(trimmed);
    setFilters((prev) => ({ ...prev, searchQuery: trimmed }));
    setCurrentView('search');

    const matchedCount = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(trimmed.toLowerCase()) ||
      p.brand.toLowerCase().includes(trimmed.toLowerCase()) ||
      p.category.toLowerCase().includes(trimmed.toLowerCase()) ||
      p.description.toLowerCase().includes(trimmed.toLowerCase())
    ).length;

    trackGA4Event('search', {
      search_term: trimmed,
      results_count: matchedCount,
    });
  };

  // Place Order (Demo)
  const placeOrder = (
    customer: CustomerOrder['customer'],
    deliveryMethod: 'standard' | 'express',
    paymentMethod: 'gpay' | 'card' | 'cod'
  ): CustomerOrder => {
    const orderId = `GMS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const shippingCost = deliveryMethod === 'express' ? 12 : shippingFeeUSD;
    const finalTotal = cartSubtotalUSD - discountAmountUSD + shippingCost;

    const deliveryDays = deliveryMethod === 'express' ? 2 : 5;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const order: CustomerOrder = {
      orderId,
      date: new Date().toISOString(),
      customer,
      deliveryMethod,
      paymentMethod,
      items: [...cart],
      subtotal: cartSubtotalUSD,
      discount: discountAmountUSD,
      shipping: shippingCost,
      total: finalTotal,
      currency,
      status: 'Confirmed',
      estimatedDelivery,
    };

    setLatestOrder(order);
    try {
      localStorage.setItem('gms_latest_order', JSON.stringify(order));
    } catch {
      // ignore
    }

    // GA4 Purchase Event
    trackGA4Event('purchase', {
      transaction_id: orderId,
      value: finalTotal,
      tax: 0,
      shipping: shippingCost,
      coupon: appliedPromo || 'NONE',
      payment_type: paymentMethod,
      items: cart.map((i) => ({
        item_id: i.product.id,
        item_name: i.product.name,
        item_category: i.product.category,
        item_brand: i.product.brand,
        price: i.product.priceUSD,
        quantity: i.quantity,
        size: i.size,
      })),
    });

    clearCart();
    setCurrentView('order-confirmation');
    return order;
  };

  // Recently viewed products
  const recentlyViewed = useMemo(() => {
    return recentlyViewedIds
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  }, [recentlyViewedIds]);

  const clearGA4Events = () => {
    setGa4Events([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        currentView,
        setCurrentView,
        selectedProductId,
        selectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotalUSD,
        cartTotalUSD,
        discountAmountUSD,
        shippingFeeUSD,
        isCartOpen,
        setIsCartOpen,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        searchQuery,
        setSearchQuery,
        executeSearch,
        isSearchOpen,
        setIsSearchOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
        currency,
        setCurrency,
        formatPrice,
        filters,
        setFilters,
        resetFilters,
        setFilterCategory,
        setFilterBrand,
        ga4Events,
        trackGA4Event,
        isGA4HubOpen,
        setIsGA4HubOpen,
        clearGA4Events,
        latestOrder,
        lastOrder: latestOrder,
        placeOrder,
        recentlyViewed,
        announcementText,
        setAnnouncementText,
        showAnnouncement,
        setShowAnnouncement,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
