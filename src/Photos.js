import React, { useState } from 'react';
import './App.css';
import PhotoDetails from './PhotoDetails';

const Photos = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePhotoClick = (post) => {
    setSelectedPost(post);
  };

  const closePhotoDetails = () => {
    setSelectedPost(null);
  };

  return (
    <div>
      <div className="photos-grid">
        {posts.filter(post => post.image).map((post) => (
          <div key={post.id} className="photo-item" onClick={() => handlePhotoClick(post)}>
            <img src={post.image} alt={post.content} />
          </div>
        ))}
      </div>
      {selectedPost && (
        <PhotoDetails post={selectedPost} onClose={closePhotoDetails} />
      )}
    </div>
  );
};

export default Photos;


