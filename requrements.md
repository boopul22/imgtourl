# Build an Image-to-URL Converter Website with Cloudflare R2

Create a modern, responsive web application that allows users to upload images and receive shareable URLs, similar to imagetoourl.vercel.app. The application should use Cloudflare R2 for file hosting with generous free tier limits.

## Core Features Required

### 1. File Upload Interface
- Drag-and-drop upload area with visual feedback
- Click-to-browse file selection
- Support for multiple image formats: JPG, PNG, GIF, WEBP, SVG
- File size limit of 10MB per image
- Progress indicator during upload
- Preview of uploaded images before processing

### 2. Image Processing & Storage
- Integrate with Cloudflare R2 bucket
- Generate unique filenames to prevent conflicts
- Automatic image optimization (optional compression)
- Support for batch uploads (multiple images at once)
- Secure upload with API token authentication

### 3. URL Generation & Management
- Generate shareable public URLs for uploaded images
- Copy-to-clipboard functionality for URLs
- QR code generation for easy mobile sharing
- URL shortening option
- Download links for original files

### 4. User Interface Design
- Clean, modern design with smooth animations
- Mobile-responsive layout
- Dark/light theme toggle
- Loading states and error handling
- Success notifications with auto-hide

## Technical Requirements

### Backend Architecture
- **Framework**: Next.js 14+ with App Router (Full-stack React framework)
- **API Routes**: Next.js API routes for upload endpoints
- **Cloud Storage**: AWS S3 SDK (compatible with Cloudflare R2)
- **Authentication**: Cloudflare R2 API tokens
- **File Processing**: Sharp for image optimization (built-in Next.js support)
- **URL Management**: Generate unique IDs using crypto.randomUUID() or nanoid

### Frontend Technologies
- **Framework**: Next.js 14+ with React Server Components
- **Styling**: Tailwind CSS (built-in Next.js integration)
- **File Handling**: Modern File API with drag-and-drop
- **HTTP Client**: Native fetch API or axios for API calls
- **Clipboard**: Clipboard API for URL copying
- **State Management**: React hooks (useState, useReducer) or Zustand if needed

### Cloudflare R2 Setup
```javascript
// lib/r2-client.js - R2 client configuration
import { S3Client } from '@aws-sdk/client-s3';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Next.js API route example: app/api/upload/route.js
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2-client';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  
  // Upload logic here
}
```

## Key Functionality Requirements

### Upload Process
1. Client-side validation (file type, size)
2. Generate unique filename with timestamp
3. Upload to Cloudflare R2 with public read permissions
4. Return public URL via custom domain or R2.dev subdomain
5. Store metadata (filename, upload date, file size)

### URL Generation
- Format: `https://your-bucket.your-account.r2.dev/filename` or custom domain
- Provide both direct and CDN-optimized URLs (built-in via Cloudflare)
- Option to generate temporary presigned URLs for time-limited access

### Security Features
- Rate limiting to prevent abuse
- File type validation on server-side
- Malware scanning (basic file header checks)
- Optional user session tracking
- CORS configuration for secure cross-origin requests

## User Experience Features

### Upload Flow
1. Welcome screen with clear instructions
2. Drag-and-drop zone with hover effects
3. File selection with thumbnail previews
4. Upload progress with percentage indicator
5. Success page with generated URLs and sharing options

### Sharing Options
- Direct image URL
- HTML embed code
- Markdown link format
- BBCode for forums
- Social media sharing buttons
- QR code for mobile access

### Additional Features
- Upload history (stored locally or with user accounts)
- Batch operations for multiple files
- Image resize options before upload
- Custom URL slug generation
- Analytics dashboard (optional)

## Environment Variables Needed
```
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=your-custom-domain-or-r2-dev-url
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp,image/svg+xml
```

## Deployment Considerations
- **Full-stack Deployment**: Deploy on Vercel (optimal for Next.js) or Netlify
- **API Routes**: Automatically handled by Next.js serverless functions
- **Domain**: Configure custom domain with Cloudflare R2 for branded URLs
- **CDN**: Built-in Cloudflare CDN + Vercel Edge Network for optimal performance
- **Environment Variables**: Managed through Vercel/hosting platform dashboard
- **Monitoring**: Implement logging with Next.js built-in analytics or Vercel Analytics

