'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { REDUCED_MOTION } from '@/lib/animations';

/**
 * Simple scroll progress indicator
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/50 dark:bg-gray-800/50">
      <div
        className={cn(
          'h-full bg-brand-orange transition-all duration-150 ease-out',
          REDUCED_MOTION.respectMotion
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

interface FloatingScrollButtonProps {
  showAt?: number; // Show button when scrolled this percentage
}

/**
 * Floating scroll to top button
 */
export function FloatingScrollButton({ showAt = 20 }: FloatingScrollButtonProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVisible = progress > showAt;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'fixed bottom-6 right-6 z-50 p-3 bg-brand-orange text-white rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none',
        REDUCED_MOTION.respectMotion
      )}
      aria-label="Scroll to top"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
