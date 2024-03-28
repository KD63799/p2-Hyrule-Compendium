import { useState } from 'react';
import './Sort.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowUp,  faArrowDown} from '@fortawesome/free-solid-svg-icons';


const SortOverlay = ({manageSort, setManageSort, sortByCroissantNum, setManageCroissant}) => {
  const [sortChoice, setSortChoice] = useState('Name');
  const [sortDirection, setSortDirection] = useState(false);
  const [ToggleDirection, setToggleDirection] = useState(false);
  const [SwitchButton, setSwitchButton] = useState('Number');

  const handleSortChoice = () => {
    if (sortChoice === 'Name') {
      setManageCroissant(true); // Déclencher le tri par numéro
      sortByCroissantNum(false);
      setSortChoice('Number');
      setSwitchButton('Name');
    } else {
      sortByCroissantNum(true); // Déclencher le tri par nom
      setManageCroissant(false);
      setSortChoice('Name');
      setSwitchButton('Number');
    }
  }

    const HandleSortChoiceTwo = () => {
      if (sortChoice === 'Number') {
        setManageCroissant(true);
        sortByCroissantNum(false);
        
        setSortChoice('Name');
        setSwitchButton('Number');
      } else {
        
        sortByCroissantNum(true);
        setManageCroissant(false);
        setSortChoice('Number');
        setSwitchButton('Name');
      }
    
    // Mettre à jour l'état de basculement
  };

  const handleSortDirection = () => {
    setSortDirection(!sortDirection);
  };

  const handleSortClose = () => {
    setManageSort(!manageSort)
  };

  const handleToggleDirection = () => {
    setToggleDirection(!ToggleDirection)
    setSortDirection(!sortDirection);
    handleSortChoice()
  }


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
              <FontAwesomeIcon id="sort-close" className="text-grey"  icon={faTimes} onClick={handleSortClose} />
            </div>
          </div>
          <div className="row">
            <div className="col-half">
              <div className="sort-dropdown">
                <button className="sort-btn" onClick={handleSortChoice}>{sortChoice}</button>
                  
                <div className="dropdown-content">
                  <span id="dropdown-sort-choice" onClick={HandleSortChoiceTwo} className="align-center">{SwitchButton}</span>
                </div>
              </div>
            </div>
            <div className="col-half">
              <div id="sort-toggle-container">
                <div className="row center toggle-arrows">
                  <div className="col-half">
                   <FontAwesomeIcon  id="ascend-arrow" className={`text-gold ${sortDirection ? 'text-grey' : 'text-gold'}`} icon={faArrowUp} />
                  </div>
                  <div className="col-half">
                    <FontAwesomeIcon  id="descend-arrow" className={`text-gold ${sortDirection ? 'text-gold' : 'text-grey'}`} icon={faArrowDown} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-full">
                    <div className="toggle-wrapper">
                      <div onClick={handleToggleDirection} id="sort-toggle-box" className="toggle-box">
                        <div id="sort-toggle" className={`toggle ${ToggleDirection ? 'btn-Right' : 'btn-Left'}`} > 
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