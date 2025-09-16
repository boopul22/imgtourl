import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy - Image to URL Converter',
  description: 'Learn how we protect your privacy and handle your data when using our free image to URL converter service.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PageLayout 
      title="Privacy Policy" 
      showLastUpdated={true}
    >

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to Image to URL Converter ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our free image hosting service.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By using our service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Information You Provide
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Images and files you upload to our service</li>
                  <li>Any feedback or communications you send to us</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Automatically Collected Information
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>IP address and location information</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Usage patterns and analytics data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>To provide and maintain our image hosting service</li>
                <li>To process your image uploads and generate URLs</li>
                <li>To improve our service and user experience</li>
                <li>To monitor and analyze usage patterns</li>
                <li>To detect and prevent fraud or abuse</li>
                <li>To comply with legal obligations</li>
                <li>To communicate with you about our service</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Data Storage and Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Image Storage
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Your uploaded images are stored securely on our servers. We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Data Retention
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We retain your uploaded images for as long as they are accessible through the generated URLs. You can request deletion of specific images by contacting us. We may also remove images that violate our terms of service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Sharing Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>To service providers who assist in operating our service (under strict confidentiality agreements)</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Note:</strong> Images you upload become publicly accessible through the generated URLs. Anyone with the URL can view these images.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Remember your preferences</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve our service performance</li>
                <li>Provide personalized content (only if you consent)</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement Google Consent Mode v2. By default, advertising and analytics storage are denied until you provide consent via our cookie banner. You can change your preferences at any time using the “Settings” option in the banner.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may use Google Analytics and Google AdSense. These services may set cookies or read identifiers only after consent. Learn more in Google’s privacy policies.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Advertising (Google AdSense)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We display advertisements through Google AdSense. Ad personalization and the use of advertising identifiers are controlled by your consent. Without consent, ads may still appear but won’t use personal data for personalization.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We do not pass personally identifiable information to Google. We comply with Google’s policies and applicable regulations, including the EU User Consent Policy.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our service may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may also use third-party analytics services to help us understand how users interact with our service. These services may collect information about your use of our website.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Access and review your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request data portability</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8" id="content-moderation">
            <CardHeader>
              <CardTitle className="text-2xl">Content Moderation and Prohibited Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  ⚠️ Important Warning: Prohibited Content
                </h3>
                <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                  <strong>Uploading sexually explicit, adult, pornographic, or inappropriate content is strictly prohibited and risky.</strong> Such content violates our terms of service, advertising policies, and may result in immediate content removal, legal consequences, and permanent service blocking.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Automated Content Detection
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To maintain a safe environment and comply with advertising policies, we use automated content moderation systems including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-2">
                  <li>Real-time detection of sexually explicit, adult, and inappropriate imagery</li>
                  <li>Automated blocking of flagged content during upload</li>
                  <li>Advanced SafeSearch technology to identify policy violations</li>
                  <li>Immediate rejection of content that violates our community standards</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Consequences of Violations
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Immediate content removal and upload blocking</li>
                  <li>IP blocking or permanent service restriction</li>
                  <li>Reporting to relevant authorities if illegal content is detected</li>
                  <li>Legal action for copyright infringement or illegal material</li>
                  <li>Loss of access to all services without refund</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  ✅ What You Can Upload
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                  Our service is designed for legitimate image hosting needs: website images, social media content, business materials, educational resources, family photos, and other appropriate visual content that complies with our community standards.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your continued use of our service after any changes to this Privacy Policy constitutes acceptance of those changes.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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
