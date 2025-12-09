import { Calendar, Tag, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import BlogPostCard from './BlogPostCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  slug: string;
}

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: { name: string; count: number }[];
  popularTags: { name: string; count: number }[];
  className?: string;
}

export default function BlogSidebar({ 
  recentPosts, 
  categories, 
  popularTags, 
  className = '' 
}: BlogSidebarProps) {
  return (
    <aside className={`space-y-8 ${className}`}>
      {/* Recent Posts */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 text-foreground flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-brand-orange" />
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => (
            <div key={post.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
              <h4 className="text-sm font-semibold mb-2 text-foreground hover:text-brand-orange transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h4>
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <span className="px-2 py-1 bg-brand-blue-gray/10 text-brand-blue-gray rounded text-xs">
                  {post.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Categories */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 text-foreground flex items-center">
          <Tag className="w-5 h-5 mr-2 text-brand-orange" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <Link 
                href={`/blog?category=${encodeURIComponent(category.name)}`}
                className="text-sm text-muted-foreground hover:text-brand-orange transition-colors"
              >
                {category.name}
              </Link>
              <span className="text-xs bg-brand-beige/30 text-brand-blue-gray px-2 py-1 rounded">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Popular Tags */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 text-foreground">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag.name}
              href={`/blog?tag=${encodeURIComponent(tag.name)}`}
              className="px-3 py-1 bg-brand-blue-gray/10 text-brand-blue-gray text-xs rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
            >
              {tag.name} ({tag.count})
            </Link>
          ))}
        </div>
      </Card>

      {/* Newsletter Signup */}
      <Card className="p-6 bg-brand-beige/20 dark:bg-brand-blue-gray/10">
        <h3 className="text-lg font-bold mb-3 text-foreground">Stay Updated</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get the latest image hosting tips and tutorials delivered to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
          <button className="w-full px-4 py-2 bg-brand-orange text-white text-sm font-medium rounded-md hover:bg-brand-orange/90 transition-colors">
            Subscribe
          </button>
        </div>
      </Card>

      {/* Quick Links */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 text-foreground">Quick Links</h3>
        <div className="space-y-2">
          <Link 
            href="/free-image-hosting" 
            className="block text-sm text-muted-foreground hover:text-brand-orange transition-colors"
          >
            Free Image Hosting
          </Link>
          <Link 
            href="/bulk-image-upload" 
            className="block text-sm text-muted-foreground hover:text-brand-orange transition-colors"
          >
            Bulk Image Upload
          </Link>
          <Link 
            href="/image-url-generator" 
            className="block text-sm text-muted-foreground hover:text-brand-orange transition-colors"
          >
            Image URL Generator
          </Link>
          <Link 
            href="/#features" 
            className="block text-sm text-muted-foreground hover:text-brand-orange transition-colors"
          >
            Features
          </Link>
          <Link 
            href="/#faq" 
            className="block text-sm text-muted-foreground hover:text-brand-orange transition-colors"
          >
            FAQ
          </Link>
        </div>
      </Card>
    </aside>
  );
}
