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
import MonstersDetail from "./composants/MonstersDetail/MonstersDetail.jsx";
import CreaturesDetail from "./composants/CreaturesDetail/CreaturesDetail.jsx";
import Creatures from "./composants/Creatures/Creatures.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Treasure from "./composants/Treasure/Treasure";
import TreasureDetail from "./composants/TreasureDetail/TreasureDetail.jsx"
import Materials from "./composants/Materials/Materials.jsx";
import MaterialDetail from "./composants/MaterialsDetail/MaterialDetail.jsx";
import Equipment from "./composants/Equipment/Equipment.jsx";
import EquipmentDetail from "./composants/EquipmentDetail/EquipmentDetail.jsx";


function App() {
  const [manageFavorite, setManageFavorite] = useState(false);
  const [manageSort, setManageSort] = useState(false);
  const [searchView, setSearchView] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [ManageCroissant, setManageCroissant] = useState([]);
  const [ManageCroissantNum, setManageCroissantNum] = useState([]);
  const [favorites, setFavorites] = useState([]);


    const handleFavoriteToggle = (id) =>  {
        // Toggle favorite status for the element with given id
        const updatedFavorites = favorites.map((element) => {
         return element.id === id ? { ...element, favorite: !element.favorite } : element ;
         
    });
        console.log("testToggle", updatedFavorites);
        setFavorites(updatedFavorites);}

        console.log("testApp", favorites);

  return (
    <>
      <Router>
        <div>
          <header>
            {searchVisible ? (
              <Search
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
              />
            )}
          </header>
          <main>
            <Categories />
            <FavoritesView
    setManageFavorite={setManageFavorite}
    manageFavorite={manageFavorite}
    favorites={favorites} 
    setFavorites={setFavorites} // Utiliser setFavorites ici
/>
            <SortOverlay
              setManageSort={setManageSort}
              manageSort={manageSort}
              sortByCroissantNum={setManageCroissantNum}
              setManageCroissant={setManageCroissant}
            />
            <Routes>
              <Route path="/" element={<Categories />} />
              <Route path="/treasure" element={<Treasure 
              manageCroissant={ManageCroissant} 
              manageNum={ManageCroissantNum} />} />
              <Route
                path="/creatures"
                element={
                  <Creatures
                    manageCroissant={ManageCroissant}
                    manageNum={ManageCroissantNum}
                  />
                }
              />
              <Route path="/Materials" element={<Materials manageCroissant={ManageCroissant} manageNum={ManageCroissantNum}/>} />
              <Route path="/Equipment" element={<Equipment manageCroissant={ManageCroissant} manageNum={ManageCroissantNum}/>} />
              
              <Route path="/ocarina" element={<Ocarina />} />
              <Route path="/hyrulemap" element={<Hyrulemap />} />
              <Route path="/Monsters" element={<MonstersList manageCroissant={ManageCroissant} manageNum={ManageCroissantNum}/>} />
              <Route path="/Creatures/:id" element={<CreaturesDetail favorites={favorites} setFavorites={setFavorites} onFavoriteToggle={handleFavoriteToggle} />} />
              <Route path="/Treasure/:id" element={<TreasureDetail favorites={favorites} setFavorites={setFavorites} onFavoriteToggle={handleFavoriteToggle} />} />
              <Route path="/Material/:id" element={<MaterialDetail favorites={favorites} setFavorites={setFavorites} onFavoriteToggle={handleFavoriteToggle} />} />
              <Route path="/Monsters/:id" element={<MonstersDetail favorites={favorites} setFavorites={setFavorites} onFavoriteToggle={handleFavoriteToggle} />} />
              <Route path="/Equipment/:id" element={<EquipmentDetail favorites={favorites} setFavorites={setFavorites} onFavoriteToggle={handleFavoriteToggle} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}
export default App;
