import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get Help & Support | ImageURL',
  description: 'Need help with image hosting or have questions? Contact our support team for technical assistance, feature requests, and general inquiries about our free image to URL service.',
  keywords: [
    'contact support',
    'image hosting help',
    'technical support',
    'customer service',
    'help center',
    'support team',
    'contact form',
    'get help',
    'image hosting support',
    'imageurl contact'
  ],
  openGraph: {
    title: 'Contact Us - Get Help & Support | ImageURL',
    description: 'Need help with image hosting or have questions? Contact our support team for technical assistance and general inquiries.',
    type: 'website',
    url: '/contact',
    siteName: 'Free Image to URL Converter',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Us - ImageURL Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get Help & Support | ImageURL',
    description: 'Need help with image hosting or have questions? Contact our support team for technical assistance.',
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
