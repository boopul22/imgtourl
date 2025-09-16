# ImageURL - Image to URL Converter

A modern, production-ready web application that converts images to shareable URLs using Cloudflare R2 for storage. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Fast Upload**: Drag-and-drop interface with batch upload support
- 🎯 **Automatic Optimization**: Images compressed up to 70% without quality loss
- 🌍 **Global CDN**: Served from Cloudflare's 275+ data centers worldwide
- 🔒 **Secure**: Enterprise-grade security with rate limiting
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Real-time**: Live upload progress and instant URL generation
- 🎨 **Modern UI**: Beautiful interface with smooth animations

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Storage**: Cloudflare R2 (S3-compatible)
- **Image Processing**: Sharp
- **File Handling**: react-dropzone
- **API**: Next.js API Routes

## Getting Started

### Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **R2 Storage**: Enable R2 in your Cloudflare dashboard
3. **API Tokens**: Generate R2 API tokens with read/write permissions

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd imageurl
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket.your-account.r2.dev

# Application Settings
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp,image/svg+xml
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=3600000

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Configure Cloudflare R2:

#### Creating an R2 Bucket
1. Go to R2 Object Storage in your Cloudflare dashboard
2. Click "Create bucket"
3. Choose a unique bucket name
4. Select your preferred region
5. Enable public access for the bucket

#### Setting up API Tokens
1. Go to "Manage R2 API tokens"
2. Click "Create API token"
3. Give it a descriptive name
4. Set permissions to "Object Read & Write"
5. Optionally restrict to specific buckets
6. Copy the Access Key ID and Secret Access Key

#### Configure CORS (if needed)
```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"]
  }
]
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
imageurl/
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── upload/
│   │       └── route.ts    # Upload API endpoint
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── layout/             # Layout components
│   ├── ui/                 # UI components (shadcn/ui)
│   └── upload/             # Upload-specific components
├── lib/                    # Utilities and configurations
│   ├── r2-client.ts        # Cloudflare R2 client
│   ├── validations.ts      # File validation logic
│   └── rate-limit.ts       # Rate limiting utilities
├── middleware.ts           # Next.js middleware
└── ...config files
```

## API Endpoints

### POST /api/upload

Upload an image file and get a shareable URL.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (File object)

**Response:**
```json
{
  "id": "unique-file-id",
  "url": "https://your-bucket.r2.dev/filename.jpg",
  "fileName": "generated-filename.jpg",
  "originalName": "original-filename.jpg",
  "size": 245760,
  "originalSize": 512000,
  "contentType": "image/jpeg",
  "optimized": true,
  "uploadedAt": "2025-01-27T12:00:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## Configuration

### File Validation

- **Max file size**: 10MB (configurable via `MAX_FILE_SIZE`)
- **Allowed types**: JPG, PNG, GIF, WEBP, SVG
- **Validation**: Client-side and server-side validation

### Rate Limiting

- **Default limit**: 10 uploads per hour per IP
- **Configurable**: Set via `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS`
- **Production**: Consider using Redis for distributed rate limiting

### Image Optimization

- **JPEG**: Quality 85%, progressive
- **PNG**: Compression level 8
- **WebP**: Quality 85%
- **Smart optimization**: Uses original if optimized version is larger

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Security Considerations

- **File validation**: Both client and server-side validation
- **Rate limiting**: Prevents abuse and ensures fair usage
- **CORS**: Configured for secure cross-origin requests
- **File size limits**: Prevents large file uploads
- **Content-type validation**: Ensures only valid image files are accepted

## Performance Optimizations

- **Image compression**: Automatic optimization reduces file sizes
- **Global CDN**: Cloudflare's edge network for fast delivery
- **Lazy loading**: Images load only when needed
- **Caching**: Proper cache headers for optimal performance

## Cost Optimization

Cloudflare R2 advantages:
- **10GB free storage** (vs. 5GB for Google Cloud)
- **Zero egress fees** (bandwidth is completely free)
- **Lower storage costs**: $0.015/GB vs. $0.020-0.026/GB for competitors
- **Built-in CDN**: No additional CDN costs

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email blog.boopul@gmail.com or create an issue in this repository.