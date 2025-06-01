import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Logo from "../assets/icon.jpg"

const Header = () => {
    return (
        <HeaderWrapper>
            <StyledLogo src={Logo}/>
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
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
`;

const NavButton = styled(Link)`
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    //background-color: #4a90e2;
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
