import { Metadata } from 'next';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';
import BlogListingJsonLd from '@/components/seo/BlogListingJsonLd';
import { getPublishedPosts, getFeaturedPosts as getStorageFeaturedPosts, getCategories } from '@/lib/blog-storage-supabase';
import BlogPostCard from '@/components/blog/BlogPostCard';
import Breadcrumbs from '@/components/blog/Breadcrumbs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog - Image Hosting Tips & Tutorials | ImageURL',
  description: 'Learn about image hosting, URL generation, web optimization, and digital asset management. Expert tips and tutorials for better image sharing and hosting.',
  keywords: [
    'image hosting blog',
    'image optimization tips',
    'url generation guide',
    'web performance',
    'image sharing best practices',
    'digital asset management',
    'image hosting tutorials',
    'web development tips'
  ],
  openGraph: {
    title: 'Blog - Image Hosting Tips & Tutorials | ImageURL',
    description: 'Learn about image hosting, URL generation, web optimization, and digital asset management. Expert tips and tutorials for better image sharing.',
    type: 'website',
    url: '/blog',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const allPosts = await getPublishedPosts();
  const featuredPosts = await getStorageFeaturedPosts();
  const categories = await getCategories();
  const recentPosts = allPosts.slice(0, 6);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog' }
  ];

  return (
    <>
      <StructuredData type="blog" />
      <BlogListingJsonLd posts={allPosts} />
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Image Hosting <span className="text-brand-orange">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert tips, tutorials, and best practices for image hosting, optimization, and sharing. 
            Stay updated with the latest trends in digital asset management.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} variant="featured" />
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant="default"
              size="sm"
              className="bg-brand-orange hover:bg-brand-orange/90"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="outline"
                size="sm"
                className="hover:bg-brand-orange/10 hover:text-brand-orange"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-foreground">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} variant="default" />
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 text-center">
          <Card className="p-8 bg-brand-beige/20 dark:bg-brand-blue-gray/10">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest tips and tutorials about image hosting, optimization, and web performance 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <Button className="bg-brand-orange hover:bg-brand-orange/90">
                Subscribe
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
