import React from 'react';
import './ImageWithFallback.css';

const ImageWithFallback = ({ src, alt, className }) => {
  return (
    <div className={`image-container ${className}`}>
      <img
        src={src}
        alt={alt}
        className="image"
      />
    </div>
  );
};

export default ImageWithFallback; 