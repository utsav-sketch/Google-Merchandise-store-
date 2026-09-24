/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { PopularProducts } from './components/home/PopularProducts';
import { ShopByBrand } from './components/home/ShopByBrand';
import { FeaturedCollection } from './components/home/FeaturedCollection';
import { ShopByCategory } from './components/home/ShopByCategory';
import { DataDrivenSection } from './components/home/DataDrivenSection';
import { CampaignBanner } from './components/home/CampaignBanner';
import { SustainabilitySection } from './components/home/SustainabilitySection';
import { Newsletter } from './components/home/Newsletter';
import { ShopCatalog } from './components/shop/ShopCatalog';
import { ProductDetail } from './components/product/ProductDetail';
import { CampaignPage } from './components/campaign/CampaignPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmationPage } from './components/checkout/OrderConfirmationPage';
import { AboutPage, FAQPage, ContactPage } from './components/pages/InfoPages';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/search/SearchModal';
import { QuickViewModal } from './components/product/QuickViewModal';
import { GA4DataHubModal } from './components/ga4/GA4DataHubModal';

const MainContent: React.FC = () => {
  const { currentView, selectedProductId, products } = useShop();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProductId]);

  const activeProduct = selectedProductId 
    ? products.find((p) => p.id === selectedProductId) || products[0]
    : products[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-blue-100 selection:text-blue-900">
      <Header />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroBanner />
            <PopularProducts />
            <ShopByBrand />
            <FeaturedCollection />
            <ShopByCategory />
            <DataDrivenSection />
            <CampaignBanner />
            <SustainabilitySection />
            <Newsletter />
          </>
        )}

        {currentView === 'shop' && <ShopCatalog />}

        {currentView === 'product' && <ProductDetail product={activeProduct} />}

        {currentView === 'campaign' && <CampaignPage />}

        {currentView === 'wishlist' && <WishlistPage />}

        {currentView === 'cart' && <CartPage />}

        {currentView === 'checkout' && <CheckoutPage />}

        {currentView === 'order-confirmed' && <OrderConfirmationPage />}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'faq' && <FAQPage />}

        {currentView === 'contact' && <ContactPage />}
      </main>

      <Footer />

      {/* Global Overlays & Drawers */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <GA4DataHubModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
