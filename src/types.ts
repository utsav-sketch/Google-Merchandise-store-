export type Brand = 'Google' | 'Google Cloud' | 'Android' | 'Gemini' | 'YouTube' | 'Chrome Dino';

export type Category = 'Apparel' | 'Bags & Accessories' | 'Lifestyle' | 'Collections' | 'Gifts';

export type Subcategory = 
  | 'T-Shirts' 
  | 'Hoodies' 
  | 'Jackets' 
  | 'Shirts' 
  | 'Bags' 
  | 'Caps' 
  | 'Socks' 
  | 'Keychains' 
  | 'Drinkware' 
  | 'Stationery' 
  | 'Home' 
  | 'Workspace' 
  | 'Collectibles';

export type BadgeType = 'NEW' | 'BEST SELLER' | 'DATA PICK' | 'ECO' | 'LIMITED' | 'SALE';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  category: Category;
  subcategory: Subcategory;
  priceUSD: number;
  compareAtPriceUSD?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badges: BadgeType[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
  isDataPick: boolean;
  isCampaignItem: boolean;
  description: string;
  features: string[];
  specifications: {
    material: string;
    fit?: string;
    dimensions?: string;
    care: string;
    origin?: string;
  };
  sustainabilityNote?: string;
  ga4Metrics?: {
    monthlyViews: number;
    conversionRate: number;
    purchases: number;
    funnelDropoffNote?: string;
    researchInsight?: string;
  };
}

export interface CartItem {
  id: string; // unique item instance id: `${productId}-${size}-${color}`
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export type Currency = 'USD' | 'INR';

export interface GA4Event {
  id: string;
  timestamp: string;
  event_name: 
    | 'page_view'
    | 'view_item'
    | 'add_to_cart'
    | 'remove_from_cart'
    | 'view_cart'
    | 'begin_checkout'
    | 'purchase'
    | 'search'
    | 'add_to_wishlist'
    | 'sign_up'
    | 'campaign_click'
    | 'filter_change';
  parameters: Record<string, unknown>;
}

export type SortOption = 'recommended' | 'popular' | 'newest' | 'price-asc' | 'price-desc';

export interface FilterState {
  category: Category | 'All';
  brand: Brand | 'All';
  priceRange: 'all' | 'under-25' | '25-50' | '50-100' | '100-plus';
  inStockOnly: boolean;
  newOnly: boolean;
  searchQuery: string;
  sortBy: SortOption;
}

export interface CustomerOrder {
  orderId: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'gpay' | 'card' | 'cod';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: Currency;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export interface ResearchRationaleItem {
  id: string;
  title: string;
  ga4Metric: string;
  finding: string;
  decision: string;
  implementation: string;
  measuredMetric: string;
  badge: string;
}
