import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'; // Assurez-vous que NavLink est importé depuis 'react-router-dom'
import "./SearchEntries.css"

const API_URL = 'https://botw-compendium.herokuapp.com/api/v3/compendium/all';

const SearchEntries = ({searchValue}) => {
  const [allCreatures, setAllCreatures] = useState([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false); // Déclaration de l'état isSearchEmpty
  
  useEffect(() => {
    if (searchValue.length > 0) {
      const resultFilter = allCreatures.filter(creature =>
        creature.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (resultFilter.length > 0) {
        setAllCreatures(resultFilter); // Mise à jour de allCreatures avec les éléments filtrés
        setIsSearchEmpty(false); // La recherche n'est pas vide
      } else {
        setIsSearchEmpty(true); // La recherche ne correspond à aucun élément
      }
    } else {
      // Si la valeur de recherche est vide, afficher toutes les créatures
      setAllCreatures(allCreatures);
      setIsSearchEmpty(false); // La recherche n'est pas vide
    }
  }, [searchValue, allCreatures]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setAllCreatures(response.data.data); // Les données sont situées dans response.data.data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (element) => {
    console.log(element.name);
    // Vous pouvez ajouter ici la logique pour mettre à jour l'élément sélectionné au clic
  };

  return (
    <div>
      <div className='gros-container d-flex-w j-c'> 
        {isSearchEmpty ? (
          <img id='makar' src="src/assets/images/makar.png" alt="No result found" />
          ) : (
          allCreatures.map((element, index) => (
            <div className='col-img-wrapper j-c' id='card' key={element.id}>
              <div className='col-img-wrapper'>
                <NavLink className='Btn-img' to={`/Creatures/${element.id}`}>
                  <button onClick={() => handleChange(element)}>
                    <img className='img-entries img-radius' src={element.image} alt={element.name} />
                  </button>
                </NavLink>
                <div>
                  <li>{element.name}</li>
                  <li className='color-stats'>{element.id}</li>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchEntries;
