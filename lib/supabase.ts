import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key for admin operations
export function createServerSupabaseClient() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables for server-side operations.');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Database types for blog posts
export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: string;
  published_at: string;
  updated_at?: string;
  read_time: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  meta_description?: string;
  keywords?: string[];
  created_at: string;
}

// Type for the database schema
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPostRow;
        Insert: Omit<BlogPostRow, 'created_at'>;
        Update: Partial<Omit<BlogPostRow, 'id' | 'created_at'>>;
      };
    };
  };
}
