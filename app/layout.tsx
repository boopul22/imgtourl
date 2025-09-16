import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import StructuredData from '@/components/seo/StructuredData';
import HreflangTags from '@/components/seo/HreflangTags';
import { ScrollProgress, FloatingScrollButton } from '@/components/ui/scroll-progress';
import CookieConsent from '@/components/ui/cookie-consent';
import AgeVerification from '@/components/ui/age-verification';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Free Image to URL Converter - No Sign-up Required',
    template: '%s | Image to URL',
  },
  description: 'Get shareable URLs instantly. 100% free image hosting with no sign-up required. Supports JPG, PNG, GIF up to 10MB',
  icons: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png', rel: 'apple-touch-icon' },
  ],
  manifest: '/site.webmanifest',
  keywords: [
    'image to url',
    'image to url converter',
    'convert image to url',
    'photo to url',
    'picture to link',
    'free image to url',
    'turn image into link',
    'image link generator',
    'photo link creator',
    'upload image get url',
    'image to web link',
    'convert photo to url',
    'free image converter',
    'image url maker',
    'picture url generator',
    'photo to web link',
    'image hosting',
    'free image hosting',
    'upload photos online',
    'share images online',
    'image sharing tool',
    'photo sharing service',
    'web image links',
    'online image converter',
    'instant image links',
    'permanent image links',
    'shareable photo links',
    'easy image sharing',
    'embed image url free',
    'high quality image sharing',
    'anonymous image uploader',
    'quick image hosting free',
    'jpg to url converter',
    'png to url online',
    'photo url generator tool',
    'easy online image hosting',
    'no signup image upload',
    'instant image url sharing',
    'ad-free image uploader',
    'one click image sharing'
  ],
  authors: [{ name: 'ImageURL Team' }],
  creator: 'ImageURL',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Free Image to URL Converter',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Image to URL Converter - No Sign-up Required',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image to URL Converter - No Sign-up Required',
    description: 'Get shareable URLs instantly. 100% free image hosting with no sign-up required. Supports JPG, PNG, GIF up to 10MB',
    creator: '@imageurl',
    site: '@imageurl',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'xquwz1jK5sqIiFN7vc0o5sYsBLBLyAa-1VwUBXV4wDo',
  },
  other: {
    'theme-color': '#3b82f6',
    'color-scheme': 'light dark',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 default (deny until consent) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EWZ02BR7J5"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', 'G-EWZ02BR7J5');
            `,
          }}
        />
        {/* Google AdSense Auto Ads */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7803867089582138"
          crossOrigin="anonymous"
        ></script>
        <meta name="google-site-verification" content="xquwz1jK5sqIiFN7vc0o5sYsBLBLyAa-1VwUBXV4wDo" />
        <meta name="google-adsense-account" content="ca-pub-7803867089582138" />
        
        {/* Favicon Links for Maximum Compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        <meta name="msapplication-TileColor" content="#FF7A30" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//imagetourl.cloud" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FF7A30" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Internationalization */}
        <HreflangTags currentPath="/" availableLocales={['en']} />
      </head>
      <body className={inter.className}>
        {/* Skip Links for Screen Readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <a
          href="#upload-section"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to upload
        </a>

        <StructuredData type="website" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1" id="main-content">
              <div className="animate-fade-in">
                {children}
              </div>
            </main>
            <Footer />
          </div>
          <FloatingScrollButton />
          <Toaster />
          <CookieConsent />
          <AgeVerification />
        </ThemeProvider>
      </body>
    </html>
  );
}