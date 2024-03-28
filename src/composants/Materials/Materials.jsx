import { useState, useEffect } from 'react';
import axios from 'axios';
import './Materials.css'


function Materials() {
    // State pour stocker tous les monstres et le filtre appliqué
    const [AllMaterials, setAllMaterials] = useState([]);
    const [Filter, setFilter] = useState([]);
  
    useEffect(() => {
      // Appeler la fonction fetchData() lors du premier rendu du composant
      fetchData();
    }, []);

    // Fonction pour récupérer les données des monstres depuis l'API
    async function fetchData() {
      try {
        const response = await axios.get('https://botw-compendium.herokuapp.com/api/v2/category/materials');
        const data = response.data;
        // Mettre à jour le state avec les données récupérées
        setAllMaterials(data.data);
        console.log(Filter);
      } catch (error) {
        console.error(error);
      }
    }

    // Fonction pour trier les monstres par ordre croissant de nom
    const sortByCroissant = () => {
        const filteredCroissant = [...AllMaterials].sort((a,b) => 
        a.name.localeCompare(b.name))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredCroissant);
        console.log(Filter);
    }

    // Fonction pour trier les monstres par ordre décroissant de nom
    const sortByDecroissant = () => {
        const filteredDeCroissant = [...AllMaterials].sort((a,b) => 
        b.name.localeCompare(a.name))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredDeCroissant);
        console.log(Filter);
    }

    // Fonction pour trier les monstres par ordre croissant de numéro
    const sortByNum = () => {
        const filteredDeNumb = [...AllMaterials].sort((a,b) => 
        parseInt(a.id) - parseInt(b.id))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredDeNumb);
        console.log(Filter);
    }

    // Fonction pour trier les monstres par ordre décroissant de numéro
    const sortByNumInverse = () => {
        const filteredDeNumbInverse = [...AllMaterials].sort((a,b) => 
        parseInt(b.id) - parseInt(a.id))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredDeNumbInverse);
        console.log(Filter);
    }
  
    return (
        <div>
            {/* Boutons pour déclencher les différents types de tri */}
            <button onClick={sortByDecroissant}>Trier par ordre décroissant</button>
            <button onClick={sortByCroissant}>Trier par ordre croissant</button>
            <button onClick={sortByNum}>Trier par numéro croissant</button>
            <button onClick={sortByNumInverse}>Trier par numéro Décroissant</button>
            {/* Affichage des monstres en fonction du filtre appliqué */}
            <div className='d-flex-w j-c'>
            {Filter.length > 0 ? (
              Filter.map((Element, index) => (
                <div className='col-img-wrapper j-c' id='card' key={index}>
                  <div className='col-img-wrapper img-wrap'>
                    <img src={Element.image} alt={Element.name} />
                    <div>
                      <li>{Element.name}</li>
                      <li className='color-stats'>{Element.id}</li>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              AllMaterials.map((Element, index) => (
                <div className='col-img-wrapper j-c' id='card' key={index}>
                  <div className='col-img-wrapper img-wrap'>
                    <img  src={Element.image} alt={Element.name} />
                    <div>
                      <li>{Element.name}</li>
                      <li className='color-stats'>{Element.id}</li>
                    </div>
                  </div>
                </div>
              ))
            )}
            </div>
        </div>
    );
}

export default Materials;