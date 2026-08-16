import React from 'react';
import { Search, Star, Heart, Shirt, Tv, Home as HomeIcon, Sparkles, Gamepad2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_CONFIG } from '../data/products';
import { Product } from '../types';

export const HomeScreen: React.FC = () => {
  const { 
    products, 
    navigateTo, 
    setSelectedProduct, 
    setSelectedCategory,
    isInWishlist, 
    toggleWishlist,
    formatPrice,
    setIsSearchOpen,
    brandName
  } = useApp();

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigateTo('category', 'categories');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'fashion':
        return <Shirt className="w-6 h-6 text-zinc-800" strokeWidth={1.8} />;
      case 'electronics':
        return <Tv className="w-6 h-6 text-zinc-800" strokeWidth={1.8} />;
      case 'home':
        return <HomeIcon className="w-6 h-6 text-zinc-800" strokeWidth={1.8} />;
      case 'beauty':
        return <Sparkles className="w-6 h-6 text-zinc-800" strokeWidth={1.8} />;
      case 'gaming':
        return <Gamepad2 className="w-6 h-6 text-zinc-800" strokeWidth={1.8} />;
      default:
        return <Tv className="w-6 h-6 text-zinc-800" />;
    }
  };

  const popularProducts = products.filter(p => p.isPopular || p.id === 'prod-headphones-soundmax' || p.id === 'prod-smart-watch-seriesx');

  return (
    <div id="home-screen" className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-5">
      {/* 1. Search Bar */}
      <div 
        id="search-trigger-bar"
        onClick={() => setIsSearchOpen(true)}
        className="relative flex items-center w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 shadow-xs cursor-pointer hover:border-zinc-300 transition-colors"
      >
        <Search className="w-5 h-5 text-zinc-400 mr-3" />
        <span className="text-sm text-zinc-400 font-medium">
          Search products, brands and more
        </span>
      </div>

      {/* 2. Hero Banner */}
      <div 
        id="hero-banner-card"
        className="relative rounded-2xl overflow-hidden shadow-sm aspect-[16/10] flex flex-col justify-between p-6 bg-zinc-900 group"
      >
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80"
          alt="Modern Interior"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        <div className="relative z-10">
          <span className="text-[11px] font-bold text-zinc-300 tracking-wider uppercase drop-shadow-sm">
            {brandName} Featured Collection
          </span>
        </div>

        <div className="relative z-10 max-w-[75%] space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight font-heading drop-shadow-md">
            Big Deals,<br />Better Choices
          </h1>
          <p className="text-xs sm:text-sm text-zinc-200 leading-snug drop-shadow">
            Discover amazing products at prices you'll love.
          </p>
        </div>

        <div className="relative z-10">
          <button 
            onClick={() => navigateTo('category', 'categories')}
            className="inline-flex items-center space-x-2 bg-[#f95721] hover:bg-[#e04816] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-transform active:scale-95"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Shop by Category Horizontal Grid */}
      <div>
        <h2 className="text-base font-extrabold text-zinc-900 font-heading mb-3">
          Shop by Category
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {CATEGORIES_CONFIG.map(cat => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200/80 flex items-center justify-center shadow-xs group-hover:border-orange-500 group-hover:bg-orange-50/50 transition-all">
                {getCategoryIcon(cat.id)}
              </div>
              <span className="text-[11px] font-semibold text-zinc-700 mt-1.5 text-center truncate w-full">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Popular Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-extrabold text-zinc-900 font-heading">
            Popular Products
          </h2>
          <button 
            onClick={() => navigateTo('category', 'categories')}
            className="text-xs font-bold text-[#f95721] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {popularProducts.map(product => {
            const inWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="relative aspect-square bg-zinc-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-xs rounded-full shadow-xs text-zinc-600 hover:text-red-500 transition"
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  {product.discountPercent > 0 && (
                    <span className="absolute top-2 left-2 bg-[#f95721] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      {product.brand}
                    </span>
                    <h3 className="text-xs font-bold text-zinc-900 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-zinc-800">{product.rating}</span>
                      <span className="text-[10px] text-zinc-400">({product.reviewCount})</span>
                    </div>

                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-sm font-black text-zinc-900">
                        {formatPrice(product.price, product.priceUSD)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[11px] text-zinc-400 line-through">
                          {formatPrice(product.originalPrice, product.originalPriceUSD)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
