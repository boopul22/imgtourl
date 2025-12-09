'use client';

import { useState, useEffect } from 'react';
import { History, Trash2, Download, Copy, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UploadHistoryManager, type UploadHistoryItem } from '@/lib/upload-history';
import { formatFileSize } from '@/lib/validations';
import { QRCodeGenerator } from '@/components/ui/qr-code';
import { SharingOptions } from '@/components/ui/sharing-options';
import { showSuccessToast, showErrorToast } from '@/lib/error-handler';

export function UploadHistory() {
  const [history, setHistory] = useState<UploadHistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHistory(UploadHistoryManager.getHistory());
    }
  }, [isOpen]);

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showSuccessToast('URL copied to clipboard!');
    } catch (error) {
      showErrorToast('Failed to copy URL');
    }
  };

  const handleDelete = (id: string) => {
    UploadHistoryManager.removeFromHistory(id);
    setHistory(prev => prev.filter(item => item.id !== id));
    showSuccessToast('Item removed from history');
  };

  const handleClearAll = () => {
    UploadHistoryManager.clearHistory();
    setHistory([]);
    showSuccessToast('History cleared');
  };

  const handleExport = () => {
    try {
      const data = UploadHistoryManager.exportHistory();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `imageurl-history-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showSuccessToast('History exported successfully');
    } catch (error) {
      showErrorToast('Failed to export history');
    }
  };

  const stats = UploadHistoryManager.getHistoryStats();

  const handleOpenChange = (open: boolean) => {
    console.log('Upload History Dialog open state:', open);
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log('Upload History Button clicked');
            setIsOpen(true);
          }}
        >
          <History className="w-4 h-4 mr-2" />
          History ({history.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Upload History</DialogTitle>
          <DialogDescription>
            View and manage your uploaded images. History is stored locally in your browser.
          </DialogDescription>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-b">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.totalUploads}</div>
            <div className="text-sm text-muted-foreground">Total Uploads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{formatFileSize(stats.totalSize)}</div>
            <div className="text-sm text-muted-foreground">Total Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-orange">{formatFileSize(stats.totalSaved)}</div>
            <div className="text-sm text-muted-foreground">Space Saved</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center py-2">
          <div className="text-sm text-muted-foreground">
            {history.length} items in history
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearAll} disabled={history.length === 0}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No upload history yet</p>
              <p className="text-sm">Your uploaded images will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.url}
                      alt={item.originalName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.originalName}</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Size: {formatFileSize(item.size)}</p>
                        <p>Uploaded: {new Date(item.uploadedAt).toLocaleDateString()}</p>
                        {item.optimized && (
                          <p className="text-brand-orange">
                            Optimized: {formatFileSize(item.originalSize - item.size)} saved
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyUrl(item.url)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <QRCodeGenerator url={item.url} filename={item.originalName} />
                      <SharingOptions 
                        url={item.url} 
                        filename={item.originalName}
                        title={`Check out this image: ${item.originalName}`}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => window.open(item.url, '_blank')}>
                            View Image
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCopyUrl(item.url)}>
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(item.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
