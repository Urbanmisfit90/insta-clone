import React from 'react';
import './PhotoDetails.css';

const PhotoDetails = ({ post, onClose }) => {
  return (
    <div className="photo-details-overlay">
      <div className="photo-details">
        <button className="close-button" onClick={onClose}>X</button>
        <img src={post.image} alt={post.content} />
        <p>{post.content}</p>
        <div className="reactions">
          {Object.entries(post.reactions).map(([emoji, count]) => (
            <span key={emoji}>{emoji} {count}</span>
          ))}
        </div>
        <div className="comments">
          {post.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              {comment.replies.map((reply) => (
                <div key={reply.id} className="reply">
                  <p>{reply.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoDetails;
