import React, { useState } from 'react';
import './Search.css'

function SearchComponent() {
  const [searchView, setSearchView] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [windowXCoord, setWindowXCoord] = useState(0);
  const [windowYCoord, setWindowYCoord] = useState(0);

  const toggleSearch = () => {
    if (!searchView) {
      setWindowXCoord(window.pageXOffset);
      setWindowYCoord(window.pageYOffset);
      window.scrollTo(0, 0);
      setSearchView(true);
    } else {
      window.scrollTo(windowXCoord, windowYCoord);
      setSearchStr('');
      setSearchView(false);
      setSearchResults([]);
    }
  };

  const processSearchInput = (event) => {
    setSearchStr(event.target.value.toLowerCase());
    searchEntries();
  };

  const searchEntries = () => {
    const results = data.compendiumAlph.filter(entry =>
      entry.name.toLowerCase().includes(searchStr)
    );
    setSearchResults(results);
  };

  return (
    <div id="search-view" className={searchView ? '' : 'hidden'}>
      <div id="search-container">
        <div className="row center">
          <div className="col-search">
            <form id="search-entries-form" action="">
              <input
                id="search-entries-input"
                className="background-texture text-gold"
                type="text"
                placeholder="Search"
                value={searchStr}
                onChange={processSearchInput}
              />
            </form>
          </div>
          <div className="col-5">
            <i id="search-close" className="fa-solid fa-xmark text-grey search-close" onClick={toggleSearch}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
