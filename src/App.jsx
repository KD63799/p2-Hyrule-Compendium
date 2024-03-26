import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessageMiddle } from "@fortawesome/free-solid-svg-icons";
import Popup from "./composants/display Formulaire.jsx/pop-up";
import Formulaire from "./composants/display Formulaire.jsx/Formulaire"; // Assurez-vous d'importer correctement votre composant Formulaire
import AllArmeApi from "./composants/display Arme-jsx/Arme"; // Assurez-vous d'importer correctement votre composant AllArmeApi

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      {/* Icône pour ouvrir le pop-up */}
      <FontAwesomeIcon icon={faMessageMiddle} onClick={togglePopup} />

      {/* Composant pop-up */}
      <Popup show={showPopup} handleClose={togglePopup}>
        {/* Inclure votre formulaire et le composant AllArmeApi ici */}
        <Formulaire />
        <AllArmeApi />
      </Popup>
    </div>
  );
}

export default App;
