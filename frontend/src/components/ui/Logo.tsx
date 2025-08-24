'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'text';
  className?: string;
}

export default function Logo({ size = 'md', variant = 'default', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const renderLogo = () => {
    switch (variant) {
      case 'minimal':
        return (
          <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md`}>
            <span className={`${textSizes[size]} font-bold text-white font-mono tracking-wider`}>
              GLY
            </span>
          </div>
        );

      case 'text':
        return (
          <div className="flex items-center space-x-2">
            <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md`}>
              <span className={`${textSizes[size]} font-bold text-white font-mono tracking-wider`}>
                GLY
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-800 font-semibold font-mono text-base leading-none">
                Güllap
              </span>
              <span className="text-slate-600 font-mono text-sm leading-none">
                Yazılım
              </span>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center space-x-3">
            {/* Logo Icon */}
            <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md relative group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25`}>
              <span className={`${textSizes[size]} font-bold text-white font-mono tracking-wider`}>
                GLY
              </span>
              
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-white/20 rounded-bl-lg"></div>
            </div>
            
            {/* Company Name */}
            <div className="flex flex-col">
              <span className="text-slate-800 font-semibold font-mono text-base leading-none">
                Güllap
              </span>
              <span className="text-slate-600 font-mono text-sm leading-none">
                Yazılım
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {renderLogo()}
    </motion.div>
  );
}

// Alternative compact logo
export function CompactLogo({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 ${className}`}
    >
      <span className={`${textSizes[size]} font-bold text-white font-mono tracking-wider`}>
        GLY
      </span>
    </motion.div>
  );
}

// Text-only logo
export function TextLogo({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }) {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-center space-x-2 ${className}`}
    >
      <span className={`${textSizes[size]} font-bold text-blue-600 font-mono tracking-wider`}>
        GLY
      </span>
      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
      <span className={`${textSizes[size]} font-semibold text-slate-700 font-mono`}>
        Yazılım
      </span>
    </motion.div>
  );
}
