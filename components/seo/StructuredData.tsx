import Script from 'next/script';
import { generateLocalBusinessSchema, generateImageObjectSchema } from '@/lib/seo-utils';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  slug: string;
  category: string;
  tags: string[];
}

interface ImageObject {
  url: string;
  name: string;
  description?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type?: 'website' | 'service' | 'faq' | 'blog' | 'article' | 'localbusiness' | 'imageobject' | 'breadcrumb' | 'howto' | 'recipe' | 'review' | 'event' | 'video';
  data?: BlogPost | ImageObject | BreadcrumbItem[] | any;
  breadcrumbs?: BreadcrumbItem[];
}

export default function StructuredData({ type = 'website', data }: StructuredDataProps) {
  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ImageURL - Image to URL Converter",
    "alternateName": "Free Image to URL Tool",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud",
    "description": "Free image to URL converter tool. Upload any photo and get a web link instantly. Simple, fast, and works everywhere. Turn photos into shareable links in seconds.",
    "keywords": "image to url, image to url converter, convert image to url, photo to url, turn image into link, free image to url, photo link generator",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ImageURL",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/logo.png`
      }
    }
  });

  const getServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Image to URL Converter",
    "description": "Easy image to URL converter tool. Upload any photo and get a web link instantly. Free, simple, and works everywhere. Turn your pictures into shareable links in seconds.",
    "provider": {
      "@type": "Organization",
      "name": "ImageURL",
      "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"
    },
    "serviceType": "Image to URL Converter",
    "category": "Web Tool",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free image to URL conversion with unlimited uploads"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Image Hosting Features",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Image to URL Converter",
            "description": "Turn photos into web links instantly with easy upload"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Multiple Photo to URL",
            "description": "Upload many photos at once and get web links for all"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Safe Photo Upload",
            "description": "Keep your photos safe and secure when creating web links"
          }
        }
      ]
    },
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud",
      "serviceSmsNumber": null,
      "servicePhone": null
    }
  });

  const getFAQSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I turn my photo into a URL for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Turning photos into URLs is completely free and easy! Just drag your picture into our upload area or click to choose a file from your computer. Our image to URL converter will give you a web link in seconds. No need to sign up or create an account."
        }
      },
      {
        "@type": "Question",
        "name": "What's the best way to get a link for my image?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our free image to URL tool is the easiest way to get links for your pictures. You can upload any photo type (JPG, PNG, GIF, etc.) and get a permanent web link that works everywhere. Just upload and copy your link - it's that simple!"
        }
      },
      {
        "@type": "Question",
        "name": "Can I share my photos online without creating an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can upload and share photos without any account. Just upload your picture (up to 10MB), get your web link instantly, and share it anywhere you want. Perfect for social media, messaging, or showing photos to friends and family."
        }
      },
      {
        "@type": "Question",
        "name": "How to host images for blog with no registration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Host images for your blog without any registration using our no signup image upload service. Simply upload your photos, get permanent image links, and embed them directly in your blog posts."
        }
      },
      {
        "@type": "Question",
        "name": "How to convert JPG to URL online instantly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Convert JPG to URL online instantly using our JPG to URL converter. Simply upload your JPG file, and our system will generate a shareable URL within seconds with automatic optimization."
        }
      }
    ]
  });

  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ImageURL",
    "alternateName": "Free Image Hosting Service",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud",
    "logo": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/logo.png`,
    "description": "Leading free image hosting service providing instant URL generation for images. Best image to URL converter with unlimited free uploads.",
    "foundingDate": "2025",
    "sameAs": [
      "https://twitter.com/imageurl",
      "https://github.com/imageurl"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  });

  const getSoftwareApplicationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ImageURL - Free Image to URL Converter",
    "operatingSystem": "Web Browser",
    "applicationCategory": "UtilitiesApplication",
    "description": "Free online image hosting tool that converts images to shareable URLs instantly. Upload photos and get permanent links with drag & drop interface.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Instant image link generator",
      "Drag & drop image upload",
      "Bulk image URL generator",
      "Secure image upload tool",
      "Anonymous image uploader",
      "Unlimited free image uploads",
      "Global CDN delivery",
      "Automatic image optimization"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/screenshot.png`,
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"
  });

  const getBlogSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ImageURL Blog - Image Hosting Tips & Tutorials",
    "description": "Expert tips, tutorials, and best practices for image hosting, optimization, and sharing. Stay updated with the latest trends in digital asset management.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "ImageURL",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/logo.png`
      }
    },
    "inLanguage": "en-US",
    "keywords": "image hosting, image optimization, url generation, web performance, digital asset management"
  });

  const getArticleSchema = () => {
    if (!data) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "description": data.excerpt,
      "author": {
        "@type": "Organization",
        "name": data.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "ImageURL",
        "logo": {
          "@type": "ImageObject",
          "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/logo.png`
        }
      },
      "datePublished": data.publishedAt,
      "dateModified": data.publishedAt,
      "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/blog/${data.slug}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/blog/${data.slug}`
      },
      "articleSection": data.category,
      "keywords": data.tags.join(", "),
      "inLanguage": "en-US"
    };
  };

  const getLocalBusinessSchema = () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
    return generateLocalBusinessSchema({
      name: 'ImageURL',
      description: 'Leading free image hosting service providing instant URL generation for images. Best image to URL converter with unlimited free uploads.',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      email: 'blog.boopul@gmail.com',
      address: {
        addressCountry: 'IN'
      },
      priceRange: '$',
      paymentAccepted: ['Credit Card', 'PayPal', 'Cryptocurrency'],
      currenciesAccepted: ['USD', 'EUR', 'INR'],
      openingHours: [
        { dayOfWeek: 'Monday', opens: '00:00', closes: '23:59' },
        { dayOfWeek: 'Tuesday', opens: '00:00', closes: '23:59' },
        { dayOfWeek: 'Wednesday', opens: '00:00', closes: '23:59' },
        { dayOfWeek: 'Thursday', opens: '00:00', closes: '23:59' },
        { dayOfWeek: 'Friday', opens: '00:00', closes: '23:59' },
        { dayOfWeek: 'Saturday', opens: '00:00', closes: '23:59' },
        { dayOfWeek: 'Sunday', opens: '00:00', closes: '23:59' }
      ]
    });
  };

  const getImageObjectSchema = () => {
    if (!data || !('url' in data)) return null;
    return generateImageObjectSchema(data.url, data.name, data.description);
  };

  const getBreadcrumbSchema = () => {
    const breadcrumbData = Array.isArray(data) ? data : (data && 'length' in data ? data : []);
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbData.map((crumb: BreadcrumbItem, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  };

  const getHowToSchema = () => {
    if (!data || !data.steps) return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': data.name,
      'description': data.description,
      'totalTime': data.totalTime,
      'estimatedCost': data.estimatedCost,
      'step': data.steps.map((step: any, index: number) => ({
        '@type': 'HowToStep',
        'position': index + 1,
        'name': step.name,
        'text': step.text,
        'image': step.image,
        'url': step.url
      })),
      'tool': data.tools?.map((tool: any) => ({
        '@type': 'HowToTool',
        'name': tool.name
      })),
      'supply': data.supplies?.map((supply: any) => ({
        '@type': 'HowToSupply',
        'name': supply.name
      }))
    };
  };

  const getVideoSchema = () => {
    if (!data || !data.videoUrl) return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      'name': data.name,
      'description': data.description,
      'thumbnailUrl': data.thumbnailUrl,
      'uploadDate': data.uploadDate,
      'duration': data.duration,
      'contentUrl': data.videoUrl,
      'embedUrl': data.embedUrl,
      'publisher': {
        '@type': 'Organization',
        'name': 'ImageURL',
        'logo': {
          '@type': 'ImageObject',
          'url': `${process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud'}/logo.png`
        }
      },
      'author': {
        '@type': 'Organization',
        'name': data.author || 'ImageURL'
      }
    };
  };

  const getReviewSchema = () => {
    if (!data || !data.rating) return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Review',
      'itemReviewed': {
        '@type': 'Service',
        'name': data.itemName || 'ImageURL Service',
        'description': data.itemDescription
      },
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': data.rating,
        'bestRating': data.bestRating || 5,
        'worstRating': data.worstRating || 1
      },
      'author': {
        '@type': 'Person',
        'name': data.reviewerName || 'Anonymous'
      },
      'datePublished': data.reviewDate,
      'reviewBody': data.reviewText
    };
  };

  const getEventSchema = () => {
    if (!data || !data.eventName) return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      'name': data.eventName,
      'description': data.description,
      'startDate': data.startDate,
      'endDate': data.endDate,
      'location': {
        '@type': 'Place',
        'name': data.locationName,
        'address': data.address ? {
          '@type': 'PostalAddress',
          'streetAddress': data.address.street,
          'addressLocality': data.address.city,
          'addressRegion': data.address.state,
          'postalCode': data.address.zip,
          'addressCountry': data.address.country
        } : undefined
      },
      'organizer': {
        '@type': 'Organization',
        'name': data.organizerName || 'ImageURL',
        'url': data.organizerUrl
      },
      'offers': data.offers?.map((offer: any) => ({
        '@type': 'Offer',
        'url': offer.url,
        'price': offer.price,
        'priceCurrency': offer.currency,
        'availability': offer.availability
      }))
    };
  };

  const renderSchema = () => {
    switch (type) {
      case 'service':
        return [getServiceSchema(), getOrganizationSchema(), getSoftwareApplicationSchema()];
      case 'faq':
        return getFAQSchema();
      case 'blog':
        return [getBlogSchema(), getOrganizationSchema()];
      case 'article':
        const articleSchema = getArticleSchema();
        return articleSchema ? [articleSchema, getOrganizationSchema()] : [getOrganizationSchema()];
      case 'localbusiness':
        return [getLocalBusinessSchema(), getOrganizationSchema()];
      case 'imageobject':
        const imageSchema = getImageObjectSchema();
        return imageSchema ? [imageSchema] : [];
      case 'breadcrumb':
        return [getBreadcrumbSchema()];
      case 'howto':
        const howtoSchema = getHowToSchema();
        return howtoSchema ? [howtoSchema, getOrganizationSchema()] : [getOrganizationSchema()];
      case 'video':
        const videoSchema = getVideoSchema();
        return videoSchema ? [videoSchema, getOrganizationSchema()] : [getOrganizationSchema()];
      case 'review':
        const reviewSchema = getReviewSchema();
        return reviewSchema ? [reviewSchema, getOrganizationSchema()] : [getOrganizationSchema()];
      case 'event':
        const eventSchema = getEventSchema();
        return eventSchema ? [eventSchema, getOrganizationSchema()] : [getOrganizationSchema()];
      default:
        return [getWebsiteSchema(), getOrganizationSchema(), getSoftwareApplicationSchema()];
    }
  };

  const schemas = renderSchema();
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

  return (
    <>
      {schemaArray.map((schema, index) => (
        <Script
          key={index}
          id={`structured-data-${type}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
