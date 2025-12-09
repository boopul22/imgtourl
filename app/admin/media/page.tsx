'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Image as ImageIcon,
  Download,
  Trash2,
  Eye,
  Copy,
  Filter,
  Grid,
  List,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  FileText,
  Film
} from 'lucide-react';
import { formatFileSize } from '@/lib/validations';
import { showSuccessToast, showErrorToast } from '@/lib/error-handler';

interface MediaFile {
  key: string;
  size: number;
  lastModified: string;
  url: string;
  extension: string;
  type: 'image' | 'video' | 'document' | 'other';
  isImage: boolean;
  isVideo: boolean;
  isDocument: boolean;
}

interface MediaStats {
  image: number;
  video: number;
  document: number;
  other: number;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState('desc');
  const [stats, setStats] = useState<MediaStats>({ image: 0, video: 0, document: 0, other: 0 });
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);

  // Check if credentials are stored in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('media-admin-username');
    const storedPassword = localStorage.getItem('media-admin-password');
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch media files
  const fetchMedia = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        sortBy,
        sortOrder,
        fileType: filterType,
        limit: '100'
      });

      const response = await fetch(`/api/media?${params}`, {
        headers: {
          'x-media-username': username,
          'x-media-password': password
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid credentials. Please check your username and password.');
          setIsAuthenticated(false);
          localStorage.removeItem('media-admin-username');
          localStorage.removeItem('media-admin-password');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      setFiles(data.files || []);
      setStats(data.typeStats || { image: 0, video: 0, document: 0, other: 0 });
    } catch (error: any) {
      console.error('Failed to fetch media:', error);
      setError(error.message || 'Failed to fetch media files');
    } finally {
      setLoading(false);
    }
  };

  // Fetch media when component mounts or filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchMedia();
    }
  }, [isAuthenticated, sortBy, sortOrder, filterType]);

  // Filter files based on search term
  useEffect(() => {
    let filtered = files;

    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.extension.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFiles(filtered);
  }, [files, searchTerm]);

  const handleLogin = () => {
    if (!username.trim()) {
      showErrorToast('Please enter a username');
      return;
    }
    if (!password.trim()) {
      showErrorToast('Please enter a password');
      return;
    }

    localStorage.setItem('media-admin-username', username);
    localStorage.setItem('media-admin-password', password);
    setIsAuthenticated(true);
    fetchMedia();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('media-admin-username');
    localStorage.removeItem('media-admin-password');
    setFiles([]);
    setFilteredFiles([]);
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Are you sure you want to delete "${file.key}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/media?key=${encodeURIComponent(file.key)}`, {
        method: 'DELETE',
        headers: {
          'x-media-username': username,
          'x-media-password': password
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      showSuccessToast('File deleted successfully');
      fetchMedia();
    } catch (error: any) {
      console.error('Delete error:', error);
      showErrorToast(error.message || 'Failed to delete file');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) {
      showErrorToast('No files selected');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedFiles.length} file(s)?`)) {
      return;
    }

    try {
      const response = await fetch('/api/media?bulk=true', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-media-username': username,
          'x-media-password': password
        },
        body: JSON.stringify({ keys: selectedFiles })
      });

      if (!response.ok) {
        throw new Error('Failed to delete files');
      }

      const result = await response.json();
      showSuccessToast(`${result.count} files deleted successfully`);
      setSelectedFiles([]);
      fetchMedia();
    } catch (error: any) {
      console.error('Bulk delete error:', error);
      showErrorToast(error.message || 'Failed to delete files');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccessToast('URL copied to clipboard');
    } catch (error) {
      showErrorToast('Failed to copy URL');
    }
  };

  const getFileIcon = (file: MediaFile) => {
    if (file.isImage) return <ImageIcon className="w-4 h-4" />;
    if (file.isVideo) return <Film className="w-4 h-4" />;
    if (file.isDocument) return <FileText className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
      case 'video': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200';
      case 'document': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Media Admin Access</CardTitle>
            <CardDescription>
              Enter your admin credentials to access the media library
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">🔑 Quick Access:</p>
              <p className="text-blue-700 dark:text-blue-300">
                Username: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">admin</code> •
                Password: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">admin123</code>
              </p>
            </div>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Access Media Library
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
          <p className="text-muted-foreground">
            Manage all uploaded images and files
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
          <Button onClick={fetchMedia} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Images</p>
                <p className="text-2xl font-bold">{stats.image}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Film className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Videos</p>
                <p className="text-2xl font-bold">{stats.video}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Documents</p>
                <p className="text-2xl font-bold">{stats.document}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">Other</p>
                <p className="text-2xl font-bold">{stats.other}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Files</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastModified">Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex items-center space-x-1 border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Bulk Actions */}
            {selectedFiles.length > 0 && (
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                className="ml-auto"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedFiles.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading media files...</p>
        </div>
      )}

      {/* Files Display */}
      {!loading && !error && (
        <>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No files found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterType !== 'all'
                  ? 'No files match your current filters'
                  : 'No files have been uploaded yet'}
              </p>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <Card key={file.key} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        {file.isImage ? (
                          <img
                            src={file.url}
                            alt={file.key}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            {getFileIcon(file)}
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge className={getFileTypeColor(file.type)}>
                            {file.type}
                          </Badge>
                        </div>
                        <div className="absolute top-2 left-2">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.key)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFiles([...selectedFiles, file.key]);
                              } else {
                                setSelectedFiles(selectedFiles.filter(f => f !== file.key));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm truncate" title={file.key}>
                            {file.key}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)} • {new Date(file.lastModified).toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setPreviewFile(file)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(file.url)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(file.url, '_blank')}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(file)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">
                              <input
                                type="checkbox"
                                checked={selectedFiles.length === filteredFiles.length}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedFiles(filteredFiles.map(f => f.key));
                                  } else {
                                    setSelectedFiles([]);
                                  }
                                }}
                                className="rounded border-gray-300"
                              />
                            </th>
                            <th className="text-left p-4">File</th>
                            <th className="text-left p-4">Type</th>
                            <th className="text-left p-4">Size</th>
                            <th className="text-left p-4">Modified</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredFiles.map((file) => (
                            <tr key={file.key} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                              <td className="p-4">
                                <input
                                  type="checkbox"
                                  checked={selectedFiles.includes(file.key)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedFiles([...selectedFiles, file.key]);
                                    } else {
                                      setSelectedFiles(selectedFiles.filter(f => f !== file.key));
                                    }
                                  }}
                                  className="rounded border-gray-300"
                                />
                              </td>
                              <td className="p-4">
                                <div className="flex items-center space-x-2">
                                  {getFileIcon(file)}
                                  <span className="font-medium truncate max-w-[200px]" title={file.key}>
                                    {file.key}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge className={getFileTypeColor(file.type)}>
                                  {file.type}
                                </Badge>
                              </td>
                              <td className="p-4 text-sm">{formatFileSize(file.size)}</td>
                              <td className="p-4 text-sm">
                                {new Date(file.lastModified).toLocaleDateString()}
                              </td>
                              <td className="p-4">
                                <div className="flex items-center space-x-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setPreviewFile(file)}
                                  >
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copyToClipboard(file.url)}
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(file.url, '_blank')}
                                  >
                                    <Download className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(file)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="max-w-4xl">
          {previewFile && (
            <>
              <DialogHeader>
                <DialogTitle>{previewFile.key}</DialogTitle>
                <DialogDescription>
                  {formatFileSize(previewFile.size)} • {new Date(previewFile.lastModified).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {previewFile.isImage ? (
                  <img
                    src={previewFile.url}
                    alt={previewFile.key}
                    className="w-full max-h-96 object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {getFileIcon(previewFile)}
                    <p className="mt-4">Preview not available for this file type</p>
                  </div>
                )}
                <div className="flex items-center justify-center space-x-2">
                  <Button onClick={() => copyToClipboard(previewFile.url)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy URL
                  </Button>
                  <Button onClick={() => window.open(previewFile.url, '_blank')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(previewFile)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}