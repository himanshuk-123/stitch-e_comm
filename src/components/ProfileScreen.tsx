import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  DollarSign, 
  Truck, 
  CheckCircle2,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AddAddressModal } from './AddAddressModal';
import { OrderTrackingModal } from './OrderTrackingModal';

export const ProfileScreen: React.FC = () => {
  const { 
    user, 
    orders, 
    addresses, 
    currency, 
    setCurrency, 
    navigateTo, 
    setCurrentOrder, 
    setIsTrackingModalOpen,
    isTrackingModalOpen,
    currentOrder,
    formatPrice
  } = useApp();

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

  const handleTrackOrder = (ord: any) => {
    setCurrentOrder(ord);
    setIsTrackingModalOpen(true);
  };

  return (
    <div id="profile-screen" className="min-h-screen bg-zinc-50 pb-28">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200/80 px-4 py-4 sticky top-0 z-30">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="font-extrabold text-xl text-zinc-900 font-heading">
            My Account
          </h1>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            VIP Member
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* User Info */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-4 shadow-xs flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-xl flex items-center justify-center shadow-md font-heading">
            HS
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-extrabold text-zinc-900 font-heading">
              {user.name}
            </h2>
            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
            <p className="text-xs text-zinc-500">{user.phone}</p>
          </div>
        </div>

        {/* Currency Display Selector */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-4 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#f95721] flex items-center justify-center font-bold">
              {currency === 'INR' ? '₹' : '$'}
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">Currency Display</p>
              <p className="text-[11px] text-zinc-400">Switch store pricing currency</p>
            </div>
          </div>

          <div className="flex bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                currency === 'INR'
                  ? 'bg-[#f95721] text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                currency === 'USD'
                  ? 'bg-[#f95721] text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* My Orders */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-[#f95721]" />
              <h3 className="text-sm font-bold text-zinc-900 font-heading">
                My Orders ({orders.length})
              </h3>
            </div>
          </div>

          {orders.length === 0 ? (
            <p className="text-xs text-zinc-400 py-3 text-center">No orders placed yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.map(ord => (
                <div
                  key={ord.id}
                  className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900">{ord.orderNumber}</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                      {ord.status}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-500 text-[11px]">
                    <span>{ord.items.length} Items · {ord.datePlaced}</span>
                    <span className="font-bold text-zinc-900">
                      {formatPrice(ord.total)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-zinc-200/50">
                    <span className="text-[11px] text-zinc-500">
                      Est. Delivery: <strong className="text-zinc-800">{ord.estimatedDelivery}</strong>
                    </span>
                    <button
                      onClick={() => handleTrackOrder(ord)}
                      className="text-xs font-bold text-[#f95721] hover:underline flex items-center space-x-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Shipment</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#f95721]" />
              <h3 className="text-sm font-bold text-zinc-900 font-heading">
                Saved Delivery Addresses
              </h3>
            </div>
            <button
              onClick={() => setIsAddAddressOpen(true)}
              className="text-xs font-bold text-[#f95721] hover:underline flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {addresses.map(addr => (
              <div
                key={addr.id}
                className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-zinc-900">{addr.name}</span>
                  <span className="text-[10px] font-bold text-zinc-500 bg-zinc-200/70 px-1.5 py-0.2 rounded">
                    {addr.type}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-white bg-[#f95721] px-1.5 py-0.2 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-zinc-600 leading-tight">
                  {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-zinc-500 font-medium">{addr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isAddAddressOpen && (
        <AddAddressModal onClose={() => setIsAddAddressOpen(false)} />
      )}
      {isTrackingModalOpen && (
        <OrderTrackingModal 
          order={currentOrder || orders[0]} 
          onClose={() => setIsTrackingModalOpen(false)} 
        />
      )}
    </div>
  );
};
