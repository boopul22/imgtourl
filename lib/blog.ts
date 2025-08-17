export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string
  author: string;
  tags: string[];
  coverImage?: string;
  updatedAt?: string; // ISO string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'seooptmiz',
    title: 'SEOOptmiz: Practical SEO for Image Hosting and Image URL Tools',
    description:
      'Actionable on-page SEO strategies tailored for image hosting and image-to-URL tools: metadata, structured data, internal links, and performance optimizations that rank.',
    date: '2025-01-01T00:00:00.000Z',
    author: 'ImageURL Team',
    tags: ['seo', 'performance', 'image hosting', 'structured data', 'best practices'],
    coverImage: '/og-image.jpg',
    updatedAt: '2025-01-01T00:00:00.000Z'
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}