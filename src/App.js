import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Post from './Post';
import Photos from './Photos';
import './Post.css'; // Ensure this path is correct

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);

  // Load posts from local storage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() || image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosts([{ content: newPost, id: Date.now(), reactions: {}, comments: [], image: reader.result }, ...posts]);
        setNewPost("");
        setImage(null);
      };
      if (image) {
        reader.readAsDataURL(image);
      } else {
        reader.onloadend();
      }
    }
  };

  const addComment = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { id: Date.now(), text: commentText, replies: [] }]
        };
      }
      return post;
    }));
  };

  const addReply = (postId, commentId, replyText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, { id: Date.now(), text: replyText }]
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const updateReactions = (postId, emoji) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [emoji]: (post.reactions[emoji] || 0) + 1
          }
        };
      }
      return post;
    }));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Instaclone</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/photos">Photos</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <div>
              <form onSubmit={handlePostSubmit} className="post-form">
                <input
                  type="text"
                  value={newPost}
                  onChange={handlePostChange}
                  placeholder="What's on your mind?"
                  className="post-input"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="post-image-input"
                />
                <button type="submit" className="post-button">Post</button>
              </form>
              <div className="feed">
                {posts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    addComment={addComment}
                    addReply={addReply}
                    updateReactions={updateReactions}
                    deletePost={deletePost}
                  />
                ))}
              </div>
            </div>
          } />
          <Route path="/photos" element={<Photos posts={posts} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
