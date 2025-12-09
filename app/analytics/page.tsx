import { Metadata } from 'next';
import SEOAnalyticsDashboard from '@/components/dashboard/SEOAnalyticsDashboard';

export const metadata: Metadata = {
  title: 'SEO Analytics Dashboard | ImageURL',
  description: 'Monitor your content\'s SEO performance, track keyword rankings, and discover optimization opportunities.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsPage() {
  return <SEOAnalyticsDashboard />;
}