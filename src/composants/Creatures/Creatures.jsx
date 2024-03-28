import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Creatures({ manageCroissant, manageNum }) {
  // State pour stocker tous les monstres et le filtre appliqué
  const [allCreatures, setAllCreatures] = useState([]);
  const [filter, setFilter] = useState([]);
  const [compteur, setCompteur] = useState(0);
  const [idUnique, setIdUnique] = useState([]);

  const handleChange = (element) => {
    setIdUnique(element); // Mettre à jour l'élément sélectionné au clic
    console.log(element.name);
  };

  useEffect(() => {
    // Appeler la fonction fetchData() lors du premier rendu du composant
    fetchData();
  }, []);

  useEffect(() => {
    // Appliquer le tri lorsque la state manageCroissant change
    if (manageCroissant) {
      sortByCroissant();
    }
  }, [manageCroissant]);

  useEffect(() => {
    // Appliquer le tri lorsque la state manageNum change
    if (manageNum) {
      sortByNum();
    }
  }, [manageNum]);

  // Fonction pour récupérer les données des monstres depuis l'API
  async function fetchData() {
    try {
      const response = await axios.get(
        "https://botw-compendium.herokuapp.com/api/v2/category/creatures"
      );
      const data = response.data;
      // Mettre à jour le state avec les données récupérées
      setAllCreatures(data.data.food);
      setCompteur(data.data.food.length);
      console.log(allCreatures);
    } catch (error) {
      console.error(error);
    }
  }

  // Fonction pour trier les monstres par ordre croissant de nom
  const sortByCroissant = () => {
    const filteredCroissant = [...allCreatures].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    // Mettre à jour le state avec les monstres triés
    setFilter(filteredCroissant);
    console.log(filter);
  };

  // Fonction pour trier les monstres par ordre croissant de numéro
  const sortByNum = () => {
    const filteredDeNumb = [...allCreatures].sort(
      (a, b) => parseInt(a.id) - parseInt(b.id)
    );
    // Mettre à jour le state avec les monstres triés
    setFilter(filteredDeNumb);
    console.log(filter);
  };

  

  return (
    <div>
      <p>Nombre de créatures: {compteur}</p>

      {/* Boutons pour déclencher les différents types de tri */}
      <button onClick={sortByCroissant}>Trier par ordre croissant</button>
      <button onClick={sortByNum}>Trier par numéro croissant</button>

      {/* Affichage des monstres en fonction du filtre appliqué */}
      <div className="d-flex-w j-c">
        {filter.length > 0
          ? filter.map((element) => (
              <div className="col-img-wrapper j-c" id="card" key={element.id}>
                <div className="col-img-wrapper">
                  <NavLink className="Btn-img" to={`/Creatures/${element.id}`}>
                    <button onClick={() => handleChange(element)}>
                      <img
                        className="img-radius"
                        src={element.image}
                        alt={element.name}
                      />
                    </button>
                  </NavLink>

                  <div>
                    <li>{element.name}</li>
                    <li className="color-stats">{element.id}</li>
                  </div>
                </div>
              </div>
            ))
          : allCreatures.map((element) => (
              <div className="col-img-wrapper j-c" id="card" key={element.id}>
                <div className="col-img-wrapper">
                  <NavLink
                    className="Btn-img"
                    to={`/Creatures/${element.id}`}
                  >
                    <button onClick={() => handleChange(element)}>
                      <img
                        className="img-radius"
                        src={element.image}
                        alt={element.name}
                      />
                    </button>
                  </NavLink>

                  <div>
                    <li>{element.name}</li>
                    <li className="color-stats">{element.id}</li>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Creatures;
