'use client';

import { useEffect } from 'react';
import { preloadCriticalResources, optimizeImageLoading, measureWebVitals } from '@/lib/metadata';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources();

    // Optimize image loading after component mount
    const timer = setTimeout(() => {
      optimizeImageLoading();
    }, 100);

    // Measure Web Vitals in development
    if (process.env.NODE_ENV === 'development') {
      measureWebVitals();
    }

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}
