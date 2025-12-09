'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie, Shield, Settings } from 'lucide-react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    try {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.gtag) {
        // Update Consent Mode v2 to granted for all relevant scopes
        // @ts-ignore
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
      }
    } catch {}
    setShowConsent(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    try {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.gtag) {
        // Keep all denied for essential-only consent
        // @ts-ignore
        window.gtag('consent', 'update', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
    } catch {}
    setShowConsent(false);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  if (!showConsent && !showSettings) return null;

  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cookie Settings
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeSettings}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Essential Cookies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Required for the website to function properly
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Analytics Cookies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Help us improve our website
                </p>
              </div>
              <input
                type="checkbox"
                id="analytics"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Marketing Cookies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Used for personalized advertising
                </p>
              </div>
              <input
                type="checkbox"
                id="marketing"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={closeSettings}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                localStorage.setItem('cookie-consent', 'custom');
                try {
                  const analytics = (document.getElementById('analytics') as HTMLInputElement)?.checked;
                  const marketing = (document.getElementById('marketing') as HTMLInputElement)?.checked;
                  // @ts-ignore
                  if (typeof window !== 'undefined' && window.gtag) {
                    // Update scopes individually
                    // @ts-ignore
                    window.gtag('consent', 'update', {
                      analytics_storage: analytics ? 'granted' : 'denied',
                      ad_storage: marketing ? 'granted' : 'denied',
                      ad_user_data: marketing ? 'granted' : 'denied',
                      ad_personalization: marketing ? 'granted' : 'denied',
                    });
                  }
                } catch {}
                closeSettings();
              }}
              className="flex-1"
            >
              Save Preferences
            </Button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-40">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                We use cookies to enhance your experience
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We use cookies to analyze site traffic and optimize your site experience. 
                By accepting, you consent to our use of cookies. 
                <a href="/privacy-policy" className="text-blue-600 hover:underline ml-1">
                  Learn more
                </a>
              </p>
              <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded text-xs">
                <span className="text-orange-700 dark:text-orange-300 font-medium">
                  ⚠️ Content Warning: 
                </span>
                <span className="text-orange-600 dark:text-orange-400">
                  Uploading sexually explicit, adult, or inappropriate content is strictly prohibited.
                </span>
                <a href="/privacy-policy#content-moderation" className="text-orange-600 hover:underline ml-1">
                  Read policy
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={openSettings}
              className="text-sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={acceptEssential}
              className="text-sm"
            >
              Essential Only
            </Button>
            <Button
              size="sm"
              onClick={acceptAll}
              className="text-sm"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
