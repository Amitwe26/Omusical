import React from 'react';
import styled from 'styled-components';
import CoverImage from '../components/CoverImage';
import {GenreList} from '../components/GenreList';

const Home = () => {
    return (
        <div>
            <CoverImage/>
            <Description>
                Omusical is a new platform that connects people and artists through live music chat. Join conversations
                and connect with a global music community 🎵💬
            </Description>
            <GenreList/>
        </div>
    );
};

export default Home;

const Description = styled.div`
    text-align: center;
    margin: 2rem auto;
    max-width: 600px;
    font-size: 1.2rem;
    line-height: 1.6;
`;
