import { useState, useEffect, useRef, useCallback } from 'react';
import { useMobileDetection } from './useMobileDetection';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  delay?: number;
  priority?: 'high' | 'medium' | 'low';
}

interface UseLazyLoadReturn {
  isVisible: boolean;
  ref: React.RefObject<HTMLElement | HTMLSpanElement | null>;
  hasIntersected: boolean;
  isLoading: boolean;
}

export const useLazyLoad = (options: UseLazyLoadOptions = {}): UseLazyLoadReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    root = null,
    delay = 0,
    priority = 'medium'
  } = options;

  // Mobile detection for aggressive loading
  const isMobile = useMobileDetection();

  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLElement | HTMLSpanElement | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && !hasIntersected) {
      // Mobile-first aggressive loading
      if (isMobile) {
        // Mobilde hemen yükle, gecikme yok
        setIsVisible(true);
        setHasIntersected(true);
      } else {
        // Desktop'ta priority-based loading
        if (priority === 'high') {
          setIsVisible(true);
          setHasIntersected(true);
        } else if (priority === 'medium') {
          setTimeout(() => {
            setIsVisible(true);
            setHasIntersected(true);
          }, delay);
        } else {
          // Low priority - wait longer
          setTimeout(() => {
            setIsVisible(true);
            setHasIntersected(true);
          }, delay + 200);
        }
      }
    }
  }, [hasIntersected, priority, delay, isMobile]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set loading state
    setIsLoading(true);

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      root
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      setIsLoading(false);
    };
  }, [handleIntersection, threshold, rootMargin, root]);

  return { isVisible, ref, hasIntersected, isLoading };
};

// Lazy load images with progressive loading
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!src) return;

    setIsLoading(true);
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      setIsLoading(false);
    };

    img.onerror = () => {
      setImageSrc(placeholder || '');
      setIsLoaded(false);
      setIsLoading(false);
    };
  }, [src, placeholder]);

  return { imageSrc, isLoaded, isLoading };
};

// Lazy load with delay and priority
export const useLazyLoadWithDelay = (delay: number = 100, priority: 'high' | 'medium' | 'low' = 'medium') => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (priority === 'high') {
      setShouldLoad(true);
    } else if (priority === 'medium') {
      timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
    } else {
      timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay + 300);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [delay, priority]);

  return shouldLoad;
};

// Progressive loading for multiple elements
export const useProgressiveLoading = (items: any[], batchSize: number = 3, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<number>(batchSize);

  useEffect(() => {
    if (visibleItems >= items.length) return;

    const timer = setTimeout(() => {
      setVisibleItems(prev => Math.min(prev + batchSize, items.length));
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleItems, items.length, batchSize, delay]);

  return items.slice(0, visibleItems);
};
