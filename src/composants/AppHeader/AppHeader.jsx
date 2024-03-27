import React from 'react'; // Import de React
import './AppHeader.css'; // Import du fichier CSS pour le style

// Définition du composant fonctionnel AppHeader avec des destructurations pour les props
const AppHeader = ({ manageFavorite, setManageFavorite, manageSort, setManageSort, setIsFormVisible, isFormVisible }) => {
  return (
    // Élément header avec des classes CSS pour le style
    <header className="nav-header background-dark background-texture">
      <div className="row space-between"> {/* Utilisation d'une classe CSS pour disposer les éléments sur une ligne avec de l'espace entre eux */}
        <div className="col-fluid"> {/* Conteneur pour le titre */}
          <h2 id="app-header" className="text-gold hylia-font"> {/* Titre avec des classes CSS pour le style */}
            KOKIRI
          </h2>
        </div>
        <div className="col-fluid"> {/* Conteneur pour les icônes */}
          <div id="header-icons" className="center"> {/* Conteneur pour les icônes avec une classe CSS pour les centrer */}
            {/* Icône pour afficher/masquer le formulaire */}
            <div onClick={() => setIsFormVisible(!isFormVisible)} className="header-icon-wrapper center in-line">
              <img
                id="nav-trend"
                src="/src/assets/images/icons/letter.png" alt="Zelda Style Letter" /> {/* Image de l'icône avec le chemin correct */}
            </div>
            {/* Icônes pour d'autres fonctionnalités (recherche, favoris, tri) avec des fonctions onClick pour les gérer */}
            <div className="header-icon-wrapper center in-line">
              <img
                id="nav-search"
                src="/src/assets/images/icons/search.png" alt="Search" />
            </div>
            <div onClick={() => setManageFavorite(!manageFavorite)} className="header-icon-wrapper center in-line">
              <img
                id="nav-heart"
                src="/src/assets/images/icons/receptacle.png" alt="Heart" />
            </div>
            <div onClick={() => setManageSort(!manageSort)} className="header-icon-wrapper center in-line">
              <img
                id="nav-sort"
                src="/src/assets/images/icons/Trier.png" alt="Fairy" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader; // Export du composant AppHeader
