import "./App.css";
import AppHeader from "./composants/AppHeader/AppHeader";
import FavoritesView from "./composants/overlay/Favorite/FavoritesContainer";
import SortOverlay from "./composants/overlay/Sort/SortOverlay";
import { useState } from "react";
import Search from "./composants/overlay/Search/Search";
import Categories from "./composants/CategorieBar/Categories.jsx";
import Ocarina from "./composants/Ocarina/Ocarina";
import Hyrulemap from "./composants/HyruleMap/Hyrulemap";
import MonstersList from "./composants/Monsters/MonstersList.jsx";
import CreaturesDetail from "./composants/CreaturesDetail/CreaturesDetail.jsx";
import Creatures from "./composants/Creatures/Creatures.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Treasure from "./composants/Treasure/Treasure";
import Formulaire from "./composants/Formulaire/Formulaire.jsx";
import SearchEntries from "./composants/SearchEntries/SearchEntries.jsx";
import Acceuil from "./composants/Acceuil/Acceuil.jsx";
import ComingSoon from "./composants/ComingSoon/ComingSoon.jsx"



function App() {
  const [manageFavorite, setManageFavorite] = useState(false);
  const [manageSort, setManageSort] = useState(false);
  const [searchView, setSearchView] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [ManageCroissant, setManageCroissant] = useState([]);
  const [ManageCroissantNum, setManageCroissantNum] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  console.log(searchValue)
  return (
    <>
      <Router>
        <div>
          <header>
            {searchVisible ? (
              <Search
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
              />
            ) : (
              <AppHeader
                manageFavorite={manageFavorite}
                setManageFavorite={setManageFavorite}
                manageSort={manageSort}
                setManageSort={setManageSort}
                searchView={searchView}
                setSearchView={setSearchView}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
                isFormVisible={isFormVisible}
                setIsFormVisible={setIsFormVisible}
              />
            )}
          </header>
          <main>
         
            
            <Categories />
            <Formulaire isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} />
            <FavoritesView
              setManageFavorite={setManageFavorite}
              manageFavorite={manageFavorite}
            />
            <SortOverlay
              setManageSort={setManageSort}
              manageSort={manageSort}
              sortByCroissantNum={setManageCroissantNum}
              setManageCroissant={setManageCroissant}
            />
            <Routes>
              <Route path="/" element={<Acceuil/>} />
              <Route path="/monsters" element={<MonstersList />} />
              <Route path="/treasure" element={<Treasure />} />
              <Route
                path="/creatures"
                element={
                  <Creatures
                    manageCroissant={ManageCroissant}
                    manageNum={ManageCroissantNum}
                  />
                }
              />
              <Route path="/ocarina" element={<Ocarina />} />
              <Route path="/hyrulemap" element={<Hyrulemap />} />
              <Route path="/Monsters" element={<MonstersList />} />
              <Route path="/Search" element={<SearchEntries searchValue={searchValue} />}/>
              <Route path="/Creatures/:id" element={<CreaturesDetail />} />
              <Route path="/comingsoon" element={<ComingSoon/>}/>
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}
export default App;