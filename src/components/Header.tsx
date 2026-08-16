import React from 'react';
import { Menu, Bell, User, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => {
  const { 
    navigateTo, 
    setIsNotificationsOpen,
    currency,
    setCurrency,
    setIsSidebarOpen,
    setIsLogoCustomizerOpen
  } = useApp();

  const handleOpenDrawer = () => {
    if (onOpenMenu) {
      onOpenMenu();
    } else {
      setIsSidebarOpen(true);
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all">
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Left: Drawer Toggle */}
        <button
          id="btn-drawer-menu"
          onClick={handleOpenDrawer}
          aria-label="Open menu"
          className="p-2 -ml-2 text-zinc-700 hover:text-zinc-900 active:scale-95 transition rounded-full hover:bg-zinc-100"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Center: Generic Brand Logo & Customizer trigger */}
        <div title="Click to customize brand logo & app title">
          <Logo 
            size="sm" 
            showBadge={true} 
            onClick={() => setIsLogoCustomizerOpen(true)} 
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-1">
          {/* Customizer Quick Icon */}
          <button
            id="btn-customize-brand"
            onClick={() => setIsLogoCustomizerOpen(true)}
            title="App Template Brand Customizer"
            className="p-2 text-zinc-600 hover:text-orange-600 active:scale-95 transition rounded-full hover:bg-orange-50"
          >
            <Palette className="w-4 h-4 text-orange-500" />
          </button>

          {/* Currency Toggle Pill */}
          <button
            id="btn-currency-toggle"
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
            title={`Switch to ${currency === 'INR' ? 'USD ($)' : 'INR (₹)'}`}
            className="px-2 py-1 text-xs font-bold text-zinc-600 hover:text-orange-600 bg-zinc-100 hover:bg-orange-50 rounded-md transition"
          >
            {currency === 'INR' ? '₹ INR' : '$ USD'}
          </button>

          {/* Notifications Bell */}
          <button
            id="btn-notifications-bell"
            onClick={() => setIsNotificationsOpen(true)}
            aria-label="Notifications"
            className="relative p-2 text-zinc-700 hover:text-zinc-900 active:scale-95 transition rounded-full hover:bg-zinc-100"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white animate-pulse" />
          </button>

          {/* Profile Avatar */}
          <button
            id="btn-header-profile"
            onClick={() => navigateTo('profile', 'profile')}
            aria-label="User Profile"
            className="p-2 text-zinc-700 hover:text-zinc-900 active:scale-95 transition rounded-full hover:bg-zinc-100"
          >
            <div className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center bg-zinc-50">
              <User className="w-4 h-4 text-zinc-600" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
