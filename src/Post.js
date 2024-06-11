import React, { useState } from 'react';

function Post({ post, onLike, onAddComment }) {
  const { id, content, image, likes, comments } = post;
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    onLike(id);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(id, newComment);
      setNewComment("");
    }
  };

  return (
    <div className="post">
      {image && <img src={image} alt="post" className="post-image" />}
      <p>{content}</p>
      <div className="likes">
        <span role="img" aria-label="like" onClick={handleLike}>❤️</span>
        {likes} likes
      </div>
      <div className="comments">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.user}</strong>: {comment.comment}
          </div>
        ))}
        <form onSubmit={handleAddComment}>
          <input 
            type="text" 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="Add a comment" 
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}

export default Post;
