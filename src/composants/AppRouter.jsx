import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './AppHeader/AppHeader';
import Search from './overlay/Search/Search';
import Categories from './CategorieBar/Categories';
import Ocarina from './Ocarina/Ocarina';
import Partition from './Partition/Partition';
import Hyrulemap from './HyruleMap/Hyrulemap';
import Monsters from './Monsters/Monsters';
import Creatures from './Creatures/Creatures';
import FavoritesView from './overlay/Favorite/FavoritesContainer';
import SortOverlay from './overlay/Sort/SortOverlay';

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header>
                  <AppHeader />
                  <Search />
                </header>
                <main>
                  <Categories />
                  <FavoritesView />
                  <SortOverlay />
                  <Ocarina />
                  <Partition />
                  <Hyrulemap />
                </main>
              </>
            }
          />
          <Route path="/Monsters" element={<Monsters />} />
          <Route path="/Creatures" element={<Creatures />} />
          {/* <Route path="/Creatures/:id" element={<CreaturesItem />} /> */}
          <Route path="/Treasure" element={<Treasure />} />
          {/* <Route path="/Treasure/:id" element={<TreasureItem />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
