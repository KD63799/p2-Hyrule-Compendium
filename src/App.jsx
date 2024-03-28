import './App.css'
import AppHeader from './composants/AppHeader/AppHeader'
import FavoritesView from './composants/overlay/Favorite/FavoritesContainer'
import SortOverlay from './composants/overlay/Sort/SortOverlay'
import { useState, useEffect } from 'react'
import Search from './composants/overlay/Search/Search'
import Categories from './composants/CategorieBar/Categories';
import Ocarina from './composants/Ocarina/Ocarina';
import Partition from './composants/Partition/Partition';
import Hyrulemap from './composants/HyruleMap/Hyrulemap';
import AppRouter from './composants/AppRouter.jsx';
import Monsters from './composants/Monsters/Monsters.jsx'



function App() {

  const [manageFavorite, setManageFavorite] = useState(false);
  const [manageSort, setManageSort] = useState(false)
  const [searchView, setSearchView] = useState(false)

  const [favorites, setFavorites] = useState([]);


    function handleFavoriteToggle(id)  {
        // Toggle favorite status for the element with given id
        const updatedFavorites = favorites.map((element) => {
         return element.id === id ? { ...element, favorite: !element.favorite } : element ;
         
    });
        console.log("testToggle", updatedFavorites);
        setFavorites(updatedFavorites);}

        console.log("testApp", favorites);

  return (
    <>
    <header>
    <AppHeader setManageFavorite={setManageFavorite} manageFavorite={manageFavorite} setManageSort={setManageSort} manageSort={manageSort} searchView={searchView} setSearchView={setSearchView} />
    <Search/>
    </header>
    <main>
    <FavoritesView favorites={favorites} setfavorites={setFavorites} setManageFavorite={setManageFavorite} manageFavorite={manageFavorite}/>
    <SortOverlay setManageSort={setManageSort} manageSort={manageSort} />
    <Categories />
    {/* <Ocarina />
    <Partition />
    <Hyrulemap /> */}
    <Monsters favorites={favorites} setFavorites={setFavorites} onFavoriteToggle={handleFavoriteToggle}/>
    <AppRouter />
    </main>
    </>
  )
}

export default App
