'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, Phone, MapPin, Clock, MessageSquare, 
  HelpCircle, Shield, Zap, Users, Send, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PageLayout from '@/components/layout/PageLayout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    newsletter: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    gmailUrl?: string;
    mailtoUrl?: string;
    errors?: any[];
  }>({ type: null, message: '', errors: [] });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '', errors: [] });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! Gmail will open in a new tab to send your message.',
          gmailUrl: result.gmailUrl,
          mailtoUrl: result.mailtoUrl
        });
        
        // Open Gmail in new tab (primary method)
        if (result.gmailUrl) {
          window.open(result.gmailUrl, '_blank');
        } else if (result.mailtoUrl) {
          // Fallback to mailto if Gmail URL is not available
          window.location.href = result.mailtoUrl;
        }
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          category: '',
          message: '',
          newsletter: false,
        });
      } else {
        // Handle validation errors specifically
        if (result.errors && result.errors.length > 0) {
          const errorMessages = result.errors.map((error: any) => 
            `${error.path?.join('.')}: ${error.message}`
          ).join(', ');
          setSubmitStatus({
            type: 'error',
            message: `Validation errors: ${errorMessages}`,
            errors: result.errors
          });
        } else {
          setSubmitStatus({
            type: 'error',
            message: result.message || 'Failed to submit form. Please try again.'
          });
        }
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <PageLayout 
      title="Get in Touch"
      description="Have questions, need support, or want to share feedback? I'd love to hear from you! As the developer behind ImageToURL, I'm here to help make your image sharing experience the best it can be."
      maxWidth="6xl"
    >

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Email Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get help with technical issues and general questions
              </p>
              <a 
                href="mailto:blog.boopul@gmail.com" 
                className="text-blue-600 hover:underline font-medium"
              >
                blog.boopul@gmail.com
              </a>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                General Inquiries
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Business partnerships and general information
              </p>
              <a 
                href="mailto:blog.boopul@gmail.com" 
                className="text-blue-600 hover:underline font-medium"
              >
                blog.boopul@gmail.com
              </a>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Legal & Privacy
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Privacy concerns and legal matters
              </p>
              <a 
                href="mailto:blog.boopul@gmail.com" 
                className="text-blue-600 hover:underline font-medium"
              >
                blog.boopul@gmail.com
              </a>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Help Center
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Find answers to common questions
              </p>
              <Link href="/#faq" className="text-blue-600 hover:underline font-medium">
                View FAQ Section
              </Link>
            </Card>
          </div>

          {/* Main Contact Form */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">Send Us a Message</CardTitle>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              {submitStatus.type && (
                <Alert className={`mb-6 ${submitStatus.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:bg-red-900/20'}`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={submitStatus.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}>
                    {submitStatus.message}
                    {submitStatus.type === 'success' && submitStatus.gmailUrl && (
                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => window.open(submitStatus.gmailUrl, '_blank')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Open Gmail
                        </Button>
                        {submitStatus.mailtoUrl && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.location.href = submitStatus.mailtoUrl!}
                            className="border-green-600 text-green-600 hover:bg-green-50"
                          >
                            Use Default Email
                          </Button>
                        )}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50"
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Support</option>
                    <option value="general">General Inquiry</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="partnership">Partnership</option>
                    <option value="legal">Legal/Privacy</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="newsletter" 
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    I would like to receive updates about new features and improvements
                  </Label>
                </div>

                <div className="text-center">
                  <Button type="submit" size="lg" className="px-8 py-3" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    Can't submit the form? Email us directly at{' '}
                    <a href="mailto:blog.boopul@gmail.com" className="text-blue-600 hover:underline">
                      blog.boopul@gmail.com
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Company Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Address</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Image to URL Converter<br />
                      Cloud-based Service<br />
                      Global Operations
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <Clock className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Response Time</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      We typically respond within 24 hours<br />
                      Support available 7 days a week
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Developer</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Bipul Kumar - Solo Developer<br />
                      Indie developer from India<br />
                      Passionate about simple solutions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Quick Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Common Questions</h4>
                  <div className="space-y-2">
                    <Link href="/#faq" className="block text-blue-600 hover:underline text-sm">
                      • How to upload images?
                    </Link>
                    <Link href="/#faq" className="block text-blue-600 hover:underline text-sm">
                      • What file formats are supported?
                    </Link>
                    <Link href="/#faq" className="block text-blue-600 hover:underline text-sm">
                      • How long are images stored?
                    </Link>
                    <Link href="/#faq" className="block text-blue-600 hover:underline text-sm">
                      • Is my data secure?
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Need Immediate Help?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Check our FAQ section for quick answers to most common questions.
                  </p>
                  <Link href="/#faq">
                    <Button variant="outline" size="sm">
                      View FAQ Section
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    How quickly do you respond to inquiries?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    We aim to respond to all inquiries within 24 hours. For urgent technical issues, 
                    we typically respond much faster.
                  </p>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    Can I request new features?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Absolutely! We welcome feature requests and suggestions. Send us your ideas through 
                    the contact form above, and we'll consider them for future updates.
                  </p>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    Do you offer business partnerships?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yes, we're always interested in exploring partnerships and collaborations. 
                    Please reach out to blog.boopul@gmail.com for business inquiries.
                  </p>
                </div>

                <div className="pb-4">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    How can I report a bug or issue?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    If you encounter any bugs or technical issues, please use the contact form above 
                    and select "Bug Report" as the category. Include as many details as possible to help us resolve it quickly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              While you're here, why not try ImageToURL? 
              It only takes a few seconds to upload and get your first image URL - exactly as I designed it to work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="text-lg px-8 py-4">
                  <Zap className="w-5 h-5 mr-2" />
                  Try Our Service
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
    </PageLayout>
  );
}