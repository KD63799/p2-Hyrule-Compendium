import './App.css'
import AppHeader from './composants/AppHeader/AppHeader'
import FavoritesView from './composants/overlay/Favorite/FavoritesContainer'
import SortOverlay from './composants/overlay/Sort/SortOverlay'
import { useState } from 'react'
import Search from './composants/overlay/Search/Search'
import Categories from './composants/CategorieBar/Categories';
import Ocarina from './composants/Ocarina/Ocarina';
import Partition from './composants/Partition/Partition';
import Hyrulemap from './composants/HyruleMap/Hyrulemap';
import AppRouter from './composants/AppRouter.jsx';


function App() {

  const [manageFavorite, setManageFavorite] = useState(false);
  const [manageSort, setManageSort] = useState(false)
  const [searchView, setSearchView] = useState(false)


  return (
    <>
    <AppRouter />
    </>
  )
}

export default App;

