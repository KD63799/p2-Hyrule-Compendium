import React, { useState } from 'react';

const SearchComponent = ({ data }) => {
  const [searchView, setSearchView] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [windowXCoord, setWindowXCoord] = useState(0);
  const [windowYCoord, setWindowYCoord] = useState(0);

  const toggleSearch = () => {
    if (!searchView) {
      toggleSearchView();
      setWindowXCoord(window.pageXOffset);
      setWindowYCoord(window.pageYOffset);
      window.scrollTo(0, 0);
      data.searchView = true;
      document.querySelector('#search-entries-input').addEventListener('input', processSearchInput);
    } else {
      toggleSearchView();
      window.scrollTo(windowXCoord, windowYCoord);
      document.querySelector('#search-entries-input').value = '';
      data.searchView = false;
      renderControl();
    }
  };

  const processSearchInput = (event) => {
    data.searchStr = event.target.value.toLowerCase();
    searchEntries();
  };

  const toggleSearchView = () => {
    const searchViewElement = document.querySelector('#search-view');
    if (searchViewElement.classList.contains('hidden')) {
      searchViewElement.classList.remove('hidden');
      document.querySelector('#compedium-entries').style['margin-top'] = '100px';
      toggleNavigationIconsView();
      document.querySelector('#search-entries-input').focus();
    } else {
      searchViewElement.classList.add('hidden');
      document.querySelector('#compedium-entries').style['margin-top'] = '145px';
      toggleNavigationIconsView();
    }
  };

  const searchEntries = () => {
    data.searchResults = [];
    for (let i = 0; i < data.compendiumAlph.length; i++) {
      if (data.compendiumAlph[i].name.includes(data.searchStr)) {
        data.searchResults.push(data.compendiumAlph[i]);
      }
    }
    renderControl();
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
};

export default SearchComponent;