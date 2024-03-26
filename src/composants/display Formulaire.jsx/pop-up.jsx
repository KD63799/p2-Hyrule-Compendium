import React from "react";
import "./Popup.css";

function Popup(props) {
  const { show, handleClose } = props;

  return (
    <div className={show ? "popup-overlay" : "popup-overlay hidden"}>
      <div className="popup">
        <button className="close-button" onClick={handleClose}>
          Fermer
        </button>
        <div className="popup-content">
          {/* Affichage du contenu passé en tant qu'enfant */}
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Popup;

