import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Image to URL Converter',
  description: 'Get in touch with our team for support, questions, or feedback. We\'re here to help you with our free image hosting service.',
  openGraph: {
    title: 'Contact Us - Image to URL Converter',
    description: 'Get in touch with our team for support, questions, or feedback. We\'re here to help you with our free image hosting service.',
    type: 'website',
    url: '/contact',
    siteName: 'Free Image to URL Converter',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Us - Image to URL Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Image to URL Converter',
    description: 'Get in touch with our team for support, questions, or feedback. We\'re here to help you with our free image hosting service.',
    creator: '@imageurl',
    site: '@imageurl',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
