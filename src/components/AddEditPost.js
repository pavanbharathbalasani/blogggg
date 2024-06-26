import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadPosts, savePosts } from '../utils/mockAPI';

// This component handles both adding and editing blog posts
const AddEditPost = () => {
  // Getting the post ID from the URL, if available
  const { id } = useParams();
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // Setting up state to manage the form data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    date: '',
  });

  // This effect runs when the component mounts and whenever the post ID changes
  useEffect(() => {
    if (id) {
      const posts = loadPosts(); // Load all posts from local storage or mock API
      const post = posts.find(p => p.id === parseInt(id)); // Find the post with the matching ID
      if (post) setFormData(post); // If the post exists, populate the form with its data
    }
  }, [id]); // Dependency array ensures this effect runs when 'id' changes

  // Handler for input changes, updating the form state
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value from the input field
    setFormData({ ...formData, [name]: value }); // Update the corresponding form field in state
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const posts = loadPosts(); // Load all posts from local storage or mock API
    if (id) {
      // If there's an ID, we're editing an existing post
      const updatedPosts = posts.map(p => (p.id === parseInt(id) ? formData : p));
      savePosts(updatedPosts); // Save the updated list of posts
    } else {
      // If there's no ID, we're adding a new post
      const newPost = { ...formData, id: Date.now() }; // Create a new post with a unique ID
      savePosts([...posts, newPost]); // Save the new list of posts, including the new post
    }
    navigate('/'); // Navigate back to the homepage after saving
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
};

// Styled component for the form container to center it and add some padding and styling
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem;
`;

// Styled component for the form to arrange the elements in a column and style the inputs
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  label {
    margin: 1rem 0;
    font-size: 1.1rem;
  }
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  textarea {
    resize: vertical;
    min-height: 150px;
  }
`;

// Styled component for the submit button to make it look nice and add hover effects
const SubmitButton = styled.button`
  width: 100%; 
  max-width: 600px;
  padding: 0.75rem;
  margin: 1.5rem 0;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export default AddEditPost;
