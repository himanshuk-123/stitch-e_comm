import React from 'react';
import { CheckCircle2, ArrowRight, Package, MapPin, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderSuccessScreen: React.FC = () => {
  const { currentOrder, setCurrentOrder, setIsTrackingModalOpen, navigateTo, formatPrice, brandName } = useApp();
  const order = currentOrder;

  const handleTrackOrder = () => {
    if (order) {
      setCurrentOrder(order);
    }
    setIsTrackingModalOpen(true);
  };

  return (
    <div id="order-success-screen" className="pb-24 pt-8 px-4 max-w-md mx-auto space-y-5 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
          Order Confirmed
        </span>
        <h1 className="text-2xl font-extrabold text-zinc-900 font-heading">
          Thank You for Your Order!
        </h1>
        <p className="text-xs text-zinc-500 max-w-xs mx-auto">
          Your order has been verified and confirmed. We've sent the details to your email.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-3xl border border-zinc-200/80 p-4 text-left shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-zinc-100 pb-2.5">
          <div>
            <span className="text-[10px] text-zinc-400 font-bold block uppercase">Order ID</span>
            <span className="text-xs font-extrabold text-zinc-900">
              {order?.orderNumber || '#NOVA-20260815-1042'}
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Payment Verified
          </span>
        </div>

        {/* Estimated Delivery */}
        <div className="flex items-center space-x-3 bg-orange-50/60 border border-orange-200/60 p-3 rounded-2xl">
          <div className="w-8 h-8 rounded-xl bg-[#f95721] text-white flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-zinc-900 block">
              Estimated Delivery: {order?.estimatedDelivery || '18 Aug 2026'}
            </span>
            <span className="text-[11px] text-zinc-500">
              {order?.deliveryOption.name || 'Standard Shipping'}
            </span>
          </div>
        </div>

        {/* Address */}
        {order?.shippingAddress && (
          <div className="text-xs space-y-0.5 pt-1">
            <span className="font-bold text-zinc-700 block">Delivery Address:</span>
            <p className="text-zinc-500">
              {order.shippingAddress.name} — {order.shippingAddress.addressLine}, {order.shippingAddress.city} ({order.shippingAddress.pincode})
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handleTrackOrder}
          className="w-full bg-[#f95721] hover:bg-[#e04816] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 active:scale-95 transition"
        >
          <Package className="w-4 h-4" />
          <span>Track Order Status</span>
        </button>

        <button
          onClick={() => navigateTo('home', 'home')}
          className="w-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
        >
          <span>Continue Shopping on {brandName}</span>
        </button>
      </div>
    </div>
  );
};
