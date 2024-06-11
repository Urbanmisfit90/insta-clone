import React, { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);

  const handlePostChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setNewPostImage(URL.createObjectURL(e.target.files[0]));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPostContent.trim() || newPostImage) {
      setPosts([{ content: newPostContent, image: newPostImage, id: Date.now(), likes: 0, comments: [] }, ...posts]);
      setNewPostContent("");
      setNewPostImage(null);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, { user: "current_user", comment }] } : post
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Instaclone</h1>
      </header>
      <main>
        <form onSubmit={handlePostSubmit} className="post-form">
          <input
            type="text"
            value={newPostContent}
            onChange={handlePostChange}
            placeholder="What's on your mind?"
            className="post-input"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="post-input"
          />
          <button type="submit" className="post-button">Post</button>
        </form>
        <div className="feed">
          {posts.map((post) => (
            <Post 
              key={post.id} 
              post={post} 
              onLike={handleLike} 
              onAddComment={handleAddComment} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;