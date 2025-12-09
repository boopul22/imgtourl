'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Calendar, AlertTriangle, FileText, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function AgeVerification() {
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // If on parental consent page, always show the parental consent dialog
    if (pathname === '/parental-consent') {
      setShowVerification(true);
      return;
    }

    // Check if user has already verified their age
    const ageVerified = localStorage.getItem('age-verified');
    const verificationDate = localStorage.getItem('age-verification-date');
    
    if (ageVerified === 'true' && verificationDate) {
      // Check if verification is still valid (30 days)
      const verificationTime = new Date(verificationDate).getTime();
      const currentTime = new Date().getTime();
      const daysDifference = (currentTime - verificationTime) / (1000 * 3600 * 24);
      
      if (daysDifference < 30) {
        setIsVerified(true);
        return;
      }
    }
    
    // Show verification if not verified or expired
    setShowVerification(true);
  }, [pathname]);

  const handleAgeConfirmation = (isOver13: boolean) => {
    if (isOver13) {
      localStorage.setItem('age-verified', 'true');
      localStorage.setItem('age-verification-date', new Date().toISOString());
      try {
        localStorage.removeItem('under-13');
        document.cookie = 'under13=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      } catch {}
      setIsVerified(true);
      setShowVerification(false);
    } else {
      try {
        localStorage.setItem('under-13', 'true');
        document.cookie = 'under13=true; path=/; max-age=31536000; SameSite=Lax';
      } catch {}
      window.location.href = '/parental-consent';
    }
  };

  const handleParentalConsent = () => {
    // This would typically involve a more complex parental consent process
    // For now, we'll redirect to a parental consent page
    window.location.href = '/parental-consent';
  };

  if (isVerified || !showVerification) return null;

  // Show special parental consent message on the parental consent page
  if (pathname === '/parental-consent') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-2xl">Parental Consent Needed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Since you indicated you're under 13, parental consent is required before you can use our service.
              </AlertDescription>
            </Alert>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Please have your parent or guardian review the information on this page and contact us to provide consent. 
                This helps us comply with COPPA regulations and keeps you safe online.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/">
                <Button variant="outline" className="w-full" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return to Homepage
                </Button>
              </Link>
              
              <Button
                onClick={() => {
                  try {
                    // Clear under-13 status and allow re-verification
                    localStorage.removeItem('under-13');
                    document.cookie = 'under13=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                  } catch {}
                  window.location.href = '/';
                }}
                className="w-full"
                size="lg"
              >
                I made a mistake - I'm 13 or older
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                For questions about parental consent, please contact us using the information above.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Age Verification Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              To comply with COPPA (Children's Online Privacy Protection Act), we need to verify your age before you can use our service.
            </AlertDescription>
          </Alert>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-5 h-5" />
              <span>Please confirm your age</span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our service is designed for users 13 years and older. If you are under 13, 
              parental consent is required to use this service.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleAgeConfirmation(true)}
              className="w-full"
              size="lg"
            >
              I am 13 years or older
            </Button>
            
            <Button
              onClick={() => handleAgeConfirmation(false)}
              variant="outline"
              className="w-full"
              size="lg"
            >
              I am under 13 years old
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By continuing, you acknowledge that you have read and agree to our{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms-of-service" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}