import { lazy } from 'react';

// Lazy load UI components (only existing ones)
export const LazyTypewriter = lazy(() => import('../ui/Typewriter'));
export const LazyGlitchText = lazy(() => import('../ui/GlitchText'));
export const LazyToast = lazy(() => import('../ui/Toast'));

// Note: Other components will be added as they are created
// export const LazyServices = lazy(() => import('../sections/Services'));
// export const LazyAbout = lazy(() => import('../sections/About'));
// export const LazyContact = lazy(() => import('../sections/Contact'));
// export const LazyFAQ = lazy(() => import('../sections/FAQ'));
