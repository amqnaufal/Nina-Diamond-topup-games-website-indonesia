import React from 'react';
import { X, Check } from 'lucide-react';

interface RegionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  { id: 'id', name: 'Indonesia (IDR)', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg' },
  { id: 'my', name: 'Malaysia (MYR)', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg' },
  { id: 'ph', name: 'Philippines (PHP)', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg' },
  { id: 'sg', name: 'Singapore (SGD)', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg' },
  { id: 'th', name: 'Thailand (THB)', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg' },
];

const languages = [
  { id: 'id', name: 'ID', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg' },
  { id: 'en', name: 'EN', flagUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg' },
];

export function RegionModal({ isOpen, onClose }: RegionModalProps) {
  const [selectedLocation, setSelectedLocation] = React.useState('id');
  const [selectedLanguage, setSelectedLanguage] = React.useState('id');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#262626] p-6 shadow-2xl border border-white/5">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 text-sm font-bold text-white">Lokasi</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {locations.map(loc => {
            const isSelected = selectedLocation === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors outline-none cursor-pointer ${
                  isSelected ? 'border-orange-500 bg-[#262626]' : 'border-white/10 bg-[#333333] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 overflow-hidden rounded-full border border-white/10 shrink-0 bg-white">
                    <img src={loc.flagUrl} alt={loc.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide">{loc.name}</span>
                </div>
                {isSelected && <Check className="h-5 w-5 stroke-[3] text-orange-500" />}
              </button>
            )
          })}
        </div>

        <div className="mb-4 text-sm font-bold text-white">Bahasa</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {languages.map(lang => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors outline-none cursor-pointer ${
                  isSelected ? 'border-orange-500 bg-[#262626]' : 'border-white/10 bg-[#333333] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 overflow-hidden rounded-full border border-white/10 shrink-0 bg-white">
                    <img src={lang.flagUrl} alt={lang.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide">{lang.name}</span>
                </div>
                {isSelected && <Check className="h-5 w-5 stroke-[3] text-orange-500" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}