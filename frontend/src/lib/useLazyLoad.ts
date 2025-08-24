import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

interface UseLazyLoadReturn {
  isVisible: boolean;
  ref: React.RefObject<HTMLElement | HTMLSpanElement | null>;
  hasIntersected: boolean;
}

export const useLazyLoad = (options: UseLazyLoadOptions = {}): UseLazyLoadReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    root = null
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement | HTMLSpanElement | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && !hasIntersected) {
      setIsVisible(true);
      setHasIntersected(true);
    }
  }, [hasIntersected]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      root
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [handleIntersection, threshold, rootMargin, root]);

  return { isVisible, ref, hasIntersected };
};

// Lazy load images
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };

    img.onerror = () => {
      setImageSrc(placeholder || '');
      setIsLoaded(false);
    };
  }, [src, placeholder]);

  return { imageSrc, isLoaded };
};

// Lazy load with delay
export const useLazyLoadWithDelay = (delay: number = 100) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return shouldLoad;
};
