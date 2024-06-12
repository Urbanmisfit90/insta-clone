import React from 'react';
import './App.css';

const Photos = ({ posts }) => {
  return (
    <div className="photos-grid">
      {posts.filter(post => post.image).map((post) => (
        <div key={post.id} className="photo-item">
          <img src={post.image} alt={post.content} />
        </div>
      ))}
    </div>
  );
};

export default Photos;

