// Function to load posts from localStorage
export const loadPosts = () => {
    const posts = localStorage.getItem('posts'); // Retrieve the 'posts' item from localStorage
    return posts ? JSON.parse(posts) : []; // Parse the JSON string if it exists, otherwise return an empty array
  };
  
  // Function to save posts to localStorage
  export const savePosts = (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts)); // Convert the posts array to a JSON string and save it in localStorage
  };
  