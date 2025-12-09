import { R2_CONFIG } from './r2-client';

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateFile(file: File): FileValidationResult {
  // Check file size
  if (file.size > R2_CONFIG.maxFileSize) {
    return {
      isValid: false,
      error: `File size exceeds ${Math.round(R2_CONFIG.maxFileSize / 1024 / 1024)}MB limit`,
    };
  }

  // Check minimum file size (avoid empty files)
  if (file.size < 100) {
    return {
      isValid: false,
      error: 'File is too small. Minimum size is 100 bytes',
    };
  }

  // Check file type
  if (!R2_CONFIG.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only JPG, PNG, GIF, WEBP, and SVG files are allowed',
    };
  }

  // Additional filename validation
  if (!isValidFileName(file.name)) {
    return {
      isValid: false,
      error: 'Invalid filename. Avoid special characters and ensure proper extension',
    };
  }

  return { isValid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isValidFileName(fileName: string): boolean {
  // Check for dangerous patterns
  const dangerousPatterns = [
    /\.\./,  // Directory traversal
    /[<>:"|?*]/,  // Invalid characters
    /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i,  // Reserved names
  ];

  if (dangerousPatterns.some(pattern => pattern.test(fileName))) {
    return false;
  }

  // Check file extension
  const extension = fileName.split('.').pop()?.toLowerCase();
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

  return extension ? allowedExtensions.includes(extension) : false;
}

export function sanitizeFileName(fileName: string): string {
  // Remove dangerous characters and normalize
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 100); // Limit length
}

export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop()?.toLowerCase();
  const sanitizedName = sanitizeFileName(originalName.split('.')[0]);
  return `${timestamp}-${random}-${sanitizedName}.${extension}`;
}

export async function validateFileContent(buffer: Buffer, mimeType: string): Promise<FileValidationResult> {
  // Basic file signature validation
  const signatures: Record<string, number[][]> = {
    'image/jpeg': [[0xFF, 0xD8, 0xFF]],
    'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
    'image/gif': [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
    'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header
    'image/svg+xml': [], // SVG is text-based, skip binary validation
  };

  const expectedSignatures = signatures[mimeType];
  if (!expectedSignatures || expectedSignatures.length === 0) {
    return { isValid: true }; // Skip validation for SVG
  }

  const fileHeader = Array.from(buffer.slice(0, 16));
  const isValidSignature = expectedSignatures.some(signature =>
    signature.every((byte, index) => fileHeader[index] === byte)
  );

  if (!isValidSignature) {
    return {
      isValid: false,
      error: 'File content does not match the declared file type',
    };
  }

  return { isValid: true };
}