import React, { useState } from 'react';

function Post({ post, addComment, addReply, updateReactions }) {
  const { id, content, reactions, comments, image } = post;
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(id, commentText);
      setCommentText("");
    }
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    if (replyText.trim()) {
      addReply(id, commentId, replyText);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const handleReaction = (emoji) => {
    updateReactions(id, emoji);
  };

  const renderComments = (comments) => {
    if (!comments || comments.length === 0) {
      return null;
    }

    return comments.map(comment => (
      <div key={comment.id} className="comment">
        <p>{comment.text}</p>
        <button onClick={() => setReplyingTo(comment.id)}>Reply</button>
        {replyingTo === comment.id && (
          <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
            <input
              type="text"
              value={replyText}
              onChange={handleReplyChange}
              placeholder="Write a reply..."
            />
            <button type="submit">Submit</button>
          </form>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {renderComments(comment.replies)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="post">
      <p>{content}</p>
      {image && <img src={image} alt="Post" className="post-image" />}
      <div className="reactions">
        <button onClick={() => handleReaction('❤️')}>❤️</button>
        <button onClick={() => handleReaction('👍')}>👍</button>
        <button onClick={() => handleReaction('😂')}>😂</button>
        <button onClick={() => handleReaction('😮')}>😮</button>
        <button onClick={() => handleReaction('😢')}>😢</button>
        <button onClick={() => handleReaction('😡')}>😡</button>
        <div>
          {reactions && Object.entries(reactions).map(([emoji, count]) => (
            <span key={emoji}>{emoji} {count}</span>
          ))}
        </div>
      </div>
      <div className="comments">
        {renderComments(comments)}
      </div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Post;

