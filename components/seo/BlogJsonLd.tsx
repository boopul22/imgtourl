import Script from 'next/script';

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  slug: string;
  category: string;
  tags: string[];
}

interface BlogJsonLdProps {
  post: BlogPost;
}

export default function BlogJsonLd({ post }: BlogJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${baseUrl}/og-image.jpg`,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "ImageURL",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 60,
        "height": 60
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "url": `${baseUrl}/blog/${post.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "inLanguage": "en-US",
    "wordCount": post.content.split(' ').length,
    "articleBody": post.content.substring(0, 500) + "...",
    "about": {
      "@type": "Thing",
      "name": "Image Hosting",
      "description": "Free image hosting and URL generation services"
    },
    "mentions": [
      {
        "@type": "SoftwareApplication",
        "name": "ImageURL",
        "url": baseUrl,
        "applicationCategory": "UtilitiesApplication"
      }
    ]
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${baseUrl}/blog/${post.slug}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to optimize images for web performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use modern formats like WebP, compress images appropriately, implement responsive images with srcset, and use a reliable CDN for delivery. ImageURL automatically handles these optimizations."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best free image hosting service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Look for services that offer HTTPS, global CDN, automatic optimization, permanent links, and good uptime. ImageURL provides all these features with unlimited free uploads."
        }
      },
      {
        "@type": "Question",
        "name": "Why should I use URL shortening for images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "URL shortening improves user experience, enables better analytics tracking, enhances security, and provides professional branding opportunities for image sharing."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
