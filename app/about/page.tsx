import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Zap, Globe, Users, Award, Heart, 
  Target, TrendingUp, CheckCircle, Star
} from 'lucide-react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'About Us - Image to URL Converter',
  description: 'Learn about our mission to provide the best free image hosting service. Discover our story, values, and commitment to user privacy and security.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <PageLayout 
      title="About Image to URL Converter"
      description="Hi! I'm Bipul Kumar, an indie developer and designer from India. I built ImageToURL to make one thing incredibly simple: turn any image into a fast, shareable link—no sign-ups, no friction, no drama."
      maxWidth="6xl"
    >

          {/* Mission Section */}
          <Card className="mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    As an indie developer, I believe that sharing images should be effortless. 
                    Whether you're a blogger, social media user, developer, or just someone who wants to share photos, 
                    ImageToURL provides the tools you need without the complexity.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    I'm committed to maintaining a free, reliable, and secure platform that respects your privacy 
                    while delivering exceptional performance and user experience.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Target className="w-32 h-32 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Privacy First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We prioritize user privacy and data protection above all else. Your images and information are secure with us.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Speed & Reliability
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We optimize for performance to ensure your images load quickly and our service is always available.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Global Accessibility
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our service is available worldwide, ensuring everyone can access free image hosting regardless of location.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  User-Centric Design
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Every feature is designed with our users in mind, making image sharing as simple as possible.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Community Focus
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We value our user community and actively seek feedback to improve our service.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Quality Assurance
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We maintain high standards for service quality, security, and user experience.
                </p>
              </Card>
            </div>
          </div>

          {/* Story Section */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    How It All Started
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    ImageToURL was born from a simple observation: existing image hosting services were either too complex, 
                    required registration, or had limitations that made sharing images frustrating.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    I decided to create a solution that was truly free, simple to use, and reliable. 
                    No accounts, no complicated interfaces, just drag, drop, and share.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-32 h-32 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center order-2 md:order-1">
                  <div className="w-64 h-64 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center">
                    <Star className="w-32 h-32 text-white" />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Growth & Evolution
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Since the launch, ImageToURL has grown from a simple image uploader to a comprehensive image hosting platform. 
                    I've added features like bulk uploads, image optimization, and advanced sharing options.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    But the core principle remains the same: keep it simple, keep it free, and keep it reliable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features & Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Why Choose Our Service?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">100% Free</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">No hidden fees or premium tiers</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">No Registration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Start uploading immediately</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Fast & Reliable</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for speed and uptime</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Privacy Focused</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your data stays secure</p>
              </div>
            </div>
          </div>

          {/* Developer Section */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">Meet the Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    Hi! I'm Bipul Kumar
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    I'm an indie developer and designer from India who loves building simple, useful tools. 
                    I created ImageToURL because I was frustrated with existing image hosting services that were either 
                    too complicated or required unnecessary registrations.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">
                    My philosophy is simple: build tools that solve real problems without adding complexity. 
                    That's why ImageToURL is completely free, requires no sign-up, and works instantly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology & Security */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">Technology & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Modern Infrastructure
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We use cutting-edge technology to ensure fast, reliable service. Our infrastructure includes:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      High-performance servers with global CDN
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Advanced image optimization algorithms
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Real-time monitoring and analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Automated backup and recovery systems
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Security Measures
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Your security is our priority. We implement multiple layers of protection:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      SSL encryption for all data transfers
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Regular security audits and updates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      DDoS protection and rate limiting
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Secure data centers with 24/7 monitoring
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Support */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  Have questions, suggestions, or need support? We'd love to hear from you. 
                  Our team is committed to providing excellent service and support to our users.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">General Inquiries</h4>
                    <p className="text-gray-600 dark:text-gray-400">blog.boopul@gmail.com</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Support</h4>
                    <p className="text-gray-600 dark:text-gray-400">blog.boopul@gmail.com</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Legal</h4>
                    <p className="text-gray-600 dark:text-gray-400">blog.boopul@gmail.com</p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Link href="/privacy-policy">
                    <Button variant="outline">Privacy Policy</Button>
                  </Link>
                  <Link href="/terms-of-service">
                    <Button variant="outline">Terms of Service</Button>
                  </Link>
                  <Link href="/">
                    <Button>Try Our Service</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Start Sharing Images?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust ImageToURL for their image hosting needs. 
              It's free, fast, and secure - just as I intended it to be.
            </p>
            <Link href="/">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Uploading Now
              </Button>
            </Link>
          </div>
    </PageLayout>
  );
}