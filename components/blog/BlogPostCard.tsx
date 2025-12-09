import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  featuredImage?: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

export default function BlogPostCard({ post, variant = 'default' }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (variant === 'featured') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        {post.featuredImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.featuredImage}
              alt={`Featured image for blog post: ${post.title}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
              width={1280}
              height={720}
            />
          </div>
        )}
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-foreground hover:text-brand-orange transition-colors flex-grow">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          
          <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-medium rounded-full">
                {post.category}
              </span>
            </div>
            
            <Link href={`/blog/${post.slug}`}>
              <Button variant="ghost" size="sm" className="text-brand-orange hover:text-brand-orange/80">
                Read More
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        {post.featuredImage && (
          <div className="h-32 overflow-hidden">
            <img
              src={post.featuredImage}
              alt={`Featured image for blog post: ${post.title}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
              width={640}
              height={180}
            />
          </div>
        )}
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <h3 className="text-sm font-bold mb-2 text-foreground hover:text-brand-orange transition-colors flex-grow">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          
          <p className="text-muted-foreground mb-3 text-xs leading-relaxed flex-grow">
            {post.excerpt.substring(0, 80)}...
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="px-2 py-1 bg-brand-blue-gray/10 text-brand-blue-gray text-xs font-medium rounded">
              {post.category}
            </span>
            
            <Link href={`/blog/${post.slug}`}>
              <Button variant="ghost" size="sm" className="text-brand-orange hover:text-brand-orange/80 p-0 text-xs">
                Read More
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featuredImage}
            alt={`Featured image for blog post: ${post.title}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width={1280}
            height={720}
          />
        </div>
      )}
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-3 text-foreground hover:text-brand-orange transition-colors flex-grow">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="px-2 py-1 bg-brand-blue-gray/10 text-brand-blue-gray text-xs font-medium rounded">
            {post.category}
          </span>
          
          <Link href={`/blog/${post.slug}`}>
            <Button variant="ghost" size="sm" className="text-brand-orange hover:text-brand-orange/80 p-0">
              Read More
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
