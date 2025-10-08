import React, { useState } from 'react';
import { useLazyLoad } from '../hooks/useLazyLoad';
import SkeletonLoader from './SkeletonLoader';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  onLoad,
  onError,
  priority = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { elementRef, isVisible, isLoaded } = useLazyLoad({
    threshold: priority ? 0 : 0.1,
    rootMargin: priority ? '0px' : '50px',
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setImageError(true);
    onError?.();
  };

  const shouldLoad = priority || isVisible || isLoaded;

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
      {/* Skeleton loader */}
      {!imageLoaded && !imageError && (
        <SkeletonLoader
          variant="image"
          className="absolute inset-0 w-full h-full"
          width={width}
          height={height}
        />
      )}

      {/* Placeholder image */}
      {!imageLoaded && !imageError && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
          style={{ filter: 'blur(5px)' }}
        />
      )}

      {/* Main image */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? 'eager' : 'lazy'}
          width={width}
          height={height}
        />
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
