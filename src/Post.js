import React, { useState } from 'react';
import './Post.css';

function Post({ post, addComment, addReply, updateReactions, deletePost }) {
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText("");
    }
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = (commentId, e) => {
    e.preventDefault();
    if (replyText.trim()) {
      addReply(post.id, commentId, replyText);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const handleReaction = (emoji) => {
    updateReactions(post.id, emoji);
  };

  return (
    <div className="post">
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <button onClick={() => deletePost(post.id)}>Delete</button>
      <div className="reactions">
        {['👍', '❤️', '😂', '😮', '😢', '😡'].map((emoji) => (
          <button key={emoji} onClick={() => handleReaction(emoji)}>
            {emoji} {post.reactions[emoji] || 0}
          </button>
        ))}
      </div>
      <div className="comments">
        {post.comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            <button onClick={() => setReplyingTo(comment.id)}>Reply</button>
            {comment.replies.map((reply) => (
              <div key={reply.id} className="reply">
                <p>{reply.text}</p>
              </div>
            ))}
            {replyingTo === comment.id && (
              <form onSubmit={(e) => handleReplySubmit(comment.id, e)}>
                <input
                  type="text"
                  value={replyText}
                  onChange={handleReplyChange}
                  placeholder="Write a reply..."
                />
                <button type="submit">Reply</button>
              </form>
            )}
          </div>
        ))}
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}

export default Post;


