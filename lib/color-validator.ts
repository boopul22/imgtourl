/**
 * Color Validation Utility
 * 
 * This utility helps ensure that only brand colors are used throughout the application.
 * It provides validation functions and development tools to catch non-brand color usage.
 */

import { BRAND_COLORS, BRAND_CLASSES, SEMANTIC_COLORS } from './brand-colors';

// List of forbidden color classes that should not be used
const FORBIDDEN_COLORS = [
  // Blue variants
  'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900',
  'text-blue-50', 'text-blue-100', 'text-blue-200', 'text-blue-300', 'text-blue-400', 'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900',
  'border-blue-50', 'border-blue-100', 'border-blue-200', 'border-blue-300', 'border-blue-400', 'border-blue-500', 'border-blue-600', 'border-blue-700', 'border-blue-800', 'border-blue-900',
  
  // Purple variants
  'bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900',
  'text-purple-50', 'text-purple-100', 'text-purple-200', 'text-purple-300', 'text-purple-400', 'text-purple-500', 'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900',
  'border-purple-50', 'border-purple-100', 'border-purple-200', 'border-purple-300', 'border-purple-400', 'border-purple-500', 'border-purple-600', 'border-purple-700', 'border-purple-800', 'border-purple-900',
  
  // Green variants
  'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900',
  'text-green-50', 'text-green-100', 'text-green-200', 'text-green-300', 'text-green-400', 'text-green-500', 'text-green-600', 'text-green-700', 'text-green-800', 'text-green-900',
  'border-green-50', 'border-green-100', 'border-green-200', 'border-green-300', 'border-green-400', 'border-green-500', 'border-green-600', 'border-green-700', 'border-green-800', 'border-green-900',
  
  // Red variants
  'bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900',
  'text-red-50', 'text-red-100', 'text-red-200', 'text-red-300', 'text-red-400', 'text-red-500', 'text-red-600', 'text-red-700', 'text-red-800', 'text-red-900',
  'border-red-50', 'border-red-100', 'border-red-200', 'border-red-300', 'border-red-400', 'border-red-500', 'border-red-600', 'border-red-700', 'border-red-800', 'border-red-900',
  
  // Other color variants
  'bg-yellow-500', 'bg-yellow-600', 'text-yellow-500', 'text-yellow-600',
  'bg-indigo-500', 'bg-indigo-600', 'text-indigo-500', 'text-indigo-600',
  'bg-pink-500', 'bg-pink-600', 'text-pink-500', 'text-pink-600',
  'bg-teal-500', 'bg-teal-600', 'text-teal-500', 'text-teal-600',
  'bg-cyan-500', 'bg-cyan-600', 'text-cyan-500', 'text-cyan-600',
  'bg-emerald-500', 'bg-emerald-600', 'text-emerald-500', 'text-emerald-600',
  'bg-violet-500', 'bg-violet-600', 'text-violet-500', 'text-violet-600',
  
  // Gradient classes
  'bg-gradient-to-r', 'bg-gradient-to-l', 'bg-gradient-to-t', 'bg-gradient-to-b',
  'bg-gradient-to-tr', 'bg-gradient-to-tl', 'bg-gradient-to-br', 'bg-gradient-to-bl',
  'from-blue-', 'from-purple-', 'from-green-', 'from-red-', 'from-yellow-', 'from-indigo-', 'from-pink-', 'from-teal-', 'from-cyan-',
  'to-blue-', 'to-purple-', 'to-green-', 'to-red-', 'to-yellow-', 'to-indigo-', 'to-pink-', 'to-teal-', 'to-cyan-',
  'via-blue-', 'via-purple-', 'via-green-', 'via-red-', 'via-yellow-', 'via-indigo-', 'via-pink-', 'via-teal-', 'via-cyan-',
  
  // Shadow classes (for flat design)
  'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl',
  'drop-shadow-sm', 'drop-shadow', 'drop-shadow-md', 'drop-shadow-lg', 'drop-shadow-xl', 'drop-shadow-2xl',
] as const;

// Allowed brand color classes
const ALLOWED_BRAND_CLASSES = [
  'bg-brand-beige', 'bg-brand-orange', 'bg-brand-blue-gray', 'bg-brand-black',
  'text-brand-beige', 'text-brand-orange', 'text-brand-blue-gray', 'text-brand-black',
  'border-brand-beige', 'border-brand-orange', 'border-brand-blue-gray', 'border-brand-black',
  'bg-background', 'bg-foreground', 'bg-card', 'bg-card-foreground', 'bg-popover', 'bg-popover-foreground',
  'bg-primary', 'bg-primary-foreground', 'bg-secondary', 'bg-secondary-foreground',
  'bg-muted', 'bg-muted-foreground', 'bg-accent', 'bg-accent-foreground',
  'bg-destructive', 'bg-destructive-foreground', 'bg-border', 'bg-input', 'bg-ring',
  'text-background', 'text-foreground', 'text-card', 'text-card-foreground', 'text-popover', 'text-popover-foreground',
  'text-primary', 'text-primary-foreground', 'text-secondary', 'text-secondary-foreground',
  'text-muted', 'text-muted-foreground', 'text-accent', 'text-accent-foreground',
  'text-destructive', 'text-destructive-foreground', 'text-border', 'text-input', 'text-ring',
  'border-background', 'border-foreground', 'border-card', 'border-card-foreground', 'border-popover', 'border-popover-foreground',
  'border-primary', 'border-primary-foreground', 'border-secondary', 'border-secondary-foreground',
  'border-muted', 'border-muted-foreground', 'border-accent', 'border-accent-foreground',
  'border-destructive', 'border-destructive-foreground', 'border-border', 'border-input', 'border-ring',
] as const;

