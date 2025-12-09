import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Database, Shield, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          System configuration and information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>System Information</span>
            </CardTitle>
            <CardDescription>
              Current system configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Environment</span>
              <Badge variant="outline">
                {process.env.NODE_ENV || 'development'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Admin Authentication</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">HTML Processing</span>
              <Badge variant="default">Enabled</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Storage Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Storage</span>
            </CardTitle>
            <CardDescription>
              Blog data storage information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Storage Type</span>
              <Badge variant="outline">File System</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Data Location</span>
              <span className="text-sm text-muted-foreground">data/blog-posts.json</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Backup</span>
              <Badge variant="secondary">Manual</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security</span>
            </CardTitle>
            <CardDescription>
              Security and authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Admin Routes Protected</span>
              <Badge variant="default">Yes</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">HTML Sanitization</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Session Timeout</span>
              <span className="text-sm text-muted-foreground">24 hours</span>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Features</span>
            </CardTitle>
            <CardDescription>
              Available blog management features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">HTML Content Support</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Auto Excerpt Generation</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Read Time Calculation</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">SEO Metadata</span>
              <Badge variant="default">Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
          <CardDescription>
            How to use the blog admin interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <h4>Creating Blog Posts</h4>
            <ol>
              <li>Click "New Post" to create a new blog post</li>
              <li>Enter the title, which will auto-generate a URL slug</li>
              <li>Paste your pre-formatted HTML content in the content area</li>
              <li>The system will automatically process and sanitize the HTML</li>
              <li>Fill in metadata like category, tags, and SEO information</li>
              <li>Save as draft or publish immediately</li>
            </ol>

            <h4>HTML Content Guidelines</h4>
            <ul>
              <li>Paste properly formatted HTML content directly</li>
              <li>The system automatically sanitizes content for security</li>
              <li>Supported elements: headings, paragraphs, links, images, lists, tables</li>
              <li>Script tags and forms are automatically removed</li>
              <li>Images should include alt attributes for accessibility</li>
            </ul>

            <h4>Managing Posts</h4>
            <ul>
              <li>View all posts in the "All Posts" section</li>
              <li>Filter by status (published, draft, archived)</li>
              <li>Search posts by title, author, or category</li>
              <li>Edit existing posts by clicking the edit button</li>
              <li>Preview posts before publishing</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
