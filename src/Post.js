import React from 'react';

function Post({ post }) {
  // Destructure data from props (replace with actual data fetching logic later)
  const { image, caption, likes, comments } = post;

  return (
    <div className="post">
      <img src={image} alt={caption} />
      <p>{caption}</p>
      <div className="likes">
        <span>❤️</span>
        {likes} likes
      </div>
      {/* Display comments section here (initially empty) */}
    </div>
  );
}

export default Post;