import makar from "../../assets/images/makar.png";
import "./Feedback.css";

export function Loader() {
  return (
    <div className="load-spinner align-center m-top-3" role="status" aria-label="Loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export function NoEntries({ message = "No entries" }) {
  return (
    <div className="no-entry-placeholder align-center">
      <p className="hylia-font font-large text-gold">{message}</p>
      <img id="makar" src={makar} alt="Makar" />
    </div>
  );
}

export function ErrorModal({ onRetry }) {
  return (
    <div className="error-overlay" role="alertdialog" aria-labelledby="error-message">
      <div className="error-modal background-texture">
        <p id="error-message" className="text-gold hylia-font">
          Could not connect to the server. Please try again later
        </p>
        <div className="error-image-wrapper">
          <img src={makar} alt="" />
        </div>
        {onRetry && (
          <button type="button" className="btn-gold" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
