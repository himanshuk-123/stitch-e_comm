import React, { useState } from 'react';
import { X, Sparkles, Check, Palette, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

interface LogoCustomizerModalProps {
  onClose: () => void;
}

export const LogoCustomizerModal: React.FC<LogoCustomizerModalProps> = ({ onClose }) => {
  const { brandName, setBrandName, brandTagline, setBrandTagline, showToast } = useApp();

  const [inputName, setInputName] = useState(brandName || 'STITCH UI');
  const [inputTagline, setInputTagline] = useState(brandTagline || 'E-Commerce App Template');

  const PRESETS = [
    { name: 'STITCH UI', tagline: 'E-Commerce App Template' },
    { name: 'NOVA STORE', tagline: 'Next-Gen Mobile Shopping' },
    { name: 'AURA LUXE', tagline: 'Premium Fashion & Lifestyle' },
    { name: 'YOUR BRAND', tagline: 'Insert Your Store Name Here' },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (setBrandName) setBrandName(inputName.trim() || 'YOUR BRAND');
    if (setBrandTagline) setBrandTagline(inputTagline.trim() || 'App Template');
    showToast('Brand settings updated!');
    onClose();
  };

  const handleSelectPreset = (preset: { name: string; tagline: string }) => {
    setInputName(preset.name);
    setInputTagline(preset.tagline);
    if (setBrandName) setBrandName(preset.name);
    if (setBrandTagline) setBrandTagline(preset.tagline);
    showToast(`Applied "${preset.name}" branding!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-900 text-white">
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold font-heading text-base text-white">
              App Template Customizer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto max-h-[75vh]">
          <div className="bg-zinc-50 border border-zinc-200/80 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
              Live Brand Logo Preview
            </span>
            <div className="py-2">
              <Logo size="md" showBadge={true} showTagline={true} />
            </div>
            <p className="text-xs text-zinc-500 max-w-xs">
              This mobile e-commerce design app is 100% customizable for any business or client project.
            </p>
          </div>

          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Brand / Store Title
              </label>
              <input
                type="text"
                value={inputName}
                onChange={e => {
                  setInputName(e.target.value);
                  if (setBrandName) setBrandName(e.target.value);
                }}
                placeholder="e.g. YOUR BRAND"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={inputTagline}
                onChange={e => {
                  setInputTagline(e.target.value);
                  if (setBrandTagline) setBrandTagline(e.target.value);
                }}
                placeholder="e.g. E-Commerce App Template"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-2">
                Quick Brand Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-2.5 text-left rounded-xl border text-xs font-medium transition ${
                      inputName === preset.name
                        ? 'border-orange-500 bg-orange-50/50 text-zinc-900 font-bold'
                        : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{preset.name}</span>
                      {inputName === preset.name && (
                        <Check className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white space-y-1.5">
              <div className="flex items-center space-x-1.5 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Ready to Buy or License This App Design?</span>
              </div>
              <p className="text-[11px] text-orange-100 leading-snug">
                Fully functional React + Tailwind CSS mobile store UI. Perfect for e-commerce agencies, startups, or freelancers looking for a production-ready shopping template.
              </p>
            </div>

            <div className="pt-2 flex items-center space-x-2">
              <button
                type="submit"
                className="flex-1 bg-zinc-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center space-x-2"
              >
                <span>Save & Apply Branding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
