/**
 * Güllap Software Frontend Types
 * 
 * Bu dosya proje genelinde kullanılan TypeScript tip tanımlarını içerir.
 */

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    subject: string;
    createdAt: string;
  };
}

// Service Types
export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  category: 'desktop' | 'web' | 'mobile';
  level: 'basic' | 'standard' | 'professional';
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  packages: ServicePackage[];
}

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
  children?: NavigationItem[];
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'development' | 'support';
}

// Company Types
export interface CompanyInfo {
  name: string;
  description: string;
  founded: number;
  employees: string;
  location: string;
  website: string;
  email: string;
  phone: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image?: string;
  linkedin?: string;
  github?: string;
}

// Statistics Types
export interface Statistic {
  id: string;
  value: string;
  label: string;
  icon: string;
}

// Feature Types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent';
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  image?: string;
}

// Blog/News Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  image?: string;
  slug: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Form Validation Types
export interface FormErrors {
  [key: string]: string;
}

export interface FormState {
  isLoading: boolean;
  isSubmitted: boolean;
  errors: FormErrors;
}

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'soft' | 'medium' | 'large';
  border?: boolean;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Animation Types
export interface AnimationProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in';
  delay?: number;
  duration?: number;
  className?: string;
}

// SEO Types
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

// Environment Types
export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_SITE_URL: string;
}

// Utility Types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ColorScheme = 'light' | 'dark';

// Component Props with Common Props
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

// Form Field Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: unknown) => string | undefined;
  };
  options?: { value: string; label: string }[]; // For select fields
}

// Toast Notification Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

// Pagination Types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  showPrevNext?: boolean;
  className?: string;
}

// Search Types
export interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  suggestions?: string[];
  showSuggestions?: boolean;
  className?: string;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  retry?: () => void;
}

// API Error Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

// File Upload Types
export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  onUpload: (files: File[]) => void;
  onError?: (error: string) => void;
  className?: string;
}

// Image Types
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
}

// Link Types
export interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

// Icon Types
export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

// Layout Types
export interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

// Section Types
export interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  background?: 'white' | 'gray' | 'primary' | 'secondary';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

// Grid Types
export interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Flex Types
export interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  className?: string;
}
