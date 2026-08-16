import React, { createContext, useContext, useState } from 'react';
import { 
  Product, 
  CartItem, 
  Address, 
  DeliveryOption, 
  PaymentDetails, 
  Order, 
  ScreenType, 
  TabType,
  Review,
  User,
  NotificationItem
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ADDRESSES, DELIVERY_OPTIONS, PROMO_CODES } from '../data/products';

interface FilterState {
  category: string;
  subcategory: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating' | 'discount';
  onlyDeals: boolean;
}

interface AppContextType {
  // Navigation
  screen: ScreenType;
  activeTab: TabType;
  navigationHistory: ScreenType[];
  navigateTo: (screen: ScreenType, tab?: TabType) => void;
  goBack: () => void;
  
  // User Profile
  user: User;

  // Products & Categories
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  
  // Financials & Promo
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Checkout & Addresses
  addresses: Address[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  selectedDeliveryOption: DeliveryOption;
  setSelectedDeliveryOption: (opt: DeliveryOption) => void;
  
  // Payment
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  
  // Orders
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  placeOrder: () => Order;
  
  // Brand & Customizer
  brandName: string;
  setBrandName: (name: string) => void;
  brandTagline: string;
  setBrandTagline: (tagline: string) => void;
  isLogoCustomizerOpen: boolean;
  setIsLogoCustomizerOpen: (open: boolean) => void;

  // Modals & UI States
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  isReviewsModalOpen: boolean;
  setIsReviewsModalOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  
  // Filter settings
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Currency
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  formatPrice: (inrAmount: number, usdAmount?: number) => string;
  
  // Reviews
  addReviewToProduct: (productId: string, review: Omit<Review, 'id'>) => void;
  addReview: (productId: string, review: Omit<Review, 'id'>) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [screen, setScreen] = useState<ScreenType>('home');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [navigationHistory, setNavigationHistory] = useState<ScreenType[]>(['home']);

  // Products
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('electronics');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');

  // Initial Cart
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Matte Black',
    },
    {
      id: 'cart-2',
      product: INITIAL_PRODUCTS[1],
      quantity: 1,
      selectedColor: 'Space Black',
    },
  ]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>([
    'prod-headphones-soundmax',
    'prod-smart-watch-seriesx',
  ]);

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(INITIAL_ADDRESSES[0].id);

  // Delivery Option
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);

  // Payment Details
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    type: 'upi',
    upiId: 'himanshu@okhdfcbank',
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Currency
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Brand & Customizer State
  const [brandName, setBrandName] = useState<string>('STITCH UI');
  const [brandTagline, setBrandTagline] = useState<string>('App Template');
  const [isLogoCustomizerOpen, setIsLogoCustomizerOpen] = useState<boolean>(false);

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // User
  const [user] = useState<User>({
    id: 'usr-1',
    name: 'Himanshu Sharma',
    email: 'himanshu@nova.com',
    phone: '+91 98765 43210',
    isVip: true,
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Order Confirmed! 🎉',
      message: 'Your order #NOVA-2026814-4821 has been placed successfully.',
      time: '10 min ago',
      read: false,
      type: 'order',
    },
    {
      id: 'notif-2',
      title: 'Flash Sale Alert! ⚡',
      message: 'Get up to 40% OFF on premium Wireless Audio devices.',
      time: '2 hours ago',
      read: false,
      type: 'promo',
    },
    {
      id: 'notif-3',
      title: 'Welcome to NOVA VIP',
      message: 'Enjoy free express shipping on all orders above ₹999.',
      time: '1 day ago',
      read: true,
      type: 'system',
    },
  ]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    category: 'electronics',
    subcategory: 'All',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    sortBy: 'popular',
    onlyDeals: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const navigateTo = (newScreen: ScreenType, tab?: TabType) => {
    setNavigationHistory(prev => [...prev, newScreen]);
    setScreen(newScreen);
    if (tab) {
      setActiveTab(tab);
    } else if (['home', 'categories', 'wishlist', 'cart', 'profile'].includes(newScreen)) {
      setActiveTab(newScreen as TabType);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setScreen(prevScreen);
      if (['home', 'categories', 'wishlist', 'cart', 'profile'].includes(prevScreen)) {
        setActiveTab(prevScreen as TabType);
      }
    } else {
      setScreen('home');
      setActiveTab('home');
    }
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedColor === color);
      if (existing) {
        return prev.map(item =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product,
          quantity,
          selectedColor: color || product.colors[0]?.name,
        },
      ];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find(c => c.id === itemId);
    setCart(prev => prev.filter(i => i.id !== itemId));
    if (item) {
      showToast(`Removed ${item.product.name} from cart`);
    }
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Financial Calculations
  const originalSubtotal = cart.reduce((sum, item) => {
    const orig = item.product.originalPrice || item.product.price;
    return sum + (currency === 'INR' ? orig : (item.product.originalPriceUSD || item.product.priceUSD)) * item.quantity;
  }, 0);

  const discountedProductTotal = cart.reduce((sum, item) => {
    const currPrice = currency === 'INR' ? item.product.price : item.product.priceUSD;
    return sum + currPrice * item.quantity;
  }, 0);

  let promoDiscount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.discountPercent) {
      promoDiscount = Math.round((discountedProductTotal * promo.discountPercent) / 100);
    } else if (promo.flatDiscount) {
      promoDiscount = currency === 'INR' ? promo.flatDiscount : Math.round(promo.flatDiscount / 80);
    }
  }

  const subtotal = originalSubtotal;
  const baseDiscount = originalSubtotal - discountedProductTotal;
  const discount = baseDiscount + promoDiscount;
  const deliveryFee = selectedDeliveryOption.price;
  const totalAmount = Math.max(0, originalSubtotal - discount + deliveryFee);

  const applyPromoCode = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (PROMO_CODES[cleaned]) {
      setAppliedPromo(cleaned);
      showToast(`Promo "${cleaned}" applied successfully!`);
      return { success: true, message: PROMO_CODES[cleaned].description };
    }
    return { success: false, message: 'Invalid promo code. Try NOVA20, SAVE10, or WELCOME500' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const prod = products.find(p => p.id === productId);
      if (exists) {
        showToast(`Removed ${prod?.name || 'item'} from wishlist`);
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Added ${prod?.name || 'item'} to wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Addresses
  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    if (addr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses(prev => [...prev, newAddr]);
    }
    setSelectedAddressId(newAddr.id);
    showToast('New address saved');
  };

  // Format price helper
  const formatPrice = (inrAmount: number, usdAmount?: number) => {
    if (currency === 'USD') {
      const val = usdAmount !== undefined ? usdAmount : Math.round(inrAmount / 80);
      return `$${val.toLocaleString('en-US')}`;
    }
    return `₹${inrAmount.toLocaleString('en-IN')}`;
  };

  // Place Order
  const placeOrder = (): Order => {
    const selectedAddr = addresses.find(a => a.id === selectedAddressId) || addresses[0];
    const orderNum = `#NOVA-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      datePlaced: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      shippingAddress: selectedAddr,
      deliveryOption: selectedDeliveryOption,
      paymentMethod: paymentDetails.type.toUpperCase(),
      subtotal,
      discount,
      deliveryFee,
      total: totalAmount,
      status: 'Paid',
      estimatedDelivery: selectedDeliveryOption.id === 'express' ? '16 Aug 2026' : '18 Aug 2026',
      trackingSteps: [
        { step: 'Order Placed', description: 'Your order has been verified and confirmed', time: 'Just now', completed: true, current: false },
        { step: 'Packed & Dispatched', description: 'Items securely packed in eco-friendly box', time: 'Expected tomorrow', completed: false, current: true },
        { step: 'In Transit', description: 'Courier package on route to local delivery hub', time: '17 Aug 2026', completed: false },
        { step: 'Out for Delivery', description: 'Assigned to delivery courier partner', time: '18 Aug 2026', completed: false },
        { step: 'Delivered', description: 'Delivered directly to your door', time: '18 Aug 2026', completed: false },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setCart([]);
    navigateTo('order-success');
    return newOrder;
  };

  const resetFilters = () => {
    setFilters({
      category: selectedCategory,
      subcategory: 'All',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 10000,
      minRating: 0,
      sortBy: 'popular',
      onlyDeals: false,
    });
  };

  const addReviewToProduct = (productId: string, reviewData: Omit<Review, 'id'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: reviewData.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    setProducts(prev =>
      prev.map(prod => {
        if (prod.id === productId) {
          const updatedReviews = [newRev, ...prod.reviews];
          const newAvg = (
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);
          return {
            ...prod,
            reviews: updatedReviews,
            rating: parseFloat(newAvg),
            numericReviews: prod.numericReviews + 1,
            reviewCount: `${prod.numericReviews + 1}`,
          };
        }
        return prod;
      })
    );
    showToast('Review submitted successfully!');
  };

  const addReview = (productId: string, reviewData: Omit<Review, 'id'>) => {
    addReviewToProduct(productId, reviewData);
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        activeTab,
        navigationHistory,
        navigateTo,
        goBack,
        products,
        selectedProduct,
        setSelectedProduct,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discount,
        deliveryFee,
        totalAmount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        selectedDeliveryOption,
        setSelectedDeliveryOption,
        paymentDetails,
        setPaymentDetails,
        orders,
        currentOrder,
        setCurrentOrder,
        placeOrder,
        user,
        brandName,
        setBrandName,
        brandTagline,
        setBrandTagline,
        isLogoCustomizerOpen,
        setIsLogoCustomizerOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSearchModalOpen: isSearchOpen,
        setIsSearchModalOpen: setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isFilterModalOpen,
        setIsFilterModalOpen,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        isReviewsModalOpen,
        setIsReviewsModalOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        notifications,
        markNotificationAsRead,
        filters,
        setFilters,
        resetFilters,
        currency,
        setCurrency,
        formatPrice,
        addReviewToProduct,
        addReview,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
