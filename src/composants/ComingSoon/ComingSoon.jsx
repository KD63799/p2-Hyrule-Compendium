import React from 'react';

const ComingSoon = () => {
    const videoSrc = 'src/assets/videos/majoraMoonFinalVer.mp4'; // Ensure the path is correct

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
        }}>
            <video id="moon"
                src={videoSrc}
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                }}
            />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: '#E0D1AD',
                fontSize: '2rem',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}>
                The Majora's mask attracts only evil
            </div>
        </div>
    );
}

export default ComingSoon;
