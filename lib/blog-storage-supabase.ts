import { createServerSupabaseClient, BlogPostRow } from './supabase';
import { BlogPost } from './blog-data';
import { withErrorHandling, handleSupabaseError } from './error-handler';

// Convert database row to BlogPost interface
function dbRowToBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featured_image,
    author: row.author,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    readTime: row.read_time,
    category: row.category,
    tags: row.tags,
    featured: row.featured,
    status: row.status,
    metaDescription: row.meta_description,
    keywords: row.keywords,
  };
}

// Convert BlogPost to database row format
function blogPostToDbRow(post: BlogPost): Omit<BlogPostRow, 'created_at'> {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featured_image: post.featuredImage,
    author: post.author,
    published_at: post.publishedAt,
    updated_at: post.updatedAt,
    read_time: post.readTime,
    category: post.category,
    tags: post.tags,
    featured: post.featured,
    status: post.status,
    meta_description: post.metaDescription,
    keywords: post.keywords,
  };
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return withErrorHandling('getAllBlogPosts', async () => {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(dbRowToBlogPost);
  }, []); // Return empty array as fallback
}

// Get blog post by ID
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching blog post by ID:', error);
    throw new Error('Failed to fetch blog post');
  }

  return dbRowToBlogPost(data);
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching blog post by slug:', error);
    throw new Error('Failed to fetch blog post');
  }

  return dbRowToBlogPost(data);
}

// Create new blog post
export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  const supabase = createServerSupabaseClient();
  
  // Check if slug already exists
  const existingPost = await getBlogPostBySlug(post.slug);
  if (existingPost) {
    throw new Error('A post with this slug already exists');
  }
  
  const dbRow = blogPostToDbRow(post);
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(dbRow)
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Failed to create blog post');
  }

  return dbRowToBlogPost(data);
}

// Update blog post
export async function updateBlogPost(id: string, updatedPost: Partial<BlogPost>): Promise<BlogPost | null> {
  const supabase = createServerSupabaseClient();
  
  // Check if slug conflicts with another post
  if (updatedPost.slug) {
    const existingPost = await getBlogPostBySlug(updatedPost.slug);
    if (existingPost && existingPost.id !== id) {
      throw new Error('A post with this slug already exists');
    }
  }
  
  // Convert partial BlogPost to database format
  const updateData: Partial<Omit<BlogPostRow, 'created_at'>> = {};
  
  if (updatedPost.title !== undefined) updateData.title = updatedPost.title;
  if (updatedPost.slug !== undefined) updateData.slug = updatedPost.slug;
  if (updatedPost.excerpt !== undefined) updateData.excerpt = updatedPost.excerpt;
  if (updatedPost.content !== undefined) updateData.content = updatedPost.content;
  if (updatedPost.featuredImage !== undefined) updateData.featured_image = updatedPost.featuredImage;
  if (updatedPost.author !== undefined) updateData.author = updatedPost.author;
  if (updatedPost.publishedAt !== undefined) updateData.published_at = updatedPost.publishedAt;
  if (updatedPost.updatedAt !== undefined) updateData.updated_at = updatedPost.updatedAt;
  if (updatedPost.readTime !== undefined) updateData.read_time = updatedPost.readTime;
  if (updatedPost.category !== undefined) updateData.category = updatedPost.category;
  if (updatedPost.tags !== undefined) updateData.tags = updatedPost.tags;
  if (updatedPost.featured !== undefined) updateData.featured = updatedPost.featured;
  if (updatedPost.status !== undefined) updateData.status = updatedPost.status;
  if (updatedPost.metaDescription !== undefined) updateData.meta_description = updatedPost.metaDescription;
  if (updatedPost.keywords !== undefined) updateData.keywords = updatedPost.keywords;
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error updating blog post:', error);
    throw new Error('Failed to update blog post');
  }

  return dbRowToBlogPost(data);
}

// Delete blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw new Error('Failed to delete blog post');
  }

  return true;
}

// Get published posts (for public API)
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching published posts:', error);
    throw new Error('Failed to fetch published posts');
  }

  return data.map(dbRowToBlogPost);
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured posts:', error);
    throw new Error('Failed to fetch featured posts');
  }

  return data.map(dbRowToBlogPost);
}

// Search posts
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const supabase = createServerSupabaseClient();
  const lowercaseQuery = query.toLowerCase();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error searching posts:', error);
    throw new Error('Failed to search posts');
  }

  return data.map(dbRowToBlogPost);
}

// Get related posts
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .neq('slug', currentPost.slug)
    .or(`category.eq.${currentPost.category},tags.cs.{${currentPost.tags.join(',')}}`)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    throw new Error('Failed to fetch related posts');
  }

  return data.map(dbRowToBlogPost);
}

// Get categories (derived from posts)
export async function getCategories(): Promise<Array<{name: string, slug: string, description: string, count: number}>> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }

  const categoryCount = data.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryCount).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    description: `Posts in ${name} category`,
    count
  }));
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by category:', error);
    throw new Error('Failed to fetch posts by category');
  }

  return data.map(dbRowToBlogPost);
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .contains('tags', [tag])
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by tag:', error);
    throw new Error('Failed to fetch posts by tag');
  }

  return data.map(dbRowToBlogPost);
}

// Get tags (derived from posts)
export async function getTags(): Promise<Array<{name: string, slug: string, count: number}>> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('tags')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Failed to fetch tags');
  }

  const tagCount = data.reduce((acc, post) => {
    post.tags.forEach((tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tagCount)
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }))
    .sort((a, b) => b.count - a.count);
}


