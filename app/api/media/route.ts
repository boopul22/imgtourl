import { NextRequest, NextResponse } from 'next/server';
import { ListObjectsV2Command, DeleteObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_CONFIG } from '@/lib/r2-client';

// Secure authentication check for media management
function checkAuth(request: NextRequest) {
  const providedUsername = request.headers.get('x-media-username');
  const providedPassword = request.headers.get('x-media-password');

  const correctUsername = process.env.MEDIA_ADMIN_USERNAME || 'admin';
  const correctPassword = process.env.MEDIA_ADMIN_PASSWORD;

  // For development, provide fallback credentials
  const devUsername = process.env.NODE_ENV === 'development' ? 'admin' : null;
  const devPassword = process.env.NODE_ENV === 'development' ? 'admin123' : null;

  if (!correctPassword && !devPassword) {
    console.error('MEDIA_ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  const usernameMatch = providedUsername === correctUsername || providedUsername === devUsername;
  const passwordMatch = providedPassword === correctPassword || providedPassword === devPassword;

  return usernameMatch && passwordMatch;
}

export async function GET(request: NextRequest) {
  // Check authentication for media management
  if (!checkAuth(request)) {
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
    const searchParams = request.nextUrl.searchParams;
    const continuationToken = searchParams.get('continuation') || undefined;
    const maxKeys = parseInt(searchParams.get('limit') || '100');
    const sortBy = searchParams.get('sortBy') || 'lastModified';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const fileType = searchParams.get('fileType') || 'all';

    const command = new ListObjectsV2Command({
      Bucket: R2_CONFIG.bucketName,
      MaxKeys: maxKeys,
      ContinuationToken: continuationToken,
    });

    const response = await r2Client.send(command);
    
    let files = response.Contents?.map(object => {
      const extension = object.Key?.split('.').pop()?.toLowerCase() || '';
      const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);
      const isVideo = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension);
      const isDocument = ['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension);
      
      return {
        key: object.Key,
        size: object.Size,
        lastModified: object.LastModified,
        url: `${R2_CONFIG.publicUrl}/${object.Key}`,
        etag: object.ETag,
        extension,
        type: isImage ? 'image' : isVideo ? 'video' : isDocument ? 'document' : 'other',
        isImage,
        isVideo,
        isDocument,
      };
    }) || [];

    // Filter by file type
    if (fileType !== 'all') {
      files = files.filter(file => file.type === fileType);
    }

    // Sort files
    files.sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'name':
          compareValue = (a.key || '').localeCompare(b.key || '');
          break;
        case 'size':
          compareValue = (a.size || 0) - (b.size || 0);
          break;
        case 'type':
          compareValue = (a.extension || '').localeCompare(b.extension || '');
          break;
        case 'lastModified':
        default:
          compareValue = new Date(a.lastModified || 0).getTime() - new Date(b.lastModified || 0).getTime();
          break;
      }
      
      return sortOrder === 'desc' ? -compareValue : compareValue;
    });

    const typeStats = files.reduce((acc, file) => {
      acc[file.type] = (acc[file.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      files,
      isTruncated: response.IsTruncated,
      nextContinuationToken: response.NextContinuationToken,
      count: files.length,
      totalSize: files.reduce((acc, file) => acc + (file.size || 0), 0),
      typeStats,
      filters: { sortBy, sortOrder, fileType },
    });

  } catch (error: any) {
    console.error('Media list error:', error);
    return NextResponse.json(
      { error: 'Failed to list media files' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Check authentication for media management
  if (!checkAuth(request)) {
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
    const { searchParams } = request.nextUrl;
    const key = searchParams.get('key');
    const bulk = searchParams.get('bulk');

    if (bulk === 'true') {
      // Bulk delete
      const body = await request.json();
      const keys = body.keys;

      if (!keys || !Array.isArray(keys) || keys.length === 0) {
        return NextResponse.json(
          { error: 'Keys array is required for bulk delete' },
          { status: 400 }
        );
      }

      if (keys.length > 1000) {
        return NextResponse.json(
          { error: 'Cannot delete more than 1000 files at once' },
          { status: 400 }
        );
      }

      const deleteObjects = keys.map(key => ({ Key: key }));

      const command = new DeleteObjectsCommand({
        Bucket: R2_CONFIG.bucketName,
        Delete: {
          Objects: deleteObjects,
          Quiet: false,
        },
      });

      const response = await r2Client.send(command);

      return NextResponse.json({
        success: true,
        message: `${keys.length} files deleted successfully`,
        deleted: response.Deleted?.map(obj => obj.Key) || [],
        errors: response.Errors || [],
        count: response.Deleted?.length || 0,
      });
    } else {
      // Single file delete
      if (!key) {
        return NextResponse.json(
          { error: 'File key is required' },
          { status: 400 }
        );
      }

      const command = new DeleteObjectCommand({
        Bucket: R2_CONFIG.bucketName,
        Key: key,
      });

      await r2Client.send(command);

      return NextResponse.json({
        success: true,
        message: 'File deleted successfully',
        deletedKey: key,
      });
    }

  } catch (error: any) {
    console.error('Media delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete media file(s)' },
      { status: 500 }
    );
  }
}
