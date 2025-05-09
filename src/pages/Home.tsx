import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import CoverImage from '../components/CoverImage';

const Home = () => {
    return (
        <div>
            <Header />
            <CoverImage />
            <Description>
                Music Chat הוא פלטפורמה חדשה שמחברת בין אנשים ואומנים בצ'אט מוזיקה חי. הצטרפו לשיחות, חלקו קטעים והתחברו לקהילה מוזיקלית מכל העולם 🎵💬
            </Description>
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
