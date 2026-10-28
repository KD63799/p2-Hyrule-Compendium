import "./ComingSoon.css";
import moonVideo from "../../assets/videos/majoraMoonFinalVer.mp4";

const ComingSoon = () => {
  return (
    <div className="coming-soon">
      <video id="moon" src={moonVideo} autoPlay loop muted playsInline />
      <p className="coming-soon-text hylia-font">The Majora&apos;s mask attracts only evil</p>
    </div>
  );
};

export default ComingSoon;
