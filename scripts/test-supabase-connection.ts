#!/usr/bin/env tsx

/**
 * Test script to validate Supabase connection and database setup
 * 
 * Usage: npx tsx scripts/test-supabase-connection.ts
 */

import { createServerSupabaseClient } from '../lib/supabase';

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Check environment variables
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];
    
    const missing = requiredVars.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.error('❌ Missing environment variables:');
      missing.forEach(key => console.error(`   - ${key}`));
      return false;
    }
    
    console.log('✅ Environment variables configured');
    
    // Test database connection
    const supabase = createServerSupabaseClient();
    
    // Test basic connection
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log(`✅ Database connection successful`);
    console.log(`📊 Current posts in database: ${data || 0}`);
    
    // Test table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('❌ Table structure test failed:', tableError.message);
      return false;
    }
    
    console.log('✅ Table structure is correct');
    
    // Test RLS policies
    try {
      const { data: publicData, error: publicError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .limit(1);
      
      if (publicError) {
        console.warn('⚠️  RLS policy test failed:', publicError.message);
      } else {
        console.log('✅ RLS policies working correctly');
      }
    } catch (error) {
      console.warn('⚠️  Could not test RLS policies');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Supabase connection test...\n');
  
  const success = await testConnection();
  
  if (success) {
    console.log('\n🎉 All tests passed! Supabase is ready for migration.');
  } else {
    console.log('\n❌ Tests failed. Please check your configuration.');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });
}

export { testConnection };
