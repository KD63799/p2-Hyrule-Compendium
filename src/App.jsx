import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AppHeader from "./composants/AppHeader/AppHeader";
import FavoritesView from "./composants/overlay/Favorite/FavoritesContainer";
import SortOverlay from "./composants/overlay/Sort/SortOverlay";
import Search from "./composants/overlay/Search/Search";
import Categories from "./composants/CategorieBar/Categories.jsx";
import MonstersList from "./composants/Monsters/MonstersList.jsx";
import MonstersDetail from "./composants/MonstersDetail/MonstersDetail.jsx";
import CreaturesDetail from "./composants/CreaturesDetail/CreaturesDetail.jsx";
import Creatures from "./composants/Creatures/Creatures.jsx";
import Treasure from "./composants/Treasure/Treasure";
import TreasureDetail from "./composants/TreasureDetail/TreasureDetail.jsx";
import Materials from "./composants/Materials/Materials.jsx";
import MaterialDetail from "./composants/MaterialsDetail/MaterialDetail.jsx";
import Equipment from "./composants/Equipment/Equipment.jsx";
import EquipmentDetail from "./composants/EquipmentDetail/EquipmentDetail.jsx";
import SearchEntries from "./composants/SearchEntries/SearchEntries.jsx";
import Acceuil from "./composants/Acceuil/Acceuil.jsx";
import { Loader, NoEntries } from "./composants/Feedback/Feedback";
import { GAMES, favoriteKey } from "./api/compendium";
import useLocalStorage from "./hooks/useLocalStorage";

// Pages lourdes (Leaflet, Pannellum, Formik, vidéos) chargées à la demande
const Ocarina = lazy(() => import("./composants/Ocarina/Ocarina"));
const Hyrulemap = lazy(() => import("./composants/HyruleMap/Hyrulemap"));
const ComingSoon = lazy(() => import("./composants/ComingSoon/ComingSoon.jsx"));
const Formulaire = lazy(() => import("./composants/Formulaire/Formulaire.jsx"));

function App() {
  const location = useLocation();
  const searchVisible = location.pathname.toLowerCase() === "/search";

  // Un seul overlay ouvert à la fois : "favorites" | "sort" | "form" | null
  const [overlay, setOverlay] = useState(null);
  const [storedGame, setGame] = useLocalStorage("kokiri-game", "botw");
  const game = GAMES[storedGame] ? storedGame : "botw";
  const [sort, setSort] = useLocalStorage("kokiri-sort", { choice: "Number", descending: false });
  const [favorites, setFavorites] = useLocalStorage("kokiri-favorites", []);

  const toggleOverlay = (name) => setOverlay((current) => (current === name ? null : name));
  const closeOverlay = useCallback(() => setOverlay(null), []);

  useEffect(() => {
    const handleKeyDown = (event) => event.key === "Escape" && closeOverlay();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOverlay]);

  const handleFavoriteToggle = (entry) => {
    const key = favoriteKey(entry, game);
    setFavorites((current) =>
      current.some((favorite) => favorite.key === key)
        ? current.filter((favorite) => favorite.key !== key)
        : [
            ...current,
            {
              key,
              id: entry.id,
              name: entry.name,
              image: entry.image,
              category: entry.category,
              master_mode: Boolean(entry.master_mode),
              game: entry.master_mode ? "botw" : game,
            },
          ]
    );
  };

  const handleRemoveFavorite = (favoriteToRemove) => {
    setFavorites((current) => current.filter((favorite) => favorite.key !== favoriteToRemove.key));
  };

  // Un favori garde le jeu dont il provient
  const handleOpenFavorite = (favorite) => {
    setGame(favorite.game);
    closeOverlay();
  };

  const listProps = { game, sort, favorites };
  const detailProps = { game, favorites, onFavoriteToggle: handleFavoriteToggle };

  return (
    <>
      <header className="app-top">
        {searchVisible ? (
          <Search />
        ) : (
          <AppHeader
            overlay={overlay}
            onToggleOverlay={toggleOverlay}
            onCloseOverlay={closeOverlay}
            favoritesCount={favorites.length}
          />
        )}
        <Categories game={game} setGame={setGame} />
      </header>

      {overlay === "form" && (
        <Suspense fallback={null}>
          <Formulaire onClose={closeOverlay} />
        </Suspense>
      )}
      {overlay === "favorites" && (
        <FavoritesView
          onClose={closeOverlay}
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
          onOpenFavorite={handleOpenFavorite}
        />
      )}
      {overlay === "sort" && <SortOverlay onClose={closeOverlay} sort={sort} setSort={setSort} />}

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/Creatures" element={<Creatures {...listProps} />} />
            <Route path="/Monsters" element={<MonstersList {...listProps} />} />
            <Route path="/Materials" element={<Materials {...listProps} />} />
            <Route path="/Equipment" element={<Equipment {...listProps} />} />
            <Route path="/Treasure" element={<Treasure {...listProps} />} />

            <Route path="/Creatures/:id" element={<CreaturesDetail {...detailProps} />} />
            <Route path="/Monsters/:id" element={<MonstersDetail {...detailProps} />} />
            <Route path="/Monsters/master/:id" element={<MonstersDetail {...detailProps} masterMode />} />
            <Route path="/Materials/:id" element={<MaterialDetail {...detailProps} />} />
            <Route path="/Equipment/:id" element={<EquipmentDetail {...detailProps} />} />
            <Route path="/Treasure/:id" element={<TreasureDetail {...detailProps} />} />

            <Route path="/Search" element={<SearchEntries {...listProps} />} />
            <Route path="/ocarina" element={<Ocarina />} />
            <Route path="/hyrulemap" element={<Hyrulemap />} />
            <Route path="/comingsoon" element={<ComingSoon />} />
            <Route path="*" element={<NoEntries message="This page is lost in the Lost Woods" />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
