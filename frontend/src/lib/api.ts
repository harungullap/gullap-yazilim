// API Client for Güllap Yazılım
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API client with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || `HTTP error! status: ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
    }
    
    throw new ApiError('Beklenmeyen bir hata oluştu.');
  }
}

// Contact API functions
export const contactApi = {
  // Submit contact form
  async submit(data: ContactFormData): Promise<ApiResponse<ContactResponse>> {
    return apiRequest<ApiResponse<ContactResponse>>('/api/contact/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get all contacts (admin use)
  async getAll(): Promise<ApiResponse<ContactResponse[]>> {
    return apiRequest<ApiResponse<ContactResponse[]>>('/api/contact/all', {
      method: 'GET',
    });
  },

  // Get contact statistics
  async getStats(): Promise<ApiResponse<{ total: number; recent: number }>> {
    return apiRequest<ApiResponse<{ total: number; recent: number }>>('/api/contact/stats', {
      method: 'GET',
    });
  },
};

// Export default API client
export default {
  contact: contactApi,
};
