import React, { useState } from 'react';
import { ArrowLeft, Heart, Star, ShoppingBag, Truck, ShieldCheck, RotateCcw, Share2, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailScreen: React.FC = () => {
  const { 
    selectedProduct, 
    goBack, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setIsReviewsModalOpen, 
    formatPrice,
    navigateTo 
  } = useApp();

  const product = selectedProduct;
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const inWish = isInWishlist(product.id);

  return (
    <div id="product-detail-screen" className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between py-2">
        <button onClick={goBack} className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Product Details
        </span>
        <button 
          onClick={() => toggleWishlist(product.id)}
          className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-700"
        >
          <Heart className={`w-5 h-5 ${inWish ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Image Carousel */}
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-zinc-200/80 shadow-xs">
        <img
          src={product.images[activeImageIndex] || product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImageIndex === idx ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Title & Brand */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#f95721] uppercase tracking-wider">
          {product.brand}
        </span>
        <h1 className="text-xl font-extrabold text-zinc-900 font-heading leading-tight">
          {product.name}
        </h1>

        {/* Rating */}
        <div 
          onClick={() => setIsReviewsModalOpen(true)}
          className="flex items-center space-x-2 pt-1 cursor-pointer hover:opacity-80"
        >
          <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-bold text-amber-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span className="text-xs text-zinc-500 underline font-medium">
            {product.reviewCount} Ratings & Reviews
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-xs text-zinc-400 block font-medium">Special Price</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-zinc-900">
              {formatPrice(product.price, product.priceUSD)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-zinc-400 line-through">
                {formatPrice(product.originalPrice, product.originalPriceUSD)}
              </span>
            )}
          </div>
        </div>

        {product.discountPercent > 0 && (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full">
            Save {product.discountPercent}%
          </span>
        )}
      </div>

      {/* Colors */}
      {product.colors.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-800 block">
            Select Color: <span className="text-zinc-500 font-normal">{selectedColor}</span>
          </label>
          <div className="flex items-center space-x-3">
            {product.colors.map(c => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                  selectedColor === c.name ? 'border-[#f95721] scale-110 shadow-xs' : 'border-zinc-200'
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {selectedColor === c.name && (
                  <Check className={`w-4 h-4 ${c.hex === '#ffffff' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="space-y-1.5">
        <h3 className="text-sm font-bold text-zinc-900 font-heading">Description</h3>
        <p className="text-xs text-zinc-600 leading-relaxed font-normal">
          {product.description}
        </p>
      </div>

      {/* Bottom Sticky Action Buttons */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-zinc-200 p-3 z-40 flex space-x-3 shadow-xl">
        <button
          onClick={() => {
            addToCart(product, 1, selectedColor);
          }}
          className="flex-1 bg-zinc-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 active:scale-95 transition"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={() => {
            addToCart(product, 1, selectedColor);
            navigateTo('checkout-address');
          }}
          className="flex-1 bg-[#f95721] hover:bg-[#e04816] text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 active:scale-95 transition"
        >
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};
