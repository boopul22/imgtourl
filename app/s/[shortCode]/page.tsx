import { redirect } from 'next/navigation';
import { UrlShortener } from '@/lib/url-shortener';

interface ShortUrlPageProps {
  params: {
    shortCode: string;
  };
}

export default function ShortUrlPage({ params }: ShortUrlPageProps) {
  // This will run on the server side
  const shortUrl = UrlShortener.getShortUrl(params.shortCode);
  
  if (!shortUrl) {
    redirect('/404');
  }

  // Increment clicks (this would ideally be done server-side with a database)
  UrlShortener.incrementClicks(params.shortCode);
  
  // Redirect to the original URL
  redirect(shortUrl.originalUrl);
}

// Generate metadata for the page
export async function generateMetadata({ params }: ShortUrlPageProps) {
  const shortUrl = UrlShortener.getShortUrl(params.shortCode);
  
  if (!shortUrl) {
    return {
      title: 'Short URL Not Found',
    };
  }

  return {
    title: 'Redirecting...',
    description: 'You are being redirected to your image.',
  };
}
