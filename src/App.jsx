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
import MonstersList from './composants/Monsters/MonstersList.jsx'
import CreaturesDetail from './composants/CreaturesDetail/CreaturesDetail.jsx';
import Creatures from './composants/Creatures/Creatures.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  const [manageFavorite, setManageFavorite] = useState(false);
  const [manageSort, setManageSort] = useState(false)
  const [searchView, setSearchView] = useState(false)
  const [ManageCroissant, setManageCroissant] = useState([]);
  const [ManageCroissantNum, setManageCroissantNum] = useState([]);



  return (
    <>
    <header>
    <AppHeader setManageFavorite={setManageFavorite} manageFavorite={manageFavorite} setManageSort={setManageSort} manageSort={manageSort} searchView={searchView} setSearchView={setSearchView} />
    <Search/>
    </header>
    <main>
    <FavoritesView setManageFavorite={setManageFavorite} manageFavorite={manageFavorite}/>
    <SortOverlay setManageSort={setManageSort} manageSort={manageSort} sortByCroissantNum={setManageCroissantNum} setManageCroissant={setManageCroissant} /> 
    <Categories />
    <Ocarina />


    {/* <AppRouter ManageCroissant={ManageCroissant} ManageCroissantNum={ManageCroissantNum} /> */}
    </main>
    <div>
            <Router>
                    <Routes>
                        <Route path="/Monsters" element={<MonstersList />} />
                        <Route path="/Creatures/:id" element={<CreaturesDetail />} />
                        <Route path="/Creatures" element={<Creatures manageCroissant={ManageCroissant} manageNum={ManageCroissantNum} />} />
                        
                        {/* <Route path="/" element={<CreaturesItem name={name} />} /> */}
                        {/* <route path="/*" /> */}
                    </Routes>
            </Router>
        </div>
    </>
  )
}

export default App;

