import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Guides and Updates for Image Hosting and SEO',
  description:
    'Practical guides on image hosting, performance, and SEO for image-to-URL tools. Read our latest posts and updates.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog - ImageURL',
    description:
      'Guides on image hosting, performance, and SEO for image-to-URL tools.',
    url: '/blog',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <p className="text-muted-foreground mb-8">
        Guides and best practices on image hosting, performance, and SEO.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-5 hover:shadow-sm transition-shadow">
            <div className="text-xs text-muted-foreground mb-2">
              {new Date(post.date).toLocaleDateString()}
            </div>
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-muted-foreground">{post.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}