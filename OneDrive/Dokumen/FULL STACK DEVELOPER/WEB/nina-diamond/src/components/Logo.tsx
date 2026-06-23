import React from 'react';

export function Logo({ className = '', scale = 1 }: { className?: string; scale?: number }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
      {/* Text Group */}
      <div className="flex flex-col items-start leading-none gap-0">
        <span className="text-[28px] md:text-[34px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ff8c00] to-[#b34700] tracking-tight uppercase" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.1)' }}>
          NINA
        </span>
        <div className="relative flex flex-col items-center w-full mt-[-2px]">
          <span className="text-[18px] md:text-[22px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#a0a0a0] tracking-wide" style={{ WebkitTextStroke: '0.5px rgba(0,0,0,0.1)' }}>
            Diamond
          </span>
          {/* Two thin double lines */}
          <div className="w-full flex flex-col gap-[2px] mt-[2px] px-1">
            <div className="h-[2px] w-full bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-full" />
            <div className="h-[2px] w-full bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
