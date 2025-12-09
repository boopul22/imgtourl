# Supabase Migration Guide

This guide explains how to migrate the blog system from file-based storage to Supabase database storage.

## Overview

The migration includes:
- ✅ Supabase client setup and configuration
- ✅ Database schema creation with proper indexes and RLS policies
- ✅ New storage layer implementation
- ✅ API endpoints updated to use Supabase
- ✅ Blog data layer updated for Supabase integration
- ✅ Migration script for existing data

## Prerequisites

1. **Supabase Account**: Create an account at [supabase.com](https://supabase.com)
2. **Supabase Project**: Create a new project in your Supabase dashboard
3. **Environment Variables**: Configure the required environment variables

## Environment Setup

Add these variables to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Getting Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Database Schema

The migration automatically creates the following table structure:

```sql
CREATE TABLE blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT NOT NULL DEFAULT 'Admin',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  read_time TEXT NOT NULL DEFAULT '1 min read',
  category TEXT NOT NULL DEFAULT 'General',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  meta_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Indexes for Performance

- `idx_blog_posts_slug` - Fast slug lookups
- `idx_blog_posts_status` - Filter by status
- `idx_blog_posts_published_at` - Sort by publication date
- `idx_blog_posts_category` - Filter by category
- `idx_blog_posts_featured` - Filter featured posts

### Row Level Security (RLS)

- **Public Read Access**: Published posts are publicly readable
- **Admin Access**: Service role has full access to all operations

## Migration Process

### Step 1: Run the Migration Script

```bash
npx tsx scripts/migrate-to-supabase.ts
```

This script will:
- Read existing blog posts from `data/blog-posts.json`
- Transfer all posts to the Supabase database
- Create a backup of the original file
- Provide a detailed migration report

### Step 2: Verify Migration

1. Check your Supabase dashboard to confirm posts were migrated
2. Test the admin interface at `/admin`
3. Verify blog pages are loading correctly
4. Test CRUD operations (Create, Read, Update, Delete)

### Step 3: Update Environment

Ensure all required environment variables are set in production.

## File Changes

### New Files Created

- `lib/supabase.ts` - Supabase client configuration
- `lib/blog-storage-supabase.ts` - New storage layer using Supabase
- `scripts/migrate-to-supabase.ts` - Migration script

### Files Updated

- `app/api/admin/posts/route.ts` - Updated to use Supabase storage
- `app/api/admin/posts/[id]/route.ts` - Updated to use Supabase storage
- `app/blog/page.tsx` - Updated imports
- `app/blog/[slug]/page.tsx` - Updated imports
- `lib/blog-data.ts` - Updated helper functions
- `.env.example` - Added Supabase environment variables

## Benefits of Migration

### SEO Improvements
- **Faster Database Queries**: Indexed database queries vs file system reads
- **Better Caching**: Database-level caching and connection pooling
- **Reduced Server Load**: No file system I/O operations

### Scalability
- **Concurrent Access**: Multiple users can access data simultaneously
- **Data Integrity**: ACID transactions ensure data consistency
- **Backup & Recovery**: Automated backups and point-in-time recovery

### Performance
- **Optimized Queries**: SQL queries with proper indexes
- **Connection Pooling**: Efficient database connections
- **Global Distribution**: Supabase's global infrastructure

## Troubleshooting

### Common Issues

1. **Environment Variables Not Set**
   - Verify all Supabase environment variables are configured
   - Check variable names match exactly

2. **Database Connection Errors**
   - Confirm Supabase project is active
   - Verify service role key has correct permissions

3. **Migration Script Fails**
   - Ensure `data/blog-posts.json` exists and is valid JSON
   - Check Supabase table was created successfully

4. **RLS Policy Issues**
   - Verify Row Level Security policies are configured
   - Ensure service role key is being used for admin operations

### Testing Checklist

- [ ] Admin login works
- [ ] Can create new blog posts
- [ ] Can edit existing blog posts
- [ ] Can delete blog posts
- [ ] Blog listing page loads
- [ ] Individual blog post pages load
- [ ] Search functionality works
- [ ] Related posts display correctly

## Rollback Plan

If you need to rollback to file-based storage:

1. Restore the original imports in the updated files
2. Use the backup file created during migration
3. Remove Supabase environment variables

The original `lib/blog-storage.ts` file remains unchanged for easy rollback.

## Support

For issues with this migration:
1. Check the Supabase dashboard for error logs
2. Review the migration script output
3. Verify environment variable configuration
4. Test database connectivity
