import React, { useState } from 'react';


const SearchView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your search logic here
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div id="search-view" className="background-texture hidden">
      <div id="search-container">
        <div className="row center">
          <div className="col-search">
            <form id="search-entries-form" onSubmit={handleSubmit}>
              <input
                id="search-entries-input"
                className="background-texture text-gold"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-5">
            <i id="search-close" className="fa-solid fa-xmark text-grey search-close"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchView;