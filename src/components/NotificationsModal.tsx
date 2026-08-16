import React from 'react';
import { X, Bell, Package, Tag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationsModalProps {
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  const { notifications, markNotificationAsRead, navigateTo } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-orange-600" />;
      case 'promo':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-[#f95721]" />
            <h3 className="font-bold text-zinc-900 font-heading text-base">
              Notifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-2.5">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (n.type === 'order') {
                  onClose();
                  navigateTo('profile', 'profile');
                } else if (n.type === 'promo') {
                  onClose();
                  navigateTo('category', 'categories');
                }
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                n.read
                  ? 'bg-zinc-50 border-zinc-100 text-zinc-600'
                  : 'bg-orange-50/40 border-orange-200/80 text-zinc-900'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200/60 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                {getIcon(n.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold leading-snug">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {n.time}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed font-normal">
                  {n.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
