import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartScreen: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    subtotal, 
    discount, 
    deliveryFee, 
    totalAmount, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    navigateTo, 
    goBack, 
    formatPrice 
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  return (
    <div id="cart-screen" className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2 border-b border-zinc-100">
        <div className="flex items-center space-x-2">
          <button onClick={goBack} className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-extrabold text-lg text-zinc-900 font-heading">
            My Cart ({cart.length})
          </h1>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#f95721] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-zinc-900">Your Cart is Empty</h2>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigateTo('home', 'home')}
            className="mt-2 inline-flex items-center space-x-2 bg-[#f95721] text-white font-bold px-4 py-2 rounded-xl text-xs"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="space-y-3">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-zinc-200/80 p-3.5 flex space-x-3 shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-zinc-100"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-500 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-xs font-bold text-zinc-900 truncate">
                      {item.product.name}
                    </h3>
                    {item.selectedColor && (
                      <span className="text-[10px] text-zinc-500 block">
                        Color: {item.selectedColor}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-black text-zinc-900">
                      {formatPrice(item.product.price * item.quantity, item.product.priceUSD * item.quantity)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 bg-zinc-100 px-2 py-1 rounded-lg border border-zinc-200/60">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="text-zinc-600 hover:text-zinc-900 p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-zinc-900 min-w-[14px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="text-zinc-600 hover:text-zinc-900 p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code Box */}
          <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-zinc-800">
              <Tag className="w-4 h-4 text-[#f95721]" />
              <span>Apply Promo Code</span>
            </div>

            {appliedPromo ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs">
                <span className="font-bold text-emerald-700">Code "{appliedPromo}" Applied!</span>
                <button
                  onClick={removePromoCode}
                  className="text-xs font-bold text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex space-x-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={e => setPromoInput(e.target.value)}
                  placeholder="Enter NOVA20 or SAVE10"
                  className="flex-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="bg-zinc-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-black transition"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Bill Summary */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-2.5 text-xs">
            <h3 className="font-bold text-zinc-900 text-sm font-heading border-b border-zinc-100 pb-2">
              Order Summary
            </h3>

            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discount Saved</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-600">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
            </div>

            <div className="border-t border-zinc-100 pt-2 flex justify-between items-baseline font-black text-zinc-900 text-base">
              <span>Total Amount</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
          </div>

          {/* Sticky Proceed Button */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-zinc-200 p-3 z-40 shadow-xl">
            <button
              onClick={() => navigateTo('checkout-address')}
              className="w-full bg-[#f95721] hover:bg-[#e04816] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 active:scale-95 transition"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
