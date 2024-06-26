import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import BlogPostList from './components/BlogPostList';
import BlogPost from './components/BlogPost';
import AddEditPost from './components/AddEditPost';
import './styles/animations.css'; // Import CSS for animations

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Nav>
        <Title>Blogging Platform</Title>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/new">Add New Post</NavLink>
        </NavLinks>
      </Nav>
      <AnimatedRoutes />
    </Router>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<BlogPostList />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/edit/:id" element={<AddEditPost />} />
          <Route path="/new" element={<AddEditPost />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const Nav = styled.nav`
  background: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Title = styled.h1`
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default App;
