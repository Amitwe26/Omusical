import React from 'react';
import styled from 'styled-components';
import { genres } from '../../utils/genreData';
import { GenreCard } from './GenreCard';



export const GenreList = () => {
  return (
    <>
      <Title>Room Types</Title>
      <ScrollContainer>
        <Container>
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </Container>
      </ScrollContainer>
    </>
  );
}; 

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem 0;

  scrollbar-width: none;
  -ms-overflow-style: none; 
  &::-webkit-scrollbar {
    display: none; 
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0 1rem;
  min-width: min-content;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 1rem 1rem 0.5rem;
  font-weight: 600;
`;