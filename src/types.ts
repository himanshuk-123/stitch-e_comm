export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface ProductFeature {
  icon: 'battery' | 'audio' | 'truck' | 'return' | 'shield' | 'bluetooth' | 'water' | 'sparkle';
  label: string;
  sublabel?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'electronics' | 'fashion' | 'home' | 'beauty' | 'gaming';
  subcategory: string;
  price: number; // in INR
  originalPrice: number;
  priceUSD: number;
  originalPriceUSD: number;
  discountPercent: number;
  rating: number;
  reviewCount: string;
  numericReviews: number;
  image: string;
  images: string[];
  description: string;
  colors: ProductColor[];
  features: ProductFeature[];
  inStock: boolean;
  reviews: Review[];
  tags: string[];
  isPopular?: boolean;
  isDeal?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Address {
  id: string;
  name: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  isDefault: boolean;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface DeliveryOption {
  id: 'standard' | 'express';
  name: string;
  expectedDate: string;
  tag: string;
  price: number; // INR
}

export type PaymentType = 'upi' | 'card' | 'netbanking' | 'cod';

export interface PaymentDetails {
  type: PaymentType;
  upiId?: string;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
  bank?: string;
}

export interface TrackingStep {
  step: string;
  description: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  datePlaced: string;
  items: CartItem[];
  shippingAddress: Address;
  deliveryOption: DeliveryOption;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'Paid' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
}

export type ScreenType = 
  | 'home' 
  | 'category' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout-address' 
  | 'checkout-payment' 
  | 'order-success'
  | 'categories'
  | 'wishlist'
  | 'profile';

export type TabType = 'home' | 'categories' | 'wishlist' | 'cart' | 'profile';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isVip?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'promo' | 'system';
}
