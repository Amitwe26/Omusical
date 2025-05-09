import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const LivePage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [isMicOn, setIsMicOn] = useState(true);
    const [isCamOn, setIsCamOn] = useState(true);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        getMedia();
    }, []);

    const toggleMic = () => {
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setIsMicOn((prev) => !prev);
        }
    };

    const toggleCam = () => {
        if (streamRef.current) {
            streamRef.current.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setIsCamOn((prev) => !prev);
        }
    };

    return (
        <Container>
            <Title>Welcome to Music Live Chat!</Title>
            <Video ref={videoRef} autoPlay playsInline muted />
            <Controls>
                <Button onClick={toggleMic}>
                    {isMicOn ? 'Mute Mic 🎙️' : 'Unmute Mic 🔇'}
                </Button>
                <Button onClick={toggleCam}>
                    {isCamOn ? 'Turn Off Cam 🎥' : 'Turn On Cam 🚫'}
                </Button>
                <Button>Open Chat 💬</Button>
            </Controls>
        </Container>
    );
};

export default LivePage;

// Styled Components
const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 32px;
    color: #333;
    margin-bottom: 20px;
`;

const Video = styled.video`
    width: 80%;
    max-width: 600px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Controls = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #357ab8;
  }
`;
