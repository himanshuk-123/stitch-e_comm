import React from 'react';
import { 
  X, 
  Home, 
  Grid, 
  Heart, 
  ShoppingBag, 
  Package, 
  MapPin, 
  HelpCircle, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import { Logo } from './Logo';

interface SidebarDrawerProps {
  onClose: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ onClose }) => {
  const { 
    user, 
    navigateTo, 
    setSelectedCategory, 
    setSelectedSubcategory, 
    currency, 
    setCurrency,
    brandName,
    setIsLogoCustomizerOpen
  } = useApp();

  const handleNav = (screen: any, tab: any) => {
    navigateTo(screen, tab);
    onClose();
  };

  const handleCategory = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('All');
    navigateTo('category', 'categories');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-start">
      <div className="bg-white w-4/5 max-w-xs h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
        {/* Top Header */}
        <div>
          <div className="p-5 bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-black text-sm font-heading">
                HS
              </div>
              <div>
                <h3 className="font-extrabold text-sm font-heading leading-tight">
                  {user.name}
                </h3>
                <p className="text-[11px] text-orange-100 font-medium">
                  VIP Member
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-white hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <button
              onClick={() => handleNav('home', 'home')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-xs font-bold text-zinc-800 transition"
            >
              <Home className="w-4 h-4 text-zinc-500" />
              <span>Store Home</span>
            </button>

            <button
              onClick={() => handleNav('categories', 'categories')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-xs font-bold text-zinc-800 transition"
            >
              <Grid className="w-4 h-4 text-zinc-500" />
              <span>All Categories</span>
            </button>

            <button
              onClick={() => handleNav('wishlist', 'wishlist')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-xs font-bold text-zinc-800 transition"
            >
              <Heart className="w-4 h-4 text-zinc-500" />
              <span>Saved Wishlist</span>
            </button>

            <button
              onClick={() => handleNav('cart', 'cart')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-xs font-bold text-zinc-800 transition"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-500" />
              <span>Shopping Cart</span>
            </button>

            <button
              onClick={() => handleNav('profile', 'profile')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100 text-xs font-bold text-zinc-800 transition"
            >
              <Package className="w-4 h-4 text-zinc-500" />
              <span>My Account & Orders</span>
            </button>
          </div>

          <hr className="my-2 border-zinc-100 mx-4" />

          {/* Categories List */}
          <div className="px-4 py-2 space-y-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block px-3">
              Shop Categories
            </span>

            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-orange-50/60 text-xs font-semibold text-zinc-700 hover:text-orange-600 transition"
              >
                <span>{cat.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Currency & Version Info */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50 space-y-3">
          {/* Brand Logo Banner */}
          <div className="bg-white p-3 rounded-2xl border border-zinc-200/80 flex items-center justify-between shadow-xs">
            <Logo size="sm" showBadge={true} />
            <button
              onClick={() => {
                setIsLogoCustomizerOpen(true);
                onClose();
              }}
              className="p-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg transition"
              title="Customize App Brand Logo"
            >
              <Palette className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-700">Currency</span>
            <div className="flex bg-zinc-200/80 p-0.5 rounded-lg">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  currency === 'INR' ? 'bg-[#f95721] text-white' : 'text-zinc-600'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  currency === 'USD' ? 'bg-[#f95721] text-white' : 'text-zinc-600'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          <div className="text-[10px] text-zinc-400 text-center">
            {brandName} App Template v2.4.0 · 100% Customizable
          </div>
        </div>
      </div>
    </div>
  );
};
