import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { handleSupabaseError } from '@/lib/error-handler';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];
    
    const missing = requiredVars.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      return NextResponse.json({
        healthy: false,
        status: 'error',
        error: 'Missing environment variables',
        details: missing,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Test database connection
    const supabase = createServerSupabaseClient();
    
    // Simple health check query
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      const appError = handleSupabaseError(error, 'health-check');
      return NextResponse.json({
        healthy: false,
        status: 'error',
        error: 'Database connection failed',
        details: appError,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Test a simple query to ensure read access works
    const { data: sampleData, error: queryError } = await supabase
      .from('blog_posts')
      .select('id, title, status')
      .limit(1);

    if (queryError) {
      const appError = handleSupabaseError(queryError, 'health-check-query');
      return NextResponse.json({
        healthy: false,
        status: 'error',
        error: 'Database query failed',
        details: appError,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    return NextResponse.json({
      healthy: true,
      status: 'ok',
      database: {
        connected: true,
        totalPosts: count || 0,
        canQuery: true
      },
      environment: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Health check failed:', error);
    const appError = handleSupabaseError(error, 'health-check');
    
    return NextResponse.json({
      healthy: false,
      status: 'error',
      error: 'Health check failed',
      details: appError,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
