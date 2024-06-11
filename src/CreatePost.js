import React, { useState } from 'react';
import './App.css'; // Ensure this file contains the necessary CSS

function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    // Generate a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!caption.trim() || !image) {
      alert('Please enter a caption and choose an image.');
      return;
    }
    // Implement logic to handle form submission (add to db.json locally for now)
    console.log('New post created:', caption, image);

    // Reset form fields
    setCaption('');
    setImage(null);
    setImagePreview(null);
    event.target.reset(); // Clear the file input
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Write a caption..."
        />
        <label htmlFor="file-input" className="file-input-label">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          ) : (
            <span>Choose File</span>
          )}
        </label>
        <input
          id="file-input"
          type="file"
          onChange={handleImageChange}
          className="file-input"
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;


