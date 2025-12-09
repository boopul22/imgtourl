'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, CheckCircle2, Copy, Share2, QrCode, Code, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/validations';
import { UploadHistoryManager } from '@/lib/upload-history';
import { showSuccessToast, showErrorToast, handleError } from '@/lib/error-handler';
import ShareDialog from '@/components/sharing/ShareDialog';
import { SEMANTIC_COLORS, BRAND_CLASSES } from '@/lib/brand-colors';

interface UploadedFile {
  id: string;
  url: string;
  fileName: string;
  originalName: string;
  size: number;
  originalSize: number;
  contentType: string;
  optimized: boolean;
  uploadedAt: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

export default function UploadZone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [shareDialog, setShareDialog] = useState<{ isOpen: boolean; url: string; title: string } | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [showLoadingState, setShowLoadingState] = useState(false);
  const [showInPlaceResults, setShowInPlaceResults] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [failedFiles, setFailedFiles] = useState<FileWithPreview[]>([]);

  // Monitor uploadedFiles changes to show results
  useEffect(() => {
    if (uploadedFiles.length > 0 && showLoadingState && !uploading) {
      setTimeout(() => {
        setShowLoadingState(false);
        setShowInPlaceResults(true);
      }, 500);
    }
  }, [uploadedFiles.length, showLoadingState, uploading]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files with clear feedback
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(rejection => {
        const error = rejection.errors[0];
        if (error.code === 'file-too-large') {
          return `${rejection.file.name} is too large (max 10MB)`;
        } else if (error.code === 'file-invalid-type') {
          return `${rejection.file.name} is not a supported image format`;
        }
        return `${rejection.file.name} could not be uploaded`;
      });

      showErrorToast(`Upload failed: ${errors.join(', ')}`);
      setStatusMessage(`Upload failed: ${errors.join(', ')}`);
      setTimeout(() => setStatusMessage(''), 5000);
      return;
    }

    // Reset any previous state to prevent duplicates
    setUploadedFiles([]);
    setUploadProgress({});
    setShowInPlaceResults(false);
    setShowDetailedResults(false);

    const newFiles = acceptedFiles.map(file => {
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.preview = URL.createObjectURL(file);
      return fileWithPreview;
    });

    // Provide immediate feedback
    setStatusMessage(`Preparing ${newFiles.length} image${newFiles.length > 1 ? 's' : ''} for upload...`);
    setTimeout(() => setStatusMessage(''), 2000);

    // Immediately show loading state for in-place experience
    setShowLoadingState(true);

    // Replace files instead of accumulating them
    setFiles(newFiles);

    // Auto-upload after files are set
    setTimeout(() => {
      uploadFiles(newFiles);
    }, 100);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  // Enhanced input props with accessibility attributes
  const inputProps = {
    ...getInputProps(),
    'aria-label': 'Upload photos - drag and drop or click to choose',
    'aria-describedby': 'upload-instructions upload-formats',
    id: 'image-upload-input'
  };

  const replaceFile = (index: number, newFile: File) => {
    setFiles(prev => {
      const newFiles = [...prev];
      // Clean up old preview
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      // Create new file with preview
      const fileWithPreview = newFile as FileWithPreview;
      fileWithPreview.preview = URL.createObjectURL(newFile);
      newFiles[index] = fileWithPreview;
      return newFiles;
    });
    showSuccessToast('Image resized successfully!');
  };

