import React from 'react';

interface OptimizedSVGProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const OptimizedSVG: React.FC<OptimizedSVGProps> = ({
  src,
  alt,
  width = 24,
  height = 24,
  className = '',
  priority = false
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      aria-label={alt}
      role="img"
      {...(priority && { 'data-priority': 'true' })}
    >
      <use href={src} />
    </svg>
  );
};

export default OptimizedSVG;
