import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, Share2, Tag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import StructuredData from '@/components/seo/StructuredData';
import BlogJsonLd from '@/components/seo/BlogJsonLd';
import { getPublishedPosts, getBlogPostBySlug, getRelatedPosts } from '@/lib/blog-storage';
import BlogPostCard from '@/components/blog/BlogPostCard';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { generateBlogPostMetadata } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | ImageURL Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  // Use dynamic SEO automation
  return generateBlogPostMetadata(post);
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}





export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);


  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title }
  ];

  return (
    <>
      <StructuredData type="article" data={post} />
      <BlogJsonLd post={post} />
      <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        {/* Back to Blog */}
        <Link href="/blog" className="inline-flex items-center text-brand-orange hover:text-brand-orange/80 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>

            {post.featuredImage && (
              <div className="aspect-video overflow-hidden rounded-lg">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <section className="mb-12">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 md:p-10 lg:p-12">
            <div
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>


        {/* Tags */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span>Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-brand-blue-gray/10 text-brand-blue-gray text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost} variant="compact" />
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16">
          <Card className="p-8 bg-brand-beige/20 dark:bg-brand-blue-gray/10 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Try ImageURL?</h3>
            <p className="text-muted-foreground mb-6">
              Experience fast, reliable image hosting with automatic optimization and permanent links.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-image-hosting">
                <Button className="bg-brand-orange hover:bg-brand-orange/90">
                  Start Uploading Free
                </Button>
              </Link>
              <Link href="/bulk-image-upload">
                <Button variant="outline">
                  Try Bulk Upload
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </article>
    </>
  );
}
