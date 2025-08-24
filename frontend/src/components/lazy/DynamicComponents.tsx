import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading fallbacks
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const LoadingCard = () => (
  <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
);

const LoadingText = () => (
  <div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
);

// Dynamic components with loading states
export const DynamicTypewriter = dynamic(
  () => import('../ui/Typewriter'),
  {
    loading: () => <LoadingText />,
    ssr: false // Client-side only for animations
  }
);

export const DynamicGlitchText = dynamic(
  () => import('../ui/GlitchText'),
  {
    loading: () => <LoadingText />,
    ssr: false // Client-side only for animations
  }
);

export const DynamicToast = dynamic(
  () => import('../ui/Toast'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false // Client-side only
  }
);

// Motion components (heavy animations)
export const DynamicMotionDiv = dynamic(
  () => import('framer-motion').then(mod => mod.motion.div),
  {
    loading: () => <div />,
    ssr: false
  }
);

// Chart/visualization components (if added later)
// export const DynamicChart = dynamic(
//   () => import('../ui/Chart').catch(() => ({ default: () => <div>Chart not available</div> })),
//   {
//     loading: () => <LoadingCard />,
//     ssr: false
//   }
// );

// Contact form (form libraries are heavy)
// export const DynamicContactForm = dynamic(
//   () => import('../forms/ContactForm'),
//   {
//     loading: () => <LoadingCard />,
//     ssr: false // Form interactions are client-side
//   }
// );

// Accordion/FAQ components
// export const DynamicAccordion = dynamic(
//   () => import('../ui/Accordion'),
//   {
//     loading: () => <LoadingCard />,
//     ssr: true // FAQ content should be SSR for SEO
//   }
// );
