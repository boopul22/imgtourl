// Server-side HTML processing using JSDOM (Node.js only)
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Create a DOM window for server-side DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

// Configure DOMPurify to allow common HTML elements and attributes
const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'div', 'span',
  'strong', 'b', 'em', 'i', 'u', 's',
  'a', 'img',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'hr',
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  'a': ['href', 'title', 'target', 'rel'],
  'img': ['src', 'alt', 'title', 'width', 'height'],
  'blockquote': ['cite'],
  'pre': ['class'],
  'code': ['class'],
  'div': ['class'],
  'span': ['class'],
  'p': ['class'],
  'h1': ['class'],
  'h2': ['class'],
  'h3': ['class'],
  'h4': ['class'],
  'h5': ['class'],
  'h6': ['class'],
};

export interface ProcessedHTML {
  content: string;
  wordCount: number;
  readTime: string;
  hasImages: boolean;
  hasLinks: boolean;
}

/**
 * Sanitize HTML content to remove potentially dangerous elements
 */
export function sanitizeHTML(html: string): string {
  return purify.sanitize(html, {
    ALLOWED_TAGS: ALLOWED_TAGS,
    ALLOWED_ATTR: ALLOWED_ATTRIBUTES as any,
    KEEP_CONTENT: true,
  });
}

/**
 * Process HTML content for blog posts
 */
export function processHTMLContent(html: string): ProcessedHTML {
  // First sanitize the HTML
  const sanitizedHTML = sanitizeHTML(html);
  
  // Create a DOM to analyze the content
  const dom = new JSDOM(sanitizedHTML);
  const document = dom.window.document;
  
  // Extract text content for word count
  const textContent = document.body.textContent || '';
  const wordCount = textContent
    .trim()
    .split(/\s+/)
    .filter((word: string) => word.length > 0)
    .length;
  
  // Calculate read time (average 200 words per minute)
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = `${readTimeMinutes} min read`;
  
  // Check for images and links
  const hasImages = document.querySelectorAll('img').length > 0;
  const hasLinks = document.querySelectorAll('a').length > 0;
  
  return {
    content: sanitizedHTML,
    wordCount,
    readTime,
    hasImages,
    hasLinks,
  };
}

/**
 * Validate HTML content for common issues
 */
export function validateHTMLContent(html: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!html || html.trim().length === 0) {
    errors.push('Content cannot be empty');
    return { isValid: false, errors };
  }
  
  try {
    // Try to parse the HTML
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Check for basic content
    const textContent = document.body.textContent || '';
    if (textContent.trim().length < 10) {
      errors.push('Content is too short (minimum 10 characters)');
    }
    
    // Check for potentially problematic elements
    const scripts = document.querySelectorAll('script');
    if (scripts.length > 0) {
      errors.push('Script tags are not allowed');
    }
    
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
      errors.push('Form elements are not allowed');
    }
    
    // Check for broken image tags
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.getAttribute('src')) {
        errors.push(`Image ${index + 1} is missing src attribute`);
      }
      if (!img.getAttribute('alt')) {
        errors.push(`Image ${index + 1} is missing alt attribute`);
      }
    });
    
    // Check for broken links
    const links = document.querySelectorAll('a');
    links.forEach((link, index) => {
      if (!link.getAttribute('href')) {
        errors.push(`Link ${index + 1} is missing href attribute`);
      }
    });
    
  } catch (error) {
    errors.push('Invalid HTML structure');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Extract excerpt from HTML content
 */
export function extractExcerpt(html: string, maxLength: number = 160): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Get text content and clean it up
  const textContent = document.body.textContent || '';
  const cleanText = textContent.replace(/\s+/g, ' ').trim();
  
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Find the last complete sentence within the limit
  const truncated = cleanText.substring(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSentence > maxLength * 0.7) {
    return cleanText.substring(0, lastSentence + 1);
  } else if (lastSpace > maxLength * 0.7) {
    return cleanText.substring(0, lastSpace) + '...';
  } else {
    return truncated + '...';
  }
}

/**
 * Extract title from HTML content (first H1 or H2 tag)
 */
export function extractTitleFromHTML(html: string): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Try to find H1 first, then H2
  const h1 = document.querySelector('h1');
  if (h1 && h1.textContent?.trim()) {
    return h1.textContent.trim();
  }
  
  const h2 = document.querySelector('h2');
  if (h2 && h2.textContent?.trim()) {
    return h2.textContent.trim();
  }
  
  // Fallback: try to extract from first paragraph or any text
  const firstParagraph = document.querySelector('p');
  if (firstParagraph && firstParagraph.textContent?.trim()) {
    const text = firstParagraph.textContent.trim();
    // Take first sentence or first 60 characters
    const firstSentence = text.split('.')[0];
    return firstSentence.length > 60 ? text.substring(0, 60) + '...' : firstSentence;
  }
  
  // Last resort: use generic title
  return 'Untitled Post';
}

/**
 * Generate slug from title
 */
export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate SEO-friendly keywords from HTML content
 */
export function extractKeywords(html: string, maxKeywords: number = 10): string[] {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Get text content
  const textContent = document.body.textContent || '';
  
  // Extract words (3+ characters, no numbers)
  const words = textContent
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 3 && !/^\d+$/.test(word));
  
  // Count word frequency
  const wordCount = new Map<string, number>();
  words.forEach(word => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });
  
  // Get most frequent words
  const sortedWords = Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
  
  return sortedWords;
}
