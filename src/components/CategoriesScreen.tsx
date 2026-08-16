import React from 'react';
import { CATEGORIES } from '../data/products';
import { useApp } from '../context/AppContext';
import { ChevronRight, Sparkles } from 'lucide-react';

export const CategoriesScreen: React.FC = () => {
  const { setSelectedCategory, setSelectedSubcategory, navigateTo } = useApp();

  const handleSelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('All');
    navigateTo('category', 'categories');
  };

  return (
    <div id="categories-screen" className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between py-2">
        <h1 className="font-extrabold text-xl text-zinc-900 font-heading">
          All Categories
        </h1>
        <span className="text-xs text-zinc-400 font-medium">Explore collections</span>
      </div>

      <div className="space-y-3">
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className="relative rounded-2xl overflow-hidden border border-zinc-200/80 shadow-xs cursor-pointer group aspect-[16/7] flex items-center p-5 bg-zinc-900"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            <div className="relative z-10 flex-1 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-400">
                  {cat.count}
                </span>
                <h3 className="font-bold text-lg text-white font-heading leading-tight mt-0.5">
                  {cat.name}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-[#f95721] transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
