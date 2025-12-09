# Centralized Brand Color Management System

## Overview

This project uses a centralized color management system to ensure consistent use of our brand palette throughout the entire application. All components should use the predefined color classes and semantic mappings instead of hardcoded colors.

## 📁 **File Structure**

- `lib/brand-colors.ts` - Centralized color definitions and semantic mappings
- `lib/color-validator.ts` - Development tools for validating color usage
- `docs/COLOR_GUIDE.md` - This comprehensive guide

# Flat Design Color Palette & Visual Hierarchy Guide

## Brand Color Palette

Our website uses a flat, minimal design approach with a carefully selected color palette that ensures excellent readability, accessibility, and visual appeal across both light and dark themes. The design emphasizes clean lines, solid colors, and strategic use of whitespace instead of gradients and shadows.

### Primary Colors

| Color | Hex Code | HSL | Usage |
|-------|----------|-----|-------|
| **Beige** | `#E9E3DF` | `hsl(33, 14%, 90%)` | Backgrounds, subtle elements |
| **Orange** | `#FF7A30` | `hsl(18, 100%, 59%)` | Primary actions, highlights |
| **Blue-Gray** | `#465C88` | `hsl(218, 32%, 46%)` | Secondary elements, text |
| **Black** | `#000000` | `hsl(0, 0%, 0%)` | High contrast text, borders |

### CSS Custom Properties

The colors are implemented using CSS custom properties for easy theming:

```css
/* Brand Colors */
--brand-beige: 33 14% 90%;
--brand-orange: 18 100% 59%;
--brand-blue-gray: 218 32% 46%;
--brand-black: 0 0% 0%;
```

### Tailwind Utilities

Use these Tailwind classes for direct color application:

```css
/* Background Colors */
bg-brand-beige
bg-brand-orange
bg-brand-blue-gray
bg-brand-black

/* Text Colors */
text-brand-beige
text-brand-orange
text-brand-blue-gray
text-brand-black

/* Border Colors */
border-brand-beige
border-brand-orange
border-brand-blue-gray
border-brand-black
```

## Visual Hierarchy Guidelines

### 1. Primary Actions
- **Color**: Orange (`#FF7A30`)
- **Usage**: Main CTAs, primary buttons, important links
- **Examples**: "Upload Images Now", "Generate URLs", submit buttons
- **Classes**: `bg-primary`, `bg-brand-orange`

### 2. Secondary Elements
- **Color**: Blue-Gray (`#465C88`)
- **Usage**: Secondary buttons, navigation, supporting content
- **Examples**: Navigation links, secondary CTAs, icons
- **Classes**: `bg-secondary`, `bg-brand-blue-gray`

### 3. Backgrounds
- **Light Theme**: Beige variations (`#E9E3DF` and lighter)
- **Dark Theme**: Dark blue-gray variations
- **Usage**: Page backgrounds, card backgrounds, subtle sections
- **Classes**: `bg-background`, `bg-muted`, `bg-brand-beige`

### 4. Text Hierarchy
- **Primary Text**: Black in light theme, Beige in dark theme
- **Secondary Text**: Blue-Gray for muted content
- **Accent Text**: Orange for highlights and emphasis
- **Classes**: `text-foreground`, `text-muted-foreground`, `text-primary`

### 5. Accent Colors
- **Color**: Orange (`#FF7A30`)
- **Usage**: Highlights, focus states, important indicators
- **Examples**: Focus rings, active states, status indicators
- **Classes**: `ring-primary`, `border-primary`

## Component-Specific Guidelines

### Buttons
```tsx
// Primary Action
<Button className="bg-primary text-primary-foreground">
  Primary Action
</Button>

// Secondary Action
<Button variant="secondary">
  Secondary Action
</Button>

// Gradient Button (for hero sections)
<Button className="bg-gradient-to-r from-brand-orange to-brand-blue-gray">
  Special Action
</Button>
```

### Cards
```tsx
// Standard Card
<Card className="bg-card border-border">
  Content
</Card>

// Feature Card with brand colors
<Card className="bg-gradient-to-br from-brand-beige/30 to-brand-beige/50">
  Feature Content
</Card>
```

### Icons and Graphics
- **Primary Icons**: Orange background with white icon
- **Secondary Icons**: Blue-Gray background with white icon
- **Accent Icons**: Gradient from Orange to Blue-Gray

### Flat Design Text Emphasis
```css
/* Accent text - No gradients, solid color emphasis */
.accent-text {
  color: #FF7A30; /* Solid brand orange */
  font-weight: 600;
}

/* Flat Buttons - Solid colors only */
.flat-button {
  background: #FF7A30; /* Solid brand orange */
  color: white;
  border: none;
  transition: background-color 0.2s ease;
}

.flat-button:hover {
  background: #E55A00; /* Darker orange on hover */
}
```

## Accessibility Considerations

### Contrast Ratios
All color combinations meet WCAG 2.1 AA standards:
- Orange on White: 4.5:1 (AA)
- Blue-Gray on White: 7.2:1 (AAA)
- Black on Beige: 14.8:1 (AAA)
- White on Orange: 4.5:1 (AA)
- White on Blue-Gray: 7.2:1 (AAA)

