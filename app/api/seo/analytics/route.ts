import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPosts, getCategories } from '@/lib/blog-storage-supabase';
import { analyzeContentForSEO } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url || '');
    const range = searchParams.get('range') || '30d';
    
    // Calculate date range
    const daysAgo = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

    // Fetch all posts
    const allPosts = await getPublishedPosts();
    const categories = await getCategories();

    // Filter posts by date range
    const filteredPosts = allPosts.filter(post => 
      new Date(post.publishedAt) >= cutoffDate
    );

    // Analyze each post
    const analyzedPosts = filteredPosts.map(post => ({
      ...post,
      seoAnalysis: analyzeContentForSEO(post.content, post.title, post.excerpt)
    }));

    // Calculate metrics
    const totalPosts = analyzedPosts.length;
    const totalWordCount = analyzedPosts.reduce((sum, post) => sum + post.seoAnalysis.wordCount, 0);
    const averageSEOScore = totalPosts > 0 
      ? Math.round(analyzedPosts.reduce((sum, post) => sum + post.seoAnalysis.seoScore, 0) / totalPosts)
      : 0;
    const averageReadability = totalPosts > 0
      ? Math.round(analyzedPosts.reduce((sum, post) => sum + post.seoAnalysis.readabilityScore, 0) / totalPosts)
      : 0;

    // Extract top keywords
    const keywordFrequency: { [key: string]: number } = {};
    analyzedPosts.forEach(post => {
      post.seoAnalysis.suggestedKeywords.forEach(keyword => {
        keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1;
      });
    });

    const topKeywords = Object.entries(keywordFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 12)
      .map(([keyword]) => keyword);

    // Recent posts performance
    const recentPosts = analyzedPosts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 5)
      .map(post => ({
        title: post.title,
        seoScore: post.seoAnalysis.seoScore,
        wordCount: post.seoAnalysis.wordCount,
        publishedAt: post.publishedAt
      }));

    // Category distribution
    const categoryStats: { [key: string]: { count: number; totalSEOScore: number } } = {};
    analyzedPosts.forEach(post => {
      if (!categoryStats[post.category]) {
        categoryStats[post.category] = { count: 0, totalSEOScore: 0 };
      }
      categoryStats[post.category].count++;
      categoryStats[post.category].totalSEOScore += post.seoAnalysis.seoScore;
    });

    const categoryDistribution = Object.entries(categoryStats).map(([category, stats]) => ({
      category,
      count: stats.count,
      avgSEOScore: Math.round(stats.totalSEOScore / stats.count)
    }));

    const response = {
      totalPosts,
      averageSEOScore,
      totalWordCount,
      averageReadability,
      topKeywords,
      recentPosts,
      categoryDistribution,
      range
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating SEO analytics:', error);
    return NextResponse.json(
      { error: 'Failed to generate SEO analytics' },
      { status: 500 }
    );
  }
}