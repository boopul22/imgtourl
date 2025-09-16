/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: false },
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://imagetourl.cloud/:path*',
        permanent: true,
      },
      // Redirect old/common variations of URLs
      {
        source: '/media',
        destination: '/admin/login',
        permanent: false,
      },
      {
        source: '/gallery',
        destination: '/',
        permanent: true,
      },
      {
        source: '/documentation',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/help',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/legal',
        destination: '/privacy-policy',
        permanent: true,
      },
      // Handle common misspellings
      {
        source: '/privacypolicy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/termsofservice',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/contentguidelines',
        destination: '/content-guidelines',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
