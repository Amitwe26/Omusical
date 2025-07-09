import { useState, useEffect, useRef } from 'react';
import AgoraRTC, { 
    IAgoraRTCRemoteUser, 
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
    IRemoteAudioTrack,
    IRemoteVideoTrack
} from 'agora-rtc-sdk-ng';
import styled, { keyframes } from 'styled-components';

// if (!process.env.REACT_APP_AGORA_APP_ID) {
//     throw new Error('Please add REACT_APP_AGORA_APP_ID to your .env file');
// }

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoPlayer = () => {
    const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack | null, ICameraVideoTrack | null]>([null, null]);
    const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    const [joined, setJoined] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [audioLevel, setAudioLevel] = useState(0);
    const localVideoRef = useRef<HTMLDivElement>(null);
    const audioLevelInterval = useRef<number>(0);

    const rtcProps = {
        appId: process.env.REACT_APP_AGORA_APP_ID as string,
        channel: 'test',
        token: null, // enter your channel token as a string 
    };
    
    useEffect(() => {
        // Initialize Agora client
        const init = async () => {
            try {
                const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(
                    {}, 
                    { encoderConfig: { width: 640, height: 360 } }
                );
                setLocalTracks([audioTrack, videoTrack]);

                // Start audio level monitoring
                audioLevelInterval.current = window.setInterval(() => {
                    if (audioTrack && audioTrack.enabled) {
                        const level = audioTrack.getVolumeLevel();
                        setAudioLevel(level);
                    } else {
                        setAudioLevel(0);
                    }
                }, 100);

                // Play local video track
                if (localVideoRef.current) {
                    videoTrack.play(localVideoRef.current);
                }

                // Join the channel
                await client.join(rtcProps.appId, rtcProps.channel, rtcProps.token, null);
                await client.publish([audioTrack, videoTrack]);
                setJoined(true);

                console.log('Joined channel successfully');
            } catch (error) {
                console.error('Error initializing Agora:', error);
            }
        };

        // Set up event listeners
        client.on('user-published', async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
            await client.subscribe(user, mediaType);
            
            if (mediaType === 'video') {
                setUsers(prevUsers => [...prevUsers, user]);
                const videoTrack = user.videoTrack as IRemoteVideoTrack;
                setTimeout(() => {
                    videoTrack?.play(`video-${user.uid}`);
                }, 100);
            }
            if (mediaType === 'audio') {
                const audioTrack = user.audioTrack as IRemoteAudioTrack;
                audioTrack?.play();
            }
        });

        client.on('user-unpublished', (user: IAgoraRTCRemoteUser) => {
            setUsers(prevUsers => prevUsers.filter(u => u.uid !== user.uid));
        });

        client.on('user-left', (user: IAgoraRTCRemoteUser) => {
            setUsers(prevUsers => prevUsers.filter(u => u.uid !== user.uid));
        });

        init();

        // Cleanup
        return () => {
            if (audioLevelInterval.current) {
                window.clearInterval(audioLevelInterval.current);
            }
            localTracks[0]?.close();
            localTracks[1]?.close();
            client.removeAllListeners();
            if (joined) {
                client.leave();
            }
        };
    }, []);

    const toggleAudio = () => {
        if (localTracks[0]) {
            const audioTrack = localTracks[0];
            audioTrack.setEnabled(!audioTrack.enabled);
            setIsAudioEnabled(!isAudioEnabled);
            if (!isAudioEnabled) {
                setAudioLevel(0);
            }
        }
    };

    const toggleVideo = () => {
        if (localTracks[1]) {
            const videoTrack = localTracks[1];
            videoTrack.setEnabled(!videoTrack.enabled);
            setIsVideoEnabled(!isVideoEnabled);
            console.log('Video enabled:', !isVideoEnabled); // Debug log
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <VideoContainer>
            <MainContent>
                <VideoWrapper>
                    <LocalVideoContainer>
                        <LocalVideo ref={localVideoRef}>
                            {!isVideoEnabled && <NoVideo>Camera Off</NoVideo>}
                        </LocalVideo>
                        <AudioIndicator>
                            {isAudioEnabled ? (
                                <VolumeIndicator>
                                    {[...Array(5)].map((_, i) => (
                                        <Bar 
                                            key={i} 
                                            $active={audioLevel > i * 0.2}
                                            $level={i + 1}
                                        />
                                    ))}
                                </VolumeIndicator>
                            ) : (
                                <MutedIndicator>🔇 Muted</MutedIndicator>
                            )}
                        </AudioIndicator>
                    </LocalVideoContainer>
                    {users.map(user => (
                        <RemoteVideo key={user.uid} id={`video-${user.uid}`}>
                            {!user.videoTrack && <NoVideo>Camera Off</NoVideo>}
                        </RemoteVideo>
                    ))}
                </VideoWrapper>
                <Controls>
                    {localTracks[0] && (
                        <ControlButton 
                            onClick={toggleAudio}
                            $isActive={isAudioEnabled}
                        >
                            {isAudioEnabled ? '🎤 Mute' : '🔇 Unmute'}
                        </ControlButton>
                    )}
                    {localTracks[1] && (
                        <ControlButton 
                            onClick={toggleVideo}
                            $isActive={isVideoEnabled}
                        >
                            {isVideoEnabled ? '📹 Stop Video' : '🎥 Start Video'}
                        </ControlButton>
                    )}
                    <ControlButton 
                        onClick={toggleChat}
                        $isActive={isChatOpen}
                    >
                        {isChatOpen ? '💬 Close Chat' : '💬 Open Chat'}
                    </ControlButton>
                </Controls>
            </MainContent>
            {isChatOpen && (
                <ChatPanel>
                    <ChatHeader>Chat</ChatHeader>
                    <ChatContent>
                        {/* Chat messages will go here */}
                    </ChatContent>
                </ChatPanel>
            )}
        </VideoContainer>
    );
};

