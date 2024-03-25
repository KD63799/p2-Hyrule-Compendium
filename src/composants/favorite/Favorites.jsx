import React, { useState, useEffect } from "react";

function Favorites({data}) {
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
    const newFavorites = favorites.map(item => {
      return item.id === id ? { ...item, favorite: !item.favorite } : item;
    });

    // Mise à jour de l'état local "favorites" avec le nouveau tableau de favoris
    setFavorites(newFavorites);
  }

  // Rendu de la composante
  return (
    <div className="App">
      <h1>Initial list</h1>
      <ul>
        {/* Mapping à travers les éléments "favorites" pour les afficher avec un bouton d'ajout/suppression */}
        {favorites.map((item, i) => (
          <li key={i}>
            {item.name}{" "}
            <button
              // Gestion du clic sur le bouton pour ajouter/supprimer un favori
              onClick={() => {
                handleFavorite(item.id);
              }}
            >
              {/* Changement de texte du bouton en fonction de l'état du favori */}
              {item.favorite === true ? "Remove" : "Add"}
            </button>
          </li>
        ))}
      </ul>

      <h1>Favorite list</h1>
      <ul>
        {/* Affichage de la liste des favoris */}
        {favorites.map(item =>
          item.favorite === true ? <li key={item.id}>{item.name}</li> : null
        )}
      </ul>
    </div>
  );
}

// Export de la composante par défaut
export default Favorites;
