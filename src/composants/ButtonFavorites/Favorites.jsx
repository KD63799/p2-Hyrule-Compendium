import  { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "../App.css"



function Favorites({ data }) {
  // Déclaration d'un état local "favorites" avec useState, initialisé à un tableau vide
  const [favorites, setFavorites] = useState([]);

  // Utilisation d'un effet pour mettre à jour l'état local "favorites" lorsque la propriété "data" change
  useEffect(() => {
    setFavorites(data);
  }, [data]);

  // Utilisation d'un effet pour afficher les "favorites" dans la console à chaque mise à jour
  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  // Définition d'une fonction handleFavorite pour gérer l'ajout/suppression d'un favori
  function handleFavorite(id) {
    // Création d'un nouveau tableau de favoris en fonction de l'ID cliqué
    const newFavorites = favorites.map((item) => {
      return item.id === id ? { ...item, favorite: !item.favorite } : item;
    });

    // Mise à jour de l'état local "favorites" avec le nouveau tableau de favoris
    setFavorites(newFavorites);
  }

  // Fonction réutilisable pour rendre les éléments avec un bouton d'ajout/suppression de favori
  const renderFavoriteItem = (item) => (
    <li key={item.id}>
      {item.name}
      <button onClick={() => handleFavorite(item.id)}>
        {item.favorite ? (
          <FontAwesomeIcon icon= {faHeart}className="heart-red"/>
        ) : (
          <FontAwesomeIcon icon= {faHeart} className="heart-bg" />
        )}
      </button>
    </li>
  );

  return (
    <div className="App">
      <h1>Initial list</h1>
      <ul>{favorites.map(renderFavoriteItem)}</ul>

      <h1>Favorite list</h1>
      <ul>{favorites.filter((item) => item.favorite).map(renderFavoriteItem)}</ul>
    </div>
  );
}


// Export de la composante par défaut
export default Favorites;
