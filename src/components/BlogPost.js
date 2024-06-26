import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loadPosts, savePosts } from '../utils/mockAPI';

// Component for displaying a single blog post
const BlogPost = () => {
  const { id } = useParams(); // Get the post ID from the URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation

  const posts = loadPosts(); // Load all posts from local storage or mock API
  const post = posts.find(p => p.id === parseInt(id)); // Find the post matching the ID

  // Handler to delete the post
  const handleDelete = () => {
    const updatedPosts = posts.filter(p => p.id !== parseInt(id)); // Filter out the post to be deleted
    savePosts(updatedPosts); // Save the updated list of posts
    navigate('/'); // Navigate back to the homepage
  };

  if (!post) return <p>Post not found</p>; // Show message if post not found

  return (
    <PostContainer>
      <Post>
        <h2>{post.title}</h2>
        <p>by {post.author}</p>
        <p>{post.date}</p>
        <Content>{post.content}</Content>
        <ButtonContainer>
          <Button onClick={() => navigate(`/edit/${post.id}`)}>Edit</Button> {/* Edit button */}
          <Button onClick={handleDelete}>Delete</Button> {/* Delete button */}
        </ButtonContainer>
      </Post>
    </PostContainer>
  );
};

// Container to center the post with padding
const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

// Styles for the post content with padding and optional shadow
const Post = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 15px; 
  max-width: 800px;
  background-color: #fff; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  border-radius: 8px; 
`;

// Styles for the post content text
const Content = styled.div`
  white-space: pre-wrap; 
  word-wrap: break-word; 
  overflow-wrap: break-word; 
  margin: 1rem 0;
`;

// Container to add spacing between buttons
const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

// Styles for buttons with hover effects
const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export default BlogPost;
