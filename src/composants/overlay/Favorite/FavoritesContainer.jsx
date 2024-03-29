import React from 'react';
import './Favorites.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const FavoritesContainer = ({ favorites, handleSortClose, handleRemoveFavorite, setFavorites }) => {
    console.log("testContainer", favorites);
    return (
        <div id="favorites-container" className="col-favorites background-texture">
            <div id="favorites-header-wrapper">
                <h2 className="text-gold hylia-font align-center">Favorites</h2>
                <div className="align-right">
                    <FontAwesomeIcon id="favorites-close" className="text-grey favorites-close" icon={faTimes} onClick={handleSortClose} />
                </div>
            </div>
            <div id="favorites-row" className="row wrap">
                {favorites.map((favorite, index) => (
                    <div key={index} className="favorite-item">
                        <ul>
                            <img src={favorite.image} alt={favorite.name} />
                            <p>{favorite.name}</p>
                            <button onClick={() => handleRemoveFavorite(favorite)}>
                                <FontAwesomeIcon icon={faHeart} className="heart-favorite-red" />
                            </button>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FavoritesView = ({ favorites, manageFavorite, setManageFavorite, setFavorites }) => {
    const handleSortClose = () => {
        setManageFavorite(!manageFavorite);
    };

    console.log("testContainerHi", favorites);

    const handleRemoveFavorite = (favoriteToRemove) => {
        const updatedFavorites = favorites.filter(favorite => favorite !== favoriteToRemove);
        setFavorites(updatedFavorites);
    };

    return (
        <div id="favorites-view" className={`favorites-overlay ${manageFavorite ? '' : 'hidden'}`}>
            <div className="row end" id="favorites-container-row">
                <FavoritesContainer favorites={favorites} handleSortClose={handleSortClose} handleRemoveFavorite={handleRemoveFavorite} setFavorites={setFavorites} />
            </div>
        </div>
    );
};

export default FavoritesView;