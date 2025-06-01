import React from 'react';
import styled from 'styled-components';
import coverImage from '../assets/cover-picture.png'; // make sure the path is correct

const CoverImage = () => {
    return <StyledImage src={coverImage} alt="Cover" />;
};

export default CoverImage;

const StyledImage = styled.img`
    width: 100%;
    height: 60vh;
    object-fit: contain;
    object-position: center;
`;
