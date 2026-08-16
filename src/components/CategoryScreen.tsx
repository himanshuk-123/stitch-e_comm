import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Heart, SlidersHorizontal, Star, PackageSearch, RotateCcw, Grid } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const CategoryScreen: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    selectedSubcategory, 
    setSelectedSubcategory, 
    setSelectedProduct, 
    navigateTo, 
    goBack, 
    setIsFilterModalOpen, 
    isInWishlist, 
    toggleWishlist, 
    formatPrice 
  } = useApp();

  const [search, setSearch] = useState('');

  const subcategories = ['All', 'Audio', 'Wearables', 'Apparel', 'Accessories', 'Gaming'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const normSelected = selectedCategory.toLowerCase();
      const normCat = p.category.toLowerCase();
      
      const matchCat = 
        normSelected === 'all' || 
        normCat === normSelected || 
        normSelected.includes(normCat) || 
        normCat.includes(normSelected);

      const matchSub = selectedSubcategory === 'All' || p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase();
      const matchQuery = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
      
      return matchCat && matchSub && matchQuery;
    });
  }, [products, selectedCategory, selectedSubcategory, search]);

  return (
    <div id="category-screen" className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <button onClick={goBack} className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-extrabold text-lg text-zinc-900 font-heading capitalize">
            {selectedCategory}
          </h1>
        </div>

        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:border-orange-500 hover:text-orange-600 shadow-xs flex items-center space-x-1 text-xs font-bold"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Subcategory Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {subcategories.map(sub => (
          <button
            key={sub}
            onClick={() => setSelectedSubcategory(sub)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
              selectedSubcategory === sub
                ? 'bg-[#f95721] text-white shadow-xs'
                : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 px-4 text-center bg-white rounded-3xl border border-zinc-200/80 shadow-xs space-y-4 my-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#f95721] flex items-center justify-center mx-auto border border-orange-200/60 shadow-xs">
            <PackageSearch className="w-8 h-8 stroke-[1.8]" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-extrabold text-zinc-900 font-heading capitalize">
              No Products Found
            </h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
              We couldn't find any products in <strong className="text-zinc-700 capitalize">{selectedCategory}</strong> {selectedSubcategory !== 'All' ? `under "${selectedSubcategory}"` : ''}.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
            {selectedSubcategory !== 'All' && (
              <button
                onClick={() => setSelectedSubcategory('All')}
                className="w-full sm:w-auto px-4 py-2.5 bg-orange-50 hover:bg-orange-100 text-[#f95721] font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show All in Category</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('categories', 'categories')}
              className="w-full sm:w-auto px-4 py-2.5 bg-zinc-900 hover:bg-black text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Browse All Categories</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 pt-1">
          {filteredProducts.map(product => {
            const inWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  navigateTo('product-detail');
                }}
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
      )}
    </div>
  );
};
