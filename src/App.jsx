import './App.css'
import AppHeader from './composants/AppHeader/AppHeader'
import FavoritesView from './composants/overlay/Favorite/FavoritesContainer'
import SortOverlay from './composants/overlay/Sort/SortOverlay'
import { useState } from 'react'
import Search from './composants/overlay/Search/Search'


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
    </main>
    </>
  )
}

export default App
