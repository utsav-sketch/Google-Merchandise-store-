import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  BarChart3, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Category, Brand } from '../types';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlistCount,
    setIsCartOpen,
    currency,
    setCurrency,
    setFilterCategory,
    setFilterBrand,
    setIsGA4HubOpen,
    executeSearch,
    announcementText,
    showAnnouncement,
    setShowAnnouncement,
    trackGA4Event,
  } = useShop();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<boolean>(false);
  const [activeMegaTab, setActiveMegaTab] = useState<'shop' | 'brands' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [navSearchInput, setNavSearchInput] = useState<string>('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);
  const [searchSuggestions] = useState<string[]>([
    'Google T-Shirt',
    'Chrome Dino Crewneck',
    'Gemini Windbreaker',
    'Google Cloud Backpack',
    'YouTube Tumbler',
    'Desk Mat',
    'Eco Hoodie',
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterMega = (tab: 'shop' | 'brands') => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaTab(tab);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveMega = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
      setActiveMegaTab(null);
    }, 180);
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchInput.trim()) {
      executeSearch(navSearchInput.trim());
      setIsSearchOpen(false);
      setNavSearchInput('');
    }
  };

  const handleCategoryClick = (category: Category) => {
    setFilterCategory(category);
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleBrandClick = (brand: Brand) => {
    setFilterBrand(brand);
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all">
      {/* Top Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-neutral-900 text-white text-xs py-2 px-4 relative flex items-center justify-between text-center transition-colors">
          <div className="flex-1 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-normal text-neutral-200 tracking-wide">
              {announcementText}
            </span>
            <button
              onClick={() => {
                setFilterCategory('Apparel');
                trackGA4Event('campaign_click', { banner: 'top_announcement_bar' });
              }}
              className="text-blue-300 hover:text-white underline underline-offset-2 ml-1 text-xs font-medium cursor-pointer transition-colors"
            >
              Shop New Drop
            </button>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            aria-label="Close Announcement"
            className="text-neutral-400 hover:text-white ml-2 cursor-pointer p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Left: Mobile Menu Button & Google Merch Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-950 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Google Merchandise Store Logo */}
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-xs border border-neutral-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base sm:text-lg tracking-tight text-neutral-900 leading-tight">
                  Google <span className="font-light text-neutral-600">Merchandise Store</span>
                </span>
                <span className="text-[10px] text-blue-600 tracking-wider font-mono font-medium flex items-center gap-1">
                  DATA-DRIVEN REDESIGN
                </span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation Links with Mega Menu Triggers */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-neutral-700">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterMega('shop')}
              onMouseLeave={handleMouseLeaveMega}
            >
              <button
                onClick={() => {
                  setFilterCategory('All');
                  setCurrentView('shop');
                }}
                className={`px-3 py-2 rounded-md hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer ${
                  currentView === 'shop' ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterMega('brands')}
              onMouseLeave={handleMouseLeaveMega}
            >
              <button
                onClick={() => {
                  setFilterBrand('All');
                  setCurrentView('shop');
                }}
                className="px-3 py-2 rounded-md hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Brands</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => handleCategoryClick('Apparel')}
              className="px-3 py-2 rounded-md hover:text-blue-600 transition-colors cursor-pointer"
            >
              Apparel
            </button>

            <button
              onClick={() => handleCategoryClick('Bags & Accessories')}
              className="px-3 py-2 rounded-md hover:text-blue-600 transition-colors cursor-pointer"
            >
              Accessories
            </button>

            <button
              onClick={() => handleCategoryClick('Lifestyle')}
              className="px-3 py-2 rounded-md hover:text-blue-600 transition-colors cursor-pointer"
            >
              Lifestyle
            </button>

            <button
              onClick={() => setCurrentView('campaign')}
              className={`px-3 py-2 rounded-md hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'campaign' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              <span>Collections</span>
              <span className="text-[9px] bg-blue-50 text-blue-600 font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Featured
              </span>
            </button>

            <button
              onClick={() => handleCategoryClick('Gifts')}
              className="px-3 py-2 rounded-md hover:text-blue-600 transition-colors cursor-pointer"
            >
              Gifts
            </button>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Account, Cart, Currency & GA4 Hub */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Currency Selector (USD $ / INR ₹) */}
            <div className="relative group hidden sm:block">
              <button
                aria-label="Select Currency"
                className="flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:border-neutral-400 transition-colors cursor-pointer"
              >
                <span>{currency === 'USD' ? '$ USD' : '₹ INR'}</span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>
              <div className="absolute right-0 mt-1 w-28 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 hidden group-hover:block z-50">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-neutral-50 cursor-pointer ${
                    currency === 'USD' ? 'text-blue-600 font-bold' : 'text-neutral-700'
                  }`}
                >
                  <span>$ USD (US)</span>
                  {currency === 'USD' && <Check className="w-3 h-3 text-blue-600" />}
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-neutral-50 cursor-pointer ${
                    currency === 'INR' ? 'text-blue-600 font-bold' : 'text-neutral-700'
                  }`}
                >
                  <span>₹ INR (India)</span>
                  {currency === 'INR' && <Check className="w-3 h-3 text-blue-600" />}
                </button>
              </div>
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Products"
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon with Dynamic Badge */}
            <button
              onClick={() => setCurrentView('wishlist')}
              aria-label="View Wishlist"
              className={`p-2 rounded-full relative transition-colors cursor-pointer ${
                currentView === 'wishlist'
                  ? 'text-red-500 bg-red-50'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account Icon */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              aria-label="My Account"
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Icon with Item Count */}
            <button
              onClick={() => {
                setIsCartOpen(true);
                trackGA4Event('view_cart', { cart_items: cartCount });
              }}
              aria-label="Shopping Cart"
              className="p-2 text-neutral-700 hover:text-neutral-950 rounded-full hover:bg-neutral-100 relative transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* GA4 Data Hub & Rationale Trigger (Core requirement for viva defense) */}
            <button
              onClick={() => setIsGA4HubOpen(true)}
              aria-label="Open GA4 Analytics & Viva Rationale Hub"
              className="ml-1 sm:ml-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 text-white hover:bg-blue-600 transition-colors cursor-pointer text-xs font-medium shadow-xs"
              title="Inspect GA4 Event Stream and Viva Research Decisions"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">GA4 Data Hub</span>
              <span className="md:hidden">GA4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mega Navigation Dropdown Container */}
      {isMegaMenuOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-neutral-200 shadow-xl transition-all z-30"
          onMouseEnter={() => {
            if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
            setIsMegaMenuOpen(true);
          }}
          onMouseLeave={handleMouseLeaveMega}
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            {activeMegaTab === 'shop' ? (
              <div className="grid grid-cols-5 gap-8">
                {/* Column 1: New & Trending */}
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    New & Trending
                  </h4>
                  <ul className="space-y-2.5 text-sm text-neutral-700">
                    <li>
                      <button
                        onClick={() => {
                          setFilterCategory('All');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-blue-600 font-medium text-left cursor-pointer transition-colors"
                      >
                        All Products
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setFilterCategory('Apparel');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-blue-600 text-left cursor-pointer flex items-center gap-1.5"
                      >
                        <span>New Arrivals</span>
                        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1 py-0.2 rounded">Fresh</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setCurrentView('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Best Sellers
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setCurrentView('campaign');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-blue-600 text-left cursor-pointer flex items-center gap-1"
                      >
                        <span>Wear the Google Universe</span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Apparel */}
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    Apparel
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Apparel')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        T-Shirts
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Apparel')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Hoodies & Sweatshirts
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Apparel')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Jackets & Windbreakers
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Apparel')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Eco-Cotton Basics
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Accessories */}
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    Accessories
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Bags & Accessories')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Backpacks & Bags
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Bags & Accessories')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Caps & Beanies
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Bags & Accessories')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Jacquard Crew Socks
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Bags & Accessories')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Keychains & Badges
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Lifestyle */}
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    Lifestyle & Workspace
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Lifestyle')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Drinkware & Tumblers
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Lifestyle')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Desk Mats & Wireless Pads
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Lifestyle')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Recycled Journals & Pens
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCategoryClick('Lifestyle')}
                        className="hover:text-blue-600 text-left cursor-pointer"
                      >
                        Chrome Dino Desk Planters
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 5: Featured Drop Card */}
                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-blue-600 uppercase bg-blue-100/60 px-2 py-0.5 rounded">
                      Featured Collection
                    </span>
                    <h5 className="font-semibold text-neutral-900 mt-2 text-sm">
                      Wear the Google Universe
                    </h5>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      Apparel and everyday gear engineered for thinkers, makers, and Google enthusiasts.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentView('campaign');
                      setIsMegaMenuOpen(false);
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <span>Explore Campaign Drop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Mega Menu Brands Tab */
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
                  Shop By Google Ecosystem Brand
                </h4>
                <div className="grid grid-cols-6 gap-4">
                  {[
                    { name: 'Google', desc: 'Classic icons & heritage', color: '#4285F4' },
                    { name: 'Google Cloud', desc: 'Infrastructure & developer gear', color: '#1a73e8' },
                    { name: 'Android', desc: 'The world’s open robot OS', color: '#3ddc84' },
                    { name: 'Gemini', desc: 'Next-gen intelligence & spark', color: '#8b5cf6' },
                    { name: 'YouTube', desc: 'Creator studio & stream essentials', color: '#ef4444' },
                    { name: 'Chrome Dino', desc: 'Retro 8-bit offline companion', color: '#f59e0b' },
                  ].map((brandItem) => (
                    <button
                      key={brandItem.name}
                      onClick={() => handleBrandClick(brandItem.name as Brand)}
                      className="group p-3 rounded-xl border border-neutral-200 hover:border-neutral-900 hover:shadow-sm text-left transition-all cursor-pointer bg-white"
                    >
                      <div
                        className="w-3 h-3 rounded-full mb-2"
                        style={{ backgroundColor: brandItem.color }}
                      />
                      <span className="font-semibold text-sm text-neutral-900 group-hover:text-blue-600 block">
                        {brandItem.name}
                      </span>
                      <span className="text-xs text-neutral-500 mt-0.5 line-clamp-1 block">
                        {brandItem.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Search Modal / Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-start justify-center pt-16 px-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
            <form onSubmit={handleSearchSubmit} className="relative p-4 border-b border-neutral-100 flex items-center">
              <Search className="w-5 h-5 text-neutral-400 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                placeholder="Search products, brands and collections..."
                className="w-full text-base text-neutral-900 placeholder-neutral-400 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            <div className="p-4 bg-neutral-50/50">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      executeSearch(suggestion);
                      setIsSearchOpen(false);
                      setNavSearchInput('');
                    }}
                    className="text-xs bg-white text-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Demo Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-neutral-200 p-6 relative">
            <button
              onClick={() => setIsAccountModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Google Merchandise Account</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Sign in with your Google account to track order deliveries, save wishlist items, and unlock exclusive campus drop access.
            </p>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  trackGA4Event('sign_up', { method: 'google_sso_demo' });
                  setIsAccountModalOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors font-medium text-sm text-neutral-800 cursor-pointer shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                Continue with Google
              </button>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-500 hover:text-neutral-800 cursor-pointer"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-18 bottom-0 bg-white z-40 overflow-y-auto border-t border-neutral-100 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={navSearchInput}
                  onChange={(e) => setNavSearchInput(e.target.value)}
                  placeholder="Search merchandise..."
                  className="w-full px-4 py-2.5 bg-neutral-100 rounded-xl text-sm text-neutral-900 focus:outline-none pr-10"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-neutral-500 cursor-pointer">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                Categories
              </span>
              <div className="grid grid-cols-2 gap-2 text-sm font-medium text-neutral-800">
                <button
                  onClick={() => {
                    setFilterCategory('All');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-3 bg-neutral-50 rounded-xl text-left hover:bg-neutral-100 cursor-pointer"
                >
                  All Products
                </button>
                <button
                  onClick={() => handleCategoryClick('Apparel')}
                  className="p-3 bg-neutral-50 rounded-xl text-left hover:bg-neutral-100 cursor-pointer"
                >
                  Apparel
                </button>
                <button
                  onClick={() => handleCategoryClick('Bags & Accessories')}
                  className="p-3 bg-neutral-50 rounded-xl text-left hover:bg-neutral-100 cursor-pointer"
                >
                  Accessories
                </button>
                <button
                  onClick={() => handleCategoryClick('Lifestyle')}
                  className="p-3 bg-neutral-50 rounded-xl text-left hover:bg-neutral-100 cursor-pointer"
                >
                  Lifestyle
                </button>
                <button
                  onClick={() => handleCategoryClick('Gifts')}
                  className="p-3 bg-neutral-50 rounded-xl text-left hover:bg-neutral-100 cursor-pointer"
                >
                  Gifts
                </button>
                <button
                  onClick={() => {
                    setCurrentView('campaign');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-3 bg-blue-50 text-blue-700 rounded-xl text-left font-semibold cursor-pointer"
                >
                  Campaign
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                Brands
              </span>
              <div className="flex flex-wrap gap-2">
                {(['Google', 'Google Cloud', 'Android', 'Gemini', 'YouTube', 'Chrome Dino'] as Brand[]).map((b) => (
                  <button
                    key={b}
                    onClick={() => handleBrandClick(b)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-xs font-medium rounded-lg text-neutral-800 cursor-pointer"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Selector Mobile */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Currency</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                    currency === 'USD' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  $ USD
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                    currency === 'INR' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  ₹ INR
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-200">
            <button
              onClick={() => {
                setIsGA4HubOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Open GA4 Research & Rationale Hub
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
