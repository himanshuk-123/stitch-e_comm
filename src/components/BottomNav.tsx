import React from 'react';
import { Home, LayoutGrid, Heart, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, navigateTo, cartCount, wishlist } = useApp();

  const navItems: { id: TabType; label: string; icon: any; count?: number }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, count: cartCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-zinc-200/80 z-40 px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id, item.id)}
              className={`relative flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all duration-200 ${
                isActive ? 'text-[#f95721]' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#f95721] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {item.count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold tracking-tight ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
