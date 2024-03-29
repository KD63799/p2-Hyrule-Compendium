import { useEffect, useState } from 'react';
import './Ocarina.css'

function Ocarina() {
    const [konamiCode, setKonamiCode] = useState('');
    const [showVideo, setShowVideo] = useState(false);
    const [selectedButtons, setSelectedButtons] = useState([]);

    const konamiSequences = [
        { sequence: 'aceace', videoSrc: 'src/assets/videos/songOfStormsFinal.mp4' },
        { sequence: 'bacbac', videoSrc: 'src/assets/videos/songOfTimeFinalVer.mp4' },
        { sequence: 'cbdcbd', videoSrc: 'src/assets/videos/sariasSong.mp4' },
        { sequence: 'bcebce', videoSrc: 'src/assets/videos/sunsSong.mp4' },
        { sequence: 'debdeb', videoSrc: 'src/assets/videos/zeldasLullaby.mp4' },
        { sequence: 'edbedb', videoSrc: 'src/assets/videos/eponasSong.mp4' },
        { sequence: 'acbbda', videoSrc: 'src/assets/videos/serenadeOfWater.mp4' },
    ];

    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let oscillator;
        let gainNode;

        const startOscillator = (frequency) => {
            oscillator = audioContext.createOscillator();
            gainNode = audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.value = frequency;

            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        };

        const handleKeyDown = (event) => {
            const keyFrequencyMap = {
                a: 293.66,  // D
                b: 440.00,  // A
                c: 349.23,  // F
                d: 493.88,  // B
                e: 587.33,  // D
            };

            const frequency = keyFrequencyMap[event.key];
            if (frequency) {
                startOscillator(frequency);
            }

            setKonamiCode((prevCode) => (prevCode + event.key).slice(-6));
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            if (oscillator) {
                oscillator.disconnect();
            }
            if (gainNode) {
                gainNode.disconnect();
            }
            audioContext.close();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        for (const { sequence, videoSrc } of konamiSequences) {
            if (konamiCode === sequence) {
                setShowVideo(true);
                return;
            }
        }
        setShowVideo(false);
    }, [konamiCode, konamiSequences]);

    const handleButtonActivation = (button) => {
        if (selectedButtons.includes(button)) {
            setSelectedButtons((prevSelectedButtons) =>
                prevSelectedButtons.filter((selectedButton) => selectedButton !== button)
            );
        } else {
            setSelectedButtons((prevSelectedButtons) => [...prevSelectedButtons, button]);
        }
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            const pressedButton = event.key.toLowerCase();
            if (['a', 'b', 'c', 'd', 'e'].includes(pressedButton)) {
                handleButtonActivation(pressedButton);
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);
    
    return (
        <div >
            <div id="partition">
        <h1>Jouez de l'ocarina</h1> {/* Texte affiché en permanence */}
        <p>
            PLAY THE NOTES (A, B, C, D, E)
            ACE ACE : SONG OF STORMS
            BAC BAC : SONG OF TIME 
            CBD CBD : SARIA's SONG
            BCE BCE : SUN's SONG 
            DEB DEB : ZELDA's LULLABY 
            EDB EDB : EPONA's SONG 
            ACBBDA : SERENADE OF WATER 
        </p>
            </div>
            {showVideo && (
                <div>
                    <video controls autoPlay>
                        {konamiSequences.find(seq => seq.sequence === konamiCode)?.videoSrc && (
                            <source src={konamiSequences.find(seq => seq.sequence === konamiCode)?.videoSrc} type="video/mp4" />
                        )}
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            {selectedButtons.includes('a') && <h1>A</h1>}
            {selectedButtons.includes('b') && <h1>B</h1>}
            {selectedButtons.includes('c') && <h1>C</h1>}
            {selectedButtons.includes('d') && <h1>D</h1>}
            {selectedButtons.includes('e') && <h1>E</h1>}
        </div>
    );
}

export default Ocarina;