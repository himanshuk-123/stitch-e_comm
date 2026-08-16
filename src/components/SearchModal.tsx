import React, { useState, useMemo } from 'react';
import { X, Search, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SearchModalProps {
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const { products, setSelectedProduct, navigateTo, formatPrice } = useApp();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter(
      p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-0 sm:p-4 pt-0 sm:pt-10">
      <div className="bg-white rounded-b-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-in slide-in-from-top duration-200 flex flex-col">
        {/* Search Bar Input Header */}
        <div className="p-4 border-b border-zinc-100 flex items-center space-x-3 bg-white">
          <Search className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, brands, headphones..."
            className="flex-1 text-sm font-semibold focus:outline-none bg-transparent"
          />
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 min-h-[250px]">
          {query.trim() === '' ? (
            <div className="text-center py-10 space-y-2 text-zinc-400 text-xs">
              <Search className="w-8 h-8 mx-auto text-zinc-300" />
              <p>Type to search across our full catalog.</p>
            </div>
          ) : searchResults.length === 0 ? (
            <p className="text-xs text-zinc-400 text-center py-10">No products found matching "{query}".</p>
          ) : (
            searchResults.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  onClose();
                  navigateTo('product-detail');
                }}
                className="flex items-center space-x-3 p-2 bg-zinc-50 rounded-xl hover:bg-orange-50/50 cursor-pointer border border-zinc-100"
              >
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-zinc-200" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-900 truncate">{p.name}</h4>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">{p.brand}</span>
                </div>
                <span className="text-xs font-black text-zinc-900">{formatPrice(p.price, p.priceUSD)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