## Cloudflare R2 + Next.js Advantages
- **10 GB free storage** (double Google Cloud's free tier)
- **Zero egress fees** (bandwidth is completely free)
- **Built-in CDN** via Cloudflare's global network
- **S3-compatible API** (easy migration and familiar tools)
- **Better pricing** beyond free tier ($0.015/GB vs others)
- **Next.js Integration**: Server-side image optimization with Sharp
- **Vercel Deployment**: Seamless deployment with automatic API routes
- **Full-stack**: No separate backend needed - everything in one codebase

### API Route Example (app/api/upload/route.js)
```javascript
import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2-client';
import sharp from 'sharp';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file || !file.size) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Generate unique filename
    const uniqueId = crypto.randomUUID();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uniqueId}.${fileExtension}`;

    // Convert to buffer and optimize with Sharp
    const buffer = Buffer.from(await file.arrayBuffer());
    const optimizedBuffer = await sharp(buffer)
      .jpeg({ quality: 85 })
      .png({ compressionLevel: 8 })
      .webp({ quality: 85 })
      .toBuffer();

    // Upload to Cloudflare R2
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: optimizedBuffer,
      ContentType: file.type,
    });

    await r2Client.send(command);

    // Return the public URL
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
    
    return NextResponse.json({ 
      url: publicUrl,
      fileName: fileName,
      size: optimizedBuffer.length 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
```

### Client Component Example (components/UploadZone.jsx)
```javascript
'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadZone() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsUploading(true);
    
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (response.ok) {
          setUploadedImages(prev => [...prev, result]);
        } else {
          console.error('Upload failed:', result.error);
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
    
    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <p>Uploading...</p>
        ) : isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <p>Drag & drop images here, or click to select</p>
        )}
      </div>

      {/* Display uploaded images */}
      {uploadedImages.map((img, index) => (
        <div key={index} className="mt-4 p-4 border rounded">
          <img src={img.url} alt="Uploaded" className="max-w-xs mx-auto" />
          <div className="mt-2">
            <input 
              type="text" 
              value={img.url} 
              readOnly 
              className="w-full p-2 border rounded bg-gray-50"
            />
            <button 
              onClick={() => navigator.clipboard.writeText(img.url)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Copy URL
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Middleware for Rate Limiting (middleware.js)
```javascript
import { NextResponse } from 'next/server';

const rateLimitMap = new Map();

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api/upload')) {
    const ip = request.ip ?? '127.0.0.1';
    const limit = 10; // 10 uploads per hour
    const windowMs = 60 * 60 * 1000; // 1 hour

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    ipData.count += 1;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

## Sample Next.js File Structure
```
image-to-url-nextjs/
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── route.js          # Upload API endpoint
│   ├── components/
│   │   ├── UploadZone.jsx
│   │   ├── ImagePreview.jsx
│   │   ├── URLDisplay.jsx
│   │   └── ui/                   # Reusable UI components
│   ├── lib/
│   │   ├── r2-client.js          # Cloudflare R2 configuration
│   │   ├── utils.js              # Utility functions
│   │   └── validations.js        # File validation logic
│   ├── globals.css               # Tailwind CSS imports
│   ├── layout.jsx                # Root layout component
│   └── page.jsx                  # Home page component
├── public/
│   └── assets/                   # Static assets
├── middleware.js                 # Next.js middleware for rate limiting
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json
```

## Success Metrics to Track
- Upload success rate
- Average file size
- Popular file formats
- Geographic usage patterns (via Cloudflare Analytics)
- Cost optimization with zero egress fees
- CDN cache hit rates

Build this as a production-ready Next.js application with proper error handling, security measures, and scalability considerations. Leverage Next.js App Router, Server Components, and API routes for optimal performance. Take advantage of Cloudflare R2's cost benefits and built-in CDN combined with Next.js's server-side capabilities for the best user experience and minimal operational costs.

## Getting Started Commands
```bash
npx create-next-app@latest image-to-url --typescript --tailwind --eslint --app
cd image-to-url
npm install @aws-sdk/client-s3 sharp react-dropzone
npm run dev
```