'use client';

import { useState, useEffect } from 'react';
import { Maximize2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ImageResizer, RESIZE_PRESETS, type ResizeOptions } from '@/lib/image-resizer';
import { showSuccessToast, showErrorToast } from '@/lib/error-handler';

interface ImageResizeDialogProps {
  file: File;
  onResize: (resizedFile: File) => void;
}

export function ImageResizeDialog({ file, onResize }: ImageResizeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [resizeOptions, setResizeOptions] = useState<ResizeOptions>({
    width: undefined,
    height: undefined,
    quality: 90,
    format: 'jpeg',
    maintainAspectRatio: true,
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && file) {
      ImageResizer.getImageDimensions(file)
        .then(setOriginalDimensions)
        .catch(console.error);
      
      setPreviewUrl(URL.createObjectURL(file));
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [isOpen, file]);

  const handlePresetSelect = (presetName: string) => {
    const preset = RESIZE_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setResizeOptions(prev => ({
        ...prev,
        width: preset.width,
        height: preset.height,
      }));
    }
  };

  const handleResize = async () => {
    if (!originalDimensions) return;

    setIsResizing(true);
    try {
      const resizedFile = await ImageResizer.resizeImage(file, resizeOptions);
      onResize(resizedFile);
      setIsOpen(false);
      showSuccessToast('Image resized successfully!');
    } catch (error) {
      showErrorToast('Failed to resize image');
      console.error('Resize error:', error);
    } finally {
      setIsResizing(false);
    }
  };

  const calculateNewDimensions = () => {
    if (!originalDimensions) return null;
    return ImageResizer.calculateDimensions(
      originalDimensions.width,
      originalDimensions.height,
      resizeOptions
    );
  };

  const newDimensions = calculateNewDimensions();

  const handleOpenChange = (open: boolean) => {
    console.log('Image Resize Dialog open state:', open);
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log('Image Resize Button clicked');
            setIsOpen(true);
          }}
        >
          <Maximize2 className="w-4 h-4 mr-2" />
          Resize
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Resize Image</DialogTitle>
          <DialogDescription>
            Adjust the dimensions and quality of your image before uploading.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="space-y-4">
            <div>
              <Label>Preview</Label>
              {previewUrl && (
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-contain bg-gray-50"
                  />
                </div>
              )}
            </div>

            {originalDimensions && (
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Original:</span>
                  <span>{originalDimensions.width} × {originalDimensions.height}</span>
                </div>
                {newDimensions && (
                  <div className="flex justify-between">
                    <span>New:</span>
                    <span>{newDimensions.width} × {newDimensions.height}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>File size:</span>
                  <span>{ImageResizer.formatFileSize(file.size)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div>
              <Label>Presets</Label>
              <Select onValueChange={handlePresetSelect}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a preset" />
                </SelectTrigger>
                <SelectContent>
                  {RESIZE_PRESETS.map((preset) => (
                    <SelectItem key={preset.name} value={preset.name}>
                      {preset.name} ({preset.width}×{preset.height})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={resizeOptions.width || ''}
                  onChange={(e) => setResizeOptions(prev => ({
                    ...prev,
                    width: e.target.value ? parseInt(e.target.value) : undefined
                  }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={resizeOptions.height || ''}
                  onChange={(e) => setResizeOptions(prev => ({
                    ...prev,
                    height: e.target.value ? parseInt(e.target.value) : undefined
                  }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="aspect-ratio"
                checked={resizeOptions.maintainAspectRatio}
                onCheckedChange={(checked) => setResizeOptions(prev => ({
                  ...prev,
                  maintainAspectRatio: checked
                }))}
              />
              <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
            </div>

            <div>
              <Label>Quality: {resizeOptions.quality}%</Label>
              <Slider
                value={[resizeOptions.quality || 90]}
                onValueChange={([value]) => setResizeOptions(prev => ({
                  ...prev,
                  quality: value
                }))}
                max={100}
                min={10}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Format</Label>
              <Select
                value={resizeOptions.format}
                onValueChange={(value: 'jpeg' | 'png' | 'webp') => setResizeOptions(prev => ({
                  ...prev,
                  format: value
                }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleResize}
              disabled={isResizing || !originalDimensions}
              className="w-full"
            >
              {isResizing ? 'Resizing...' : 'Apply Resize'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
