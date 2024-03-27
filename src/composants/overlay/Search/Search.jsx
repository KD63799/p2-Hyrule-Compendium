import { useState } from 'react';
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SearchView = ({ searchVisible ,setSearchVisible }) => {
  const handleSearchClose = () => {
    setSearchVisible(false);
  };

  return (
    <div id="search-view" className="background-texture">
      <div id="search-container">
        <div className="row center">
          <div className="col-search">
            <form id="search-entries-form" action="">
              <input id="search-entries-input" className="background-texture text-gold"
                type="text" placeholder="Search" />
            </form>
          </div>
          <div className="col-5">
            <FontAwesomeIcon id="search-close" className="text-grey search-close" icon={faXmark} onClick={ () => setSearchVisible(!searchVisible) }/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchView;

