export interface ResizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  maintainAspectRatio?: boolean;
}

export interface ResizePreset {
  name: string;
  width: number;
  height: number;
  description: string;
}

export const RESIZE_PRESETS: ResizePreset[] = [
  { name: 'Small', width: 400, height: 300, description: 'Good for thumbnails' },
  { name: 'Medium', width: 800, height: 600, description: 'Good for web display' },
  { name: 'Large', width: 1200, height: 900, description: 'Good for high-res display' },
  { name: 'HD', width: 1920, height: 1080, description: 'Full HD resolution' },
  { name: 'Square Small', width: 400, height: 400, description: 'Square format, small' },
  { name: 'Square Medium', width: 800, height: 800, description: 'Square format, medium' },
];

export class ImageResizer {
  static async resizeImage(file: File, options: ResizeOptions): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          const { width: targetWidth, height: targetHeight } = this.calculateDimensions(
            img.width,
            img.height,
            options
          );

          canvas.width = targetWidth;
          canvas.height = targetHeight;

          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Draw the resized image
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Convert to blob
          const quality = options.quality || 0.9;
          const format = options.format || 'jpeg';
          const mimeType = `image/${format}`;

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to create blob'));
                return;
              }

              // Create new file with resized content
              const resizedFile = new File([blob], file.name, {
                type: mimeType,
                lastModified: Date.now(),
              });

              resolve(resizedFile);
            },
            mimeType,
            quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = URL.createObjectURL(file);
    });
  }

  static calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    options: ResizeOptions
  ): { width: number; height: number } {
    const { width: targetWidth, height: targetHeight, maintainAspectRatio = true } = options;

    if (!targetWidth && !targetHeight) {
      return { width: originalWidth, height: originalHeight };
    }

    if (!maintainAspectRatio) {
      return {
        width: targetWidth || originalWidth,
        height: targetHeight || originalHeight,
      };
    }

    const aspectRatio = originalWidth / originalHeight;

    if (targetWidth && targetHeight) {
      // Both dimensions specified, choose the one that maintains aspect ratio
      const widthBasedHeight = targetWidth / aspectRatio;
      const heightBasedWidth = targetHeight * aspectRatio;

      if (widthBasedHeight <= targetHeight) {
        return { width: targetWidth, height: Math.round(widthBasedHeight) };
      } else {
        return { width: Math.round(heightBasedWidth), height: targetHeight };
      }
    }

    if (targetWidth) {
      return {
        width: targetWidth,
        height: Math.round(targetWidth / aspectRatio),
      };
    }

    if (targetHeight) {
      return {
        width: Math.round(targetHeight * aspectRatio),
        height: targetHeight,
      };
    }

    return { width: originalWidth, height: originalHeight };
  }

  static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
        URL.revokeObjectURL(img.src);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
