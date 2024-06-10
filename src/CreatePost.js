import React, { useState } from 'react';

function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to handle form submission (add to db.json locally for now)
    console.log('New post created:', caption, image);
    setCaption('');
    setImage(null);
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={caption} onChange={handleCaptionChange} />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;