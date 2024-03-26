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
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([

  {
    path: '/map',
    element: <Hyrulemap/>
  }
])


function App() {

  const [manageFavorite, setManageFavorite] = useState(false);
  const [manageSort, setManageSort] = useState(false)
  const [searchView, setSearchView] = useState(false)


  return (
    <>
    <header>
    <AppHeader setManageFavorite={setManageFavorite} manageFavorite={manageFavorite} setManageSort={setManageSort} manageSort={manageSort} searchView={searchView} setSearchView={setSearchView} />
    <Search/>
    </header>
    <main>
    <FavoritesView setManageFavorite={setManageFavorite} manageFavorite={manageFavorite}/>
    <SortOverlay setManageSort={setManageSort} manageSort={manageSort} />
    <Categories />
    <Ocarina />
    <Partition />
    <AppRouter />
    </main>
    </>
  )
}

export default App;

