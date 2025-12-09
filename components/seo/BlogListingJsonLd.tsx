import Script from 'next/script';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  slug: string;
  category: string;
  tags: string[];
}

interface BlogListingJsonLdProps {
  posts: BlogPost[];
}

export default function BlogListingJsonLd({ posts }: BlogListingJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ImageURL Blog - Image Hosting Tips & Tutorials",
    "description": "Expert tips, tutorials, and best practices for image hosting, optimization, and sharing. Stay updated with the latest trends in digital asset management.",
    "url": `${baseUrl}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "ImageURL",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 60,
        "height": 60
      },
      "url": baseUrl
    },
    "inLanguage": "en-US",
    "keywords": "image hosting, image optimization, url generation, web performance, digital asset management",
    "blogPost": posts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "datePublished": post.publishedAt,
      "url": `${baseUrl}/blog/${post.slug}`,
      "articleSection": post.category,
      "keywords": post.tags.join(", ")
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ImageURL Blog",
    "url": `${baseUrl}/blog`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ImageURL",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    }
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Image Hosting Blog - Tips & Tutorials",
    "description": "Comprehensive collection of articles about image hosting, optimization, and web performance.",
    "url": `${baseUrl}/blog`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.slice(0, 10).map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "url": `${baseUrl}/blog/${post.slug}`,
          "datePublished": post.publishedAt,
          "author": {
            "@type": "Organization",
            "name": post.author
          }
        }
      }))
    }
  };

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      <Script
        id="blog-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        id="blog-website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="blog-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
    </>
  );
}
