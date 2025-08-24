import { ApiError } from './api';

// Error message mapping
const ERROR_MESSAGES: Record<string, string> = {
  // Network errors
  'fetch': 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.',
  'timeout': 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
  
  // HTTP status errors
  '400': 'Geçersiz istek. Lütfen form verilerinizi kontrol edin.',
  '401': 'Yetkilendirme hatası.',
  '403': 'Bu işlem için yetkiniz bulunmuyor.',
  '404': 'İstenen kaynak bulunamadı.',
  '429': 'Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.',
  '500': 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
  '502': 'Sunucu geçici olarak kullanılamıyor.',
  '503': 'Sunucu bakımda. Lütfen daha sonra tekrar deneyin.',
  
  // Validation errors
  'validation': 'Form verilerinde hata var. Lütfen kontrol edin.',
  'required': 'Bu alan zorunludur.',
  'email': 'Geçerli bir e-posta adresi giriniz.',
  'phone': 'Geçerli bir telefon numarası giriniz.',
  'minLength': 'Bu alan çok kısa.',
  'maxLength': 'Bu alan çok uzun.',
  
  // Database errors
  'duplicate': 'Bu kayıt zaten mevcut.',
  'notFound': 'Kayıt bulunamadı.',
  
  // Default
  'unknown': 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
};

// Get user-friendly error message
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    // API Error with status
    if (error.status) {
      const statusMessage = ERROR_MESSAGES[error.status.toString()];
      if (statusMessage) return statusMessage;
    }
    
    // API Error with custom message
    if (error.message) return error.message;
  }
  
  // Network errors
  if (error instanceof TypeError) {
    if (error.message.includes('fetch')) {
      return ERROR_MESSAGES.fetch;
    }
    if (error.message.includes('timeout')) {
      return ERROR_MESSAGES.timeout;
    }
  }
  
  // String errors
  if (typeof error === 'string') {
    return error;
  }
  
  // Error objects
  if (error instanceof Error) {
    return error.message;
  }
  
  // Unknown errors
  return ERROR_MESSAGES.unknown;
}

// Check if error is retryable
export function isRetryableError(error: unknown): boolean {
  if (error instanceof ApiError) {
    // 5xx errors are retryable
    if (error.status && error.status >= 500) return true;
    // Rate limiting errors are retryable
    if (error.status === 429) return true;
  }
  
  // Network errors are retryable
  if (error instanceof TypeError) {
    if (error.message.includes('fetch')) return true;
  }
  
  return false;
}

// Get retry delay based on error type
export function getRetryDelay(error: unknown, attempt: number): number {
  if (error instanceof ApiError && error.status === 429) {
    // Rate limiting: exponential backoff
    return Math.min(1000 * Math.pow(2, attempt), 30000);
  }
  
  // Default: linear backoff
  return Math.min(1000 * attempt, 10000);
}

// Format error for logging
export function formatErrorForLogging(error: unknown): string {
  if (error instanceof ApiError) {
    return `API Error [${error.status}]: ${error.message}`;
  }
  
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  
  return `Unknown Error: ${String(error)}`;
}
