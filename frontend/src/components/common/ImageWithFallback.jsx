import React, { useState } from 'react';
import './ImageWithFallback.css';

const ImageWithFallback = ({ src, alt, className, style }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`image-container ${className}`} style={style}>
      <img
        src={src}
        alt={alt}
        className={`image ${isLoaded ? 'loaded' : ''}`}
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
};

export default ImageWithFallback; 