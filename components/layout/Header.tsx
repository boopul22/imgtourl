'use client';

import { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Menu, X, Upload, ChevronDown, Shield, FileText, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import ScrollButton from '@/components/ui/scroll-button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLegalDropdownOpen, setIsLegalDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLegalDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Flat design with solid colors */}
          <a
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded-lg"
            aria-label="ImageURL - Image to URL Converter - Go to homepage"
          >
            <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                ImageURL
              </span>
              <span className="text-xs text-brand-blue-gray hidden sm:block">
                Image to URL
              </span>
            </div>
          </a>

          {/* Desktop Navigation - Simplified language */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded px-2 py-1"
            >
              Features
            </a>
            <Link
              href="/bulk-image-upload"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded px-2 py-1"
            >
              Bulk Upload
            </Link>
            <a
              href="/blog"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded px-2 py-1"
            >
              Blog
            </a>
            
            {/* Legal Pages Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded px-2 py-1"
                onClick={() => setIsLegalDropdownOpen(!isLegalDropdownOpen)}
                aria-expanded={isLegalDropdownOpen}
                aria-haspopup="true"
              >
                Legal & Policies
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isLegalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLegalDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <a
                      href="/content-guidelines"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brand-orange transition-colors"
                      onClick={() => setIsLegalDropdownOpen(false)}
                    >
                      <AlertTriangle className="w-4 h-4 mr-3 text-red-500" />
                      <div>
                        <div className="font-medium">Content Guidelines</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Prohibited content & policies</div>
                      </div>
                    </a>
                    <a
                      href="/privacy-policy"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brand-orange transition-colors"
                      onClick={() => setIsLegalDropdownOpen(false)}
                    >
                      <Shield className="w-4 h-4 mr-3 text-blue-500" />
                      <div>
                        <div className="font-medium">Privacy Policy</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Data protection & cookies</div>
                      </div>
                    </a>
                    <a
                      href="/terms-of-service"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brand-orange transition-colors"
                      onClick={() => setIsLegalDropdownOpen(false)}
                    >
                      <FileText className="w-4 h-4 mr-3 text-green-500" />
                      <div>
                        <div className="font-medium">Terms of Service</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">User agreements & rules</div>
                      </div>
                    </a>
                    <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                    <a
                      href="/about"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brand-orange transition-colors"
                      onClick={() => setIsLegalDropdownOpen(false)}
                    >
                      <Users className="w-4 h-4 mr-3 text-purple-500" />
                      <div>
                        <div className="font-medium">About Us</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Company information</div>
                      </div>
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brand-orange transition-colors"
                      onClick={() => setIsLegalDropdownOpen(false)}
                    >
                      <FileText className="w-4 h-4 mr-3 text-orange-500" />
                      <div>
                        <div className="font-medium">Contact Us</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Get help & support</div>
                      </div>
                    </a>
                    <a
                      href="/parental-consent"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brand-orange transition-colors"
                      onClick={() => setIsLegalDropdownOpen(false)}
                    >
                      <AlertTriangle className="w-4 h-4 mr-3 text-yellow-500" />
                      <div>
                        <div className="font-medium">Parental Consent</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Children's privacy protection</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <a
              href="#faq"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded px-2 py-1"
            >
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
              className="p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Simplified */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t bg-background/95">
            <nav className="flex flex-col space-y-3" role="navigation" aria-label="Mobile navigation">
              <a
                href="#features"
                className="text-sm font-medium hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <Link
                href="/bulk-image-upload"
                className="text-sm font-medium hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Bulk Upload
              </Link>
              <a
                href="/blog"
                className="text-sm font-medium hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              
              {/* Legal Pages Section */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">Legal & Policies</div>
                <div className="space-y-1 ml-2">
                  <a
                    href="/content-guidelines"
                    className="flex items-center text-sm hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                    Content Guidelines
                  </a>
                  <a
                    href="/privacy-policy"
                    className="flex items-center text-sm hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4 mr-2 text-blue-500" />
                    Privacy Policy
                  </a>
                  <a
                    href="/terms-of-service"
                    className="flex items-center text-sm hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="w-4 h-4 mr-2 text-green-500" />
                    Terms of Service
                  </a>
                  <a
                    href="/about"
                    className="flex items-center text-sm hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="w-4 h-4 mr-2 text-purple-500" />
                    About Us
                  </a>
                  <a
                    href="/contact"
                    className="flex items-center text-sm hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="w-4 h-4 mr-2 text-orange-500" />
                    Contact Us
                  </a>
                </div>
              </div>
              
              <a
                href="#faq"
                className="text-sm font-medium hover:text-brand-orange transition-colors py-2 px-2 rounded-md hover:bg-brand-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
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
                Upload Photos
              </ScrollButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}