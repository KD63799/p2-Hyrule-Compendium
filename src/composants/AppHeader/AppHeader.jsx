import React from "react";
import "./AppHeader.css";
import { useState } from "react";

const AppHeader = ({manageFavorite, setManageFavorite}) => {
  return (
    <header className="nav-header background-dark background-texture">
      <div className="row space-between">
        <div className="col-fluid">
          <h2 id="app-header" className="text-gold hylia-font">
            KOKIRI
          </h2>
        </div>
        <div className="col-fluid">
          <div id="header-icons center">
            <div className="header-icon-wrapper center in-line">
              <img
                id="nav-trend"
                src="src\assets\images\icons\stone_of_Fire_Model.png"
                alt="Stone of Fire"
              />
            </div>
            <div className="header-icon-wrapper center in-line">
              <img
                id="nav-search"
                src="src/assets/images/icons/search.png"
                alt="Search"
              />
            </div>
            <div onClick={() => setManageFavorite(!manageFavorite)} className="header-icon-wrapper center in-line">
              <img
                id="nav-heart"
                src="src\assets\images\icons\receptacle.png"
                alt="Heart"
              />
            </div>
            <div className="header-icon-wrapper center in-line">
              <img
                id="nav-sort"
                src="src\assets\images\icons\Trier.png"
                alt="Fairy"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
