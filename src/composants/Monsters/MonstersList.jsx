import { useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './Monsters.css'

function Monsters({ manageCroissant, manageNum }) {
    // State pour stocker tous les monstres et le filtre appliqué
    const [AllMunster, setAllMunster] = useState([]);
    const [Filter, setFilter] = useState([]);
    const [Compteur, setCompteur] = useState(0)
    const [IdUnique, setIdUnique] = useState([])

    const handleChange = (Element) => {
      setIdUnique(Element); // Mettre à jour l'élément sélectionné au clic
      console.log(Element.name);
  };
  
    useEffect(() => {
      // Appeler la fonction fetchData() lors du premier rendu du composant
      fetchData();
    }, []);

    useEffect(() => {
      // Appliquer le tri lorsque la state manageCroissant change
      if (manageCroissant ) {
        sortByCroissant();
      }
    }, [manageCroissant ]);

    useEffect(() => {
      // Appliquer le tri lorsque la state manageCroissant change
      if (manageNum ) {
        sortByNum();
      }
    }, [manageNum ]);

    // Fonction pour récupérer les données des monstres depuis l'API
    async function fetchData() {
      try {
        const response = await axios.get('https://botw-compendium.herokuapp.com/api/v2/category/monsters');
        const data = response.data;
        // Mettre à jour le state avec les données récupérées
        setAllMunster(data.data);
        console.log(Filter);
      } catch (error) {
        console.error(error);
      }
    }

    // Fonction pour trier les monstres par ordre croissant de nom
    const sortByCroissant = () => {
        const filteredCroissant = [...AllMunster].sort((a,b) => 
        a.name.localeCompare(b.name))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredCroissant);
        console.log(Filter);
    }

    // Fonction pour trier les monstres par ordre décroissant de nom
    const sortByDecroissant = () => {
        const filteredDeCroissant = [...AllMunster].sort((a,b) => 
        b.name.localeCompare(a.name))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredDeCroissant);
        console.log(Filter);
    }

    // Fonction pour trier les monstres par ordre croissant de numéro
    const sortByNum = () => {
        const filteredDeNumb = [...AllMunster].sort((a,b) => 
        parseInt(a.id) - parseInt(b.id))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredDeNumb);
        console.log(Filter);
    }

    // Fonction pour trier les monstres par ordre décroissant de numéro
    const sortByNumInverse = () => {
        const filteredDeNumbInverse = [...AllMunster].sort((a,b) => 
        parseInt(b.id) - parseInt(a.id))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredDeNumbInverse);
        console.log(Filter);
    }
  
    return (
        <div className='gros-container'>
            <div className='d-flex-w j-c'>
            {Filter.length > 0 ? (
              Filter.map((Element, index) => (
                <div className='col-img-wrapper j-c' id='card' key={index}>
                  <div className='col-img-wrapper img-wrap'>
                  <NavLink className='Btn-img' to={`/Monsters/${Element.id}`}>
                    <button onClick={() => handleChange(Element)}> {/* Passer l'index au lieu de l'ID */}
                    <img className='img-radius' src={Element.image} alt={Element.name} />
                     </button>
                  </NavLink>
                    <div>
                      <li>{Element.name}</li>
                      <li className='color-stats'>{Element.id}</li>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              AllMunster.map((Element, index) => (
                <div className='col-img-wrapper j-c' id='card' key={index}>
                  <div className='col-img-wrapper img-wrap'>
                  <NavLink className='Btn-img' to={`/Monsters/${Element.id}`}>
                    <button  onClick={() => handleChange(Element)}> {/* Passer l'index au lieu de l'ID */}
                    <img className='img-radius' src={Element.image} alt={Element.name} />
                     </button>
                  </NavLink>
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

export default Monsters;