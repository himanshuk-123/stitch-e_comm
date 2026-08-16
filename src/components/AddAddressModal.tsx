import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AddAddressModalProps {
  onClose: () => void;
}

export const AddAddressModal: React.FC<AddAddressModalProps> = ({ onClose }) => {
  const { addAddress } = useApp();

  const [name, setName] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<'HOME' | 'WORK' | 'OTHER'>('HOME');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !addressLine || !city || !pincode || !phone) return;

    addAddress({
      name,
      addressLine,
      city,
      state: stateName || 'Karnataka',
      pincode,
      phone,
      type,
      isDefault: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 flex flex-col">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-[#f95721]" />
            <h3 className="font-bold text-zinc-900 font-heading text-base">Add New Address</h3>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Himanshu Sharma"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Address Line</label>
            <input
              type="text"
              required
              value={addressLine}
              onChange={e => setAddressLine(e.target.value)}
              placeholder="Flat no., Street, Area"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Bengaluru"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">Pincode</label>
              <input
                type="text"
                required
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="560001"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Phone Number</label>
            <input
              type="text"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#f95721] text-white font-bold rounded-xl text-xs hover:bg-[#e04816] transition pt-3"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};
