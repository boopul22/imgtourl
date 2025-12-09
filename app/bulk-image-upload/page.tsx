import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Layers, Zap, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import UploadZone from '@/components/upload/UploadZone';
import StructuredData from '@/components/seo/StructuredData';
import { generateMetadata, SEO_KEYWORDS } from '@/lib/seo-utils';

export const metadata = generateMetadata({
  title: 'Bulk Image Upload - Multiple Photos to URLs | ImageURL',
  description: 'Upload multiple images simultaneously and generate URLs for all. Batch processing with progress tracking and export options.',
  keywords: SEO_KEYWORDS.BULK_UPLOAD,
  canonical: '/bulk-image-upload',
  ogType: 'website',
  ogImage: '/og-image-bulk-upload.jpg'
});

export default function BulkImageUploadPage() {
  return (
    <>
      <StructuredData type="service" />
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              <span className="text-brand-orange">Upload Many Photos</span> at Once
              <br />
              Turn Lots of Pictures Into Web Links
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Got lots of photos to share? Upload them all at once and get web links for every picture.
              Perfect when you have many photos from events, trips, or projects to share with others.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0">
                Upload Many Photos Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Bulk Image URL Generator - Upload Multiple Images</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload multiple images at once with our advanced bulk image upload tool. 
              Batch image processing with instant URL generation for all your files.
            </p>
          </div>
          <UploadZone />
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Advanced Bulk Image Upload Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional-grade bulk image hosting with enterprise features for efficient batch processing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Multiple Image Upload</h3>
                <p className="text-brand-blue-gray">
                  Upload dozens of images simultaneously. Drag & drop multiple files or select entire folders.
                </p>
              </Card>

              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Batch URL Generation</h3>
                <p className="text-brand-blue-gray">
                  Generate URLs for all uploaded images instantly. Bulk image URL generator processes files in parallel.
                </p>
              </Card>

              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Progress Tracking</h3>
                <p className="text-brand-blue-gray">
                  Real-time progress tracking for each image. See upload status and completion for bulk operations.
                </p>
              </Card>

              <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
                <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Bulk Export Options</h3>
                <p className="text-brand-blue-gray">
                  Export all URLs as text, CSV, or JSON. Perfect for importing into other systems and databases.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">How Bulk Image Upload Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Streamlined process for uploading multiple images and generating URLs in batch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
              <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Select Multiple Images</h3>
              <p className="text-brand-blue-gray text-sm">
                Choose multiple images from your device or drag entire folders into the upload zone.
              </p>
            </Card>

            <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
              <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Batch Processing</h3>
              <p className="text-brand-blue-gray text-sm">
                Our bulk image upload service processes all images simultaneously with progress tracking.
              </p>
            </Card>

            <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
              <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">URL Generation</h3>
              <p className="text-brand-blue-gray text-sm">
                Bulk image URL generator creates shareable links for all uploaded images instantly.
              </p>
            </Card>

            <Card className="p-6 text-center transition-colors border border-brand-beige/50 hover:bg-brand-beige/20">
              <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Export & Share</h3>
              <p className="text-brand-blue-gray text-sm">
                Copy all URLs at once or export them in various formats for easy sharing and integration.
              </p>
            </Card>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Perfect for Professional Bulk Image Upload Needs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From e-commerce to content creation, our bulk image hosting service handles large-scale projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">E-commerce Stores</h3>
                <p className="text-muted-foreground">
                  Upload product catalogs with hundreds of images. Bulk image URL generator creates links 
                  for all product photos simultaneously, perfect for inventory management.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Content Creators</h3>
                <p className="text-muted-foreground">
                  Batch upload images for blogs, articles, and social media campaigns. Multiple image uploader 
                  saves hours when preparing content with many visuals.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Web Developers</h3>
                <p className="text-muted-foreground">
                  Upload website assets and gallery images in bulk. Mass image upload with instant URL generation 
                  streamlines development workflows and project deployment.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Digital Agencies</h3>
                <p className="text-muted-foreground">
                  Handle client projects with bulk photo upload capabilities. Batch image processing 
                  for campaigns, portfolios, and marketing materials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Start Your Bulk Image Upload Today</h2>
            <p className="text-xl text-muted-foreground">
              Experience the most efficient bulk image upload service. Upload multiple images and generate 
              URLs instantly with our professional batch processing system.
            </p>
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0">
              Upload Multiple Images Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
