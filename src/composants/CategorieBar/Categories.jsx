import "../CategorieBar/categorie.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES, GAMES } from "../../api/compendium";

function Categories({ game, setGame }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Les numéros diffèrent entre BOTW et TOTK : sur une fiche, on revient à la liste
  const handleGameChange = (nextGame) => {
    if (nextGame === game) return;
    setGame(nextGame);
    const path = location.pathname.toLowerCase();
    const category = CATEGORIES.find((item) => path.startsWith(`${item.path.toLowerCase()}/`));
    if (category) navigate(category.path);
  };

  return (
    <nav id="navigation-icons" className="background-dark" aria-label="Categories">
      <div className="ptit-container">
        <ul className="nav-icon-list">
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <NavLink
                to={category.path}
                className={({ isActive }) => `nav-icon-wrapper ${isActive ? "nav-icon-selected" : ""}`}
                title={category.label}
              >
                <img src={category.icon} alt={category.label} className="nav-icon" />
                <span className="nav-icon-label">{category.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="game-switch" role="group" aria-label="Game">
          {Object.entries(GAMES).map(([id, { label, title }]) => (
            <button
              key={id}
              type="button"
              className={`game-btn ${game === id ? "game-btn-active" : ""}`}
              aria-pressed={game === id}
              title={title}
              onClick={() => handleGameChange(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Categories;
