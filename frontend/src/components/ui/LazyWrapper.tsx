import React, { Suspense, ReactNode, forwardRef, useState, useEffect } from 'react';
import { useLazyLoad } from '@/lib/useLazyLoad';
import { useMobileDetection } from '@/lib/useMobileDetection';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  as?: 'div' | 'span';
  priority?: 'high' | 'medium' | 'low';
  delay?: number;
}

const LazyWrapper = forwardRef<HTMLElement | HTMLSpanElement, LazyWrapperProps>(({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  as = 'div',
  priority = 'medium',
  delay = 0
}, ref) => {
  // Mobile detection for better performance
  const isMobile = useMobileDetection();

  // Mobile-optimized settings
  const mobileThreshold = isMobile ? 0.01 : threshold; // Mobilde çok daha erken yükleme
  const mobileRootMargin = isMobile ? '100px' : rootMargin; // Mobilde daha geniş margin
  const mobileDelay = isMobile ? 0 : delay; // Mobilde gecikme yok

  const { isVisible, ref: lazyRef, isLoading } = useLazyLoad({ 
    threshold: mobileThreshold, 
    rootMargin: mobileRootMargin, 
    priority, 
    delay: mobileDelay 
  });

  // Enhanced fallback based on 'as' prop, priority and mobile
  const getDefaultFallback = () => {
    if (as === 'span') {
      return (
        <span className={`animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 h-4 w-full inline-block rounded ${
          priority === 'high' ? 'bg-blue-100' : priority === 'medium' ? 'bg-gray-100' : 'bg-gray-50'
        } ${isMobile ? 'animate-pulse-fast' : ''}`} />
      );
    }
    
    return (
      <div className={`animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 h-32 rounded-lg ${
        priority === 'high' ? 'bg-blue-100' : priority === 'medium' ? 'bg-gray-100' : 'bg-gray-50'
      } ${isMobile ? 'animate-pulse-fast' : ''}`}>
        <div className="flex items-center justify-center h-full">
          <div className={`border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin ${
            isMobile ? 'w-6 h-6' : 'w-8 h-8'
          }`}></div>
        </div>
      </div>
    );
  };

  const finalFallback = fallback || getDefaultFallback();

  // Merge refs
  const mergedRef = (node: HTMLElement | HTMLSpanElement | null) => {
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
    
    // Handle lazyRef
    if (lazyRef && typeof lazyRef === 'object' && 'current' in lazyRef && node !== null) {
      lazyRef.current = node;
    }
  };

  const Component = as;

  return (
    <Component ref={mergedRef} className={className}>
      {isVisible ? (
        <Suspense fallback={finalFallback}>
          {children}
        </Suspense>
      ) : (
        <Component className={`transition-opacity duration-300 ${isLoading ? 'opacity-75' : 'opacity-100'}`}>
          {finalFallback}
        </Component>
      )}
    </Component>
  );
});

LazyWrapper.displayName = 'LazyWrapper';

export default LazyWrapper;
