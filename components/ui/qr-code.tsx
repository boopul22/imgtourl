'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface QRCodeGeneratorProps {
  url: string;
  filename?: string;
}

export function QRCodeGenerator({ url, filename = 'qr-code' }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (canvasRef.current && url && isOpen) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }).catch(console.error);

      // Also generate data URL for download
      QRCode.toDataURL(url, {
        width: 512,
        margin: 2,
      }).then(setQrDataUrl).catch(console.error);
    }
  }, [url, isOpen]);

  const downloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.download = `${filename}-qr.png`;
      link.href = qrDataUrl;
      link.click();
    }
  };

  const handleOpenChange = (open: boolean) => {
    console.log('QR Dialog open state:', open);
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log('QR Button clicked');
            setIsOpen(true);
          }}
        >
          <QrCode className="w-4 h-4 mr-2" />
          QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code to quickly access your image on mobile devices.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <canvas ref={canvasRef} className="max-w-full h-auto" />
          </div>
          <div className="flex gap-2">
            <Button onClick={downloadQR} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download QR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
