// Tree shaking optimizations for better bundle splitting

// Lucide icons - import only what we need
export {
  ArrowRight,
  Code,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Users,
  Terminal,
  Cpu,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Menu,
  ExternalLink
} from 'lucide-react';

// Framer Motion - optimized imports
export { motion, AnimatePresence } from 'framer-motion';

// React utilities - only what we use
export { 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  useMemo,
  Suspense,
  lazy
} from 'react';

// Form utilities
export { useForm } from 'react-hook-form';
export { z } from 'zod';
