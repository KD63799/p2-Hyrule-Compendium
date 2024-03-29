import React, { useState } from 'react';
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // J'ai changé l'importation pour correspondre à l'icône utilisée
import { useNavigate } from 'react-router-dom';

const SearchView = ({ searchVisible, setSearchVisible, searchValue, setSearchValue }) => {
  const navigate = useNavigate();
  const handleClose= ()=> {
    setSearchVisible(!searchVisible)
    navigate('/')
  }

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClose = () => {
    setSearchVisible(false);
  };

  // Filtrer le contenu en fonction de la valeur de recherche
  const filteredContent = /* Mettez ici le contenu à filtrer */ [];

  return (
    <div id="search-view" className="background-texture">
      <div id="search-container">
        <div className="row center">
          <div className="col-search">
            <form id="search-entries-form" action="">
              <input
                id="search-entries-input"
                className="background-texture text-gold"
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleSearchInputChange}
              />
            </form>
          </div>
          <div className="col-5">
            <FontAwesomeIcon
              id="search-close"
              className="text-grey search-close"
              icon={faTimes}
              onClick={() => handleClose()}
            />
          </div>
        </div>
      </div>
      {/* Afficher le contenu filtré */}
      <div className="filtered-content">
        {/* Utilisez la variable filteredContent pour afficher le contenu filtré */}
      </div>
    </div>
  );
};

export default SearchView;
