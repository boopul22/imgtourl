import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Content Guidelines - Image to URL Converter',
  description: 'Learn about our content guidelines, prohibited content, and best practices for using our image hosting service.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContentGuidelinesPage() {
  return (
    <PageLayout 
      title="Content Guidelines"
      description="Keep our community safe by following these guidelines when uploading images to our service."
    >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Critical Warning */}
          <Alert className="mb-8 border-red-200 bg-red-50 dark:bg-red-900/10">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 dark:text-red-300">
              <strong>Important:</strong> Violations of these guidelines may result in immediate content removal. We use automated systems to detect 
              prohibited content.
            </AlertDescription>
          </Alert>

          {/* Strictly Prohibited Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600 dark:text-red-400 flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                Strictly Prohibited Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-700 dark:text-red-300">
                    🔞 Adult & Sexual Content
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Sexually explicit imagery or pornography</li>
                    <li>Graphic nudity or sexual acts</li>
                    <li>Adult-oriented content or erotica</li>
                    <li>Suggestive or provocative imagery</li>
                    <li>Content promoting adult services</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-700 dark:text-red-300">
                    ⚔️ Violence & Hate
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Graphic violence or gore</li>
                    <li>Hate speech or discriminatory content</li>
                    <li>Content promoting violence</li>
                    <li>Threatening or intimidating imagery</li>
                    <li>Harassment or bullying content</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-700 dark:text-red-300">
                    ⚖️ Illegal Content
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Child exploitation or abuse imagery</li>
                    <li>Content promoting illegal activities</li>
                    <li>Drug-related content or promotion</li>
                    <li>Weapons or explosives imagery</li>
                    <li>Fraudulent or deceptive content</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-700 dark:text-red-300">
                    📄 Copyright Violations
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Copyrighted images without permission</li>
                    <li>Movie stills or TV show screenshots</li>
                    <li>Professional photography without rights</li>
                    <li>Branded content or logos</li>
                    <li>Music album covers or artwork</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Acceptable Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-300">
                    💼 Business & Professional
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Business logos and branding materials</li>
                    <li>Product photos and catalogs</li>
                    <li>Professional headshots and team photos</li>
                    <li>Website assets and graphics</li>
                    <li>Marketing materials and presentations</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-300">
                    📚 Educational & Creative
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Educational diagrams and infographics</li>
                    <li>Original artwork and illustrations</li>
                    <li>Screenshots of your own work</li>
                    <li>Tutorial and how-to images</li>
                    <li>Research and academic materials</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-300">
                    👥 Personal & Social
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Family photos and personal memories</li>
                    <li>Social media content</li>
                    <li>Event photos and celebrations</li>
                    <li>Travel and vacation pictures</li>
                    <li>Hobby and interest-related images</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-300">
                    🌐 Web & Technical
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Website images and assets</li>
                    <li>Social media graphics</li>
                    <li>Blog post illustrations</li>
                    <li>App screenshots and mockups</li>
                    <li>Technical documentation images</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Moderation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Automated Content Moderation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  🤖 How We Protect Our Community
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                  We use advanced AI technology to automatically scan all uploaded images for prohibited content. 
                  This includes real-time detection of adult content, violence, hate speech, and copyright violations.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Detection Process
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li><strong>Pre-upload scanning:</strong> Images are analyzed before they reach our servers</li>
                  <li><strong>SafeSearch technology:</strong> Google's advanced content detection system</li>
                  <li><strong>Real-time blocking:</strong> Prohibited content is rejected immediately</li>
                  <li><strong>Continuous monitoring:</strong> Ongoing review of uploaded content</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Consequences */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Consequences of Violations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">First Violation</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Content removal and warning notice
                  </p>
                </div>
                
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <XCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Repeat Violations</h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Content blocking and stricter monitoring
                  </p>
                </div>
                
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Severe Violations</h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Permanent account ban
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Report Violations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you encounter content that violates these guidelines, please report it immediately:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Report Email:</strong> <a href="mailto:blog.boopul@gmail.com" className="text-blue-600 hover:underline">blog.boopul@gmail.com</a>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  <strong>Include:</strong> Image URL, description of violation, and any additional context
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Legal */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Legal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These content guidelines are part of our Terms of Service and Privacy Policy. 
                By using our service, you agree to comply with these guidelines and all applicable laws.
              </p>
              
              <div className="flex gap-4">
                <Link href="/terms-of-service" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>
                <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="text-blue-600 hover:underline">
                  Contact Us
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
    </PageLayout>
  );
}