  const copyToClipboard = async (text: string, key?: string) => {
    try {
      await navigator.clipboard.writeText(text);

      // Show visual feedback
      if (key) {
        setCopiedStates(prev => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [key]: false }));
        }, 2000);
      }

      // Announce to screen readers
      setStatusMessage('Link copied to clipboard successfully');
      setTimeout(() => setStatusMessage(''), 3000);

      showSuccessToast('Copied to clipboard!');
    } catch (error) {
      setStatusMessage('Failed to copy link to clipboard');
      setTimeout(() => setStatusMessage(''), 3000);
      showErrorToast('Failed to copy');
    }
  };

  const generateHtmlEmbed = (url: string, fileName: string) => {
    const altText = fileName.replace(/\.[^/.]+$/, ""); // Remove file extension for alt text
    return `<img src="${url}" alt="${altText}" />`;
  };

  const copyHtmlEmbed = async (url: string, fileName: string) => {
    const htmlCode = generateHtmlEmbed(url, fileName);
    await copyToClipboard(htmlCode);
  };

  // Generate unique filename while preserving extension
  const generateUniqueFilename = (originalFile: File): string => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const fileExtension = originalFile.name.split('.').pop() || '';
    const baseName = originalFile.name.replace(/\.[^/.]+$/, '').substring(0, 20); // Keep first 20 chars of original name

    // Create unique filename: timestamp_randomId_baseName.ext
    return `${timestamp}_${randomId}_${baseName}.${fileExtension}`.toLowerCase();
  };

  // Retry failed uploads
  const retryFailedUploads = useCallback(() => {
    if (failedFiles.length === 0) return;

    setStatusMessage(`Retrying ${failedFiles.length} failed upload${failedFiles.length > 1 ? 's' : ''}...`);
    setTimeout(() => setStatusMessage(''), 3000);

    setShowLoadingState(true);
    setFailedFiles([]);
    uploadFiles(failedFiles);
  }, [failedFiles]);



  const uploadFiles = async (filesToUpload?: FileWithPreview[]) => {
    const targetFiles = filesToUpload || files;
    if (targetFiles.length === 0) return;

    // Prevent duplicate uploads by checking if already uploading
    if (uploading) {
      console.log('Upload already in progress, skipping duplicate request');
      return;
    }

    console.log('Starting upload for', targetFiles.length, 'files');
    setUploading(true);
    setUploadProgress({});

    // Announce upload start to screen readers
    setStatusMessage(`Starting upload of ${targetFiles.length} ${targetFiles.length === 1 ? 'file' : 'files'}`);
    setTimeout(() => setStatusMessage(''), 3000);

    const uploadPromises = targetFiles.map(async (file, index) => {
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

      // Check if this file is already uploaded (by name and size)
      const alreadyUploaded = uploadedFiles.some(uploaded =>
        uploaded.originalName === file.name && uploaded.originalSize === file.size
      );

      if (alreadyUploaded) {
        console.log('File already uploaded, skipping:', file.name);
        return null;
      }

      // Generate unique filename for upload
      const uniqueFilename = generateUniqueFilename(file);

      // Create a new File object with the unique name
      const renamedFile = new File([file], uniqueFilename, {
        type: file.type,
        lastModified: file.lastModified,
      });

      const formData = new FormData();
      formData.append('file', renamedFile);
      // Also send original filename for metadata
      formData.append('originalName', file.name);

      try {
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: Math.min((prev[file.name] || 0) + 10, 90)
          }));
        }, 100);

        console.log('Sending request to /api/upload');
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        clearInterval(progressInterval);
        console.log('Upload response status:', response.status);
        console.log('Upload response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          let errorMessage = 'Upload failed';
          try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const errorData = await response.json();
              console.error('Upload error response:', errorData);
              errorMessage = errorData.error || 'Upload failed';
            } else {
              const textResponse = await response.text();
              console.error('Upload error response (non-JSON):', textResponse);
              errorMessage = `Server error (${response.status}): ${textResponse.substring(0, 100)}`;
            }
          } catch (parseError) {
            console.error('Failed to parse error response:', parseError);
            errorMessage = `Upload failed with status ${response.status}`;
          }
          throw new Error(errorMessage);
        }

        let result: UploadedFile;
        try {
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text();
            console.error('Expected JSON but got:', contentType, textResponse);
            throw new Error('Server returned invalid response format');
          }
          result = await response.json();
          console.log('Upload successful:', result);
        } catch (parseError) {
          console.error('Failed to parse success response:', parseError);
          throw new Error('Upload completed but response format was invalid');
        }

        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 100
        }));

        setUploadedFiles(prev => {
          // Prevent duplicates by checking if this file ID already exists
          const isDuplicate = prev.some(existingFile => existingFile.id === result.id);
          if (isDuplicate) {
            console.log('Duplicate file detected, skipping:', result.id);
            return prev;
          }
          return [...prev, result];
        });

        // Add to history
        UploadHistoryManager.addToHistory(result);

        return result;
      } catch (error) {
        console.error('Upload error for file', file.name, ':', error);

        // Provide specific error messages based on error type
        let errorMessage = 'Upload failed. Please try again.';
        if (error instanceof Error) {
          if (error.message.includes('network') || error.message.includes('fetch')) {
            errorMessage = 'Network error. Please check your connection and try again.';
          } else if (error.message.includes('size') || error.message.includes('large')) {
            errorMessage = 'File is too large. Please use an image under 10MB.';
          } else if (error.message.includes('format') || error.message.includes('type')) {
            errorMessage = 'Unsupported file format. Please use JPG, PNG, GIF, or WebP.';
          }
        }

        const appError = handleError(error);
        showErrorToast(`${file.name}: ${errorMessage}`);
        setStatusMessage(`Upload failed for ${file.name}: ${errorMessage}`);
        setTimeout(() => setStatusMessage(''), 5000);

        setUploadProgress(prev => ({
          ...prev,
          [file.name]: -1 // Indicate error
        }));

        // Add to failed files for retry option
        setFailedFiles(prev => [...prev, file]);

        throw error;
      }
    });

    let successful = 0;
    try {
      const results = await Promise.allSettled(uploadPromises);
      // Count only fulfilled results that are not null (not skipped duplicates)
      successful = results.filter(r => r.status === 'fulfilled' && r.value !== null).length;
      const failed = results.filter(r => r.status === 'rejected').length;
      const skipped = results.filter(r => r.status === 'fulfilled' && r.value === null).length;

      if (successful > 0) {
        const successMessage = `Successfully uploaded ${successful} image${successful > 1 ? 's' : ''}`;
        const failMessage = failed > 0 ? `${failed} upload${failed > 1 ? 's' : ''} failed` : undefined;
        const skipMessage = skipped > 0 ? `${skipped} duplicate${skipped > 1 ? 's' : ''} skipped` : undefined;

        // Announce completion to screen readers
        const fullMessage = [successMessage, failMessage, skipMessage].filter(Boolean).join('. ');
        setStatusMessage(fullMessage);
        setTimeout(() => setStatusMessage(''), 5000);

        showSuccessToast(successMessage, failMessage);
      } else if (failed > 0) {
        // Announce failure to screen readers
        setStatusMessage(`All ${failed} upload${failed > 1 ? 's' : ''} failed`);
        setTimeout(() => setStatusMessage(''), 5000);
      }
    } finally {
      setUploading(false);

      // The useEffect will handle showing results when uploadedFiles is updated
      // Just clean up the loading state and files if no successful uploads
      if (successful === 0) {
        // If no successful uploads, just hide loading state
        setTimeout(() => {
          const filesToClear = filesToUpload || files;
          filesToClear.forEach(file => {
            if (file.preview) {
              URL.revokeObjectURL(file.preview);
            }
          });
          setFiles([]);
          setUploadProgress({});
          setShowLoadingState(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Content Warning */}
      <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
              ⚠️ Content Policy Warning
            </h4>
            <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
              <strong>Sexually explicit, adult, pornographic, or inappropriate content is strictly prohibited.</strong> 
              Our automated systems scan all uploads.{' '}
              <a href="/content-guidelines" className="underline hover:no-underline font-medium">
                Read full guidelines
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* ARIA Live Region for Status Announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {statusMessage}
      </div>

      {/* Upload Controls */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => alert('Upload history feature coming soon!')}
          className={cn("px-4 py-2 rounded-lg transition-colors", BRAND_CLASSES.buttons.secondary)}
        >
          Image Upload History
        </button>
      </div>



      {/* Upload Zone - Redesigned for clarity */}
      <div className="relative">
        {showInPlaceResults ? (
          /* Comprehensive In-place Results State */
          <div
            className={cn(
              'border-2 border-dashed rounded-2xl p-6 md:p-16 text-center transition-all duration-500',
              'touch-manipulation min-h-[320px] md:min-h-[360px] flex items-center justify-center',
              SEMANTIC_COLORS.uploadZone.container,
              'relative overflow-hidden'
            )}
            role="status"
            aria-live="polite"
            aria-label="Upload completed successfully"
          >
            {/* Background overlay for success state */}
            <div className="absolute inset-0 bg-green-50/80 dark:bg-green-900/20 rounded-2xl transition-opacity duration-500" />

            <div className="relative z-10 space-y-6 w-full max-w-md mx-auto">
              {/* Success Icon - matches loading spinner position */}
              <div className={cn(
                "mx-auto w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center",
                "bg-green-100 dark:bg-green-800 border-2 border-green-200 dark:border-green-600"
              )}>
                <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-green-600 dark:text-green-400" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className={cn("text-xl md:text-2xl font-bold text-green-800 dark:text-green-200")}>
                    {uploadedFiles.length === 0 ? 'Processing...' : 'Upload Complete!'}
                  </p>
                  <p className={cn("text-base md:text-lg text-green-700 dark:text-green-300")}>
                    {uploadedFiles.length === 0
                      ? "Finalizing your uploads and generating links..."
                      : uploadedFiles.length === 1
                        ? "Your image is ready to share • Link copied automatically"
                        : `${uploadedFiles.length} images ready to share • Links available below`
                    }
                  </p>
                </div>

                {/* Quick Actions - matches progress indicator position */}
                <div className={cn("rounded-lg p-4 text-sm bg-green-100/50 dark:bg-green-800/30 border border-green-200 dark:border-green-700")}>
                  <div className="space-y-3">
                    {/* Primary Action */}
                    {uploadedFiles.length > 0 ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const urls = uploadedFiles.map(f => f.url).join('\n');
                          copyToClipboard(urls, 'quick-copy-all');
                        }}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2 min-h-[44px] touch-manipulation",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-orange",
                          copiedStates['quick-copy-all']
                            ? "bg-green-600 text-white"
                            : "bg-brand-orange text-white hover:bg-brand-orange/90 active:bg-brand-orange/80"
                        )}
                        aria-label={`Copy ${uploadedFiles.length > 1 ? 'all ' : ''}link${uploadedFiles.length > 1 ? 's' : ''} to clipboard`}
                      >
                        {copiedStates['quick-copy-all'] ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy {uploadedFiles.length > 1 ? 'All ' : ''}Link{uploadedFiles.length > 1 ? 's' : ''}</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    )}

                    {/* Secondary Actions */}
                    {uploadedFiles.length > 0 && (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => {
                            setShowInPlaceResults(false);
                            setShowDetailedResults(true);
                          }}
                          className="px-3 py-2 rounded text-sm font-medium bg-white/80 hover:bg-white text-gray-700 border border-green-200 transition-colors min-h-[36px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                          aria-label="View detailed results with individual file information"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const htmlCodes = uploadedFiles.map(f => generateHtmlEmbed(f.url, f.originalName)).join('\n');
                            copyToClipboard(htmlCodes, 'quick-html');
                          }}
                          className={cn(
                            "px-3 py-1.5 rounded text-xs font-medium border border-green-200 transition-colors",
                            copiedStates['quick-html']
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-white/80 hover:bg-white text-gray-700"
                          )}
                        >
                          {copiedStates['quick-html'] ? 'HTML Copied!' : 'Copy HTML'}
                        </button>
                        {failedFiles.length > 0 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              retryFailedUploads();
                            }}
                            className="px-3 py-2 rounded text-sm font-medium bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 transition-colors min-h-[36px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            aria-label={`Retry ${failedFiles.length} failed upload${failedFiles.length > 1 ? 's' : ''}`}
                          >
                            Retry Failed ({failedFiles.length})
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowInPlaceResults(false);
                            setFiles([]);
                            setUploadedFiles([]);
                            setUploadProgress({});
                            setFailedFiles([]);
                          }}
                          className="px-3 py-2 rounded text-sm font-medium bg-white/80 hover:bg-white text-gray-700 border border-green-200 transition-colors min-h-[36px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                          aria-label="Start a new upload session"
                        >
                          Upload More
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>


            </div>
          </div>
        ) : showLoadingState ? (
          /* In-place Loading State */
          <div
            className={cn(
              'border-2 border-dashed rounded-2xl p-6 md:p-16 text-center transition-all duration-500',
              'touch-manipulation min-h-[320px] md:min-h-[360px] flex items-center justify-center',
              SEMANTIC_COLORS.uploadZone.container,
              'animate-pulse'
            )}
            role="status"
            aria-live="polite"
            aria-label="Uploading your photos"
          >
            <div className="space-y-6 w-full max-w-md mx-auto">
              {/* Loading Spinner - matches upload icon size */}
              <div className={cn(
                "mx-auto w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center",
                SEMANTIC_COLORS.uploadZone.icon
              )}>
                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin"></div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className={cn("text-xl md:text-2xl font-bold", SEMANTIC_COLORS.uploadZone.title)}>
                    {uploading ? 'Uploading...' : 'Processing Your Photos'}
                  </p>
                  <p className={cn("text-base md:text-lg", SEMANTIC_COLORS.uploadZone.subtitle)}>
                    {uploading
                      ? files.length === 1
                        ? "Uploading your image and generating link..."
                        : `Uploading ${files.length} images and generating links...`
                      : files.length === 1
                        ? "Preparing your image for upload..."
                        : `Preparing ${files.length} images for upload...`
                    }
                  </p>
                </div>

                {/* Progress indicator */}
                <div className={cn("rounded-lg p-4 text-sm", SEMANTIC_COLORS.uploadZone.info)}>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Original Upload Interface */
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-2xl p-6 md:p-16 text-center cursor-pointer transition-all duration-300 ease-out',
              'touch-manipulation min-h-[320px] md:min-h-[360px] flex items-center justify-center',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2',
              'hover:scale-[1.02] hover:shadow-lg motion-reduce:hover:scale-100',
              SEMANTIC_COLORS.uploadZone.container,
              isDragActive && SEMANTIC_COLORS.uploadZone.dragActive + ' scale-[1.02] animate-pulse-subtle',
              uploading && 'pointer-events-none opacity-50'
            )}
            role="button"
            aria-label={isDragActive ? "Drop photos to turn into links" : "Click to upload photos or drag and drop"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // The dropzone will handle the click
              }
            }}
          >
            <input {...getInputProps()} />
            <div className="space-y-6 w-full max-w-md mx-auto">
              {/* Visual Icon - Larger for mobile */}
              <div className={cn(
                "mx-auto w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out",
                isDragActive && "animate-gentle-bounce",
                SEMANTIC_COLORS.uploadZone.icon
              )}>
                <Upload className={cn(
                  "w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 ease-out",
                  isDragActive && "scale-110 animate-wiggle",
                  SEMANTIC_COLORS.uploadZone.iconText
                )} />
              </div>

              {isDragActive ? (
                <div className="space-y-2">
                  <p className={cn("text-xl md:text-2xl font-bold", BRAND_CLASSES.text.accent)}>Drop your photos here!</p>
                  <p className={cn("text-base", SEMANTIC_COLORS.uploadZone.subtitle)}>Let go to turn them into web links</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className={cn("text-xl md:text-2xl font-bold", SEMANTIC_COLORS.uploadZone.title)}>
                      Upload Your Photos
                    </p>
                    <p id="upload-instructions" className={cn("text-base md:text-lg", SEMANTIC_COLORS.uploadZone.subtitle)}>
                      Drag & drop images here or click to browse
                    </p>
                    <p className={cn("text-sm", SEMANTIC_COLORS.uploadZone.subtitle, "opacity-75")}>
                      Get shareable web links instantly • Multiple files supported
                    </p>
                  </div>

                  {/* Simple format info */}
                  <div id="upload-formats" className={cn("rounded-lg p-4 text-sm", SEMANTIC_COLORS.uploadZone.info)}>
                    <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-brand-orange rounded-sm" aria-hidden="true"></div>
                        <span>JPG, PNG, GIF</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-brand-blue-gray rounded-sm" aria-hidden="true"></div>
                        <span>Up to 10MB</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-brand-orange rounded-sm" aria-hidden="true"></div>
                        <span>Many photos at once</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>



      {/* Detailed Results Section */}
      {showDetailedResults && uploadedFiles.length > 0 && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">
                {uploadedFiles.length} image{uploadedFiles.length > 1 ? 's' : ''} uploaded successfully!
              </span>
            </div>
            <h3 className="text-2xl font-bold">Your Shareable Links Are Ready</h3>
            <p className="text-muted-foreground">
              Copy the links below to share your images anywhere
            </p>
          </div>

          {/* Bulk Actions */}
          {uploadedFiles.length > 1 && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const urls = uploadedFiles.map(f => f.url).join('\n');
                  copyToClipboard(urls, 'bulk-copy');
                }}
                className={cn(
                  "px-8 py-4 rounded-xl transition-all duration-200 touch-manipulation font-medium flex items-center justify-center space-x-3 transform hover:scale-105 active:scale-95 min-h-[52px]",
                  copiedStates['bulk-copy']
                    ? "bg-green-500 text-white"
                    : "bg-brand-orange text-white hover:bg-brand-orange/90"
                )}
              >
                {copiedStates['bulk-copy'] ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span className="text-base">Copied All!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span className="text-base">Copy All Links</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const htmlCodes = uploadedFiles.map(f => generateHtmlEmbed(f.url, f.originalName)).join('\n');
                  copyToClipboard(htmlCodes, 'bulk-html');
                }}
                className={cn(
                  "px-8 py-4 rounded-xl transition-all duration-200 ease-out touch-manipulation font-medium flex items-center justify-center space-x-3 transform hover:scale-105 active:scale-95 min-h-[52px] motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
                  copiedStates['bulk-html']
                    ? "bg-green-500 text-white animate-button-bounce"
                    : "bg-gray-100 hover:bg-gray-200 hover:shadow-md text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                )}
              >
                {copiedStates['bulk-html'] ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span className="text-base">HTML Copied!</span>
                  </>
                ) : (
                  <>
                    <Code className="w-5 h-5" />
                    <span className="text-base">Copy HTML Code</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Individual File Results */}
          <div className="space-y-6">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="rounded-2xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Preview */}
                  <div className="space-y-3">
                    <img
                      src={file.url}
                      alt={`Uploaded image: ${file.originalName.replace(/\.[^/.]+$/, "")}`}
                      className="w-full h-48 object-cover rounded-xl border"
                      loading="lazy"
                    />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground truncate">{file.originalName}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span>{formatFileSize(file.size)}</span>
                        {file.optimized && (
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            ✓ Optimized
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* URL and Actions */}
                  <div className="space-y-6">
                    {/* URL Field */}
                    <div className="space-y-3">
                      <label className="text-lg font-semibold text-foreground block text-center">
                        Your Shareable Link
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={file.url}
                          readOnly
                          className="w-full px-6 py-4 border-2 rounded-2xl text-base font-mono text-center bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                          onClick={(e) => e.currentTarget.select()}
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              copyToClipboard(file.url, `copy-${file.id}`);
                            }}
                            className={cn(
                              "px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium",
                              copiedStates[`copy-${file.id}`]
                                ? "bg-green-500 text-white"
                                : "bg-brand-orange text-white hover:bg-brand-orange/90"
                            )}
                          >
                            {copiedStates[`copy-${file.id}`] ? (
                              <span className="flex items-center space-x-1">
                                <Check className="w-4 h-4" />
                                <span className="hidden sm:inline">Copied!</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-1">
                                <Copy className="w-4 h-4" />
                                <span className="hidden sm:inline">Copy</span>
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(file.url, '_blank');
                        }}
                        className="px-6 py-3 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px] bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShareDialog({
                            isOpen: true,
                            url: file.url,
                            title: file.originalName
                          });
                        }}
                        className="px-6 py-3 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px] bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          copyHtmlEmbed(file.url, file.originalName);
                        }}
                        className="px-6 py-3 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px] bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        <Code className="w-4 h-4" />
                        <span>HTML</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Simple View */}
          <div className="text-center">
            <button
              onClick={() => {
                setShowDetailedResults(false);
                setShowInPlaceResults(true);
              }}
              className="px-6 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition-colors"
            >
              Back to Simple View
            </button>
          </div>
        </div>
      )}

      {/* Share Dialog */}
      {shareDialog && (
        <ShareDialog
          isOpen={shareDialog.isOpen}
          onClose={() => setShareDialog(null)}
          url={shareDialog.url}
          title={shareDialog.title}
          type="image"
        />
      )}
    </div>
  );
}