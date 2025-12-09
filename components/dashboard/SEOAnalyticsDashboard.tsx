'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Search, Globe, Users, Eye, ArrowUpRight, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SEOMetrics {
  totalPosts: number;
  averageSEOScore: number;
  totalWordCount: number;
  averageReadability: number;
  topKeywords: string[];
  recentPosts: Array<{
    title: string;
    seoScore: number;
    wordCount: number;
    publishedAt: string;
  }>;
  categoryDistribution: Array<{
    category: string;
    count: number;
    avgSEOScore: number;
  }>;
}

export default function SEOAnalyticsDashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchSEOMetrics();
  }, [timeRange]);

  const fetchSEOMetrics = async () => {
    try {
      const response = await fetch(`/api/seo/analytics?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error('Error fetching SEO metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">Unable to load SEO analytics</h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-brand-orange" />
            SEO Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor your content's SEO performance and discover optimization opportunities
          </p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Posts</p>
              <p className="text-3xl font-bold text-brand-orange">{metrics.totalPosts}</p>
            </div>
            <Globe className="w-8 h-8 text-brand-orange opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg SEO Score</p>
              <p className="text-3xl font-bold text-green-600">{metrics.averageSEOScore}/100</p>
            </div>
            <Target className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Words</p>
              <p className="text-3xl font-bold text-blue-600">{metrics.totalWordCount.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Readability</p>
              <p className="text-3xl font-bold text-purple-600">{metrics.averageReadability}%</p>
            </div>
            <Zap className="w-8 h-8 text-purple-600 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Top Keywords */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-brand-orange" />
          Top Performing Keywords
        </h2>
        <div className="flex flex-wrap gap-2">
          {metrics.topKeywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            Recent Posts Performance
          </h2>
          <div className="space-y-4">
            {metrics.recentPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{post.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {post.wordCount} words • {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">{post.seoScore}/100</div>
                    <div className="text-xs text-muted-foreground">SEO Score</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            Category Performance
          </h2>
          <div className="space-y-4">
            {metrics.categoryDistribution.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.count} posts
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-brand-orange h-2 rounded-full transition-all duration-300"
                    style={{ width: `${category.avgSEOScore}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Avg SEO Score: {category.avgSEOScore}/100
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}