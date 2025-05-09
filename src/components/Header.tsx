import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <HeaderWrapper>
            <NavButton to="/login">Login</NavButton>
            <NavButton to="/signup">Signup</NavButton>
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 95%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-start;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavButton = styled(Link)`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #357ab8;
  }
`;
