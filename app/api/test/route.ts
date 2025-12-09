import { NextResponse } from 'next/server';
import { r2Client, R2_CONFIG } from '@/lib/r2-client';

export async function GET() {
  try {
    // Check if R2 client is available and properly configured
    const r2ClientAvailable = !!(
      r2Client && 
      R2_CONFIG.bucketName && 
      R2_CONFIG.publicUrl &&
      process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY
    );

    return NextResponse.json({
      r2ClientAvailable,
      bucketName: R2_CONFIG.bucketName,
      publicUrl: R2_CONFIG.publicUrl,
      maxFileSize: R2_CONFIG.maxFileSize,
      allowedTypes: R2_CONFIG.allowedTypes,
      status: r2ClientAvailable ? 'ready' : 'not_configured'
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      r2ClientAvailable: false,
      status: 'error',
      error: 'Failed to check service status'
    }, { status: 500 });
  }
}
