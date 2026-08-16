import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { CategoryScreen } from './components/CategoryScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutAddressScreen } from './components/CheckoutAddressScreen';
import { CheckoutPaymentScreen } from './components/CheckoutPaymentScreen';
import { OrderSuccessScreen } from './components/OrderSuccessScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { FilterSortModal } from './components/FilterSortModal';
import { SearchModal } from './components/SearchModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ReviewsModal } from './components/ReviewsModal';
import { SidebarDrawer } from './components/SidebarDrawer';
import { LogoCustomizerModal } from './components/LogoCustomizerModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';

const AppContent: React.FC = () => {
  const { 
    screen, 
    isFilterModalOpen, 
    setIsFilterModalOpen, 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    isNotificationsOpen, 
    setIsNotificationsOpen, 
    isReviewsModalOpen, 
    setIsReviewsModalOpen, 
    isSidebarOpen, 
    setIsSidebarOpen, 
    isLogoCustomizerOpen,
    setIsLogoCustomizerOpen,
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    currentOrder,
    orders,
    toastMessage 
  } = useApp();

  const renderActiveScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen />;
      case 'category':
        return <CategoryScreen />;
      case 'product-detail':
        return <ProductDetailScreen />;
      case 'cart':
        return <CartScreen />;
      case 'checkout-address':
        return <CheckoutAddressScreen />;
      case 'checkout-payment':
        return <CheckoutPaymentScreen />;
      case 'order-success':
        return <OrderSuccessScreen />;
      case 'categories':
        return <CategoriesScreen />;
      case 'wishlist':
        return <WishlistScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const showTopHeader = ['home', 'categories'].includes(screen);
  const showBottomNav = ['home', 'categories', 'category', 'wishlist', 'profile'].includes(screen);

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center text-zinc-900 selection:bg-orange-500 selection:text-white">
      {/* Mobile-sized responsive canvas container with smooth border on desktop */}
      <div className="w-full max-w-md bg-zinc-50 min-h-screen relative shadow-2xl overflow-x-hidden flex flex-col">
        {/* Main App Top Header */}
        {showTopHeader && <Header />}

        {/* Active Screen View */}
        <div className="flex-1">
          {renderActiveScreen()}
        </div>

        {/* Bottom Navigation */}
        {showBottomNav && <BottomNav />}

        {/* Global Floating Modals & Drawers */}
        {isFilterModalOpen && (
          <FilterSortModal onClose={() => setIsFilterModalOpen(false)} />
        )}

        {isSearchModalOpen && (
          <SearchModal onClose={() => setIsSearchModalOpen(false)} />
        )}

        {isNotificationsOpen && (
          <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
        )}

        {isReviewsModalOpen && (
          <ReviewsModal onClose={() => setIsReviewsModalOpen(false)} />
        )}

        {isSidebarOpen && (
          <SidebarDrawer onClose={() => setIsSidebarOpen(false)} />
        )}

        {isLogoCustomizerOpen && (
          <LogoCustomizerModal onClose={() => setIsLogoCustomizerOpen(false)} />
        )}

        {isTrackingModalOpen && (
          <OrderTrackingModal
            order={currentOrder || orders[0]}
            onClose={() => setIsTrackingModalOpen(false)}
          />
        )}

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#f95721]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
