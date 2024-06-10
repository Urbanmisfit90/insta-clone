import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([{ content: newPost, id: Date.now() }, ...posts]);
      setNewPost("");
    }
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
            value={newPost}
            onChange={handlePostChange}
            placeholder="What's on your mind?"
            className="post-input"
          />
          <button type="submit" className="post-button">Post</button>
        </form>
        <div className="feed">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
