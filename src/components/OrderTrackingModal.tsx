import React from 'react';
import { X, CheckCircle2, Truck, PackageCheck, MapPin, Clock } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-400 font-bold block uppercase">Shipment Tracker</span>
            <h3 className="font-bold text-zinc-900 font-heading text-sm">
              {order.orderNumber}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 flex items-center space-x-3">
            <Truck className="w-6 h-6 text-[#f95721]" />
            <div className="text-xs">
              <span className="font-bold text-zinc-900 block">Est. Delivery: {order.estimatedDelivery}</span>
              <span className="text-zinc-500">{order.deliveryOption.name}</span>
            </div>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
            {order.trackingSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start space-x-3">
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    step.completed
                      ? 'bg-emerald-500 text-white'
                      : step.current
                      ? 'bg-[#f95721] text-white ring-4 ring-orange-100'
                      : 'bg-zinc-200 text-zinc-400'
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                <div className="space-y-0.5 text-xs">
                  <div className="flex items-baseline space-x-2">
                    <h4 className={`font-bold ${step.completed || step.current ? 'text-zinc-900' : 'text-zinc-400'}`}>
                      {step.step}
                    </h4>
                    <span className="text-[10px] text-zinc-400">{step.time}</span>
                  </div>
                  <p className="text-zinc-500 text-[11px] font-normal leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
