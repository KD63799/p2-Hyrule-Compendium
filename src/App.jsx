import React, { useState } from "react"; // Import de React et de la fonction useState
import "./App.css"; // Import du fichier CSS pour le style
import AppHeader from "./composants/AppHeader/AppHeader"; // Import du composant AppHeader
import FavoritesView from "./composants/overlay/Favorite/FavoritesContainer"; // Import du composant FavoritesView
import SortOverlay from "./composants/overlay/Sort/SortOverlay"; // Import du composant SortOverlay
import Categories from "./composants/CategorieBar/Categories"; // Import du composant Categories
import Ocarina from "./composants/Ocarina/Ocarina"; // Import du composant Ocarina
import Partition from "./composants/Partition/Partition"; // Import du composant Partition
import Hyrulemap from "./composants/HyruleMap/Hyrulemap"; // Import du composant Hyrulemap
import AppRouter from "./composants/AppRouter"; // Import du composant AppRouter
import Formulaire from "./composants/Formulaire/Formulaire"; // Import du composant Formulaire (sans l'extension .jsx)

function App() {
  // Déclaration des états avec la fonction useState
  const [manageFavorite, setManageFavorite] = useState(false); // État pour gérer l'affichage des favoris
  const [manageSort, setManageSort] = useState(false); // État pour gérer l'affichage du tri
  const [isFormVisible, setIsFormVisible] = useState(false); // État pour gérer la visibilité du formulaire

  return (
    <>
      {/* Composant AppHeader avec les props pour gérer les favoris, le tri et la visibilité du formulaire */}
      <AppHeader
        setManageFavorite={setManageFavorite} // Fonction pour modifier l'état des favoris
        manageFavorite={manageFavorite} // État pour gérer l'affichage des favoris
        setManageSort={setManageSort} // Fonction pour modifier l'état du tri
        manageSort={manageSort} // État pour gérer l'affichage du tri
        setIsFormVisible={setIsFormVisible} // Fonction pour modifier l'état de la visibilité du formulaire
        isFormVisible={isFormVisible} // État pour gérer la visibilité du formulaire
      />
      <main>
        {isFormVisible && <Formulaire setIsFormVisible={setIsFormVisible} />} {/* Affiche le formulaire si isFormVisible est vrai */}
        <Formulaire isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} /> {/* Toujours affiche le formulaire (double affichage potentiel, à corriger si nécessaire) */}
        <FavoritesView setManageFavorite={setManageFavorite} manageFavorite={manageFavorite} /> {/* Composant FavoritesView pour gérer les favoris */}
        <SortOverlay setManageSort={setManageSort} manageSort={manageSort} /> {/* Composant SortOverlay pour gérer le tri */}
        <Categories /> {/* Composant Categories */}
        <AppRouter /> {/* Composant AppRouter */}
      </main>
    </>
  );
}

export default App; // Export du composant App
