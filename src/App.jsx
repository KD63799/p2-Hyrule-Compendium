import './App.css';
import AppHeader from './composants/AppHeader/AppHeader';
import FavoritesView from './composants/overlay/Favorite/FavoritesContainer';
import SortOverlay from './composants/overlay/Sort/SortOverlay';
import { useState } from 'react';
import Search from './composants/overlay/Search/Search';
import Categories from './composants/CategorieBar/Categories.jsx';
import Ocarina from './composants/Ocarina/Ocarina';
import Hyrulemap from './composants/HyruleMap/Hyrulemap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Monsters from './composants/Monsters/Monsters';
import Treasure from './composants/Treasure/Treasure';
import Creatures from './composants/Creatures/Creatures';
import Acceuil from './composants/Acceuil/Acceuil.jsx';

function App() {
  const [manageFavorite, setManageFavorite] = useState(false);
  const [manageSort, setManageSort] = useState(false);
  const [searchView, setSearchView] = useState(false);
  const [ManageCroissant, setManageCroissant] = useState([]);
  const [ManageCroissantNum, setManageCroissantNum] = useState([]);

  return (
    <Router>
      <div>
        
          <AppHeader
            setManageFavorite={setManageFavorite}
            manageFavorite={manageFavorite}
            setManageSort={setManageSort}
            manageSort={manageSort}
            searchView={searchView}
            setSearchView={setSearchView}
          />
          <Categories/>
          <Search />
        <main>
          <FavoritesView
            setManageFavorite={setManageFavorite}
            manageFavorite={manageFavorite}
          />
          <SortOverlay setManageSort={setManageSort} manageSort={manageSort} sortByCroissantNum={setManageCroissantNum} setManageCroissant={setManageCroissant} /> 
          <Routes>
            <Route path="/" element={<Categories />} />
            <Route path="/monsters" element={<Monsters />} />
            <Route path="/treasure" element={<Treasure />} />
            <Route path="/creatures" element={<Creatures />} />
            <Route path="/ocarina" element={<Ocarina />} />
            <Route path="/hyrulemap" element={<Hyrulemap />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
