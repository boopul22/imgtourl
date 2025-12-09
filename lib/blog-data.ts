export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  slug: string;
  featuredImage?: string;
  metaDescription?: string;
  keywords?: string[];
  status: 'draft' | 'published' | 'archived';
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  count: number;
}

// Import Supabase storage functions
import {
  getPublishedPosts as getSupabasePublishedPosts,
  getBlogPostBySlug as getSupabaseBlogPostBySlug,
  getFeaturedPosts as getSupabaseFeaturedPosts,
  getPostsByCategory as getSupabasePostsByCategory,
  getPostsByTag as getSupabasePostsByTag,
  getCategories as getSupabaseCategories,
  getTags as getSupabaseTags,
  getRelatedPosts as getSupabaseRelatedPosts,
  searchPosts as getSupabaseSearchPosts
} from './blog-storage-supabase';

// Sample blog posts data - now replaced with Supabase data
export const blogPosts: BlogPost[] = [
  {
    id: 'image-optimization-guide-2024',
    title: 'Complete Guide to Image Optimization for Web in 2024',
    excerpt: 'Learn the latest techniques for optimizing images for web performance, including format selection, compression, and responsive images.',
    content: `
# Complete Guide to Image Optimization for Web in 2024

Image optimization is crucial for web performance, user experience, and SEO. In this comprehensive guide, we'll explore the latest techniques and best practices for optimizing images in 2024.

## Why Image Optimization Matters

Images typically account for 60-70% of a webpage's total size. Optimizing them can significantly improve:

- **Page load speed** - Faster loading times improve user experience
- **SEO rankings** - Google considers page speed as a ranking factor
- **Bandwidth usage** - Reduced data consumption for users
- **Core Web Vitals** - Better LCP (Largest Contentful Paint) scores

## Choosing the Right Image Format

### WebP: The Modern Standard
WebP offers 25-35% better compression than JPEG while maintaining quality. It's now supported by all major browsers.

### AVIF: The Future
AVIF provides even better compression than WebP (up to 50% smaller files) but has limited browser support.

### When to Use Each Format:
- **JPEG**: Photos with many colors, gradients
- **PNG**: Images with transparency, simple graphics
- **WebP**: Modern replacement for JPEG/PNG
- **SVG**: Icons, logos, simple graphics

## Compression Techniques

### Lossy vs Lossless
- **Lossy**: Reduces file size by removing some image data (JPEG, WebP)
- **Lossless**: Preserves all image data (PNG, some WebP)

### Recommended Tools:
- **[ImageURL's built-in optimization](/free-image-hosting)** - Automatic optimization with every upload
- **[Bulk Image Upload](/bulk-image-upload)** - Optimize multiple images at once
- TinyPNG/TinyJPG for manual compression
- Squoosh by Google for format comparison
- **[Image URL Generator](/image-url-generator)** - Convert and optimize images to URLs

## Responsive Images

Use the \`srcset\` attribute to serve different image sizes:

\`\`\`html
<img src="image-800w.jpg" 
     srcset="image-400w.jpg 400w, 
             image-800w.jpg 800w, 
             image-1200w.jpg 1200w"
     sizes="(max-width: 600px) 400px, 
            (max-width: 1000px) 800px, 
            1200px"
     alt="Optimized image">
\`\`\`

## Performance Best Practices

1. **Lazy Loading**: Load images only when needed
2. **Preload Critical Images**: Use \`<link rel="preload">\` for above-fold images
3. **Use CDN**: Serve images from a content delivery network
4. **Optimize Alt Text**: Improve accessibility and SEO

## Tools and Services

### Free Image Hosting with Optimization
**[ImageURL](/free-image-hosting)** automatically optimizes your images when you upload them, providing:
- Automatic format conversion to WebP and other modern formats
- Intelligent compression optimization
- Global CDN delivery for fast loading worldwide
- Responsive image generation for different screen sizes
- **[Bulk processing capabilities](/bulk-image-upload)** for multiple images
- **[URL shortening](/blog/url-shortening-benefits)** for better sharing

### Other Useful Tools:
- Google PageSpeed Insights - Test your optimized images
- WebPageTest - Analyze loading performance
- Lighthouse - Comprehensive performance audits
- **[ImageURL's Image URL Generator](/image-url-generator)** - All-in-one optimization tool

## Conclusion

Image optimization is an ongoing process that requires attention to format selection, compression, and delivery methods. By implementing these techniques, you can significantly improve your website's performance and user experience.

For hassle-free image optimization, try **[ImageURL's free image hosting service](/)**, which automatically handles optimization while providing reliable hosting and fast delivery. You can also explore our **[bulk upload feature](/bulk-image-upload)** for processing multiple images efficiently, or learn about **[URL shortening benefits](/blog/url-shortening-benefits)** for better image sharing.
    `,
    author: 'ImageURL Team',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'Optimization',
    tags: ['image optimization', 'web performance', 'webp', 'compression'],
    featured: true,
    slug: 'image-optimization-guide-2024',
    metaDescription: 'Complete guide to image optimization for web in 2024. Learn about WebP, AVIF, compression techniques, and responsive images for better performance.',
    keywords: ['image optimization', 'web performance', 'webp', 'avif', 'compression', 'responsive images'],
    status: 'published'
  },
  {
    id: 'best-image-hosting-practices',
    title: 'Best Practices for Free Image Hosting in 2024',
    excerpt: 'Discover the essential practices for reliable image hosting, including security, performance, and choosing the right hosting solution.',
    content: `
# Best Practices for Free Image Hosting in 2024

Choosing the right image hosting solution is crucial for your website's performance, reliability, and user experience. Here are the best practices to follow when selecting and using free image hosting services.

## Key Features to Look For

### 1. Reliability and Uptime
- Look for services with 99.9%+ uptime guarantees
- Check for redundant storage and backup systems
- Ensure global CDN distribution for fast loading

### 2. Security Features
- HTTPS/SSL encryption for all image URLs
- Protection against hotlinking abuse
- Malware scanning for uploaded files
- Privacy controls for sensitive images

### 3. Performance Optimization
- Automatic image compression
- Multiple format support (WebP, AVIF)
- Responsive image generation
- Fast global delivery network

## Choosing the Right Service

### Free vs Paid Considerations
While free services like **[ImageURL](/free-image-hosting)** offer excellent features, consider:
- **Storage limits**: How much space do you need? (ImageURL offers unlimited uploads)
- **Bandwidth limits**: Expected traffic volume (Global CDN ensures fast delivery)
- **Feature restrictions**: Advanced optimization options (Auto-optimization included)
- **Support quality**: Response times and help availability
- **Additional features**: Like **[bulk upload capabilities](/bulk-image-upload)** and **[URL shortening](/blog/url-shortening-benefits)**

### Red Flags to Avoid
- Services without HTTPS support
- No clear terms of service
- History of sudden shutdowns
- Poor customer reviews
- Limited file format support

## Upload Best Practices

### File Organization
1. **Use descriptive filenames**: \`product-blue-shirt-front.jpg\` instead of \`IMG_001.jpg\`
2. **Organize by categories**: Group related images together
3. **Keep backups**: Always maintain local copies of important images

### Optimization Before Upload
- Resize images to appropriate dimensions
- Compress files to reduce upload time
- Choose the right format for your content type
- Add proper metadata and alt text

## Security and Privacy

### Protecting Your Images
- Use private upload options when available
- Consider watermarking for valuable content
- Be aware of public vs private sharing settings
- Regularly audit your uploaded content

### GDPR and Privacy Compliance
- Understand data retention policies
- Know where your images are stored geographically
- Check deletion and data export options
- Review privacy policies regularly

## Performance Monitoring

### Key Metrics to Track
- Image load times across different regions
- CDN cache hit rates
- Bandwidth usage patterns
- User experience metrics

### Tools for Monitoring
- Google PageSpeed Insights
- GTmetrix
- Pingdom
- WebPageTest

## Integration Best Practices

### HTML Implementation
\`\`\`html
<img src="https://your-cdn.com/image.webp" 
     alt="Descriptive alt text"
     loading="lazy"
     width="800" 
     height="600">
\`\`\`

### CSS Optimization
- Use \`object-fit\` for responsive images
- Implement proper aspect ratios
- Consider CSS sprites for icons
- Use background images appropriately

## Backup and Migration Strategies

### Regular Backups
1. **Automated downloads**: Set up scripts to backup images
2. **Version control**: Track changes to important images
3. **Multiple locations**: Store backups in different services
4. **Test restoration**: Regularly verify backup integrity

### Migration Planning
- Document all image URLs and locations
- Plan for URL redirects if changing services
- Test new service thoroughly before switching
- Maintain parallel systems during transition

## Why Choose ImageURL

**[ImageURL](/free-image-hosting)** follows all these best practices:
- ✅ 99.9% uptime with global CDN
- ✅ Automatic HTTPS and security scanning
- ✅ Built-in **[image optimization](/blog/image-optimization-guide-2024)** and format conversion
- ✅ No registration required for basic use
- ✅ Permanent links that never expire
- ✅ **[Bulk upload capabilities](/bulk-image-upload)** for multiple images
- ✅ **[URL shortening](/blog/url-shortening-benefits)** for better sharing
- ✅ **[Image URL generator](/image-url-generator)** with optimization

## Conclusion

Following these best practices ensures your images are hosted reliably, securely, and efficiently. Whether you choose ImageURL or another service, prioritize reliability, security, and performance to provide the best experience for your users.

Ready to start? **[Upload your first image](/free-image-hosting)** and experience optimized hosting today. For multiple images, try our **[bulk upload feature](/bulk-image-upload)**, and learn more about **[image optimization techniques](/blog/image-optimization-guide-2024)** to maximize your website's performance.
    `,
    author: 'ImageURL Team',
    publishedAt: '2024-01-10',
    readTime: '6 min read',
    category: 'Hosting',
    tags: ['image hosting', 'best practices', 'security', 'performance'],
    featured: true,
    slug: 'best-image-hosting-practices',
    metaDescription: 'Essential best practices for free image hosting in 2024. Learn about security, performance, and choosing the right hosting solution.',
    keywords: ['image hosting', 'best practices', 'security', 'performance', 'CDN', 'uptime'],
    status: 'published'
  },
  {
    id: 'url-shortening-benefits',
    title: 'Why URL Shortening Matters for Image Sharing',
    excerpt: 'Understand the benefits of URL shortening for image links, including improved user experience and better analytics tracking.',
    content: `
# Why URL Shortening Matters for Image Sharing

URL shortening might seem like a small detail, but it can significantly impact your image sharing strategy. Let's explore why shortened URLs are essential for modern image hosting and sharing.

## The Problem with Long URLs

Traditional image hosting services often generate long, complex URLs like:
\`https://example-cdn.com/uploads/2024/01/15/user123/gallery/high-resolution-product-image-variant-blue-large-1920x1080.jpg\`

These URLs are:
- **Hard to remember** and share verbally
- **Prone to breaking** when copied/pasted
- **Unprofessional** in marketing materials
- **Difficult to track** for analytics

## Benefits of URL Shortening

### 1. Improved User Experience
Short URLs like \`imageurl.cloud/s/abc123\` are:
- Easy to type and remember
- Less likely to break in emails or messages
- More professional in presentations
- Mobile-friendly for sharing

### 2. Better Analytics and Tracking
Shortened URLs enable:
- **Click tracking**: See how many people view your images
- **Geographic data**: Understand where your audience is located
- **Referrer information**: Know which platforms drive traffic
- **Time-based analytics**: Track sharing patterns over time

### 3. Enhanced Security
- **Link validation**: Verify URLs before redirecting
- **Malware protection**: Scan destinations for threats
- **Access control**: Implement viewing restrictions if needed
- **Expiration dates**: Set time limits for sensitive content

### 4. Professional Branding
- **Custom domains**: Use your own domain for branded links
- **Consistent appearance**: Maintain brand consistency across platforms
- **Trust building**: Recognizable short domains increase click-through rates
- **Marketing integration**: Easier to include in campaigns and materials

## Technical Advantages

### SEO Benefits
- **Cleaner URLs**: Better for search engine indexing
- **Redirect control**: Manage link equity and redirects
- **Canonical URLs**: Avoid duplicate content issues
- **Link consolidation**: Combine multiple versions into one trackable link

### Performance Improvements
- **Faster loading**: Reduced URL parsing time
- **Cache efficiency**: Better CDN and browser caching
- **Bandwidth savings**: Smaller URLs in API responses
- **Mobile optimization**: Reduced data usage on mobile devices

## Use Cases for Shortened Image URLs

### Social Media Marketing
- **Character limits**: Fit more content in tweets and posts
- **Clean appearance**: Professional look in social media
- **Easy sharing**: Simple copy-paste for users
- **Campaign tracking**: Monitor social media performance

### Email Marketing
- **Template compatibility**: Work better in email templates
- **Deliverability**: Reduce spam filter triggers
- **Click tracking**: Detailed email campaign analytics
- **Mobile optimization**: Better mobile email experience

### Print and Offline Media
- **QR codes**: Generate cleaner QR codes for print materials
- **Business cards**: Fit more information in limited space
- **Presentations**: Cleaner slides and handouts
- **Verbal sharing**: Easy to communicate over phone or in person

## Best Practices for URL Shortening

### 1. Choose Reliable Services
- Look for established providers with good uptime
- Ensure permanent links that won't expire
- Check for custom domain options
- Verify analytics and tracking capabilities

### 2. Maintain Link Hygiene
- Use descriptive custom slugs when possible
- Keep a record of all shortened URLs
- Regularly audit and clean up old links
- Monitor for broken or expired destinations

### 3. Security Considerations
- Use HTTPS for all shortened URLs
- Implement click fraud protection
- Monitor for suspicious activity
- Have backup plans for critical links

## ImageURL's Approach to URL Shortening

**[ImageURL](/free-image-hosting)** provides automatic URL shortening with every upload:

- **Permanent short links**: Never expire or break
- **Custom slugs**: Option to customize your URLs
- **Analytics dashboard**: Track clicks and performance
- **Global CDN**: Fast loading worldwide
- **HTTPS security**: All links are secure by default
- **Bulk processing**: Works with **[bulk image uploads](/bulk-image-upload)**
- **Optimization included**: Automatic **[image optimization](/blog/image-optimization-guide-2024)**

Example: Instead of a long complex URL, get something like:
\`imageurl.cloud/s/sunset-beach\`

## Implementation Tips

### For Developers
\`\`\`javascript
// Example API usage for shortened URLs
const response = await fetch('/api/shorten', {
  method: 'POST',
  body: JSON.stringify({
    originalUrl: 'https://long-image-url.com/path/to/image.jpg',
    customSlug: 'my-image'
  })
});
\`\`\`

### For Marketers
- Include shortened URLs in all marketing materials
- Use consistent naming conventions
- Track performance across different channels
- A/B test different URL formats

## Measuring Success

### Key Metrics to Track
- **Click-through rates**: Compare shortened vs full URLs
- **Geographic distribution**: Understand your audience
- **Device breakdown**: Mobile vs desktop usage
- **Time-based patterns**: Peak sharing times

### Tools and Analytics
- Built-in analytics from URL shortening services
- Google Analytics integration
- Social media platform insights
- Email marketing platform data

## Conclusion

URL shortening is more than just making links shorter—it's about creating a better user experience, gaining valuable insights, and maintaining professional standards. Whether you're sharing images for business or personal use, shortened URLs provide significant advantages.

Ready to experience the benefits? **[Upload an image to ImageURL](/free-image-hosting)** and get your shortened, trackable link instantly. You can also explore our **[bulk upload feature](/bulk-image-upload)** for managing multiple images efficiently.

For more tips on image hosting and optimization, check out our comprehensive guides:
- **[Image optimization best practices](/blog/image-optimization-guide-2024)** - Complete optimization guide
- **[Best practices for image hosting](/blog/best-image-hosting-practices)** - Hosting security and performance
- **[Image URL Generator](/image-url-generator)** - Convert images to URLs with optimization
    `,
    author: 'ImageURL Team',
    publishedAt: '2024-01-05',
    readTime: '4 min read',
    category: 'URL Management',
    tags: ['url shortening', 'image sharing', 'analytics', 'user experience'],
    featured: false,
    slug: 'url-shortening-benefits',
    metaDescription: 'Discover why URL shortening matters for image sharing. Learn about improved user experience, analytics tracking, and professional branding.',
    keywords: ['url shortening', 'image sharing', 'analytics', 'user experience', 'branding', 'marketing'],
    status: 'published'
  }
];

// Helper functions for blog data management - now using Supabase
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    return await getSupabasePublishedPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post = await getSupabaseBlogPostBySlug(slug);
    return post || undefined;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return undefined;
  }
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    return await getSupabaseFeaturedPosts();
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    return await getSupabasePostsByCategory(category);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    return await getSupabasePostsByTag(tag);
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
}

export async function getCategories(): Promise<BlogCategory[]> {
  try {
    return await getSupabaseCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getTags(): Promise<BlogTag[]> {
  try {
    return await getSupabaseTags();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  try {
    return await getSupabaseRelatedPosts(currentPost, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  try {
    return await getSupabaseSearchPosts(query);
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}
