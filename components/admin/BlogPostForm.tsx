'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BlogPost } from '@/lib/blog-data';
import { Save, Eye, ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface BlogPostFormProps {
  post?: Partial<BlogPost>;
  isEditing?: boolean;
}

export default function BlogPostForm({ post, isEditing = false }: BlogPostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    featuredImage: post?.featuredImage || '',
    author: post?.author || 'Admin',
    category: post?.category || 'General',
    tags: post?.tags?.join(', ') || '',
    featured: post?.featured || false,
    status: post?.status || 'draft',
    metaDescription: post?.metaDescription || '',
    keywords: post?.keywords?.join(', ') || '',
    readTime: post?.readTime || '5 min read',
  });

  // Client-safe title extraction using browser DOM
  const extractTitleFromHTML = (html: string): string => {
    try {
      // Create a temporary DOM element to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      // Try to find H1 first, then H2
      const h1 = tempDiv.querySelector('h1');
      if (h1 && h1.textContent?.trim()) {
        return h1.textContent.trim();
      }

      const h2 = tempDiv.querySelector('h2');
      if (h2 && h2.textContent?.trim()) {
        return h2.textContent.trim();
      }

      // Fallback: try to extract from first paragraph
      const firstParagraph = tempDiv.querySelector('p');
      if (firstParagraph && firstParagraph.textContent?.trim()) {
        const text = firstParagraph.textContent.trim();
        const firstSentence = text.split('.')[0];
        return firstSentence.length > 60 ? text.substring(0, 60) + '...' : firstSentence;
      }

      return 'Untitled Post';
    } catch (error) {
      console.error('Error extracting title:', error);
      return 'Untitled Post';
    }
  };

  // Client-safe slug generation
  const generateSlugFromTitle = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // This function will be called when content changes to extract title
  const handleContentChange = (content: string) => {
    setFormData(prev => {
      // Only auto-generate title and slug if they're empty or this is a new post
      if (!isEditing || !prev.title) {
        try {
          const extractedTitle = extractTitleFromHTML(content);
          const generatedSlug = generateSlugFromTitle(extractedTitle);

          return {
            ...prev,
            content,
            title: extractedTitle,
            slug: prev.slug || generatedSlug,
          };
        } catch (error) {
          console.error('Error extracting title:', error);
          return { ...prev, content };
        }
      }
      return { ...prev, content };
    });
  };

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        keywords: formData.keywords.split(',').map(keyword => keyword.trim()).filter(Boolean),
        status: saveAsDraft ? 'draft' : formData.status,
        publishedAt: post?.publishedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const url = isEditing ? `/api/admin/posts/${post?.id}` : '/api/admin/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
        if (!isEditing) {
          router.push('/admin/posts');
        }
      } else {
        setError(data.error || 'Failed to save post');
      }
    } catch (error) {
      setError('An error occurred while saving the post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post?.id) return;

    const confirmMessage = `Are you sure you want to delete "${formData.title}"?\n\nThis action cannot be undone.`;
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Post "${formData.title}" has been deleted successfully.`);
        router.push('/admin/posts');
      } else {
        setError('Failed to delete post. Please try again.');
      }
    } catch (error) {
      setError('Error deleting post. Please check your connection and try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Update your blog post' : 'Create a new blog post with HTML content'}
          </p>
        </div>
        
        <Link href="/admin/posts">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </Link>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
                <CardDescription>
                  The main content and details of your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title will be automatically extracted from HTML content */}
                {formData.title && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      <strong>Extracted Title:</strong> {formData.title}
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="post-url-slug"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Optional: URL of the featured image for this post
                  </p>
                </div>

                <div>
                  <Label htmlFor="content">HTML Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Paste your formatted HTML content here..."
                    rows={20}
                    className="font-mono text-sm"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Paste your pre-formatted HTML content. The title will be automatically extracted from the first H1 or H2 tag.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Post category"
                  />
                </div>

                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    placeholder="5 min read"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO & Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="SEO meta description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orange/90"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : (isEditing ? 'Update Post' : 'Publish Post')}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isLoading}
              >
                Save as Draft
              </Button>

              {formData.slug && (
                <Link href={`/blog/${formData.slug}`} target="_blank">
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </Link>
              )}

              {isEditing && post?.id && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Post
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
