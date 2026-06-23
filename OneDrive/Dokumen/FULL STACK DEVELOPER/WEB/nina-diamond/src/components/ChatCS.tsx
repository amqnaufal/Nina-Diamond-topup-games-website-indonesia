import React, { useState } from 'react';
import { HeadphonesIcon } from 'lucide-react';

export default function ChatCS() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-4 w-[340px] bg-[#676c71] rounded-lg shadow-xl overflow-hidden transform origin-bottom-right transition-all">
          <div className="px-5 pt-5 pb-3">
            <h3 className="font-bold text-white text-[17px]">Chat CS</h3>
          </div>
          <div className="flex flex-col text-white pb-3">
            <a href="#" className="px-5 py-3 text-[15px] hover:bg-white/10 transition-colors">
              Customer Service (WhatsApp)
            </a>
            <a href="#" className="px-5 py-3 text-[15px] hover:bg-white/10 transition-colors">
              Khusus Joki (WhatsApp)
            </a>
            <a href="#" className="px-5 py-3 text-[15px] hover:bg-white/10 transition-colors">
              Instagram Nina Diamond
            </a>
            <a href="#" className="px-5 py-3 text-[15px] leading-snug hover:bg-white/10 transition-colors">
              Instagram Nina Forum (Jual Beli Akun)
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#f27221] hover:bg-[#e0661a] text-white px-5 py-3 rounded-lg font-bold transition-colors shadow-lg ml-auto"
      >
        <HeadphonesIcon className="h-5 w-5" />
        CHAT CS
      </button>
    </div>
  );
}
