import React, { useState } from 'react';
import { X, SlidersHorizontal, Star, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FilterSortModalProps {
  onClose: () => void;
}

export const FilterSortModal: React.FC<FilterSortModalProps> = ({ onClose }) => {
  const { filters, setFilters, resetFilters, formatPrice, currency } = useApp();

  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const sortOptions: { id: any; label: string }[] = [
    { id: 'popular', label: 'Popularity & Relevance' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Customer Ratings' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-[#f95721]" />
            <h3 className="font-bold text-zinc-900 font-heading text-base">
              Filter & Sort
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
              Sort Results By
            </label>
            <div className="space-y-1.5">
              {sortOptions.map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setLocalFilters(prev => ({ ...prev, sortBy: opt.id }))}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition ${
                    localFilters.sortBy === opt.id
                      ? 'bg-orange-50/60 border-[#f95721] text-zinc-900'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <span>{opt.label}</span>
                  {localFilters.sortBy === opt.id && <Check className="w-4 h-4 text-[#f95721]" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-100 flex space-x-3 bg-zinc-50">
          <button
            onClick={() => {
              resetFilters();
              onClose();
            }}
            className="flex-1 bg-white border border-zinc-200 text-zinc-700 font-bold py-3 rounded-xl text-xs hover:bg-zinc-100"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-[#f95721] text-white font-bold py-3 rounded-xl text-xs hover:bg-[#e04816]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