export default VideoPlayer;

const VideoContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #f0f2f5;
`;

const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const VideoWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    padding: 1rem;
`;

const LocalVideoContainer = styled.div`
    position: relative;
    width: 100%;
`;

const LocalVideo = styled.div`
    background-color: #000;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 16/9;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const RemoteVideo = styled(LocalVideo)``;

const NoVideo = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.2rem;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1rem;
    border-radius: 4px;
`;

const Controls = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
`;

interface ControlButtonProps {
    $isActive?: boolean;
}

const ControlButton = styled.button<ControlButtonProps>`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    background-color: ${props => props.$isActive ? '#4a90e2' : '#e74c3c'};
    color: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background-color: ${props => props.$isActive ? '#357abd' : '#c0392b'};
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const ChatPanel = styled.div`
    width: 300px;
    background-color: white;
    border-left: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
`;

const ChatHeader = styled.div`
    padding: 1rem;
    background-color: #4a90e2;
    color: white;
    font-weight: 500;
    text-align: center;
`;

const ChatContent = styled.div`
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
`;

const AudioIndicator = styled.div`
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 5px 10px;
    border-radius: 15px;
    color: white;
    display: flex;
    align-items: center;
    z-index: 1;
`;

const VolumeIndicator = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 20px;
`;

const barAnimation = keyframes`
    0% { transform: scaleY(0.3); }
    50% { transform: scaleY(1); }
    100% { transform: scaleY(0.3); }
`;

interface BarProps {
    $active: boolean;
    $level: number;
}

const Bar = styled.div<BarProps>`
    width: 3px;
    height: ${props => props.$level * 4}px;
    background-color: ${props => props.$active ? '#4CAF50' : 'rgba(255, 255, 255, 0.3)'};
    border-radius: 1px;
    transform-origin: bottom;
    animation: ${props => props.$active ? barAnimation : 'none'} 0.5s ease infinite;
    animation-delay: ${props => props.$level * 0.1}s;
`;

const MutedIndicator = styled.div`
    color: #e74c3c;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.9rem;
`;
