import React, { Suspense, ReactNode, forwardRef } from 'react';
import { useLazyLoad } from '@/lib/useLazyLoad';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  as?: 'div' | 'span';
}

const LazyWrapper = forwardRef<HTMLElement | HTMLSpanElement, LazyWrapperProps>(({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  as = 'div'
}, ref) => {
  const { isVisible, ref: lazyRef } = useLazyLoad({ threshold, rootMargin });

  // Default fallback based on 'as' prop
  const defaultFallback = as === 'span' 
    ? <span className="animate-pulse bg-gray-200 h-4 w-full inline-block rounded" />
    : <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />;

  const finalFallback = fallback || defaultFallback;

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
        finalFallback
      )}
    </Component>
  );
});

LazyWrapper.displayName = 'LazyWrapper';

export default LazyWrapper;
