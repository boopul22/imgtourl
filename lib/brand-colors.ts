/**
 * Centralized Brand Color Management System
 * 
 * This file contains all brand colors and their semantic mappings to ensure
 * consistent usage throughout the application. All components should use
 * these predefined color combinations instead of hardcoded colors.
 */

// Core Brand Colors (Hex values for reference)
export const BRAND_COLORS = {
  beige: '#E9E3DF',
  orange: '#FF7A30', 
  blueGray: '#465C88',
  black: '#000000',
  white: '#FFFFFF',
} as const;

// Tailwind CSS class mappings for brand colors
export const BRAND_CLASSES = {
  // Background Colors
  backgrounds: {
    primary: 'bg-background',
    card: 'bg-card',
    accent: 'bg-brand-beige/40 dark:bg-brand-blue-gray/10',
    subtle: 'bg-brand-beige/20 dark:bg-brand-blue-gray/5',
    muted: 'bg-muted',
  },
  
  // Text Colors
  text: {
    primary: 'text-foreground',
    secondary: 'text-brand-blue-gray',
    muted: 'text-muted-foreground',
    accent: 'text-brand-orange',
    onPrimary: 'text-white',
    onSecondary: 'text-brand-blue-gray',
  },
  
  // Button Colors
  buttons: {
    primary: 'bg-brand-orange hover:bg-brand-orange/90 text-white border-0',
    secondary: 'bg-brand-beige hover:bg-brand-beige/80 text-brand-blue-gray border border-brand-blue-gray/20',
    accent: 'bg-brand-blue-gray hover:bg-brand-blue-gray/90 text-white border-0',
    muted: 'bg-muted hover:bg-muted/80 text-muted-foreground',
    outline: 'border border-brand-orange/30 hover:border-brand-orange hover:bg-brand-orange/10 text-brand-blue-gray',
  },
  
  // Border Colors
  borders: {
    default: 'border-border',
    subtle: 'border-brand-beige/50 dark:border-brand-blue-gray/20',
    accent: 'border-brand-orange/30',
    focus: 'border-brand-orange',
  },
  
  // Icon Colors
  icons: {
    primary: 'text-brand-orange',
    secondary: 'text-brand-blue-gray', 
    muted: 'text-muted-foreground',
    onPrimary: 'text-white',
    success: 'text-brand-orange', // Using orange instead of green
    error: 'text-destructive',
  },
  
  // Status Colors (using brand palette)
  status: {
    success: {
      bg: 'bg-brand-beige/50 dark:bg-brand-blue-gray/20',
      text: 'text-brand-orange',
      border: 'border-brand-orange/30',
    },
    info: {
      bg: 'bg-brand-beige/30 dark:bg-brand-blue-gray/10',
      text: 'text-brand-blue-gray',
      border: 'border-brand-blue-gray/30',
    },
    warning: {
      bg: 'bg-brand-beige/40 dark:bg-brand-blue-gray/15',
      text: 'text-brand-orange',
      border: 'border-brand-orange/40',
    },
  },
  
  // Interactive States
  interactive: {
    hover: 'hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10',
    active: 'active:bg-brand-beige/30 dark:active:bg-brand-blue-gray/15',
    focus: 'focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-1',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },
  
  // Card Variants
  cards: {
    default: 'bg-card border border-brand-beige/50 dark:border-brand-blue-gray/20',
    hover: 'transition-colors duration-200 hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10',
    accent: 'bg-brand-beige/30 dark:bg-brand-blue-gray/10 border border-brand-beige dark:border-brand-blue-gray/30',
  },
} as const;

// Semantic color combinations for specific use cases
export const SEMANTIC_COLORS = {
  // Upload Zone
  uploadZone: {
    container: `${BRAND_CLASSES.cards.default} ${BRAND_CLASSES.interactive.hover}`,
    dragActive: 'border-brand-orange bg-brand-orange/10 scale-[1.02]',
    icon: 'bg-brand-orange',
    iconText: BRAND_CLASSES.text.onPrimary,
    title: BRAND_CLASSES.text.primary,
    subtitle: BRAND_CLASSES.text.secondary,
    info: `${BRAND_CLASSES.backgrounds.accent} ${BRAND_CLASSES.text.secondary}`,
  },
  
  // File Preview
  filePreview: {
    container: `${BRAND_CLASSES.cards.default} ${BRAND_CLASSES.interactive.hover}`,
    removeButton: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground',
    progressOverlay: 'bg-black/50',
    successIcon: BRAND_CLASSES.icons.success,
    errorIcon: BRAND_CLASSES.icons.error,
  },
  
  // Action Buttons
  actions: {
    upload: BRAND_CLASSES.buttons.primary,
    copy: BRAND_CLASSES.buttons.accent,
    view: BRAND_CLASSES.buttons.secondary,
    share: BRAND_CLASSES.buttons.muted,
    bulk: BRAND_CLASSES.buttons.accent,
  },
  
  // Results Display
  results: {
    container: `${BRAND_CLASSES.cards.accent}`,
    successBadge: `${BRAND_CLASSES.status.success.bg} ${BRAND_CLASSES.status.success.text}`,
    linkInput: `${BRAND_CLASSES.backgrounds.muted} ${BRAND_CLASSES.text.primary}`,
  },
} as const;

// Utility functions for dynamic color application
export const getBrandColorClass = (
  category: keyof typeof BRAND_CLASSES,
  variant: string
): string => {
  const categoryColors = BRAND_CLASSES[category] as Record<string, string>;
  return categoryColors[variant] || '';
};

export const getSemanticColorClass = (
  component: keyof typeof SEMANTIC_COLORS,
  element: string
): string => {
  const componentColors = SEMANTIC_COLORS[component] as Record<string, string>;
  return componentColors[element] || '';
};

// Validation function to ensure only brand colors are used
export const validateBrandColor = (className: string): boolean => {
  const forbiddenColors = [
    'blue-500', 'blue-600', 'purple-500', 'purple-600', 
    'green-500', 'green-600', 'teal-500', 'cyan-600',
    'pink-500', 'red-500', 'yellow-500', 'indigo-500'
  ];
  
  return !forbiddenColors.some(color => className.includes(color));
};

// Development helper to log non-brand colors (for debugging)
export const logNonBrandColors = (className: string, componentName: string): void => {
  if (process.env.NODE_ENV === 'development' && !validateBrandColor(className)) {
    console.warn(`⚠️ Non-brand color detected in ${componentName}: ${className}`);
  }
};
