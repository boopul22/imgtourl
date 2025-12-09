import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Mail, Phone, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Parental Consent Required - Image to URL Converter',
  description: 'Parental consent is required for users under 13 years old to comply with COPPA regulations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ParentalConsentPage() {
  return (
    <PageLayout 
      title="Parental Consent Required"
    >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              To protect children's privacy online, we require parental consent for users under 13 years old.
            </p>
          </div>

          {/* COPPA Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6" />
                About COPPA Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  The Children's Online Privacy Protection Act (COPPA) requires websites to obtain 
                  verifiable parental consent before collecting personal information from children under 13.
                </AlertDescription>
              </Alert>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our image hosting service may collect certain information when images are uploaded, 
                including IP addresses and usage data. To ensure your child's privacy and safety, 
                we need your consent as a parent or guardian before they can use our service.
              </p>
            </CardContent>
          </Card>

          {/* What We Collect */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Information We May Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                    Automatically Collected
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Usage statistics and analytics</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                    User-Provided Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Uploaded images and files</li>
                    <li>Contact form submissions (if used)</li>
                    <li>Feedback and support requests</li>
                    <li>Account information (if created)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Provide Consent */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">How to Provide Parental Consent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To provide consent for your child to use our service, please contact us using one of the methods below. 
                We will verify your identity as the parent or guardian and provide you with detailed information 
                about our data practices.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                  <Mail className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Email Consent</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Send us an email with your consent and verification documents
                  </p>
                  <a 
                    href="mailto:blog.boopul@gmail.com?subject=Parental Consent Request&body=I am writing to provide parental consent for my child to use the Image to URL Converter service. Please provide me with the necessary consent forms and verification process."
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Send Email
                  </a>
                </div>
                
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <Phone className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Contact Form</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Use our contact form to request parental consent information
                  </p>
                  <Link href="/contact">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Required Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Required Information for Consent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To process your parental consent request, we will need:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Your full name and relationship to the child</li>
                <li>Child's name and age</li>
                <li>Verification of your identity (government-issued ID)</li>
                <li>Your contact information (email and phone number)</li>
                <li>Signed consent form (we will provide this)</li>
              </ul>
              
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  All personal information provided for verification will be used solely for 
                  the purpose of verifying parental consent and will be securely stored and protected.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Your Rights as a Parent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                As a parent or guardian, you have the right to:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Review the personal information we have collected from your child</li>
                <li>Request that we delete your child's personal information</li>
                <li>Refuse to allow further collection or use of your child's information</li>
                <li>Withdraw your consent at any time</li>
                <li>Contact us with questions about our privacy practices</li>
              </ul>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/">
              <Button variant="outline" size="lg" className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Return to Homepage
              </Button>
            </Link>
          </div>
    </PageLayout>
  );
}