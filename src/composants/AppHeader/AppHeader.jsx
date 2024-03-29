import "./AppHeader.css";
import { useState } from "react";
import { NavLink, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AppHeader = ({ manageFavorite, setManageFavorite, manageSort, setManageSort, searchVisible, setSearchVisible, isFormVisible, setIsFormVisible }) => {
  const navigate = useNavigate();
  const handleSearch = () => {
    setSearchVisible(!searchVisible)
    navigate('/Search')
  }
  return (
    <header className="nav-header background-dark background-texture">
      <div className="row space-between">
        <div className="col-fluid">
          <a href= "/">
          <h2 id="app-header" className="text-gold hylia-font">
            KOKIRI
          </h2>
          </a>
        </div>
        <div className="col-fluid"> {/* Conteneur pour les icônes */}
          <div id="header-icons" className="center"> {/* Conteneur pour les icônes avec une classe CSS pour les centrer */}
            {/* Icône pour afficher/masquer le formulaire */}
            <div onClick={() => setIsFormVisible(!isFormVisible)} className="header-icon-wrapper center in-line">
              <img
                id="nav-contact"
                src="src/assets/images/icons/letter.png"
                alt="Zelda Style Letter"
              />
            </div>
            
            <div onClick={() => handleSearch()} className="header-icon-wrapper center in-line">
              <img
                id="nav-search"
                src="src/assets/images/icons/search.png"
                alt="Search"
                />
              
            </div>
            <div onClick={() => setManageFavorite(!manageFavorite)} className="header-icon-wrapper center in-line">
              <img
                id="nav-heart"
                src="src/assets/images/icons/receptacle.png"
                alt="Heart"
              />
            </div>
            <div onClick={() => setManageSort(!manageSort)} className="header-icon-wrapper center in-line">
              <img
                id="nav-sort"
                src="src/assets/images/icons/Trier.png"
                alt="Fairy"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
