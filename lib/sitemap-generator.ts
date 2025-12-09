import { getPublishedPosts, getCategories, getTags } from '@/lib/blog-storage-supabase';
import { generateSitemapEntry } from '@/lib/seo-utils';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

export async function generateSitemap(): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  const posts = await getPublishedPosts();
  const categories = await getCategories();
  const tags = await getTags();

  const sitemapEntries: SitemapEntry[] = [
    // Static pages
    generateSitemapEntry('/', new Date().toISOString(), 1.0),
    generateSitemapEntry('/free-image-hosting', new Date().toISOString(), 0.9),
    generateSitemapEntry('/image-url-generator', new Date().toISOString(), 0.9),
    generateSitemapEntry('/bulk-image-upload', new Date().toISOString(), 0.9),
    generateSitemapEntry('/media', new Date().toISOString(), 0.8),
    generateSitemapEntry('/blog', new Date().toISOString(), 0.8),
    generateSitemapEntry('/contact', new Date().toISOString(), 0.7),
    generateSitemapEntry('/about', new Date().toISOString(), 0.7),
    generateSitemapEntry('/privacy-policy', new Date().toISOString(), 0.6),
    generateSitemapEntry('/terms-of-service', new Date().toISOString(), 0.6),
    generateSitemapEntry('/content-guidelines', new Date().toISOString(), 0.6),
    generateSitemapEntry('/parental-consent', new Date().toISOString(), 0.6),
    
    // Blog posts
    ...posts.map(post => generateSitemapEntry(
      `/blog/${post.slug}`,
      post.updatedAt || post.publishedAt,
      0.8
    )),
    
    // Category pages
    ...categories.map(category => generateSitemapEntry(
      `/blog/category/${category.slug}`,
      new Date().toISOString(),
      0.7
    )),
    
    // Tag pages
    ...tags.map(tag => generateSitemapEntry(
      `/blog/tag/${tag.slug}`,
      new Date().toISOString(),
      0.6
    ))
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
}

export async function generateRobotsTxt(): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/

# Allow search engines to crawl CSS and JS files
Allow: /_next/static/
Allow: /static/

Sitemap: ${sitemapUrl}

# Crawl delay for polite crawling
Crawl-delay: 1

# Specific bot instructions
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Block aggressive bots
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /`;
}