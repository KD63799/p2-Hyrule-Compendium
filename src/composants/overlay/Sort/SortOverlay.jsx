import { useState } from 'react';
import './Sort.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowUp,  faArrowDown } from '@fortawesome/free-solid-svg-icons';



const SortOverlay = ({manageSort, setManageSort}) => {
  const [sortChoice, setSortChoice] = useState('Name');
  const [sortDirection, setSortDirection] = useState(false);

  const handleSortChoice = (choice) => {
    setSortChoice(choice);
  };

  const handleSortDirection = () => {
    setSortDirection(!sortDirection);
  };

  const handleSortClose = () => {
    setManageSort(!manageSort)
  };


  return (
    <div id="sort-view " className={`sort-overlay ${!manageSort ? "" : "sort-visible" }`}>
      <div className={`row end ${manageSort ? "" : "hidden"}`} id="sort-row">
        <div id="sort-container" className="col-sort background-texture">
          <div id="sort-header" className="row space-between">
            <div className="col-fluid">
              <div>
                <h2 id="sort-title" className="hylia-font remove-line-height text-gold">Sort Entries</h2>
              </div>
            </div>
            <div className="col-fluid">
              <FontAwesomeIcon id="sort-close" className="text-grey sort-close" icon={faTimes} onClick={handleSortClose} />
            </div>
          </div>
          <div className="row">
            <div className="col-half">
              <div className="sort-dropdown">
                <button className="sort-btn" onClick={() => handleSortChoice('Number')}>Number</button>
                <div className="dropdown-content">
                  <span id="dropdown-sort-choice" className="align-center">{sortChoice}</span>
                </div>
              </div>
            </div>
            <div className="col-half">
              <div id="sort-toggle-container">
                <div className="row center toggle-arrows">
                  <div className="col-half">
                   <FontAwesomeIcon id="ascend-arrow" className={`text-gold ${sortDirection ? 'text-grey' : 'text-gold'}`} icon={faArrowUp} />
                  </div>
                  <div className="col-half">
                    <FontAwesomeIcon id="descend-arrow" className={`text-grey ${sortDirection ? 'text-gold' : 'text-grey'}`} icon={faArrowDown} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-full">
                    <div className="toggle-wrapper">
                      <div id="sort-toggle-box" className="toggle-box">
                        <div id="sort-toggle" className="toggle">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortOverlay;