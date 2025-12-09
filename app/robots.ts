import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/debug/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/blog/', '/blog/*', '/free-image-hosting', '/bulk-image-upload', '/image-url-generator'],
        disallow: ['/api/', '/admin/', '/_next/', '/debug/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
