import React, { useState } from 'react';

function CreatePost({ addPost }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() || image) {
      addPost({ content, image });
      setContent('');
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="create-post-container">
      <h1 className="create-post-header">Create Post</h1>
      <form onSubmit={handleSubmit} className="create-post-form">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
          className="create-post-textarea"
        />
        {imagePreview && <img src={imagePreview} alt="Preview" className="create-post-image-preview" />}
        <label htmlFor="file-upload" className="create-post-image-label">
          <i className="fa fa-camera"></i> Add Photo
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="create-post-image-input"
        />
        <button type="submit" className="create-post-submit-button">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;



