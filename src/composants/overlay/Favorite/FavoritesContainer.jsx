import React from 'react';
import "./Favorites.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const handleSortClose = () => {
  document.getElementById('favorites-view').classList.add('hidden');
};

const FavoritesContainer = () => {
  return (
    <div id="favorites-container" className="col-favorites background-texture">
      <div id="favorites-header-wrapper">
        <h2 className="text-gold hylia-font align-center">Favorites</h2>
        <div className="align-right">
          <FontAwesomeIcon id="favorites-close" className="text-grey favorites-close" icon={faXmark} onClick={handleSortClose}/>
        </div>
      </div>
      <div id="favorites-row" className="row wrap"></div>
    </div>
  );
};

const FavoritesView = ({manageFavorite, setManageFavorite}) => {
  return (
    <div id="favorites-view" className={`favorites-overlay ${manageFavorite ? "" : "hidden"}`}>
      <div className="row end" id="favorites-container-row">
        <FavoritesContainer />
      </div>
    </div>
  );
};

export default FavoritesView;