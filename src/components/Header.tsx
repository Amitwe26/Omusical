import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from "../assets/icon.jpg"
import { auth } from '../firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { removeTokens } from '../services/authService';

const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="#883bc6" strokeWidth="2"/>
    <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="#883bc6" strokeWidth="2"/>
  </svg>
);

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    removeTokens();
    navigate('/');
  };

  return (
    <HeaderWrapper>
      {location.pathname !== '/' && (
        <HomeButton onClick={() => navigate('/')}>{'<'}</HomeButton>
      )}
      <StyledLogo src={Logo}/>
      {user ? (
        <UserInfo>
          <UserIcon />
          <UserName>{user.displayName || user.email}</UserName>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfo>
      ) : (
        <>
          <NavButton to="/login">Login</NavButton>
          <NavButton to="/signup">Signup</NavButton>
        </>
      )}
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
    width: 95%;
    padding: 1rem 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
`;

const HomeButton = styled.button`
    margin-right: 1rem;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: #883bc6;
    cursor: pointer;
    &:hover {
        color: #4a90e2;
    }
`;

const NavButton = styled(Link)`
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #883bc6;
    color: #883bc6;
    text-decoration: none;
    border-radius: 5px;
    justify-items: center;

    &:hover {
        background-color: rgba(136, 59, 198, 0.55);
    }
`;

const StyledLogo = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
    object-position: center;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1rem;
`;

const UserName = styled.span`
    margin-left: 0.5rem;
    color: #883bc6;
    font-weight: 500;
`;

const LogoutButton = styled.button`
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    background: #fff;
    color: #883bc6;
    border: 1px solid #883bc6;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    &:hover {
        background-color: rgba(136, 59, 198, 0.1);
    }
`;