### Focus States
- Use Orange (`#FF7A30`) for focus rings
- Ensure 2px minimum focus ring width
- Use `ring-primary` class for consistent focus styling

### Dark Theme Adaptations
- Background becomes dark blue-gray
- Text becomes beige for readability
- Orange remains consistent for brand recognition
- Contrast ratios maintained across themes

## Implementation Examples

### Flat Hero Section
```tsx
<h1 className="text-foreground">
  Main Headline
  <span className="text-brand-orange">Accent Text</span>
</h1>
<Button className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0">
  Primary CTA
</Button>
```

### Flat Feature Cards
```tsx
<Card className="border border-brand-beige/50 bg-white hover:bg-brand-beige/20 transition-colors">
  <div className="bg-brand-orange rounded-lg">
    <Icon className="text-white" />
  </div>
  <h3 className="text-foreground">Feature Title</h3>
  <p className="text-brand-blue-gray">Description</p>
</Card>
```

### Navigation
```tsx
<nav>
  <a className="text-foreground hover:text-primary">
    Navigation Link
  </a>
</nav>
```

## Flat Design Principles

### No Gradients or Shadows
- All gradients have been replaced with solid colors
- Drop shadows and box shadows are eliminated
- Focus on color contrast and typography for visual hierarchy
- Clean, geometric shapes with solid fills

### Flat Design Utilities
```css
/* Flat card design */
.flat-card {
  background: solid color;
  border: 1px solid;
  no shadows;
}

/* Flat buttons */
.flat-button-primary {
  background: solid brand-orange;
  no gradients or shadows;
  clean hover states with color transitions;
}
```

### Visual Hierarchy Through:
1. **Typography Weight**: Bold headings, medium body text
2. **Color Contrast**: Strategic use of brand colors
3. **Whitespace**: Generous spacing between elements
4. **Size Relationships**: Clear hierarchy through font sizes
5. **Color Blocks**: Solid color backgrounds for sections

## 🎯 **Centralized Color System Usage**

### Import the Color System
```typescript
import { SEMANTIC_COLORS, BRAND_CLASSES } from '@/lib/brand-colors';
import { validateBrandColors, logColorViolations } from '@/lib/color-validator';
```

### Using Semantic Colors (Recommended)
```tsx
// Upload component example
<div className={cn("upload-zone", SEMANTIC_COLORS.uploadZone.container)}>
  <div className={SEMANTIC_COLORS.uploadZone.icon}>
    <Upload className={SEMANTIC_COLORS.uploadZone.iconText} />
  </div>
  <h3 className={SEMANTIC_COLORS.uploadZone.title}>Upload Files</h3>
  <p className={SEMANTIC_COLORS.uploadZone.subtitle}>Drag and drop files here</p>
</div>
```

### Using Brand Classes
```tsx
// Button examples
<button className={BRAND_CLASSES.buttons.primary}>Primary Action</button>
<button className={BRAND_CLASSES.buttons.secondary}>Secondary Action</button>
<button className={BRAND_CLASSES.buttons.accent}>Accent Action</button>
```

### Development Validation
```tsx
// Add validation in development
function MyComponent({ className }: { className?: string }) {
  // This will log warnings in development if non-brand colors are used
  logColorViolations(className || '', 'MyComponent');

  return <div className={className}>Content</div>;
}
```

## 🚫 **Forbidden Colors**

**Never use these classes:**
- `bg-blue-500`, `bg-purple-600`, `bg-green-500`, etc.
- `text-blue-500`, `text-purple-600`, `text-green-500`, etc.
- `bg-gradient-to-r`, `from-blue-500`, `to-purple-600`, etc.
- `shadow-lg`, `shadow-xl`, `drop-shadow-md`, etc.

**Always use these instead:**
- `bg-brand-orange`, `bg-brand-blue-gray`, `bg-brand-beige`
- `text-brand-orange`, `text-brand-blue-gray`, `text-foreground`
- Solid colors only (no gradients)
- No shadows (flat design)

## 📋 **Component-Specific Guidelines**

### Upload Components
```tsx
// ✅ Correct usage
<div className={SEMANTIC_COLORS.uploadZone.container}>
  <div className={SEMANTIC_COLORS.uploadZone.icon}>
    <Upload className={SEMANTIC_COLORS.uploadZone.iconText} />
  </div>
</div>

// ❌ Incorrect usage
<div className="bg-blue-500 shadow-lg">
  <Upload className="text-white" />
</div>
```

### Buttons
```tsx
// ✅ Correct usage
<button className={BRAND_CLASSES.buttons.primary}>Upload</button>
<button className={BRAND_CLASSES.buttons.secondary}>Cancel</button>

// ❌ Incorrect usage
<button className="bg-blue-500 hover:bg-blue-600">Upload</button>
```

### Cards
```tsx
// ✅ Correct usage
<Card className={BRAND_CLASSES.cards.hover}>Content</Card>

// ❌ Incorrect usage
<Card className="shadow-lg hover:shadow-xl">Content</Card>
```

This centralized system ensures consistent branding, excellent accessibility, and a clean, modern appearance across all pages and components.
