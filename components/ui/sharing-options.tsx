'use client';

import { useState } from 'react';
import { Copy, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface SharingOptionsProps {
  url: string;
  filename: string;
  title?: string;
}

export function SharingOptions({ url, filename, title = 'Check out this image' }: SharingOptionsProps) {
  const [copiedTab, setCopiedTab] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = async (text: string, tabName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tabName);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedTab(''), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleOpenChange = (open: boolean) => {
    console.log('Sharing Dialog open state:', open);
    setIsOpen(open);
  };

  const shareFormats = {
    direct: url,
    html: `<img src="${url}" alt="${filename}" />`,
    markdown: `![${filename}](${url})`,
    bbcode: `[img]${url}[/img]`,
    link: `[url=${url}]${title}[/url]`,
  };

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log('Share Button clicked');
            setIsOpen(true);
          }}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Your Image</DialogTitle>
          <DialogDescription>
            Choose from various sharing formats or share directly on social media.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="formats" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="formats">Formats</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>
          
          <TabsContent value="formats" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="direct-url">Direct URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="direct-url"
                    value={shareFormats.direct}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(shareFormats.direct, 'direct')}
                    variant={copiedTab === 'direct' ? 'default' : 'outline'}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="html-embed">HTML Embed</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="html-embed"
                    value={shareFormats.html}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(shareFormats.html, 'html')}
                    variant={copiedTab === 'html' ? 'default' : 'outline'}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="markdown">Markdown</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="markdown"
                    value={shareFormats.markdown}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(shareFormats.markdown, 'markdown')}
                    variant={copiedTab === 'markdown' ? 'default' : 'outline'}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="bbcode">BBCode</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="bbcode"
                    value={shareFormats.bbcode}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(shareFormats.bbcode, 'bbcode')}
                    variant={copiedTab === 'bbcode' ? 'default' : 'outline'}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(socialLinks.twitter, '_blank')}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(socialLinks.facebook, '_blank')}
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(socialLinks.whatsapp, '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground text-center">
              Click any button above to share on social media
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
