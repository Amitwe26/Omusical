import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Genre } from '../../utils/genreData';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  padding: 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const GenreName = styled.h3`
  margin: 0;
  font-size: 1rem;
  text-align: center;
  color: #333;
`;

interface GenreCardProps {
  genre: Genre;
}

export const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/genres/${genre.slug}`);
  };

  return (
    <Card onClick={handleClick}>
      <Image src={genre.imageUrl} alt={genre.name} />
      <GenreName>{genre.name}</GenreName>
    </Card>
  );
}; 