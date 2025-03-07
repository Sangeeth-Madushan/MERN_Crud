import React, { useEffect, useState } from "react";
import axios from "axios";

const PostsList = ({ onEdit }) => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Delete post by ID
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/posts/delete/${id}`);
      alert("Post deleted successfully");
      fetchPosts(); // Refresh the post list
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <strong>{post.title}</strong>: {post.content}
            <button onClick={() => deletePost(post._id)}>Delete</button>
            <button onClick={() => onEdit(post)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
