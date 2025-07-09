import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";
import { genres, Genre } from '../utils/genreData';

const MenuRooms = () => {
    const navigate = useNavigate();

    const handleJoinRoom = (genre: Genre) => {
        navigate(`/room/${genre.slug}`);
    };

    return (
        <Wrapper>
            <Title>Select a Music Room</Title>
            <RoomsList>
                {genres.map((genre) => (
                    <RoomButton key={genre.id} onClick={() => handleJoinRoom(genre)}>
                        {genre.name}
                    </RoomButton>
                ))}
            </RoomsList>
        </Wrapper>
    );
};

export default MenuRooms;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 40px;
`;
const RoomsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const RoomButton = styled.button`
  padding: 32px 0;
  font-size: 20px;
  border: none;
  border-radius: 16px;
  background-color: #4e4feb;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(78, 79, 235, 0.08);
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
  font-weight: 600;
  letter-spacing: 1px;

  &:hover {
    background-color: #3c3ccc;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 4px 16px rgba(78, 79, 235, 0.15);
  }
`;

