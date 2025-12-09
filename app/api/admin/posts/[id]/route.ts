import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/auth';
import { getBlogPostById, updateBlogPost, deleteBlogPost } from '@/lib/blog-storage-supabase';
import { processHTMLContent, validateHTMLContent, extractExcerpt } from '@/lib/html-processor-server';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/admin/posts/[id] - Get specific post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const post = await getBlogPostById(params.id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/posts/[id] - Update post
export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    const updatedPost = {
      ...data,
      id: params.id,
      content: processedHTML.content,
      excerpt: data.excerpt || extractExcerpt(processedHTML.content),
      readTime: data.readTime || processedHTML.readTime,
      metaDescription: data.metaDescription || data.excerpt || extractExcerpt(processedHTML.content),
      updatedAt: new Date().toISOString(),
    };

    const savedPost = await updateBlogPost(params.id, updatedPost);
    if (!savedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(savedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/posts/[id] - Delete post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = await deleteBlogPost(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
