import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminFromRequest, isAdminRoute } from '@/lib/auth';

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export async function middleware(request: NextRequest) {
  // Global under-13 site access block - only allow parental consent page and essential assets
  const under13Cookie = request.cookies.get('under13')?.value;
  const path = request.nextUrl.pathname;
  
  if (under13Cookie === 'true') {
    // Allow only parental consent page and essential static assets
    const allowedPaths = [
      '/parental-consent',
      '/_next/',          // Next.js assets
      '/favicon.ico',     // Favicon
      '/android-chrome-',  // PWA icons
      '/apple-touch-icon.png',
      '/site.webmanifest'
    ];
    
    const isAllowed = allowedPaths.some(allowedPath => 
      path === allowedPath || path.startsWith(allowedPath)
    );
    
    if (!isAllowed) {
      const url = new URL('/parental-consent', request.url);
      return NextResponse.redirect(url);
    }
  }

  // Check admin authentication for admin routes
  if (isAdminRoute(request.nextUrl.pathname)) {
    // Allow access to login page and media page (media page has its own auth)
    if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin/media') {
      return NextResponse.next();
    }

    // Check if user is authenticated
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Apply rate limiting only to upload API
  if (request.nextUrl.pathname.startsWith('/api/upload')) {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const limit = 10; // requests per hour
    const windowMs = 60 * 60 * 1000; // 1 hour

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip)!;

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    ipData.count += 1;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
};