import fs from 'fs/promises';
import path from 'path';
import { BlogPost } from './blog-data';

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(BLOG_DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load posts from file
async function loadPosts(): Promise<BlogPost[]> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(BLOG_DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
}

// Save posts to file
async function savePosts(posts: BlogPost[]): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(BLOG_DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return await loadPosts();
}

// Get blog post by ID
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const posts = await loadPosts();
  return posts.find(post => post.id === id) || null;
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Create new blog post
export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  const posts = await loadPosts();
  
  // Check if slug already exists
  const existingPost = posts.find(p => p.slug === post.slug);
  if (existingPost) {
    throw new Error('A post with this slug already exists');
  }
  
  posts.push(post);
  await savePosts(posts);
  return post;
}

// Update blog post
export async function updateBlogPost(id: string, updatedPost: Partial<BlogPost>): Promise<BlogPost | null> {
  const posts = await loadPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) {
    return null;
  }
  
  // Check if slug conflicts with another post
  if (updatedPost.slug) {
    const existingPost = posts.find(p => p.slug === updatedPost.slug && p.id !== id);
    if (existingPost) {
      throw new Error('A post with this slug already exists');
    }
  }
  
  posts[index] = { ...posts[index], ...updatedPost };
  await savePosts(posts);
  return posts[index];
}

// Delete blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  const posts = await loadPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) {
    return false;
  }
  
  posts.splice(index, 1);
  await savePosts(posts);
  return true;
}

// Get published posts (for public API)
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await loadPosts();
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter(post => post.featured);
}

// Search posts
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// Get related posts
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts
    .filter(post =>
      post.slug !== currentPost.slug &&
      (post.category === currentPost.category ||
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

// Get categories with post counts
export async function getCategories(): Promise<{ name: string; slug: string; description: string; count: number; }[]> {
  const posts = await getPublishedPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach(post => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    description: `Articles about ${name.toLowerCase()}`,
    count
  }));
}
