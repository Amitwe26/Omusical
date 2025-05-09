import React from 'react';
import styled from 'styled-components';


const CoverImage = () => {
    return <ImageWrapper />;
};

export default CoverImage;

const ImageWrapper = styled.div`
  width: 100%;
  height: 50vh;
  background-image: url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4');
  background-size: cover;
  background-position: center;
`;
