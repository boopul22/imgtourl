import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Globe, Shield, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import UploadZone from '@/components/upload/UploadZone';
import StructuredData from '@/components/seo/StructuredData';
import { generateMetadata, SEO_KEYWORDS } from '@/lib/seo-utils';

export const metadata = generateMetadata({
  title: 'Free Image Hosting - Unlimited Storage | ImageURL',
  description: 'Free image hosting with unlimited storage. Upload photos and get direct links instantly. No signup required, ad-free, permanent links.',
  keywords: SEO_KEYWORDS.FREE_HOSTING,
  canonical: '/free-image-hosting',
  ogType: 'website',
  ogImage: '/og-image-free-hosting.jpg'
});

export default function FreeImageHostingPage() {
  return (
    <>
      <StructuredData type="service" />
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              <span className="text-brand-orange">Free Image to URL</span> Service
              <br />
              Turn Photos Into Web Links
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Easy image to URL converter. Upload any photo and get a web link instantly. Works everywhere,
              lasts forever. No account needed - start turning your photos into shareable links right now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0">
                Start Converting Photos to URLs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Upload Photos for Free - Get Web Links</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The easiest way to turn your photos into web links. Upload unlimited photos, get instant links, and share them anywhere you want.
            </p>
          </div>
          <UploadZone />
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Why Choose Our Free Image Hosting Platform?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Reliable, secure, and completely free image hosting with professional features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Unlimited Free Uploads</h3>
                <p className="text-brand-blue-gray">
                  Upload as many images as you want with no limits. Our free image storage service never expires.
                </p>
              </Card>

              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Global CDN Network</h3>
                <p className="text-brand-blue-gray">
                  Fast image delivery worldwide through 275+ data centers. Your images load instantly everywhere.
                </p>
              </Card>

              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Secure Image Hosting</h3>
                <p className="text-brand-blue-gray">
                  Enterprise-grade security protects your images. Anonymous image hosting available for privacy.
                </p>
              </Card>

              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">No Signup Required</h3>
                <p className="text-brand-blue-gray">
                  Start using our free image hosting immediately. No registration, no ads, just pure image hosting.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Free Image Hosting Benefits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover why thousands choose our platform for their free image hosting needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Permanent Image Links</h3>
              <p className="text-muted-foreground">
                Get permanent image links that never expire. Perfect for forums, blogs, and social media sharing. 
                Our reliable image hosting ensures your links always work.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Ad-Free Experience</h3>
              <p className="text-muted-foreground">
                Enjoy completely ad-free image hosting. No annoying advertisements, just clean and fast image uploads 
                with professional quality service.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">High-Quality Image Storage</h3>
              <p className="text-muted-foreground">
                Upload images up to 10MB with automatic optimization. Supports JPG, PNG, GIF, WEBP, and SVG formats 
                with quality preservation.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Public Image Hosting</h3>
              <p className="text-muted-foreground">
                Share your images publicly with hotlink support. Perfect for embedding in websites, forums, 
                and social media platforms.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">Start Your Free Image Hosting Today</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands who trust our free image hosting service. Upload your first image and experience 
                the best free image storage platform available.
              </p>
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0">
                Upload Images Free Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
