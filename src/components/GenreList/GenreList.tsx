import React from 'react';
import styled from 'styled-components';
import { genres } from '../../utils/genreData';
import { GenreCard } from './GenreCard';
import { useNavigate } from 'react-router-dom';

export const GenreList = () => {
  const navigate = useNavigate();
  return (
    <>
      <TitleRow>
        <Title>Room Types</Title>
        <GoRoomsButton onClick={() => navigate('/rooms')}>Go to all rooms</GoRoomsButton>
      </TitleRow>
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

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 1rem 1rem 0.5rem;
`;

const GoRoomsButton = styled.button`
  padding: 0.4rem 1rem;
  font-size: 1rem;
  background: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    background: #357ab8;
  }
`;

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