import React, { useState } from 'react';
import { useLazyLoad } from '../hooks/useLazyLoad';
import SkeletonLoader from './SkeletonLoader';

interface LazyVideoProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackImage?: string;
  onLoad?: () => void;
  priority?: boolean;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  className = '',
  width,
  height,
  fallbackImage,
  onLoad,
  priority = false,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { elementRef, isVisible, isLoaded } = useLazyLoad({
    threshold: priority ? 0 : 0.1,
    rootMargin: priority ? '0px' : '50px',
  });

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    onLoad?.();
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const shouldLoad = priority || isVisible || isLoaded;

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
      {/* Skeleton loader */}
      {!videoLoaded && !videoError && (
        <SkeletonLoader
          variant="image"
          className="absolute inset-0 w-full h-full"
          width={width}
          height={height}
        />
      )}

      {/* Fallback image */}
      {!videoLoaded && !videoError && fallbackImage && (
        <img
          src={fallbackImage}
          alt="Video placeholder"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video iframe */}
      {shouldLoad && !videoError && (
        <iframe
          src={src}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleVideoLoad}
          onError={handleVideoError}
          title="StudioEyn Video"
        />
      )}

      {/* Error state */}
      {videoError && fallbackImage && (
        <img
          src={fallbackImage}
          alt="Video fallback"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default LazyVideo;