/**
 * Validates if a className contains only brand-approved colors
 */
export function validateBrandColors(className: string): {
  isValid: boolean;
  violations: string[];
  suggestions: string[];
} {
  const classes = className.split(' ').filter(Boolean);
  const violations: string[] = [];
  const suggestions: string[] = [];
  
  for (const cls of classes) {
    // Check for exact forbidden matches
    if (FORBIDDEN_COLORS.some(forbidden => cls.includes(forbidden))) {
      violations.push(cls);
      
      // Provide suggestions for common violations
      if (cls.includes('blue-500') || cls.includes('blue-600')) {
        suggestions.push('Use bg-brand-blue-gray or bg-primary instead');
      } else if (cls.includes('green-500') || cls.includes('green-600')) {
        suggestions.push('Use bg-brand-orange for success states');
      } else if (cls.includes('purple-500') || cls.includes('purple-600')) {
        suggestions.push('Use bg-brand-blue-gray or bg-accent instead');
      } else if (cls.includes('gradient')) {
        suggestions.push('Use solid brand colors instead of gradients');
      } else if (cls.includes('shadow')) {
        suggestions.push('Remove shadows for flat design - use borders or color contrast instead');
      }
    }
  }
  
  return {
    isValid: violations.length === 0,
    violations,
    suggestions: Array.from(new Set(suggestions)), // Remove duplicates
  };
}

/**
 * Development helper to log color violations
 */
export function logColorViolations(className: string, componentName: string): void {
  if (process.env.NODE_ENV !== 'development') return;
  
  const validation = validateBrandColors(className);
  
  if (!validation.isValid) {
    console.group(`🎨 Color Violation in ${componentName}`);
    console.warn('Forbidden colors found:', validation.violations);
    if (validation.suggestions.length > 0) {
      console.info('Suggestions:', validation.suggestions);
    }
    console.info('Use brand colors from lib/brand-colors.ts instead');
    console.groupEnd();
  }
}

/**
 * React hook for validating colors in development
 */
export function useBrandColorValidation(className: string, componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    logColorViolations(className, componentName);
  }
}

/**
 * Get recommended brand color replacement for a forbidden color
 */
export function getBrandColorReplacement(forbiddenColor: string): string {
  const replacements: Record<string, string> = {
    'bg-blue-500': 'bg-brand-blue-gray',
    'bg-blue-600': 'bg-brand-blue-gray',
    'bg-purple-500': 'bg-brand-blue-gray',
    'bg-purple-600': 'bg-brand-blue-gray',
    'bg-green-500': 'bg-brand-orange',
    'bg-green-600': 'bg-brand-orange',
    'text-blue-500': 'text-brand-blue-gray',
    'text-blue-600': 'text-brand-blue-gray',
    'text-purple-500': 'text-brand-blue-gray',
    'text-purple-600': 'text-brand-blue-gray',
    'text-green-500': 'text-brand-orange',
    'text-green-600': 'text-brand-orange',
    'text-red-500': 'text-destructive',
    'text-red-600': 'text-destructive',
  };
  
  return replacements[forbiddenColor] || 'Check brand-colors.ts for appropriate replacement';
}

/**
 * Utility to scan a file for color violations (for build-time checking)
 */
export function scanFileForColorViolations(fileContent: string, fileName: string): {
  violations: Array<{
    line: number;
    content: string;
    violations: string[];
    suggestions: string[];
  }>;
} {
  const lines = fileContent.split('\n');
  const violations: Array<{
    line: number;
    content: string;
    violations: string[];
    suggestions: string[];
  }> = [];
  
  lines.forEach((line, index) => {
    const classNameMatch = line.match(/className\s*=\s*["'`]([^"'`]+)["'`]/);
    if (classNameMatch) {
      const className = classNameMatch[1];
      const validation = validateBrandColors(className);
      
      if (!validation.isValid) {
        violations.push({
          line: index + 1,
          content: line.trim(),
          violations: validation.violations,
          suggestions: validation.suggestions,
        });
      }
    }
  });
  
  return { violations };
}

// Export validation constants for external use
export { FORBIDDEN_COLORS, ALLOWED_BRAND_CLASSES };
