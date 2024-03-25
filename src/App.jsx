import './App.css'
import AppHeader from './composants/AppHeader/AppHeader'
import FavoritesView from './composants/overlay/Favorite/FavoritesContainer'
import SortOverlay from './composants/overlay/Sort/SortOverlay'
import { useState } from 'react'


function App() {

  const [manageFavorite, setManageFavorite] = useState(false)

  return (
    <>
    <header>
    <AppHeader setManageFavorite={setManageFavorite} manageFavorite={manageFavorite} />
    </header>
    <main>
    <FavoritesView setManageFavorite={setManageFavorite} manageFavorite={manageFavorite}/>
    <SortOverlay />
    </main>
    </>
  )
}

export default App
