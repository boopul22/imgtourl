import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Terms of Service - Image to URL Converter',
  description: 'Read our terms of service for using the free image to URL converter service. Learn about acceptable use, user responsibilities, and service limitations.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <PageLayout 
      title="Terms of Service" 
      showLastUpdated={true}
    >

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms of Service ("Terms") govern your use of the Image to URL Converter service ("Service") operated by Image to URL Converter ("we," "our," or "us"). By accessing or using our Service, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you disagree with any part of these terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Image to URL Converter is a free online service that allows users to upload images and receive shareable URLs. Our Service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Image upload and hosting</li>
                <li>URL generation for uploaded images</li>
                <li>Basic image management tools</li>
                <li>Bulk upload capabilities</li>
                <li>Image optimization and resizing</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">User Accounts and Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our Service is designed to be used without requiring user registration. However, if you choose to create an account or use certain features that require authentication:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>We reserve the right to terminate accounts that violate these Terms</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Acceptable Use Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>To upload, transmit, or distribute any content that is illegal or promotes illegal activity</li>
                <li>To upload adult, pornographic, sexually explicit, or fetish content; sexual content involving minors; or exploitative content</li>
                <li>To upload content that is violent, hateful, harassing, or that incites harm or discrimination</li>
                <li>To upload content that infringes intellectual property rights or violates privacy rights</li>
                <li>To upload malware, viruses, or other harmful code</li>
                <li>To impersonate others, misrepresent affiliation, or deceive users</li>
                <li>To attempt to gain unauthorized access to our systems or networks</li>
                <li>To interfere with or disrupt the Service or servers</li>
                <li>To use the Service for commercial purposes without our written consent</li>
                <li>To upload content that promotes illegal drugs, weapons, counterfeit goods, or other prohibited items</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Advertising and Monetization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our Service may display advertisements via Google AdSense. You agree not to engage in invalid activity including, without limitation, clicking your own ads, encouraging others to click ads, or using automated means to generate impressions or clicks.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We comply with Google Publisher Policies. Content that violates these policies may be removed and access may be suspended.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Content Ownership and Licensing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Your Content
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You retain ownership of the images you upload to our Service. By uploading content, you grant us a limited, non-exclusive, worldwide license to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Store and host your images on our servers</li>
                  <li>Generate and provide URLs for your images</li>
                  <li>Process and optimize your images for delivery</li>
                  <li>Use your images for service improvement and analytics (anonymously)</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Our Rights
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We reserve the right to remove any content that violates these Terms or is otherwise objectionable. We may also suspend or terminate access to the Service for users who repeatedly violate these Terms.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Service Limitations and Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Service Availability
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We strive to provide a reliable and high-quality service, but we cannot guarantee that the Service will be available 100% of the time. The Service is provided "as is" and "as available" without any warranties.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Data Loss and Backup
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  While we implement security measures to protect your data, we cannot guarantee against data loss. We recommend keeping backups of important images. We are not responsible for any loss of data or content.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  File Size and Format Limitations
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our Service has limitations on file sizes and supported formats. We reserve the right to modify these limitations at any time. Files that exceed current limits may be rejected or processed differently.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to our collection and use of information as described in our Privacy Policy.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Please review our Privacy Policy to understand our practices regarding your personal information.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The Service and its original content, features, and functionality are owned by Image to URL Converter and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You may not copy, modify, distribute, sell, or lease any part of our Service without our prior written consent.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To the maximum extent permitted by applicable law, Image to URL Converter shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
                <li>Any bugs, viruses, or other harmful code that may be transmitted through the Service</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, transmitted, or otherwise made available via the Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Indemnification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree to defend, indemnify, and hold harmless Image to URL Converter and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of the Service.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Governing Law and Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Image to URL Converter operates, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of the relevant arbitration association.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> blog.boopul@gmail.com
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Website:</strong> <Link href="/" className="text-blue-600 hover:underline">https://imagetourl.cloud</Link>
                </p>
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
