import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/auth';
import { createBlogPost, getAllBlogPosts } from '@/lib/blog-storage-supabase';
import { processHTMLContent, validateHTMLContent, extractExcerpt } from '@/lib/html-processor-server';
import { nanoid } from 'nanoid';

// GET /api/admin/posts - Get all posts for admin
export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/posts - Create new post
export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content || !data.slug) {
      return NextResponse.json(
        { error: 'Title, content, and slug are required' },
        { status: 400 }
      );
    }

    // Validate and process HTML content
    const htmlValidation = validateHTMLContent(data.content);
    if (!htmlValidation.isValid) {
      return NextResponse.json(
        { error: 'Invalid HTML content', details: htmlValidation.errors },
        { status: 400 }
      );
    }

    const processedHTML = processHTMLContent(data.content);

    // Create new post with generated ID and processed content
    const newPost = {
      id: nanoid(),
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || extractExcerpt(processedHTML.content),
      content: processedHTML.content,
      featuredImage: data.featuredImage || undefined,
      author: data.author || 'Admin',
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: data.readTime || processedHTML.readTime,
      category: data.category || 'General',
      tags: data.tags || [],
      featured: data.featured || false,
      status: data.status || 'draft',
      metaDescription: data.metaDescription || data.excerpt || extractExcerpt(processedHTML.content),
      keywords: data.keywords || [],
    };

    const savedPost = await createBlogPost(newPost);
    return NextResponse.json(savedPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
