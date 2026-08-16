import React, { useState } from 'react';
import { ArrowLeft, MapPin, Plus, Check, Truck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DELIVERY_OPTIONS } from '../data/products';
import { AddAddressModal } from './AddAddressModal';

export const CheckoutAddressScreen: React.FC = () => {
  const { 
    addresses, 
    selectedAddressId, 
    setSelectedAddressId, 
    selectedDeliveryOption, 
    setSelectedDeliveryOption, 
    navigateTo, 
    goBack, 
    totalAmount, 
    formatPrice 
  } = useApp();

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

  return (
    <div id="checkout-address-screen" className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2 py-2 border-b border-zinc-100">
        <button onClick={goBack} className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-extrabold text-lg text-zinc-900 font-heading">
          Select Delivery Address
        </h1>
      </div>

      {/* Addresses List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
            Saved Addresses
          </h2>
          <button
            onClick={() => setIsAddAddressOpen(true)}
            className="text-xs font-bold text-[#f95721] flex items-center space-x-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New</span>
          </button>
        </div>

        {addresses.map(addr => {
          const isSelected = addr.id === selectedAddressId;
          return (
            <div
              key={addr.id}
              onClick={() => setSelectedAddressId(addr.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                isSelected
                  ? 'bg-orange-50/40 border-[#f95721] ring-1 ring-[#f95721]/30 shadow-xs'
                  : 'bg-white border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-xs text-zinc-900">{addr.name}</span>
                  <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                    {addr.type}
                  </span>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#f95721] text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              <p className="text-xs text-zinc-600 leading-snug">
                {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-xs text-zinc-500 font-medium">{addr.phone}</p>
            </div>
          );
        })}
      </div>

      {/* Delivery Options */}
      <div className="space-y-2 pt-2">
        <h2 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
          Delivery Speed
        </h2>

        {DELIVERY_OPTIONS.map(opt => {
          const isSel = opt.id === selectedDeliveryOption.id;
          return (
            <div
              key={opt.id}
              onClick={() => setSelectedDeliveryOption(opt)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                isSel
                  ? 'bg-orange-50/40 border-[#f95721] shadow-xs'
                  : 'bg-white border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-orange-100/70 text-[#f95721] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">{opt.name}</h3>
                  <p className="text-[11px] text-zinc-500">{opt.expectedDate}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-zinc-900">
                {opt.price === 0 ? 'FREE' : formatPrice(opt.price)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-zinc-200 p-3 z-40 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-zinc-400 font-medium block">Total Amount</span>
          <span className="text-base font-black text-zinc-900">{formatPrice(totalAmount)}</span>
        </div>

        <button
          onClick={() => navigateTo('checkout-payment')}
          className="bg-[#f95721] hover:bg-[#e04816] text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center space-x-2 active:scale-95 transition"
        >
          <span>Continue to Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {isAddAddressOpen && (
        <AddAddressModal onClose={() => setIsAddAddressOpen(false)} />
      )}
    </div>
  );
};
