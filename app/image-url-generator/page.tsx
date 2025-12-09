import { Button } from '@/components/ui/button';
import { ArrowRight, Link, Zap, Copy, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import UploadZone from '@/components/upload/UploadZone';
import StructuredData from '@/components/seo/StructuredData';
import { generateMetadata, SEO_KEYWORDS } from '@/lib/seo-utils';

export const metadata = generateMetadata({
  title: 'Image URL Generator - Create Links from Photos | ImageURL',
  description: 'Free image URL generator tool. Upload any photo and create shareable links instantly. Perfect for social media, forums, and websites. No signup required.',
  keywords: SEO_KEYWORDS.URL_GENERATOR,
  canonical: '/image-url-generator',
  ogType: 'website',
  ogImage: '/og-image-url-generator.jpg'
});

export default function ImageURLGeneratorPage() {
  return (
    <>
      <StructuredData type="service" />
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              <span className="text-brand-orange">Image to URL</span> Generator
              <br />
              Turn Photos Into Web Links Instantly
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The easiest image to URL generator online. Upload any photo and get a web link in seconds.
              Perfect for sharing pictures on websites, social media, messages, or anywhere you need a photo link.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0">
                Turn Photos Into Links Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Instant Image Link Generator - Upload & Get URLs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Convert images to shareable URLs instantly with our powerful image URL generator tool. 
              Upload single images or use bulk image URL generator for multiple files.
            </p>
          </div>
          <UploadZone />
        </section>

        {/* How It Works Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">How Our Image URL Generator Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple 3-step process to convert images to URLs and create shareable image links.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Upload Your Image</h3>
                <p className="text-brand-blue-gray">
                  Drag & drop your image or click to browse. Supports JPG, PNG, GIF, WEBP, SVG up to 10MB each.
                </p>
              </Card>

              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Instant URL Generation</h3>
                <p className="text-brand-blue-gray">
                  Our image URL generator processes your upload and creates a shareable URL in under 1 second.
                </p>
              </Card>

              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Copy & Share</h3>
                <p className="text-brand-blue-gray">
                  Get your image URL instantly. One-click copy to share anywhere - forums, social media, websites.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Image URL Generator Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional image link creator with advanced features for all your URL generation needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
              <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Instant Generation</h3>
              <p className="text-brand-blue-gray">
                Convert images to URLs in under 1 second. Fastest image URL generator tool available.
              </p>
            </Card>

            <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
              <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-4">
                <Link className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Permanent URLs</h3>
              <p className="text-brand-blue-gray">
                Generated image URLs never expire. Reliable links for long-term use and sharing.
              </p>
            </Card>

            <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
              <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                <Copy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Bulk URL Generator</h3>
              <p className="text-brand-blue-gray">
                Upload multiple images and generate URLs in batch. Perfect for bulk image processing.
              </p>
            </Card>

            <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
              <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Easy Sharing</h3>
              <p className="text-brand-blue-gray">
                One-click copy, QR codes, and social media integration for effortless image URL sharing.
              </p>
            </Card>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Perfect Image URL Generator for Every Need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From personal use to professional projects, our image link creator handles all scenarios.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Web Developers</h3>
                <p className="text-muted-foreground">
                  Generate image URLs for websites, applications, and projects. Reliable hotlink support 
                  with global CDN delivery for optimal performance.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Forum Users</h3>
                <p className="text-muted-foreground">
                  Create image URLs for forum posts and discussions. Compatible with all major forum 
                  platforms and BBCode systems.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Social Media</h3>
                <p className="text-muted-foreground">
                  Share images across social platforms with generated URLs. Perfect for Twitter, 
                  Discord, Reddit, and other social networks.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Content Creators</h3>
                <p className="text-muted-foreground">
                  Generate URLs for blog images, newsletters, and content marketing. Bulk image URL 
                  generator saves time for large projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Start Generating Image URLs Today</h2>
            <p className="text-xl text-muted-foreground">
              Experience the best image URL generator tool online. Convert your first image to URL 
              and see why thousands choose our instant image link generator.
            </p>
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0">
              Create Image URLs Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
