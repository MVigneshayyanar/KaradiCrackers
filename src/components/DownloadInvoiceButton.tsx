'use client';

import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DownloadInvoiceButtonProps {
  orderNumber: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function DownloadInvoiceButton({
  orderNumber,
  variant = 'primary',
  className = '',
}: DownloadInvoiceButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloading) return;

    const invoiceUrl = `/api/invoice/${encodeURIComponent(orderNumber)}`;
    const filename = `Karadi-Crackers-Invoice-${orderNumber}.pdf`;

    setDownloading(true);

    try {
      // 1. Fetch the PDF binary blob
      const res = await fetch(invoiceUrl);
      if (!res.ok) {
        throw new Error('Failed to fetch invoice PDF');
      }
      const blob = await res.blob();

      // 2. Create Object URL for preview and download
      const blobUrl = window.URL.createObjectURL(blob);

      // 3. Trigger immediate file download / save to device
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 4. Open in new tab for instant view / print
      const previewWindow = window.open(blobUrl, '_blank');
      // If popup blocker blocked the blob window, open via invoice URL as fallback
      if (!previewWindow) {
        window.open(invoiceUrl, '_blank');
      }

      // Cleanup object URL after a delay
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 60000);

      toast.success('Invoice downloaded and opened!');
    } catch (err: any) {
      console.error('Invoice download error:', err);
      // Fallback: direct navigation in new window with download attribute
      window.open(invoiceUrl, '_blank');
      toast.error('Directing to invoice...');
    } finally {
      setDownloading(false);
    }
  };

  if (variant === 'primary') {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#D40000] hover:bg-[#B00000] text-white font-extrabold rounded-xl shadow-md transition-all active:scale-95 text-xs border border-[#FFC400] cursor-pointer disabled:opacity-70 ${className}`}
      >
        {downloading ? (
          <Loader2 className="w-4 h-4 text-[#FFC400] animate-spin" />
        ) : (
          <FileDown className="w-4 h-4 text-[#FFC400]" />
        )}
        <span>{downloading ? 'Downloading...' : 'Download PDF Invoice'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className={`w-full py-2.5 px-3 bg-white hover:bg-gray-50 text-gray-900 font-extrabold rounded-xl shadow-xs transition-colors border-2 border-gray-300 flex items-center justify-center gap-2 text-xs hover:border-[#D40000] cursor-pointer disabled:opacity-70 ${className}`}
    >
      {downloading ? (
        <Loader2 className="w-4 h-4 text-[#D40000] animate-spin" />
      ) : (
        <FileDown className="w-4 h-4 text-[#D40000]" />
      )}
      <span>{downloading ? 'Downloading...' : 'Download PDF Invoice'}</span>
    </button>
  );
}
