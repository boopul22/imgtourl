import { nanoid } from 'nanoid';

export interface ShortUrl {
  id: string;
  shortCode: string;
  originalUrl: string;
  customSlug?: string;
  createdAt: string;
  clicks: number;
  expiresAt?: string;
}

const STORAGE_KEY = 'imageurl_short_urls';
const DEFAULT_SHORT_LENGTH = 6;

export class UrlShortener {
  static generateShortCode(length: number = DEFAULT_SHORT_LENGTH): string {
    return nanoid(length);
  }

  static isValidSlug(slug: string): boolean {
    // Allow alphanumeric characters, hyphens, and underscores
    return /^[a-zA-Z0-9_-]+$/.test(slug) && slug.length >= 3 && slug.length <= 50;
  }

  static getShortUrls(): ShortUrl[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load short URLs:', error);
      return [];
    }
  }

  static saveShortUrls(urls: ShortUrl[]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    } catch (error) {
      console.error('Failed to save short URLs:', error);
    }
  }

  static createShortUrl(originalUrl: string, customSlug?: string): ShortUrl | null {
    const existingUrls = this.getShortUrls();
    
    // Check if custom slug is already taken
    if (customSlug) {
      if (!this.isValidSlug(customSlug)) {
        throw new Error('Invalid slug. Use only letters, numbers, hyphens, and underscores (3-50 characters).');
      }
      
      if (existingUrls.some(url => url.shortCode === customSlug)) {
        throw new Error('This slug is already taken. Please choose a different one.');
      }
    }

    const shortCode = customSlug || this.generateShortCode();
    const shortUrl: ShortUrl = {
      id: nanoid(),
      shortCode,
      originalUrl,
      customSlug,
      createdAt: new Date().toISOString(),
      clicks: 0,
    };

    const updatedUrls = [shortUrl, ...existingUrls];
    this.saveShortUrls(updatedUrls);
    
    return shortUrl;
  }

  static getShortUrl(shortCode: string): ShortUrl | null {
    const urls = this.getShortUrls();
    return urls.find(url => url.shortCode === shortCode) || null;
  }

  static incrementClicks(shortCode: string): void {
    const urls = this.getShortUrls();
    const urlIndex = urls.findIndex(url => url.shortCode === shortCode);
    
    if (urlIndex !== -1) {
      urls[urlIndex].clicks += 1;
      this.saveShortUrls(urls);
    }
  }

  static deleteShortUrl(id: string): void {
    const urls = this.getShortUrls();
    const filteredUrls = urls.filter(url => url.id !== id);
    this.saveShortUrls(filteredUrls);
  }

  static getFullShortUrl(shortCode: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return `${baseUrl}/s/${shortCode}`;
  }

  static getStats(): { totalUrls: number; totalClicks: number } {
    const urls = this.getShortUrls();
    return {
      totalUrls: urls.length,
      totalClicks: urls.reduce((sum, url) => sum + url.clicks, 0),
    };
  }
}
