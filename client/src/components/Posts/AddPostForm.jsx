import React, { useState } from "react";
import axios from "axios";

const AddPostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/post/save", { title, content });
      alert("Post added successfully");
      onPostAdded();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPostForm;
