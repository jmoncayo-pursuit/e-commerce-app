import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create a local URL for preview
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
    }
  };

  const handleUpload = () => {
    if (!selectedImage) {
      alert('Please select an image first!');
      return;
    }

    // For development, we'll just use the local preview URL
    // In production, you would upload to a server/cloud storage
    alert('Image ready for preview! In production, this would be uploaded to storage.');
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Image Upload Test</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
        style={{ marginBottom: '10px' }}
      />
      <button 
        onClick={handleUpload}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginLeft: '10px'
        }}
      >
        Upload Image
      </button>
      
      {previewUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Preview:</h3>
          <img 
            src={previewUrl} 
            alt="Preview" 
            style={{ 
              maxWidth: '300px', 
              maxHeight: '300px',
              objectFit: 'contain',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 