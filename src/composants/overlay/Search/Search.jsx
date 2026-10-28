import { useEffect, useRef } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Retour à la page consultée avant d'ouvrir la recherche
  const handleClose = () => {
    navigate(location.state?.from ?? "/");
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchParams(value ? { q: value } : {}, { replace: true, state: location.state });
  };

  return (
    <div id="search-view" className="background-texture">
      <div id="search-container">
        <form
          id="search-entries-form"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            ref={inputRef}
            id="search-entries-input"
            className="text-gold"
            type="search"
            placeholder="Search a name, a number or a category…"
            aria-label="Search the compendium"
            value={searchParams.get("q") ?? ""}
            onChange={handleSearchInputChange}
            onKeyDown={(event) => event.key === "Escape" && handleClose()}
          />
        </form>
        <button type="button" className="icon-btn" aria-label="Close search" onClick={handleClose}>
          <FontAwesomeIcon id="search-close" className="text-grey search-close" icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default SearchView;
