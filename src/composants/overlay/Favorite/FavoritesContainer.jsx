import "./Favorites.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";
import { GAMES, entryPath, formatId, getCategoryInfo } from "../../../api/compendium";

const FavoritesContainer = ({ favorites, onClose, onRemoveFavorite, onOpenFavorite }) => {
  return (
    <div
      id="favorites-container"
      className="col-favorites background-texture"
      role="dialog"
      aria-labelledby="favorites-title"
      onClick={(event) => event.stopPropagation()}
    >
      <div id="favorites-header-wrapper" className="row space-between al-i">
        <h2 id="favorites-title" className="text-gold hylia-font">
          Favorites <span className="color-stats">{favorites.length}</span>
        </h2>
        <button type="button" className="icon-btn" aria-label="Close favorites" onClick={onClose}>
          <FontAwesomeIcon id="favorites-close" className="text-grey favorites-close" icon={faTimes} />
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty align-center">
          <FontAwesomeIcon icon={faHeart} className="favorites-view-heart heart-favorite-bl" />
          <p>No favorites yet.</p>
          <p className="color-stats">Open an entry and tap the heart to keep it here.</p>
        </div>
      ) : (
        <ul id="favorites-row">
          {favorites.map((favorite) => (
            <li key={favorite.key} className="favorite-item">
              <NavLink
                className="favorite-link"
                to={entryPath(favorite)}
                onClick={() => onOpenFavorite(favorite)}
              >
                <img src={favorite.image} alt="" loading="lazy" width="56" height="56" />
                <span className="favorite-text">
                  <span className="capitalize">{favorite.name}</span>
                  <span className="color-stats">
                    {formatId(favorite.id)} · {getCategoryInfo(favorite.category)?.label}
                    {favorite.master_mode && " · Master Mode"}
                  </span>
                </span>
                <span className="badge">{GAMES[favorite.game]?.label}</span>
              </NavLink>
              <button
                type="button"
                className="favorite-remove"
                aria-label={`Remove ${favorite.name} from favorites`}
                onClick={() => onRemoveFavorite(favorite)}
              >
                <FontAwesomeIcon icon={faHeart} className="heart-favorite-red" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FavoritesView = ({ favorites, onClose, onRemoveFavorite, onOpenFavorite }) => {
  return (
    <div id="favorites-view" className="favorites-overlay" onClick={onClose}>
      <FavoritesContainer
        favorites={favorites}
        onClose={onClose}
        onRemoveFavorite={onRemoveFavorite}
        onOpenFavorite={onOpenFavorite}
      />
    </div>
  );
};

export default FavoritesView;
