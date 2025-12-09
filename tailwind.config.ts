import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Brand color classes that should always be included
    'bg-brand-beige',
    'bg-brand-orange',
    'bg-brand-blue-gray',
    'bg-brand-black',
    'text-brand-beige',
    'text-brand-orange',
    'text-brand-blue-gray',
    'text-brand-black',
    'border-brand-beige',
    'border-brand-orange',
    'border-brand-blue-gray',
    'border-brand-black',
    // Brand color variants with opacity
    'bg-brand-beige/10',
    'bg-brand-beige/20',
    'bg-brand-beige/30',
    'bg-brand-beige/40',
    'bg-brand-beige/50',
    'bg-brand-beige/80',
    'bg-brand-orange/10',
    'bg-brand-orange/20',
    'bg-brand-orange/90',
    'bg-brand-blue-gray/5',
    'bg-brand-blue-gray/10',
    'bg-brand-blue-gray/15',
    'bg-brand-blue-gray/20',
    'bg-brand-blue-gray/90',
    'border-brand-beige/50',
    'border-brand-orange/20',
    'border-brand-orange/30',
    'border-brand-orange/40',
    'border-brand-blue-gray/20',
    'border-brand-blue-gray/30',
    // Hover states
    'hover:bg-brand-beige/20',
    'hover:bg-brand-beige/30',
    'hover:bg-brand-beige/80',
    'hover:bg-brand-orange/90',
    'hover:bg-brand-blue-gray/90',
    'hover:bg-brand-orange/10',
    'hover:border-brand-orange',
    'dark:bg-brand-blue-gray/5',
    'dark:bg-brand-blue-gray/10',
    'dark:bg-brand-blue-gray/15',
    'dark:bg-brand-blue-gray/20',
    'dark:border-brand-blue-gray/20',
    'dark:border-brand-blue-gray/30',
    'dark:hover:bg-brand-blue-gray/10',
    // Focus states
    'focus-visible:outline-brand-orange',
    'outline-brand-orange',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Brand color utilities for direct usage
        brand: {
          beige: {
            DEFAULT: 'hsl(var(--brand-beige))',
            light: '#F5F1ED',
            dark: '#D4CCC4',
          },
          orange: {
            DEFAULT: 'hsl(var(--brand-orange))',
            light: '#FFB380',
            dark: '#E55A00',
          },
          'blue-gray': {
            DEFAULT: 'hsl(var(--brand-blue-gray))',
            light: '#6B7FA3',
            dark: '#2A3A5C',
          },
          black: {
            DEFAULT: 'hsl(var(--brand-black))',
          },
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'fade-out': {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
        'zoom-in': {
          from: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'zoom-out': {
          from: {
            opacity: '1',
            transform: 'scale(1)',
          },
          to: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
        },
        'slide-in-from-top': {
          from: {
            transform: 'translateY(-100%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        'slide-in-from-left': {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
        'slide-out-to-top': {
          from: {
            transform: 'translateY(0)',
          },
          to: {
            transform: 'translateY(-100%)',
          },
        },
        'slide-out-to-left': {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
        'zoom-out': 'zoom-out 0.2s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.2s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-out-to-top': 'slide-out-to-top 0.2s ease-out',
        'slide-out-to-left': 'slide-out-to-left 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.4s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
