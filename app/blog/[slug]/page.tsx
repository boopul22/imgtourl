import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostStructuredData from '@/components/seo/BlogPostStructuredData';
import { blogPosts, getPostBySlug } from '@/lib/blog';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} — ImageURL Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  const url = `${baseUrl}/blog/${post.slug}`;

  const isSeoOptmiz = post.slug === 'seooptmiz';

  return (
    <div className="container mx-auto px-4 py-10 prose prose-slate dark:prose-invert max-w-3xl">
      <h1 className="mb-2">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span className="mx-2">•</span>
        <span>{post.author}</span>
      </p>

      {isSeoOptmiz ? (
        <>
          <p>
            This guide shows how to implement practical, low-effort SEO that moves the needle for
            image hosting and image-to-URL tools. It focuses on relevance, intent coverage, and technical
            foundations you already control in your app.
          </p>

          <h2>1. Nail Search Intent With Focused Landing Pages</h2>
          <ul>
            <li>Create specific pages for intents you serve: <strong>free image hosting</strong>, <strong>image URL generator</strong>, <strong>bulk image upload</strong>.</li>
            <li>Use simple headlines that mirror search terms and reinforce benefits in the first paragraph.</li>
            <li>Add internal CTAs that guide users to upload and try the tool immediately.</li>
          </ul>

          <h2>2. Win With Media Metadata</h2>
          <ul>
            <li>Always set explicit <code>width</code>/<code>height</code> on images to avoid CLS.</li>
            <li>Compress aggressively with Sharp; serve modern formats (WebP/AVIF) where possible.</li>
            <li>Use descriptive file names and alt attributes for example assets.</li>
          </ul>

          <h2>3. Structured Data That Actually Helps</h2>
          <ul>
            <li>Use <strong>WebSite</strong> on the homepage and <strong>Service</strong> on core feature pages.</li>
            <li>Use <strong>BlogPosting</strong> on articles like this one and include a single primary image.</li>
            <li>Keep JSON-LD minimal and accurate; avoid stuffing keywords.</li>
          </ul>

          <h2>4. Internal Linking That Guides Crawlers</h2>
          <ul>
            <li>Link from the homepage hero and features to your key landing pages and docs.</li>
            <li>From this blog, link back to relevant feature pages and the uploader.</li>
            <li>Keep anchor text natural: “image URL generator”, “bulk image upload”.</li>
          </ul>

          <h2>5. Performance and Core Web Vitals</h2>
          <ul>
            <li>Ship small, static pages; statically generate blog posts.</li>
            <li>Lazy-load non-critical UI and prefer CSS-only animations where possible.</li>
            <li>Preload fonts and critical above-the-fold assets.</li>
          </ul>

          <h2>6. Practical Checklist</h2>
          <ul>
            <li>Titles ≤ 60 chars; meta descriptions 150–160 chars.</li>
            <li>One H1 per page; descriptive H2s that map to sub-intents.</li>
            <li>Canonical URLs set; sitemap includes posts and key pages.</li>
            <li>Robots allows crawling; noindex only for diagnostics and admin.</li>
          </ul>

          <p>
            Next steps: add 2–3 supporting posts targeting related terms (e.g., “how to get a link for an image”,
            “share images online safely”, “bulk upload images and get URLs”). Link them thoughtfully.
          </p>
        </>
      ) : null}

      <BlogPostStructuredData
        title={post.title}
        description={post.description}
        url={url}
        datePublished={post.date}
        dateModified={post.updatedAt || post.date}
        author={post.author}
        image={post.coverImage}
      />
    </div>
  );
}