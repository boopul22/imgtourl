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

// Import file-based storage functions
import {
  getPublishedPosts as getFilePublishedPosts,
  getBlogPostBySlug as getFileBlogPostBySlug,
  getFeaturedPosts as getFileFeaturedPosts,
  getRelatedPosts as getFileRelatedPosts,
  searchPosts as getFileSearchPosts,
  getCategories as getFileCategories,
} from './blog-storage';

// Helper functions for blog data management - now using file-based storage
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    return await getFilePublishedPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post = await getFileBlogPostBySlug(slug);
    return post || undefined;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return undefined;
  }
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    return await getFileFeaturedPosts();
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const posts = await getFilePublishedPosts();
    return posts.filter(post => post.category === category);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const posts = await getFilePublishedPosts();
    return posts.filter(post => post.tags.includes(tag));
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
}

export async function getCategories(): Promise<BlogCategory[]> {
  try {
    return await getFileCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getTags(): Promise<BlogTag[]> {
  try {
    const posts = await getFilePublishedPosts();
    const tagMap = new Map<string, number>();

    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagMap.entries()).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }));
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  try {
    return await getFileRelatedPosts(currentPost, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  try {
    return await getFileSearchPosts(query);
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}
