import { useEffect } from 'react';

export function Test() {
    useEffect(() => {
        async function playVideoFromCamera() {
            try {
                const constraints = { video: true, audio: true };
                const stream = await navigator.mediaDevices.getUserMedia(
                    constraints,
                );
                const videoElement = document.querySelector(
                    'video#localVideo',
                ) as HTMLVideoElement | null;
                if (videoElement) {
                    videoElement.srcObject = stream;
                }
            } catch (error) {
                console.error('Error opening video camera.', error);
            }
        }

        playVideoFromCamera();
    }, []);

    return (
        <div>
            <video id="localVideo" autoPlay playsInline />
        </div>
    );
}
