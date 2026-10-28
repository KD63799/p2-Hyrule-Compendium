import { useState } from "react";
import "./Sort.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowUp, faArrowDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { SORT_CHOICES } from "../../../api/compendium";

const SortOverlay = ({ onClose, sort, setSort }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const otherChoice = SORT_CHOICES.find((choice) => choice !== sort.choice);

  const handleSortChoice = () => {
    setSort({ ...sort, choice: otherChoice });
    setDropdownOpen(false);
  };

  const handleToggleDirection = () => {
    setSort({ ...sort, descending: !sort.descending });
  };

  return (
    <div id="sort-view" className="sort-overlay" onClick={onClose}>
      <div
        id="sort-container"
        className="col-sort background-texture"
        role="dialog"
        aria-labelledby="sort-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div id="sort-header" className="row space-between al-i">
          <h2 id="sort-title" className="hylia-font text-gold">
            Sort Entries
          </h2>
          <button type="button" className="icon-btn" aria-label="Close sort" onClick={onClose}>
            <FontAwesomeIcon id="sort-close" className="text-grey" icon={faTimes} />
          </button>
        </div>

        <div className="row sort-controls">
          <div className="col-half">
            <p className="sort-label">Sort by</p>
            <div className={`sort-dropdown ${dropdownOpen ? "open" : ""}`}>
              <button
                type="button"
                className="sort-btn"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {sort.choice} <FontAwesomeIcon icon={faCaretDown} />
              </button>
              <div className="dropdown-content">
                <button type="button" id="dropdown-sort-choice" onClick={handleSortChoice}>
                  {otherChoice}
                </button>
              </div>
            </div>
          </div>

          <div className="col-half">
            <p className="sort-label">Order</p>
            <div id="sort-toggle-container">
              <FontAwesomeIcon
                id="ascend-arrow"
                className={sort.descending ? "text-grey" : "text-gold"}
                icon={faArrowUp}
              />
              <button
                type="button"
                role="switch"
                aria-checked={sort.descending}
                aria-label="Descending order"
                id="sort-toggle-box"
                className="toggle-box"
                onClick={handleToggleDirection}
              >
                <span id="sort-toggle" className={`toggle ${sort.descending ? "btn-Right" : "btn-Left"}`} />
              </button>
              <FontAwesomeIcon
                id="descend-arrow"
                className={sort.descending ? "text-gold" : "text-grey"}
                icon={faArrowDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortOverlay;
