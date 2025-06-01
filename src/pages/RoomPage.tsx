import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
// import VideoPlayer from '../components/VideoPlayer';

const RoomPage = () => {
    const { roomName } = useParams<{ roomName: string }>();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const identity = 'user-' + Math.floor(Math.random() * 1000); // זמני

    return (
        <Wrapper>
            <Header>Room: {roomName}</Header>
            <VideoPlayer />
            <Controls>
                <Button>Mute</Button>
                <Button>Camera Off</Button>
                <Button onClick={() => setIsChatOpen((prev) => !prev)}>
                    {isChatOpen ? 'Close Chat' : 'Open Chat'}
                </Button>
            </Controls>
            {isChatOpen && <ChatBox>Chat will go here...</ChatBox>}
        </Wrapper>
    );
};

export default RoomPage;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.h2`
  margin-bottom: 20px;
`;

const Controls = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background-color: #4e4feb;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #3c3ccc;
  }
`;

const ChatBox = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  height: 300px;
  background-color: #f1f1f1;
  border-radius: 8px;
  padding: 12px;
`;
