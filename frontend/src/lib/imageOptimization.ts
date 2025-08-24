// Image optimization utilities
export const imageLoader = ({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Responsive image sizes
export const responsiveSizes = {
  sm: '(max-width: 640px) 100vw',
  md: '(max-width: 768px) 50vw',
  lg: '(max-width: 1024px) 33vw',
  xl: '(max-width: 1280px) 25vw',
  full: '100vw'
};

// Priority images (above the fold)
export const priorityImages = [
  '/favicon.svg',
  '/logo.svg'
];

// Lazy load images (below the fold)
export const lazyImages = [
  '/hero-image.jpg',
  '/service-images/'
];

// Image optimization config
export const imageConfig = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
};
