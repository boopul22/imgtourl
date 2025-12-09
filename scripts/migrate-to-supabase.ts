#!/usr/bin/env tsx

/**
 * Migration script to transfer blog posts from JSON file to Supabase database
 * 
 * Usage:
 * 1. Ensure Supabase environment variables are set
 * 2. Run: npx tsx scripts/migrate-to-supabase.ts
 */

import fs from 'fs/promises';
import path from 'path';
import { createServerSupabaseClient } from '../lib/supabase';
import { BlogPost } from '../lib/blog-data';

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

async function loadExistingPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(BLOG_DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blog posts file:', error);
    return [];
  }
}

async function migratePosts() {
  console.log('🚀 Starting migration from JSON to Supabase...');
  
  // Load existing posts
  const posts = await loadExistingPosts();
  console.log(`📄 Found ${posts.length} posts to migrate`);
  
  if (posts.length === 0) {
    console.log('✅ No posts to migrate');
    return;
  }
  
  // Initialize Supabase client
  const supabase = createServerSupabaseClient();
  
  // Check if table exists and is accessible
  try {
    const { count, error } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });
      
    if (error) {
      console.error('❌ Error accessing Supabase table:', error);
      return;
    }
    
    console.log(`📊 Current posts in database: ${count || 0}`);
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:', error);
    return;
  }
  
  // Migrate each post
  let successCount = 0;
  let errorCount = 0;
  
  for (const post of posts) {
    try {
      // Convert BlogPost to database format
      const dbRow = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featuredImage,
        author: post.author,
        published_at: post.publishedAt,
        updated_at: post.updatedAt,
        read_time: post.readTime,
        category: post.category,
        tags: post.tags,
        featured: post.featured,
        status: post.status,
        meta_description: post.metaDescription,
        keywords: post.keywords,
      };
      
      // Insert or update the post
      const { error } = await supabase
        .from('blog_posts')
        .upsert(dbRow, { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ Error migrating post "${post.title}":`, error);
        errorCount++;
      } else {
        console.log(`✅ Migrated: "${post.title}"`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Unexpected error migrating post "${post.title}":`, error);
      errorCount++;
    }
  }
  
  console.log('\n📊 Migration Summary:');
  console.log(`✅ Successfully migrated: ${successCount} posts`);
  console.log(`❌ Failed to migrate: ${errorCount} posts`);
  
  if (successCount > 0) {
    console.log('\n🎉 Migration completed successfully!');
    console.log('💡 You can now update your application to use Supabase storage.');
    
    // Create backup of original file
    const backupFile = BLOG_DATA_FILE + '.backup.' + Date.now();
    try {
      await fs.copyFile(BLOG_DATA_FILE, backupFile);
      console.log(`💾 Created backup of original file: ${backupFile}`);
    } catch (error) {
      console.error('⚠️  Failed to create backup:', error);
    }
  }
}

// Verify environment variables
function checkEnvironment() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nPlease set these variables in your .env.local file');
    process.exit(1);
  }
}

// Main execution
async function main() {
  checkEnvironment();
  await migratePosts();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
}

export { migratePosts };
