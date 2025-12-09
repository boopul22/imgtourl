import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_CONFIG } from '@/lib/r2-client';
import JSZip from 'jszip';

// Secure password check for media management
function checkPassword(request: NextRequest) {
  const providedPassword = request.headers.get('x-media-password');
  const correctPassword = process.env.MEDIA_ADMIN_PASSWORD;
  
  if (!correctPassword) {
    console.error('MEDIA_ADMIN_PASSWORD not set in environment variables');
    return false;
  }
  
  return providedPassword === correctPassword;
}

export async function POST(request: NextRequest) {
  // Check password for media management
  if (!checkPassword(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!r2Client || !R2_CONFIG.bucketName) {
    return NextResponse.json(
      { error: 'R2 configuration missing' },
      { status: 500 }
    );
  }

  try {
    const { keys } = await request.json();

    if (!keys || !Array.isArray(keys) || keys.length === 0) {
      return NextResponse.json(
        { error: 'Keys array is required' },
        { status: 400 }
      );
    }

    if (keys.length > 100) {
      return NextResponse.json(
        { error: 'Cannot download more than 100 files at once' },
        { status: 400 }
      );
    }

    const zip = new JSZip();
    const downloadPromises = keys.map(async (key: string) => {
      try {
        const command = new GetObjectCommand({
          Bucket: R2_CONFIG.bucketName,
          Key: key,
        });

        const response = await r2Client!.send(command);
        
        if (response.Body) {
          const chunks: Uint8Array[] = [];
          const stream = response.Body as any;
          
          for await (const chunk of stream) {
            chunks.push(chunk);
          }
          
          const buffer = Buffer.concat(chunks);
          zip.file(key, buffer);
        }
      } catch (error) {
        console.error(`Failed to download ${key}:`, error);
        // Add error file to zip
        zip.file(`ERROR_${key}.txt`, `Failed to download this file: ${error}`);
      }
    });

    await Promise.all(downloadPromises);

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `media-files-${timestamp}.zip`;

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });

  } catch (error: any) {
    console.error('Bulk download error:', error);
    return NextResponse.json(
      { error: 'Failed to create download archive' },
      { status: 500 }
    );
  }
}
