import { toast } from 'sonner';

export interface AppError {
  code: string;
  message: string;
  details?: string;
}

export class UploadError extends Error {
  code: string;
  details?: string;

  constructor(code: string, message: string, details?: string) {
    super(message);
    this.name = 'UploadError';
    this.code = code;
    this.details = details;
  }
}

export const ERROR_CODES = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVER_ERROR: 'SERVER_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  // Supabase-specific errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CODES.FILE_TOO_LARGE]: 'File size exceeds the 10MB limit',
  [ERROR_CODES.INVALID_FILE_TYPE]: 'Invalid file type. Only JPG, PNG, GIF, WEBP, and SVG files are allowed',
  [ERROR_CODES.UPLOAD_FAILED]: 'Upload failed. Please try again',
  [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection',
  [ERROR_CODES.RATE_LIMITED]: 'Too many requests. Please wait before uploading again',
  [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later',
  [ERROR_CODES.VALIDATION_ERROR]: 'Validation error. Please check your file',
  // Supabase-specific error messages
  [ERROR_CODES.DATABASE_ERROR]: 'Database operation failed. Please try again',
  [ERROR_CODES.CONNECTION_ERROR]: 'Unable to connect to database. Please check your connection',
  [ERROR_CODES.AUTHENTICATION_ERROR]: 'Authentication failed. Please check your credentials',
  [ERROR_CODES.NOT_FOUND]: 'The requested resource was not found',
  [ERROR_CODES.DUPLICATE_ENTRY]: 'A record with this information already exists',
} as const;

export function handleError(error: unknown): AppError {
  console.error('Error occurred:', error);

  if (error instanceof UploadError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch')) {
      return {
        code: ERROR_CODES.NETWORK_ERROR,
        message: ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR],
        details: error.message,
      };
    }

    // Generic error
    return {
      code: ERROR_CODES.SERVER_ERROR,
      message: error.message || ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
    };
  }

  // Unknown error
  return {
    code: ERROR_CODES.SERVER_ERROR,
    message: ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
  };
}

export function showErrorToast(error: AppError | string) {
  const errorObj = typeof error === 'string' 
    ? { code: 'UNKNOWN', message: error } 
    : error;

  toast.error(errorObj.message, {
    description: errorObj.details,
    duration: 5000,
  });
}

export function showSuccessToast(message: string, description?: string) {
  toast.success(message, {
    description,
    duration: 3000,
  });
}

export function showInfoToast(message: string, description?: string) {
  toast.info(message, {
    description,
    duration: 4000,
  });
}

export function showWarningToast(message: string, description?: string) {
  toast.warning(message, {
    description,
    duration: 4000,
  });
}

// Supabase-specific error handling
export class SupabaseError extends Error {
  code?: string;
  details?: any;
  operation: string;

  constructor(message: string, operation: string, code?: string, details?: any) {
    super(message);
    this.name = 'SupabaseError';
    this.code = code;
    this.details = details;
    this.operation = operation;
  }
}

export function handleSupabaseError(error: any, operation: string): AppError {
  console.error(`[${operation}] Supabase error:`, error);

  // Handle specific Supabase error codes
  if (error?.code) {
    switch (error.code) {
      case 'PGRST116':
        return {
          code: ERROR_CODES.NOT_FOUND,
          message: ERROR_MESSAGES[ERROR_CODES.NOT_FOUND],
          details: `No records found for ${operation}`,
        };
      case '23505': // Unique constraint violation
        return {
          code: ERROR_CODES.DUPLICATE_ENTRY,
          message: ERROR_MESSAGES[ERROR_CODES.DUPLICATE_ENTRY],
          details: error.message,
        };
      case 'ECONNREFUSED':
      case 'ENOTFOUND':
      case 'ETIMEDOUT':
        return {
          code: ERROR_CODES.CONNECTION_ERROR,
          message: ERROR_MESSAGES[ERROR_CODES.CONNECTION_ERROR],
          details: error.message,
        };
      default:
        return {
          code: ERROR_CODES.DATABASE_ERROR,
          message: ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
          details: error.message,
        };
    }
  }

  // Handle network errors
  if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
    return {
      code: ERROR_CODES.NETWORK_ERROR,
      message: ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR],
      details: error.message,
    };
  }

  // Generic database error
  return {
    code: ERROR_CODES.DATABASE_ERROR,
    message: error?.message || ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
    details: error?.details,
  };
}

export async function withErrorHandling<T>(
  operation: string,
  fn: () => Promise<T>,
  fallback?: T
): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const appError = handleSupabaseError(error, operation);

    // If a fallback is provided, return it instead of throwing
    if (fallback !== undefined) {
      console.warn(`[${operation}] Returning fallback value due to error:`, appError);
      return fallback;
    }

    throw new SupabaseError(appError.message, operation, appError.code, appError.details);
  }
}
