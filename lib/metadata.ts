import { Metadata } from 'next';

interface ImageMetadataProps {
  imageUrl?: string;
  fileName?: string;
  fileSize?: number;
  uploadDate?: string;
}

export function generateImageMetadata({
  imageUrl,
  fileName,
  fileSize,
  uploadDate
}: ImageMetadataProps): Metadata {
  const title = fileName 
    ? `${fileName} - Free Image to URL Converter`
    : 'Free Image to URL Converter - No Sign-up Required';
    
  const description = fileName
    ? `View and share ${fileName}. Get shareable URLs instantly. 100% free image hosting with no sign-up required.`
    : 'Get shareable URLs instantly. 100% free image hosting with no sign-up required. Supports JPG, PNG, GIF up to 10MB';

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';

  return {
    title,
    description,
    keywords: [
      'image to url',
      'image to url converter',
      'convert image to url',
      'photo to url',
      'turn image into link',
      'image link generator',
      'free image to url'
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: baseUrl,
      siteName: 'Free Image to URL Converter',
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fileName || 'Shared image',
        }
      ] : [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'ImageURL - Image to URL Converter Tool',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  keywords: string[] = []
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  const fullUrl = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords: [
      'image to url',
      'image to url converter',
      'convert image to url',
      'photo to url',
      'turn image into link',
      'image link generator',
      ...keywords
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: fullUrl,
      siteName: 'Free Image to URL Converter',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// Core Web Vitals optimization utilities
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Preload critical images
    const logoImg = new Image();
    logoImg.src = '/logo.png';
    
    // Prefetch likely next pages
    const prefetchLinks = ['/free-image-hosting', '/image-url-generator', '/bulk-image-upload'];
    prefetchLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }
};

// Optimize images for better Core Web Vitals
export const optimizeImageLoading = () => {
  if (typeof window !== 'undefined') {
    // Add loading="lazy" to images below the fold
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (index > 2) { // First 3 images load eagerly
        img.loading = 'lazy';
      }
    });

    // Add proper aspect ratios to prevent layout shift
    const uploadedImages = document.querySelectorAll('.uploaded-image');
    uploadedImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.style.aspectRatio = '16/9';
        img.style.objectFit = 'cover';
      }
    });
  }
};

// Performance monitoring for Core Web Vitals
export const measureWebVitals = () => {
  if (typeof window !== 'undefined' && 'performance' in window && 'PerformanceObserver' in window) {
    try {
      // Measure Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          console.log('LCP:', lastEntry.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Measure First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          // Type assertion for first-input entries which have processingStart
          const fidEntry = entry as any;
          if (fidEntry.processingStart && fidEntry.startTime) {
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Measure Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          // Type assertion for layout-shift entries which have value and hadRecentInput
          const clsEntry = entry as any;
          if (clsEntry.value !== undefined && !clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        });
        console.log('CLS:', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }
  }
};
