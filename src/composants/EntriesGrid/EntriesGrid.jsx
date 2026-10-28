import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { entryPath, favoriteKey, formatId, getCategoryInfo } from "../../api/compendium";
import { ErrorModal, Loader, NoEntries } from "../Feedback/Feedback";
import "./EntriesGrid.css";

// Grille de cartes partagée par toutes les catégories et la recherche
function EntriesGrid({
  title,
  subtitle,
  entries,
  loading,
  error,
  onRetry,
  game,
  favorites = [],
  showCategory = false,
  emptyMessage,
}) {
  if (loading) return <Loader />;
  if (error) return <ErrorModal onRetry={onRetry} />;

  const favoriteKeys = new Set(favorites.map((favorite) => favorite.key));

  return (
    <section className="entries-section">
      {title && (
        <div className="page-header">
          <h1 className="page-title hylia-font text-gold">{title}</h1>
          <span className="color-stats">
            {entries.length} {entries.length > 1 ? "entries" : "entry"}
            {subtitle && ` · ${subtitle}`}
          </span>
        </div>
      )}

      {entries.length === 0 ? (
        <NoEntries message={emptyMessage} />
      ) : (
        <ul className="entries-grid">
          {entries.map((entry) => (
            <li className="col-img-wrapper card" key={`${entry.master_mode ? "m" : ""}${entry.id}`}>
              <NavLink className="card-link" to={entryPath(entry)}>
                <img
                  className="img-radius"
                  src={entry.image}
                  alt=""
                  loading="lazy"
                  width="70"
                  height="70"
                />
                <div className="card-text">
                  <span className="card-name capitalize">{entry.name}</span>
                  <span className="color-stats">
                    {formatId(entry.id)}
                    {showCategory && ` · ${getCategoryInfo(entry.category)?.label}`}
                  </span>
                  <span className="badges">
                    {entry.master_mode && <span className="badge badge-master">Master Mode</span>}
                    {entry.dlc && <span className="badge">DLC</span>}
                  </span>
                </div>
                {favoriteKeys.has(favoriteKey(entry, game)) && (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="heart-favorite-red card-heart"
                    title="Favorite"
                  />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default EntriesGrid;
