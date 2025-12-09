'use client';

import { useState } from 'react';
import { Link, Copy, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UrlShortener } from '@/lib/url-shortener';
import { showSuccessToast, showErrorToast } from '@/lib/error-handler';

interface UrlShortenerProps {
  url: string;
  filename: string;
}

export function UrlShortenerComponent({ url, filename }: UrlShortenerProps) {
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const createShortUrl = async () => {
    setIsCreating(true);
    try {
      const result = UrlShortener.createShortUrl(url, customSlug || undefined);
      if (result) {
        const fullShortUrl = UrlShortener.getFullShortUrl(result.shortCode);
        setShortUrl(fullShortUrl);
        showSuccessToast('Short URL created successfully!');
      }
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : 'Failed to create short URL');
    } finally {
      setIsCreating(false);
    }
  };

  const copyShortUrl = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      showSuccessToast('Short URL copied to clipboard!');
    } catch (error) {
      showErrorToast('Failed to copy short URL');
    }
  };

  const resetForm = () => {
    setCustomSlug('');
    setShortUrl('');
  };

  const handleOpenChange = (open: boolean) => {
    console.log('URL Shortener Dialog open state:', open);
    setIsOpen(open);
    if (!open) resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log('URL Shortener Button clicked');
            setIsOpen(true);
          }}
        >
          <Scissors className="w-4 h-4 mr-2" />
          Shorten URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Short URL</DialogTitle>
          <DialogDescription>
            Create a shorter, more memorable URL for your image.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="original-url">Original URL</Label>
            <Input
              id="original-url"
              value={url}
              readOnly
              className="font-mono text-sm bg-muted"
            />
          </div>

          {!shortUrl && (
            <>
              <div>
                <Label htmlFor="custom-slug">Custom Slug (Optional)</Label>
                <div className="flex gap-2 mt-1">
                  <span className="flex items-center px-3 py-2 border border-r-0 rounded-l-md bg-muted text-sm">
                    {process.env.NEXT_PUBLIC_APP_URL || 'localhost:3000'}/s/
                  </span>
                  <Input
                    id="custom-slug"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    placeholder="my-image"
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty for a random short code. Use letters, numbers, hyphens, and underscores only.
                </p>
              </div>

              <Button 
                onClick={createShortUrl} 
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? 'Creating...' : 'Create Short URL'}
              </Button>
            </>
          )}

          {shortUrl && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="short-url">Short URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="short-url"
                    value={shortUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button onClick={copyShortUrl} size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => window.open(shortUrl, '_blank')}
                  variant="outline"
                  className="flex-1"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Test URL
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1"
                >
                  Create Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
