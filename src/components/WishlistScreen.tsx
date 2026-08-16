import React from 'react';
import { ArrowLeft, Heart, ShoppingBag, Trash2, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WishlistScreen: React.FC = () => {
  const { 
    products, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    navigateTo, 
    setSelectedProduct, 
    formatPrice 
  } = useApp();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div id="wishlist-screen" className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between py-2 border-b border-zinc-100">
        <h1 className="font-extrabold text-xl text-zinc-900 font-heading">
          My Saved Wishlist ({wishlistProducts.length})
        </h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#f95721] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-zinc-900">Your wishlist is empty</h2>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto">
            Save items you love by tapping the heart icon while browsing products.
          </p>
          <button
            onClick={() => navigateTo('home', 'home')}
            className="mt-2 inline-flex items-center space-x-2 bg-[#f95721] text-white font-bold px-4 py-2 rounded-xl text-xs"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {wishlistProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-zinc-200/80 p-3 flex space-x-3 items-center shadow-xs"
            >
              <img
                src={product.image}
                alt={product.name}
                onClick={() => {
                  setSelectedProduct(product);
                  navigateTo('product-detail');
                }}
                className="w-20 h-20 object-cover rounded-xl bg-zinc-100 cursor-pointer"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">
                  {product.brand}
                </span>
                <h3 
                  onClick={() => {
                    setSelectedProduct(product);
                    navigateTo('product-detail');
                  }}
                  className="text-xs font-bold text-zinc-900 truncate cursor-pointer hover:text-orange-600"
                >
                  {product.name}
                </h3>

                <div className="flex items-center space-x-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-zinc-800">{product.rating}</span>
                </div>

                <div className="flex items-baseline space-x-1.5 pt-0.5">
                  <span className="text-sm font-black text-zinc-900">
                    {formatPrice(product.price, product.priceUSD)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col space-y-2 items-end">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-zinc-100"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="p-2 bg-[#f95721] text-white rounded-xl shadow-xs hover:bg-[#e04816] active:scale-95 transition"
                  title="Add to cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
