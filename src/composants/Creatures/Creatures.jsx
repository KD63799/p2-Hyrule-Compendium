import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, Navigate } from 'react-router-dom';
import SortOverlay from '../overlay/Sort/SortOverlay';
import './Creatures.css';

function Creatures({ manageCroissant, manageNum  }) {
    // State pour stocker tous les monstres et le filtre appliqué
    const [Allcreatures, setAllcreatures] = useState([]);
    const [Filter, setFilter] = useState([]);
    const [Compteur, setCompteur] = useState(0)
    const [IdUnique, setIdUnique] = useState([])
    const [manageSort, setManageSort] = useState(false); // Ajout de l'état pour la gestion de la surcouche de tri

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
        const response = await axios.get('https://botw-compendium.herokuapp.com/api/v2/category/creatures');
        const data = response.data;
        // Mettre à jour le state avec les données récupérées
        setAllcreatures(data.data.food);
        setCompteur(data.data.food)
        console.log(Allcreatures);
      } catch (error) {
        console.error(error);
      }
    }

    // Fonction pour trier les monstres par ordre croissant de nom
    const sortByCroissant = () => {
      if (manageCroissant) {
        const filteredCroissant = [...Allcreatures].sort((a,b) => 
        a.name.localeCompare(b.name))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredCroissant);
        console.log(Filter);
      }
    }

    // Fonction pour trier les monstres par ordre décroissant de nom
    const sortByDecroissant = () => {
        const filteredDeCroissant = [...Allcreatures].sort((a,b) => 
        b.name.localeCompare(a.name))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredDeCroissant);
        console.log(Filter);
    }

    // Fonction pour trier les monstres par ordre croissant de numéro
    const sortByNum = () => {
        const filteredDeNumb = [...Allcreatures].sort((a,b) => 
        parseInt(a.id) - parseInt(b.id))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredDeNumb);
        console.log(Filter);
    }

    // Fonction pour trier les monstres par ordre décroissant de numéro
    const sortByNumInverse = () => {
        const filteredDeNumbInverse = [...Allcreatures].sort((a,b) => 
        parseInt(b.id) - parseInt(a.id))
        // Mettre à jour le state avec les monstres triés
        setFilter(filteredDeNumbInverse);
        console.log(Filter);
    }

    return (

      

        <div className='gros-container'>
            {/* Boutons pour déclencher les différents types de tri */}
            {console.log(SortOverlay)}
            
            {/* Affichage des monstres en fonction du filtre appliqué */}

            
            <div  className='d-flex-w j-c'>
          
            {Filter.length > 0 ? (
              
              Filter.map((Element) => (
                <div className='col-img-wrapper j-c' id='card' key={Element.id}>
                  <div className='col-img-wrapper'>
                    {console.log(SortOverlay)}
                    
                  <NavLink className='Btn-img' to={`/Creatures/${Element.id}`}>
                    <button onClick={() => handleChange(Element)}> {/* Passer l'index au lieu de l'ID */}
                    <img className='creatures-img img-radius' src={Element.image} alt={Element.name} />
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
              
              Allcreatures.map((Element) => (
                <>
                  
                <div className='col-img-wrapper j-c' id='card' key={Element.id}>
                  <div className='col-img-wrapper'>

                  <NavLink className='Btn-img' to={`/Creatures/${Element.id}`}>
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
                </>
              ))
            )}
            
            </div>

        </div>
    )
        }
      

export default Creatures;