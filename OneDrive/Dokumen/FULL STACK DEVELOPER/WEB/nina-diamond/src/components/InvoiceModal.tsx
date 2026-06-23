import React, { useState } from 'react';
import { X, Copy, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InvoiceModalProps {
  invoice: any;
  onClose: () => void;
}

export function InvoiceModal({ invoice, onClose }: InvoiceModalProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!invoice) return null;

  const paymentInstructions = getPaymentInstructions(invoice.paymentMethod);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCekTransaksi = () => {
    onClose();
    navigate('/?tab=cek-transaksi');
  };

  return (
    <div className="fixed inset-0 z-[100] flex animate-in fade-in items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-2xl bg-[#1c1a17] shadow-xl border border-white/10">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#1c1a17] p-5">
          <div>
             <h2 className="text-xl font-bold text-white">Pembayaran</h2>
             <p className="text-sm text-gray-400">Selesaikan pembayaran Anda</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          
          {/* Order Summary */}
          <div className="rounded-xl bg-[#25221d] p-4 border border-white/5 space-y-3">
             <div className="text-sm font-bold text-white mb-2 pb-2 border-b border-white/5">Ringkasan Pesanan</div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Invoice ID</span>
                <span className="text-sm font-medium text-white">{invoice.invoiceId}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Game</span>
                <span className="text-sm font-medium text-white">Mobile Legends</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">User ID</span>
                <span className="text-sm font-medium text-white">{invoice.gameAccountId} ({invoice.gameServer})</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Item</span>
                <span className="text-sm font-medium text-white">{invoice.packageName}</span>
             </div>
             {invoice.quantity && invoice.quantity > 1 && (
               <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Jumlah</span>
                  <span className="text-sm font-medium text-white">{invoice.quantity}x</span>
               </div>
             )}
             <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-2">
                <span className="text-sm font-bold text-white">Total Bayar</span>
                <span className="text-lg font-bold text-[#f27221]">Rp {invoice.price.toLocaleString('id-ID')}</span>
             </div>
          </div>

          {/* Payment Instructions */}
          <div className="rounded-xl border border-[#f27221]/30 bg-[#f27221]/5 p-4 space-y-4">
             <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#f27221]" />
                <span className="text-sm font-bold text-[#f27221]">Instruksi Pembayaran</span>
             </div>
             <div className="text-sm text-gray-300">
               {paymentInstructions.desc}
             </div>
             
             {paymentInstructions.type === 'qris' && (
               <div className="mt-4 flex flex-col items-center justify-center rounded-lg bg-white p-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-10 mb-4" />
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0002010102112657...MOCK_QRIS_STRING...6304CA8C" alt="QR Code" className="h-48 w-48 rounded" />
                  <div className="mt-3 text-center text-xs text-black">Scan QR Code ini menggunakan aplikasi e-wallet atau m-banking Anda.</div>
               </div>
             )}

             {paymentInstructions.type === 'va' && (
               <div className="mt-4">
                  <div className="text-xs text-gray-400 mb-1">Nomor Virtual Account</div>
                  <div className="flex items-center justify-between rounded-lg bg-[#1c1a17] border border-white/10 p-3">
                     <span className="font-mono text-lg font-bold text-white tracking-widest">{paymentInstructions.vaNumber}</span>
                     <button
                        onClick={() => handleCopy(paymentInstructions.vaNumber || '')}
                        className="flex items-center gap-1 rounded bg-[#f27221]/10 px-3 py-1.5 text-xs font-bold text-[#f27221] hover:bg-[#f27221]/20 transition-colors"
                     >
                        {copied ? 'Tersalin!' : <><Copy className="h-3 w-3" /> Salin</>}
                     </button>
                  </div>
               </div>
             )}
          </div>
          
          <button 
             onClick={handleCekTransaksi}
             className="w-full rounded-xl bg-[#f27221] px-4 py-3 font-bold text-white hover:bg-[#d56119] transition-colors shadow-lg shadow-[#f27221]/20"
           >
             Cek Status Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}

function getPaymentInstructions(method: string) {
  if (method === 'qris') {
    return { type: 'qris', desc: 'Selesaikan pembayaran dengan scan QRIS di bawah ini.' };
  }
  if (method === 'ovo') return { type: 'ewallet', desc: 'Silakan buka aplikasi OVO dan konfirmasi pembayaran (Mock).' };
  if (method === 'dana') return { type: 'ewallet', desc: 'Silakan buka aplikasi DANA dan konfirmasi pembayaran (Mock).' };
  if (method === 'shopeepay') return { type: 'ewallet', desc: 'Silakan buka aplikasi Shopee dan konfirmasi pembayaran (Mock).' };
  if (method === 'gopay') return { type: 'ewallet', desc: 'Silakan buka aplikasi Gojek/GoPay dan konfirmasi pembayaran (Mock).' };
  
  if (method.startsWith('va_') || method.startsWith('tf_')) {
    const banks: any = { 
      'va_bca': 'BCA', 
      'va_mandiri': 'Mandiri', 
      'va_bni': 'BNI', 
      'va_bri': 'BRI',
      'tf_bca': 'BCA',
      'tf_mandiri': 'Mandiri'
    };
    const bankName = banks[method] || 'Bank';
    return { 
      type: 'va', 
      desc: `Transfer sesuai nominal tagihan ke Virtual Account ${bankName} berikut.`,
      vaNumber: `8934${Math.floor(random(10000000, 99999999))}`
    };
  }
  
  if (method === 'indomaret' || method === 'alfamart') {
    return {
      type: 'va',
      desc: `Tunjukkan kode pembayaran berikut ke kasir ${method === 'indomaret' ? 'Indomaret' : 'Alfamart'}.`,
      vaNumber: `LUMOS${Math.floor(random(100000, 999999))}`
    };
  }

  return { type: 'qris', desc: 'Metode pembayaran tidak dikenali (Mock).' };
}

function random(min: number, max: number) {
   return Math.random() * (max - min) + min;
}
