import "./AppHeader.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import letterIcon from "../../assets/images/icons/letter.png";
import searchIcon from "../../assets/images/icons/search.png";
import heartIcon from "../../assets/images/icons/receptacle.png";
import sortIcon from "../../assets/images/icons/Trier.png";

const AppHeader = ({ overlay, onToggleOverlay, onCloseOverlay, favoritesCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    onCloseOverlay();
    navigate("/Search", { state: { from: location.pathname } });
  };

  const icons = [
    { id: "nav-contact", src: letterIcon, label: "Contact form", onClick: () => onToggleOverlay("form"), active: overlay === "form" },
    { id: "nav-search", src: searchIcon, label: "Search", onClick: handleSearch },
    { id: "nav-heart", src: heartIcon, label: "Favorites", onClick: () => onToggleOverlay("favorites"), active: overlay === "favorites", count: favoritesCount },
    { id: "nav-sort", src: sortIcon, label: "Sort entries", onClick: () => onToggleOverlay("sort"), active: overlay === "sort" },
  ];

  return (
    <div className="nav-header background-dark background-texture">
      <div className="row space-between al-i">
        <NavLink to="/" className="col-fluid home-link" onClick={onCloseOverlay}>
          <h2 id="app-header" className="text-gold hylia-font">
            KOKIRI
          </h2>
        </NavLink>
        <nav id="header-icons" className="row al-i" aria-label="Tools">
          {icons.map((icon) => (
            <button
              key={icon.id}
              type="button"
              className={`header-icon-wrapper ${icon.active ? "header-icon-active" : ""}`}
              aria-label={icon.label}
              aria-pressed={icon.active}
              title={icon.label}
              onClick={icon.onClick}
            >
              <img id={icon.id} src={icon.src} alt="" />
              {icon.count > 0 && <span className="header-count">{icon.count}</span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AppHeader;
