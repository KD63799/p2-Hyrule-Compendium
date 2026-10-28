import { useCallback, useEffect, useRef, useState } from "react";
import "./Ocarina.css";
import songOfStorms from "../../assets/videos/songOfStormsFinal.mp4";
import songOfTime from "../../assets/videos/songOfTimeFinalVer.mp4";
import sariasSong from "../../assets/videos/sariasSong.mp4";
import sunsSong from "../../assets/videos/sunsSong.mp4";
import zeldasLullaby from "../../assets/videos/zeldasLullaby.mp4";
import eponasSong from "../../assets/videos/eponasSong.mp4";
import serenadeOfWater from "../../assets/videos/serenadeOfWater.mp4";

const NOTES = [
  { key: "a", note: "D", frequency: 293.66 },
  { key: "b", note: "A", frequency: 440.0 },
  { key: "c", note: "F", frequency: 349.23 },
  { key: "d", note: "B", frequency: 493.88 },
  { key: "e", note: "D", frequency: 587.33 },
];

const SONGS = [
  { sequence: "aceace", title: "Song of Storms", videoSrc: songOfStorms },
  { sequence: "bacbac", title: "Song of Time", videoSrc: songOfTime },
  { sequence: "cbdcbd", title: "Saria's Song", videoSrc: sariasSong },
  { sequence: "bcebce", title: "Sun's Song", videoSrc: sunsSong },
  { sequence: "debdeb", title: "Zelda's Lullaby", videoSrc: zeldasLullaby },
  { sequence: "edbedb", title: "Epona's Song", videoSrc: eponasSong },
  { sequence: "acbbda", title: "Serenade of Water", videoSrc: serenadeOfWater },
];

const SEQUENCE_LENGTH = 6;

// Son de flûte synthétisé avec la Web Audio API
function playTone(audioContext, frequency) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.35);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.4);
}

function Ocarina() {
  const [playedNotes, setPlayedNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [song, setSong] = useState(null);
  const sequenceRef = useRef("");
  const audioContextRef = useRef(null);
  const highlightTimeout = useRef(null);

  const playNote = useCallback((key) => {
    const note = NOTES.find((item) => item.key === key);
    if (!note) return;

    // Le navigateur n'autorise l'audio qu'après une interaction : contexte créé au premier son
    audioContextRef.current ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContextRef.current.state === "suspended") audioContextRef.current.resume();
    playTone(audioContextRef.current, note.frequency);

    setActiveNote(key);
    clearTimeout(highlightTimeout.current);
    highlightTimeout.current = setTimeout(() => setActiveNote(null), 200);

    const sequence = (sequenceRef.current + key).slice(-SEQUENCE_LENGTH);
    const matchedSong = SONGS.find((item) => item.sequence === sequence);
    sequenceRef.current = matchedSong ? "" : sequence;
    setPlayedNotes(matchedSong ? [] : sequence.split(""));
    if (matchedSong) setSong(matchedSong);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.target.closest("input, textarea")) return;
      playNote(event.key.toLowerCase());
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(highlightTimeout.current);
      audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, [playNote]);

  return (
    <div className="gros-container ocarina">
      <div id="partition" className="txt-align">
        <h1>Jouez de l&apos;ocarina</h1>
        <p className="color-stats">Play the notes with your keyboard (A, B, C, D, E) or tap the buttons.</p>
      </div>

      <div className="ocarina-buttons">
        {NOTES.map((note) => (
          <button
            key={note.key}
            type="button"
            className={`ocarina-note note-${note.key} ${activeNote === note.key ? "ocarina-note-active" : ""}`}
            aria-label={`Note ${note.key.toUpperCase()} (${note.note})`}
            onClick={() => playNote(note.key)}
          >
            {note.key.toUpperCase()}
          </button>
        ))}
      </div>

      <ol className="ocarina-staff" aria-label="Played notes" aria-live="polite">
        {Array.from({ length: SEQUENCE_LENGTH }, (_, index) => (
          <li key={index} className={`staff-slot ${playedNotes[index] ? `note-${playedNotes[index]}` : ""}`}>
            {playedNotes[index]?.toUpperCase()}
          </li>
        ))}
      </ol>

      {song && (
        <div className="ocarina-video txt-align">
          <h2 className="text-gold">{song.title}</h2>
          <video key={song.sequence} controls autoPlay playsInline>
            <source src={song.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <ul className="song-list">
        {SONGS.map((item) => (
          <li key={item.sequence} className={song === item ? "song-active" : ""}>
            <span>{item.title}</span>
            <span className="song-sequence">
              {item.sequence.split("").map((key, index) => (
                <span key={index} className={`mini-note note-${key}`}>
                  {key.toUpperCase()}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ocarina;
