import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, CreditCard, Smartphone, Building2, Banknote, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { PaymentType } from '../types';

export const CheckoutPaymentScreen: React.FC = () => {
  const { 
    paymentDetails, 
    setPaymentDetails, 
    placeOrder, 
    goBack, 
    totalAmount, 
    formatPrice 
  } = useApp();

  const [selectedType, setSelectedType] = useState<PaymentType>(paymentDetails.type || 'upi');
  const [upiIdInput, setUpiIdInput] = useState(paymentDetails.upiId || 'himanshu@okhdfcbank');

  const handlePayNow = () => {
    setPaymentDetails({
      type: selectedType,
      upiId: upiIdInput,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    placeOrder();
  };

  const paymentOptions: { type: PaymentType; label: string; sub: string; icon: any }[] = [
    { type: 'upi', label: 'UPI / GPay / PhonePe', sub: 'Instant & Fast Payment', icon: Smartphone },
    { type: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: CreditCard },
    { type: 'netbanking', label: 'Net Banking', sub: 'All Indian Banks Supported', icon: Building2 },
    { type: 'cod', label: 'Cash on Delivery', sub: 'Pay when items arrive', icon: Banknote },
  ];

  return (
    <div id="checkout-payment-screen" className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2 py-2 border-b border-zinc-100">
        <button onClick={goBack} className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-extrabold text-lg text-zinc-900 font-heading">
          Select Payment Method
        </h1>
      </div>

      {/* Payment Options List */}
      <div className="space-y-2.5">
        {paymentOptions.map(opt => {
          const Icon = opt.icon;
          const isSelected = selectedType === opt.type;
          return (
            <div
              key={opt.type}
              onClick={() => setSelectedType(opt.type)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-orange-50/40 border-[#f95721] ring-1 ring-[#f95721]/30 shadow-xs'
                  : 'bg-white border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-[#f95721] text-white' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">{opt.label}</h3>
                  <p className="text-[10px] text-zinc-500">{opt.sub}</p>
                </div>
              </div>

              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                isSelected ? 'border-[#f95721] bg-[#f95721]' : 'border-zinc-300'
              }`}>
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Inputs */}
      {selectedType === 'upi' && (
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 space-y-2 text-xs">
          <label className="font-bold text-zinc-800 block">Enter VPA / UPI ID</label>
          <input
            type="text"
            value={upiIdInput}
            onChange={e => setUpiIdInput(e.target.value)}
            placeholder="username@bank"
            className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-semibold text-zinc-900 focus:outline-none focus:border-orange-500"
          />
        </div>
      )}

      {/* 256-Bit Security Badge */}
      <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-center space-x-2.5 text-xs text-emerald-800">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <span className="font-medium text-[11px] leading-snug">
          Payments are 100% encrypted with 256-Bit SSL protection.
        </span>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-zinc-200 p-3 z-40 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-zinc-400 font-medium block">Total Payable</span>
          <span className="text-base font-black text-zinc-900">{formatPrice(totalAmount)}</span>
        </div>

        <button
          onClick={handlePayNow}
          className="bg-[#f95721] hover:bg-[#e04816] text-white font-bold px-6 py-3.5 rounded-xl text-xs flex items-center space-x-2 active:scale-95 transition shadow-md"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Pay & Place Order</span>
        </button>
      </div>
    </div>
  );
};
