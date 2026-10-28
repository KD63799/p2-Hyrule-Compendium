import { useMemo } from "react";
import { NavLink, Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  entryPath,
  favoriteKey,
  formatId,
  getAllEntries,
  getCategoryInfo,
  getEntry,
  getMasterModeEntry,
  isNotFound,
} from "../../api/compendium";
import useApi from "../../hooks/useApi";
import { ErrorModal, Loader, NoEntries } from "../Feedback/Feedback";
import "./EntryDetail.css";

const NO_LINKS = new Map();

// Liste de puces : un élément devient un lien s'il existe dans le compendium
function ChipList({ items, entriesByName = NO_LINKS }) {
  if (!items || items.length === 0) return <p>Unknown</p>;
  return (
    <ul className="chips">
      {items.map((item) => {
        const linkedEntry = entriesByName.get(item.toLowerCase());
        return (
          <li key={item}>
            {linkedEntry ? (
              <NavLink className="chip chip-link capitalize" to={entryPath(linkedEntry)}>
                <img src={linkedEntry.image} alt="" loading="lazy" width="24" height="24" />
                {item}
              </NavLink>
            ) : (
              <span className="chip capitalize">{item}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function buildAttributes(entry, entriesByName) {
  const attributes = [
    {
      title: "Common Locations",
      value: <ChipList items={entry.common_locations} />,
    },
  ];

  if (entry.properties) {
    const { attack, defense, type, effect } = entry.properties;
    attributes.push({ title: "Attack Power", value: <p className="stat">{attack}</p> });
    attributes.push({ title: "Defense", value: <p className="stat">{defense}</p> });
    if (type) attributes.push({ title: "Type", value: <p className="capitalize">{type}</p> });
    if (effect !== undefined)
      attributes.push({ title: "Special Effect", value: <p className="capitalize">{effect || "None"}</p> });
  }

  if (entry.hearts_recovered !== undefined)
    attributes.push({
      title: "Hearts Recovered",
      value: (
        <p className="stat">
          <FontAwesomeIcon icon={faHeart} className="heart-favorite-red" /> {entry.hearts_recovered}
        </p>
      ),
    });

  if (entry.cooking_effect !== undefined)
    attributes.push({
      title: "Cooking Effect",
      value: <p className="capitalize">{entry.cooking_effect || "None"}</p>,
    });

  if (entry.fuse_attack_power !== undefined)
    attributes.push({
      title: "Fuse Attack Power",
      value: <p className="stat">{entry.fuse_attack_power}</p>,
    });

  if (entry.drops !== undefined)
    attributes.push({
      title: "Droppable Items",
      value: <ChipList items={entry.drops} entriesByName={entriesByName} />,
    });

  return attributes;
}

// Fiche détaillée partagée par toutes les catégories
function EntryDetail({ category, game, favorites, onFavoriteToggle, masterMode = false }) {
  const { id } = useParams();
  const entryGame = masterMode ? "botw" : game;
  const categoryInfo = getCategoryInfo(category);

  const { data: entry, loading, error, retry } = useApi(
    masterMode ? getMasterModeEntry : getEntry,
    id,
    entryGame
  );
  const { data: allEntries } = useApi(getAllEntries, entryGame);
  const entriesByName = useMemo(
    () => new Map((allEntries ?? []).map((item) => [item.name.toLowerCase(), item])),
    [allEntries]
  );

  if (loading) return <Loader />;
  if (isNotFound(error) || (!error && !entry))
    return <NoEntries message={`${categoryInfo.label} ${formatId(id)} not found`} />;
  if (error) return <ErrorModal onRetry={retry} />;


  // Un id peut appartenir à une autre catégorie : on redirige vers la bonne route
  if (entry.category !== category) return <Navigate replace to={entryPath(entry)} />;

  const isFavorite = favorites.some((favorite) => favorite.key === favoriteKey(entry, game));

  return (
    <div className="gros-container">
      <article className="entry-detail">
        <div className="dp-flex al-i j-content p-05 bg-image b-t detail-header">
          <h2 className="capitalize">{entry.name}</h2>
          <NavLink to={categoryInfo.path} aria-label={`Back to ${categoryInfo.label}`}>
            <FontAwesomeIcon className="link" icon={faXmark} />
          </NavLink>
        </div>

        <div className="dp-flex al-i j-fl-end p-05 detail-meta">
          {entry.master_mode && <span className="badge badge-master">Master Mode</span>}
          {entry.dlc && <span className="badge">DLC</span>}
          <span className="color-stats">{formatId(entry.id)}</span>
          <button
            type="button"
            className="favorite-btn"
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={() => onFavoriteToggle(entry)}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={isFavorite ? "heart-favorite-red" : "heart-favorite-bl"}
            />
          </button>
        </div>

        <div className="dp-flex f-direction al-i txt-align detail-body">
          <img id="col-img" src={entry.image} alt={entry.name} width="280" height="280" />
          <p>{entry.description}</p>
        </div>

        <div className="txt-align bg-image b-b p-b-5 detail-attributes">
          {buildAttributes(entry, entriesByName).map((attribute) => (
            <section className="detail-attribute" key={attribute.title}>
              <h2>{attribute.title}</h2>
              {attribute.value}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}

export default EntryDetail;
