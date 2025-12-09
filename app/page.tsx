import { ArrowRight, Shield, Zap, Globe, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScrollButton from '@/components/ui/scroll-button';
import UploadZone from '@/components/upload/UploadZone';
import Stats from '@/components/ui/stats';
import FAQ from '@/components/seo/FAQ';
import StructuredData from '@/components/seo/StructuredData';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/blog-storage-supabase';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch recent blog posts for the home page
  const allPosts = await getPublishedPosts();
  const recentPosts = allPosts.slice(0, 3); // Show only 3 most recent posts
  return (
    <>
      <PerformanceOptimizer />
      <StructuredData type="service" />
      <StructuredData type="faq" />
      <main id="main-content" className="space-y-16">
      {/* Hero Section with Upload Zone - Simplified and Above Fold */}
      <section className="container mx-auto px-4 py-8 md:py-12 min-h-[80vh] flex flex-col justify-center" aria-labelledby="hero-heading">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            {/* SEO-Optimized Headline with "image to url" keyword */}
            <div className="space-y-4">
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Free Image to URL Converter
                <span className="block text-brand-orange">
                  Turn Photos Into Links
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Upload any photo and get a web link to share anywhere - it's that simple!
              </p>
            </div>

          {/* Key Benefits - Simple language for everyone */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
              <span className="text-brand-blue-gray font-medium">Always Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-blue-gray rounded-full"></div>
              <span className="text-brand-blue-gray font-medium">No Account Needed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
              <span className="text-brand-blue-gray font-medium">Works Right Away</span>
            </div>
          </div>

          {/* Upload Zone - Now Above Fold */}
          <div id="upload-section" className="max-w-3xl mx-auto">
            <UploadZone />
          </div>

            {/* File Format Info - Simple language */}
            <p className="text-sm text-muted-foreground">
              Works with all photo types • Up to 10MB each • Upload as many as you want
            </p>
          </div>
        </div>
      </section>



      {/* Stats Section - Quick Overview */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <Stats />
      </section>

      {/* Features Section - Flat design with solid background */}
      <section id="features" className="bg-brand-beige/30 dark:bg-brand-blue-gray/10 py-20" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="slideUp" className="text-center space-y-6 mb-16">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold">Why Use Our Image to URL Tool?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Easy, fast, and works every time. Everything you need to turn photos into web links.
            </p>
          </ScrollReveal>

          {/* Main Features - Simplified Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ScrollReveal animation="slideUp" delay={100}>
              <Card className="p-8 text-center transition-colors duration-200 border border-brand-beige/50 dark:border-brand-blue-gray/20 bg-white dark:bg-brand-blue-gray/5 hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10">
                <div className="mx-auto w-16 h-16 bg-brand-orange rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Super Fast</h3>
                <p className="text-brand-blue-gray leading-relaxed">
                  Upload your photo and get a web link in seconds. We make your pictures
                  load quickly no matter where you share them.
                </p>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="slideUp" delay={200}>
              <Card className="p-8 text-center transition-colors duration-200 border border-brand-beige/50 dark:border-brand-blue-gray/20 bg-white dark:bg-brand-blue-gray/5 hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10">
                <div className="mx-auto w-16 h-16 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Works Anywhere</h3>
                <p className="text-brand-blue-gray leading-relaxed">
                  Your image links work on any website or app around the world.
                  Great for social media, blogs, and sharing with friends.
                </p>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="slideUp" delay={300}>
              <Card className="p-8 text-center transition-colors duration-200 border border-brand-beige/50 dark:border-brand-blue-gray/20 bg-white dark:bg-brand-blue-gray/5 hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10">
                <div className="mx-auto w-16 h-16 bg-brand-orange rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Safe & Private</h3>
                <p className="text-brand-blue-gray leading-relaxed">
                  Your photos are kept safe and secure on our servers.
                  No need to create an account - upload privately anytime.
                </p>
              </Card>
            </ScrollReveal>
          </div>

          {/* Additional Benefits - Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground">Upload Many Photos</h4>
              <p className="text-sm text-brand-blue-gray">Add several pictures at once and get all your links at the same time.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground">Easy Sharing</h4>
              <p className="text-sm text-brand-blue-gray">Copy your image link with one click and share it anywhere you want.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground">Links Last Forever</h4>
              <p className="text-sm text-brand-blue-gray">Your image links keep working forever - they'll never break or disappear.</p>
            </div>
          </div>

          {/* SEO Content - Optimized for "image to url" keyword with improved design */}
          <div className="mt-16">
            <ScrollReveal animation="slideUp" className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete Image to URL Solution</h3>
              <p className="text-xl text-brand-blue-gray leading-relaxed max-w-3xl mx-auto">
                The best free image to URL converter tool online. Turn any photo into a web link instantly with our
                simple image to URL service. Upload pictures and get shareable links that work everywhere.
              </p>
            </ScrollReveal>
              
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <ScrollReveal animation="slideUp" delay={100}>
                <Card className="p-8 h-full border border-brand-beige/50 dark:border-brand-blue-gray/20 bg-white dark:bg-brand-blue-gray/5 hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10 transition-colors duration-200">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">Professional Image Hosting</h4>
                  </div>
                  <div className="space-y-4 text-brand-blue-gray">
                    <p>
                      Our image to URL converter provides professional-grade hosting for your photos. Whether you're a blogger, 
                      social media manager, or just need to share images quickly, our service delivers fast, reliable URLs 
                      that work across all platforms.
                    </p>
                    <p>
                      Compatible with all major image formats including JPEG, PNG, GIF, and WebP. Each image gets 
                      optimized for web delivery while maintaining quality, ensuring your photos load quickly 
                      no matter where they're displayed.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
                
              <ScrollReveal animation="slideUp" delay={200}>
                <Card className="p-8 h-full border border-brand-beige/50 dark:border-brand-blue-gray/20 bg-white dark:bg-brand-blue-gray/5 hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10 transition-colors duration-200">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">Why Choose Our Service</h4>
                  </div>
                  <div className="space-y-4 text-brand-blue-gray">
                    <p>
                      Unlike other image hosting services, we focus on simplicity and reliability. No complex signup 
                      processes, no hidden fees, and no storage limits. Just upload your images and get permanent 
                      URLs that you can use immediately.
                    </p>
                    <p>
                      Perfect for developers, content creators, e-commerce businesses, and anyone who needs reliable 
                      image hosting. Our global CDN ensures your images load fast worldwide, and our secure infrastructure 
                      keeps your content safe and accessible 24/7.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
              
            <ScrollReveal animation="slideUp" delay={300}>
              <Card className="p-8 bg-gradient-to-r from-brand-beige/30 to-brand-orange/10 dark:from-brand-blue-gray/20 dark:to-brand-orange/10 border border-brand-orange/20 rounded-xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-3">Learn More About Image Optimization</h4>
                  <p className="text-brand-blue-gray">
                    Want to learn more about image optimization and best practices? Check out these helpful resources 
                    from industry experts:
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a 
                    href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white dark:bg-brand-blue-gray/20 text-brand-orange hover:text-brand-orange/80 rounded-lg border border-brand-orange/20 hover:border-brand-orange/40 transition-all duration-200 text-sm font-medium"
                  >
                    Google's Image Guide
                  </a>
                  <a 
                    href="https://web.dev/fast/#optimize-your-images" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white dark:bg-brand-blue-gray/20 text-brand-orange hover:text-brand-orange/80 rounded-lg border border-brand-orange/20 hover:border-brand-orange/40 transition-all duration-200 text-sm font-medium"
                  >
                    Web.dev Performance
                  </a>
                  <a 
                    href="https://moz.com/learn/seo/page-speed" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white dark:bg-brand-blue-gray/20 text-brand-orange hover:text-brand-orange/80 rounded-lg border border-brand-orange/20 hover:border-brand-orange/40 transition-all duration-200 text-sm font-medium"
                  >
                    SEO Guide
                  </a>
                </div>
              </Card>
            </ScrollReveal>
              
            <ScrollReveal animation="slideUp" delay={400} className="mt-12 text-center">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-foreground mb-3">Explore More Tools</h4>
                <p className="text-brand-blue-gray">
                  Discover our full suite of image tools and resources
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/bulk-image-upload" className="inline-flex items-center px-6 py-3 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange rounded-lg border border-brand-orange/30 hover:border-brand-orange/50 transition-all duration-200 font-medium">
                  Bulk Upload Tool
                </Link>
                <Link href="/image-url-generator" className="inline-flex items-center px-6 py-3 bg-brand-blue-gray/10 hover:bg-brand-blue-gray/20 text-brand-blue-gray rounded-lg border border-brand-blue-gray/30 hover:border-brand-blue-gray/50 transition-all duration-200 font-medium">
                  URL Generator
                </Link>
                <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange rounded-lg border border-brand-orange/30 hover:border-brand-orange/50 transition-all duration-200 font-medium">
                  Blog
                </Link>
                <Link href="/privacy-policy" className="inline-flex items-center px-6 py-3 bg-brand-blue-gray/10 hover:bg-brand-blue-gray/20 text-brand-blue-gray rounded-lg border border-brand-blue-gray/30 hover:border-brand-blue-gray/50 transition-all duration-200 font-medium">
                  Policies & Guidelines
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="blog-heading">
        <div className="text-center space-y-6 mb-12">
          <h2 id="blog-heading" className="text-3xl md:text-4xl font-bold">Learn More About Image to URL</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover helpful tips and simple guides for turning your photos into web links and sharing them online.
          </p>
        </div>

        {recentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {recentPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} variant="default" />
              ))}
            </div>

            <div className="text-center">
              <Link href="/blog">
                <Button variant="outline" className="border-brand-orange/30 hover:border-brand-orange hover:bg-brand-orange/10">
                  View All Articles
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">
              We're working on creating helpful articles about image hosting and optimization.
            </p>
            <Link href="/blog">
              <Button variant="outline" className="border-brand-orange/30 hover:border-brand-orange hover:bg-brand-orange/10">
                Check Back Soon
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section - Flat design with brand colors */}
      <section className="bg-brand-beige/40 dark:bg-brand-blue-gray/10 py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="slideUp" className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Convert Your Images to URLs?</h2>
            <p className="text-xl text-brand-blue-gray leading-relaxed">
              Join thousands who use our free image to URL converter every day.
              Upload your first photo and get a web link in seconds!
            </p>
            <ScrollButton
              targetId="upload-section"
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-12 py-6 h-auto transition-all duration-200 ease-out hover:scale-105 active:scale-95 border-0 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
            >
              <Upload className="mr-3 w-6 h-6" />
              Start Uploading Now
            </ScrollButton>

            {/* SEO content optimized for "image to url" keyword */}
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              The easiest image to URL converter online. Turn any photo into a shareable web link
              instantly with our free service - no account required, unlimited uploads.
            </p>
          </ScrollReveal>
        </div>
      </section>
      </main>
    </>
  );
}