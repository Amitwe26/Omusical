import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";

const rooms = ['Pop', 'Rap', 'Classic', 'House'];

const MenuRooms = () => {
    const navigate = useNavigate();

    // const createRoom=async(name: string) => {
    //     const response = await axios.post('http://localhost:5001/create-room', { name });
    //     console.log(response.data);
    //     return response.data;
    // }
    const handleJoinRoom =async (roomName: string) => {
        // const res = await createRoom(roomName);
        // console.log(res)
        navigate(`/room/${roomName}`);
    };

    return (
        <Wrapper>
            <Title>Select a Music Room</Title>
            <RoomsList>
                {rooms.map((room) => (
                    <RoomButton key={room} onClick={() => handleJoinRoom(room)}>
                        {room}
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
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RoomButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: #4e4feb;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3c3ccc;
  }
`;
