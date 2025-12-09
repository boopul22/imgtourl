/**
 * Simple animation utilities for consistent animations across the app
 */

// Animation timing constants
export const ANIMATION_TIMING = {
  fast: '150ms',
  standard: '300ms',
  slow: '500ms',
} as const;

// Easing functions
export const ANIMATION_EASING = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  decelerated: 'cubic-bezier(0, 0, 0.2, 1)',
} as const;

// Pre-built animation class combinations
export const ANIMATION_CLASSES = {
  fadeIn: 'animate-fade-in',
  fadeInUp: 'animate-fade-in-up',
} as const;

// Hover effect classes
export const HOVER_EFFECTS = {
  scaleSubtle: 'transition-transform duration-200 ease-out hover:scale-105',
  scaleButton: 'transition-transform duration-150 ease-out hover:scale-105 active:scale-95',
  lift: 'transition-all duration-200 ease-out hover:translate-y-[-2px] hover:shadow-lg',
  colorShift: 'transition-colors duration-200 ease-out',
} as const;

// Focus effect classes
export const FOCUS_EFFECTS = {
  ring: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2',
  ringSubtle: 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-1',
} as const;

// Accessibility utilities
export const REDUCED_MOTION = {
  respectMotion: 'motion-reduce:animate-none motion-reduce:transition-none',
  reducedMotion: 'motion-reduce:duration-0',
} as const;
