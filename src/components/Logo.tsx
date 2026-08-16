import React from 'react';
import { useApp } from '../context/AppContext';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  showTagline?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'sm', 
  showBadge = true,
  showTagline = false,
  onClick,
  className = '' 
}) => {
  const { brandName = 'STITCH UI', brandTagline = 'App Template' } = useApp();

  const sizeClasses = {
    xs: { icon: 'w-4 h-4', text: 'text-xs', badge: 'text-[7px] px-1.5 py-0.2', gap: 'space-x-1.5' },
    sm: { icon: 'w-5 h-5', text: 'text-sm', badge: 'text-[8px] px-1.5 py-0.5', gap: 'space-x-2' },
    md: { icon: 'w-6 h-6', text: 'text-base', badge: 'text-[9px] px-1.5 py-0.5', gap: 'space-x-2' },
    lg: { icon: 'w-8 h-8', text: 'text-xl', badge: 'text-[10px] px-2 py-0.5', gap: 'space-x-2.5' },
    xl: { icon: 'w-10 h-10', text: 'text-2xl', badge: 'text-[11px] px-2.5 py-1', gap: 'space-x-3' },
  };

  const currSize = sizeClasses[size];

  return (
    <div 
      id="brand-logo-container"
      onClick={onClick}
      className={`inline-flex items-center ${currSize.gap} cursor-pointer select-none group ${className}`}
    >
      {/* Sleek SVG Geometric Logo Mark */}
      <div className={`relative flex items-center justify-center ${currSize.icon} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xs"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f95721" />
              <stop offset="50%" stopColor="#ff7a00" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="logoGradSub" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>
          </defs>
          <path 
            d="M20 3L35 11.66V28.34L20 37L5 28.34V11.66L20 3Z" 
            fill="url(#logoGradSub)" 
            rx="4"
          />
          <path 
            d="M13 15C13 11.134 16.134 8 20 8C23.866 8 27 11.134 27 15V17H29V29C29 30.6569 27.6569 32 26 32H14C12.3431 32 11 30.6569 11 29V17H13V15ZM15 17H25V15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15V17Z" 
            fill="url(#logoGrad)" 
          />
          <circle cx="20" cy="23" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Text & Badge */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5">
          <span className={`font-extrabold tracking-tight text-zinc-900 font-heading leading-none ${currSize.text}`}>
            {brandName}
          </span>
          {showBadge && (
            <span className={`font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200/80 rounded-full font-sans leading-none ${currSize.badge}`}>
              TEMPLATE
            </span>
          )}
        </div>
        {showTagline && brandTagline && (
          <span className="text-[10px] font-semibold text-zinc-400 tracking-wide leading-tight mt-0.5">
            {brandTagline}
          </span>
        )}
      </div>
    </div>
  );
};
