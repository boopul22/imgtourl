'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { REDUCED_MOTION } from '@/lib/animations';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight';
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Simple component that reveals content when scrolled into view
 */
export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className,
      animation = 'fade',
      delay = 0,
      threshold = 0.1,
      rootMargin = '0px 0px -50px 0px',
      triggerOnce = true,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const { elementRef, isInView } = useScrollAnimation({
      threshold,
      rootMargin,
      triggerOnce,
      delay,
    });

    // Combine refs if both are provided
    const combinedRef = (node: HTMLDivElement) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }
      if (elementRef) {
        (elementRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    const getAnimationClasses = () => {
      const baseClasses = 'transition-all duration-700 ease-out';
      
      if (!isInView) {
        switch (animation) {
          case 'slideUp':
            return `${baseClasses} opacity-0 translate-y-8`;
          case 'slideLeft':
            return `${baseClasses} opacity-0 -translate-x-8`;
          case 'slideRight':
            return `${baseClasses} opacity-0 translate-x-8`;
          default:
            return `${baseClasses} opacity-0`;
        }
      }
      
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
    };

    return React.createElement(
      Component,
      {
        ref: combinedRef,
        className: cn(getAnimationClasses(), REDUCED_MOTION.respectMotion, className),
        ...props,
      },
      children
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';
