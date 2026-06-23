import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  gameName: string;
  packageName: string;
  paymentMethod: string;
  price: number;
  quantity: number;
  adminFee: number;
  total: number;
  gameAccountId: string;
  gameServer: string;
  isSubmitting: boolean;
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  gameName,
  packageName,
  paymentMethod,
  price,
  quantity,
  adminFee,
  total,
  gameAccountId,
  gameServer,
  isSubmitting
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#2a2723] rounded-xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1f1d19]">
           <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#f27221]" />
              Detail Pesanan
           </h3>
           <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
           </button>
        </div>

        <div className="p-5 overflow-y-auto custom-scrollbar">
           <div className="p-4 rounded-xl border border-white/5 bg-[#1f1d19] shadow-inner mb-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dashed border-white/10">
                 <img src="/Gemini_Generated_Image_2q24tz2q24tz2q24.png" alt={gameName} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                 <div>
                    <div className="font-bold text-white text-sm">{gameName}</div>
                    <div className="text-xs text-gray-400">{packageName}</div>
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">ID & Server</span>
                    <span className="font-medium text-white">{gameAccountId} ({gameServer})</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Metode Pembayaran</span>
                    <span className="font-medium text-white text-right break-words max-w-[50%]">{paymentMethod.replace('qris_best', 'QRIS').toUpperCase()}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Harga per Item</span>
                    <span className="font-medium text-white">Rp {price.toLocaleString('id-ID')}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Jumlah Pembelian</span>
                    <span className="font-medium text-white">{quantity}x</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Biaya Admin</span>
                    <span className="font-medium text-[red]">Rp {adminFee.toLocaleString('id-ID')}</span>
                 </div>
              </div>

              <div className="mt-4 pt-4 border-t border-dashed border-white/10 flex justify-between items-center">
                 <span className="font-bold text-white text-sm">Total Pembayaran</span>
                 <span className="font-bold text-lg text-[#f27221]">Rp {total.toLocaleString('id-ID')}</span>
              </div>
           </div>

           <div className="flex gap-3">
              <button onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 rounded-xl bg-[#333] hover:bg-[#444] text-white font-bold transition-all text-sm disabled:opacity-50">
                 Batal
              </button>
              <button onClick={onConfirm} disabled={isSubmitting} className="flex-1 py-3 rounded-xl bg-gradient-to-br from-[#f27221] to-[#f27221] hover:from-[#f27221] hover:to-[#f27221] text-white font-bold transition-all text-sm shadow-lg shadow-[#f27221]/20 disabled:opacity-50 flex items-center justify-center gap-2">
                 {isSubmitting ? 'Memproses...' : 'Pesan Sekarang!'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
