import { S3Client } from '@aws-sdk/client-s3';

// Create R2 client only when environment variables are available
function createR2Client() {
  console.log('Environment check:', {
    R2_ACCOUNT_ID: !!process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: !!process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: !!process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: !!process.env.R2_BUCKET_NAME,
    R2_PUBLIC_URL: !!process.env.R2_PUBLIC_URL
  });

  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.warn('Cloudflare R2 environment variables not found. Upload functionality will not work.');
    return null;
  }

  try {
    // Try different endpoint configurations for better compatibility
    const endpoint = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
    console.log('Creating R2 client with endpoint:', endpoint);

    return new S3Client({
      region: 'auto',
      endpoint: endpoint,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
      forcePathStyle: true,
      maxAttempts: 3,
      requestHandler: {
        requestTimeout: 60000, // Increase timeout
      },
    });
  } catch (error) {
    console.error('Failed to create R2 client:', error);
    return null;
  }
}

export const r2Client = createR2Client();

export const R2_CONFIG = {
  bucketName: process.env.R2_BUCKET_NAME || '',
  publicUrl: process.env.R2_PUBLIC_URL || '',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
  allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(',') || [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ],
};