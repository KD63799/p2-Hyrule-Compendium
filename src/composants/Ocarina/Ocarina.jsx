import { useEffect, useState } from 'react';

function Ocarina() {
    // État local pour stocker le code entré par l'utilisateur
    const [konamiCode, setKonamiCode] = useState('');
    // État local pour indiquer si la vidéo doit être affichée ou non
    const [showVideo, setShowVideo] = useState(false);

    // Tableau des séquences Konami et leurs vidéos correspondantes
    const konamiSequences = [
        { sequence: 'aceace', videoSrc: 'src/assets/videos/songOfStormsFinal.mp4' },
        { sequence: 'bacbac', videoSrc: 'src/assets/videos/songOfTimeFinalVer.mp4' },
        { sequence: 'cbdcbd', videoSrc: 'src/assets/videos/sariasSong.mp4' },
        { sequence: 'bcebce', videoSrc: 'src/assets/videos/sunsSong.mp4' },
        { sequence: 'debdeb', videoSrc: 'src/assets/videos/zeldasLullaby.mp4' },
        { sequence: 'edbedb', videoSrc: 'src/assets/videos/eponasSong.mp4' },
        { sequence: 'acbbda', videoSrc: 'src/assets/videos/serenadeOfWater.mp4' },
    ];

    // Effet pour initialiser l'audioContext et écouter les touches
    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let oscillator;
        let gainNode;

        const startOscillator = (frequency) => {
            // Création de l'oscillateur et du nœud de gain
            oscillator = audioContext.createOscillator();
            gainNode = audioContext.createGain();

            // Configuration de l'oscillateur
            oscillator.type = 'sine';
            oscillator.frequency.value = frequency;

            // Configuration de la rampe de gain
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);

            // Connexion de l'oscillateur et du nœud de gain à la destination audio
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Démarrage et arrêt de l'oscillateur après une courte période
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        };

        // Gestionnaire d'événements pour écouter les touches du clavier
        const handleKeyDown = (event) => {
            // Tableau de correspondance entre les touches du clavier et les fréquences
            const keyFrequencyMap = {
                a: 293.66,  // D
                b: 440.00,  // A
                c: 349.23,  // F
                d: 493.88,  // B
                e: 587.33,  // D
            };

            // Si la touche pressée correspond à une fréquence, démarrer l'oscillateur
            const frequency = keyFrequencyMap[event.key];
            if (frequency) {
                startOscillator(frequency);
            }

            // Ajouter la touche pressée au code Konami en cours
            setKonamiCode((prevCode) => (prevCode + event.key).slice(-6)); // Conserver uniquement les 6 dernières touches
        };

        // Ajout d'un écouteur d'événements pour écouter les touches du clavier
        document.addEventListener('keydown', handleKeyDown);

        // Nettoyage : fermeture de l'audioContext et suppression de l'écouteur d'événements
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

    // Effet pour détecter si le code Konami correspond à l'une des séquences définies
    useEffect(() => {
        for (const { sequence, videoSrc } of konamiSequences) {
            if (konamiCode === sequence) {
                setShowVideo(true); // Afficher la vidéo si le code Konami correspond à une séquence
                return;
            }
        }
        setShowVideo(false); // Masquer la vidéo sinon
    }, [konamiCode, konamiSequences]);

    // Rendu du composant
    return (
        <div>
            {showVideo && (
                // Affichage de la vidéo dans une fenêtre contextuelle avec une bordure
                <div className="video-popup" style={{
                    border: '5px solid #E0D1AD', // Style de la bordure
                }}>
                    <video controls autoPlay>
                        {/* Source vidéo bas*/}
                        <source src={konamiSequences.find(seq => seq.sequence === konamiCode)?.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            <p>
                Appuyez sur les touches correspondantes (A, B, C, D, E) pour jouer différentes notes!
                Appuyez sur A C E A C E pour jouer la chanson des tempêtes.
            </p>
        </div>
    );
}

export default Ocarina;
