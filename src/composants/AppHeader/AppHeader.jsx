import React from "react";
import "./AppHeader.css";
import { useState } from "react";

const AppHeader = ({manageFavorite, setManageFavorite, manageSort, setManageSort}) => {
  return (
    <header className="nav-header background-dark background-texture">
      <div className="row space-between">
        <div className="col-fluid">
          <h2 id="app-header" className="text-gold hylia-font">
            HYRULE COMPENDIUM
          </h2>
        </div>
        <div className="col-fluid">
          <div id="header-icons center">
            <div className="header-icon-wrapper center in-line">
              <img
                id="nav-trend"
                src="src\assets\images\icons\letter.png"
                alt="Zelda Style Letter"
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
            <div onClick={() => setManageSort(!manageSort)} className="header-icon-wrapper center in-line">
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
