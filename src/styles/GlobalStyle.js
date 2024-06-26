import { createGlobalStyle } from 'styled-components';

// Define global styles for the entire application
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0; // Remove default margin from the body
    padding: 0; // Remove default padding from the body
    box-sizing: border-box; // Ensure that padding and border are included in the element's total width and height
    font-family: 'Arial', sans-serif; // Set a default font family for the application
  }
`;

export default GlobalStyle;
