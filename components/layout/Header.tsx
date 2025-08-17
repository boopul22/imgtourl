'use client';

import { useState } from 'react';
import { Image as ImageIcon, Menu, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import ScrollButton from '@/components/ui/scroll-button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Flat design with solid colors */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                ImageURL
              </span>
              <span className="text-xs text-brand-blue-gray hidden sm:block">
                Free Image Hosting
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Simplified language */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              Help & FAQ
            </a>
            <ScrollButton
              targetId="upload-section"
              variant="outline"
              size="sm"
              className="border-brand-orange/30 hover:border-brand-orange hover:bg-brand-orange/10"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Images
            </ScrollButton>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ScrollButton
              targetId="upload-section"
              variant="outline"
              size="sm"
              className="border-brand-orange/30 hover:border-brand-orange hover:bg-brand-orange/10"
            >
              <Upload className="w-4 h-4" />
            </ScrollButton>
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Simplified */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-background/95">
            <nav className="flex flex-col space-y-3">
              <a
                href="#features"
                className="text-sm font-medium hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="/blog"
                className="text-sm font-medium hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="#faq"
                className="text-sm font-medium hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30"
                onClick={() => setIsMenuOpen(false)}
              >
                Help & FAQ
              </a>
              <ScrollButton
                targetId="upload-section"
                variant="default"
                size="sm"
                className="w-full justify-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </ScrollButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}