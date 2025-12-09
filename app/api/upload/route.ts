import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';
import { r2Client, R2_CONFIG } from '@/lib/r2-client';
import { validateFile, generateUniqueFileName, validateFileContent } from '@/lib/validations';
import { checkRateLimit } from '@/lib/rate-limit';

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Add a GET handler for health check
export async function GET(request: NextRequest) {
  console.log('Upload API GET called for health check');

  return NextResponse.json({
    status: 'Upload API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    r2Config: {
      hasClient: !!r2Client,
      hasBucket: !!R2_CONFIG.bucketName,
      hasPublicUrl: !!R2_CONFIG.publicUrl,
    }
  });
}

export async function POST(request: NextRequest) {
  console.log('=== UPLOAD API CALLED ===');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Request URL:', request.url);
  console.log('Request method:', request.method);
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));
  console.log('Environment variables check:', {
    R2_ACCOUNT_ID: !!process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: !!process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: !!process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: !!process.env.R2_BUCKET_NAME,
    R2_PUBLIC_URL: !!process.env.R2_PUBLIC_URL
  });

  try {
    // Check if R2 client is available
    if (!r2Client || !R2_CONFIG.bucketName || !R2_CONFIG.publicUrl) {
      console.error('R2 configuration missing:', {
        r2Client: !!r2Client,
        bucketName: !!R2_CONFIG.bucketName,
        publicUrl: !!R2_CONFIG.publicUrl
      });
      return NextResponse.json(
        { error: 'Upload service is not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    // Rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    console.log('Parsing form data...');
    const formData = await request.formData();
    console.log('Form data entries:', Array.from(formData.entries()).map(([key, value]) => [key, value instanceof File ? `File: ${value.name}` : value]));

    const file = formData.get('file') as File;
    console.log('File received:', {
      name: file?.name,
      size: file?.size,
      type: file?.type
    });

    if (!file || !file.size) {
      console.error('No file in request');
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileName = generateUniqueFileName(file.name);
    const fileId = nanoid(10);

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Validate file content (security check)
    const contentValidation = await validateFileContent(buffer, file.type);
    if (!contentValidation.isValid) {
      return NextResponse.json(
        { error: contentValidation.error },
        { status: 400 }
      );
    }

    // Note: server-side content moderation removed per user preference to avoid paid APIs.

    let optimizedBuffer: Buffer;
    let contentType = file.type;

    // Optimize image based on type
    try {
      if (file.type.startsWith('image/') && file.type !== 'image/svg+xml') {
        // Try to import sharp dynamically to handle platform issues
        let sharpModule;
        try {
          sharpModule = await import('sharp');
        } catch (sharpImportError) {
          console.warn('Sharp module could not be loaded, using original image:', sharpImportError);
          optimizedBuffer = buffer;
          contentType = file.type;
          throw sharpImportError; // Re-throw to go to outer catch block
        }

        const sharp = sharpModule.default;
        const sharpImage = sharp(buffer);
        const metadata = await sharpImage.metadata();

        // Optimize based on format
        if (file.type === 'image/png') {
          optimizedBuffer = await sharpImage
            .png({ quality: 85, compressionLevel: 8 })
            .toBuffer();
        } else if (file.type === 'image/webp') {
          optimizedBuffer = await sharpImage
            .webp({ quality: 85 })
            .toBuffer();
        } else {
          // Convert to JPEG for other formats
          optimizedBuffer = await sharpImage
            .jpeg({ quality: 85, progressive: true })
            .toBuffer();
          contentType = 'image/jpeg';
        }

        // If optimization made file larger, use original
        if (optimizedBuffer.length > buffer.length) {
          optimizedBuffer = buffer;
          contentType = file.type;
        }
      } else {
        // For SVG and other formats, use original
        optimizedBuffer = buffer;
      }
    } catch (error) {
      console.error('Image optimization error:', error);
      console.error('Falling back to original image without optimization');
      optimizedBuffer = buffer;
      contentType = file.type;
    }

    // Upload to Cloudflare R2
    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: fileName,
      Body: optimizedBuffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000', // 1 year
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        fileId: fileId,
        optimized: optimizedBuffer.length !== buffer.length ? 'true' : 'false',
      },
    });

    await r2Client.send(command);

    // Generate URLs
    const publicUrl = `${R2_CONFIG.publicUrl}/${fileName}`;
    const response = {
      id: fileId,
      url: publicUrl,
      fileName: fileName,
      originalName: file.name,
      size: optimizedBuffer.length,
      originalSize: buffer.length,
      contentType: contentType,
      optimized: optimizedBuffer.length !== buffer.length,
      uploadedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Upload error:', error);
    console.error('Error stack:', error.stack);

    // Provide more specific error messages
    let errorMessage = 'Upload failed. Please try again.';
    let statusCode = 500;

    if (error.code === 'EPROTO' || error.message?.includes('SSL')) {
      errorMessage = 'SSL connection error. Please check your Cloudflare R2 configuration.';
    } else if (error.code === 'NoSuchBucket') {
      errorMessage = 'Bucket not found. Please check your R2_BUCKET_NAME.';
    } else if (error.code === 'InvalidAccessKeyId') {
      errorMessage = 'Invalid access key. Please check your R2 credentials.';
    } else if (error.code === 'SignatureDoesNotMatch') {
      errorMessage = 'Invalid secret key. Please check your R2 credentials.';
    } else if (error.code === 'NetworkingError' || error.message?.includes('fetch')) {
      errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Upload timeout. Please try again with a smaller file.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Ensure we always return a proper JSON response
    try {
      return NextResponse.json(
        {
          error: errorMessage,
          code: error.code || 'UNKNOWN_ERROR',
          details: error.message,
          timestamp: new Date().toISOString()
        },
        {
          status: statusCode,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (responseError) {
      console.error('Failed to create error response:', responseError);
      // Fallback to basic response
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }
}