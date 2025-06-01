import {
    ControlBar,
    GridLayout,
    ParticipantTile,
    RoomAudioRenderer,
    useTracks,
    RoomContext,
} from '@livekit/components-react';
import { Room, Track } from 'livekit-client';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';

const serverUrl = 'wss://music-6k9ouvfc.livekit.cloud';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDczMTkyNDQsImlzcyI6IkFQSXhzNHhyUXVQVEhYVSIsIm5iZiI6MTc0NzMxMjA0NCwic3ViIjoicXVpY2tzdGFydCB1c2VyIGNsbHp3OSIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJxdWlja3N0YXJ0IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.IC7exvhV2AGT-imtArckCB8YI7c-vQiyT5l2W7jOUqo'; // אל תחשוף טוקן אמיתי בקוד פרודקשן

export default function VideoPlayer() {
    const [room] = useState(
        () =>
            new Room({
                adaptiveStream: true,
                dynacast: true,
            }),
    );

    useEffect(() => {
        let mounted = true;

        const connect = async () => {
            if (!mounted) return;
            try {
                await room.connect(serverUrl, token);
                room.localParticipant.setCameraEnabled(true);
                room.localParticipant.setMicrophoneEnabled(true);
            } catch (err) {
                console.error('Error connecting to room:', err);
            }
        };

        connect();

        return () => {
            mounted = false;
            room.disconnect();
        };
    }, [room]);

    return (
        <RoomContext.Provider value={room}>
            <div data-lk-theme="default" style={{ height: '100vh' }}>
                <MyVideoConference />
                <RoomAudioRenderer />
                <ControlBar />
            </div>
        </RoomContext.Provider>
    );
}

function MyVideoConference() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );

    return (
        <GridLayout
            tracks={tracks}
            style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}
        >
            {/*<ParticipantTile showParticipantName showAudioLevel />*/}
        </GridLayout>
    );
}
