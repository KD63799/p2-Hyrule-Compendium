import { Box } from '@mui/material';
import { useState } from 'react';
import '../CategorieBar/categorie.css';
import { NavLink } from 'react-router-dom';

function Categories() {
  const [currentNavIcon, setCurrentNavIcon] = useState(null);
  const [pageView, setPageView] = useState(null);

  const handleNavigationClick = function (event) {
    const clickedIcon = event.target.closest('.nav-icon-wrapper');
    if (!clickedIcon) return; // Si l'icône n'est pas trouvée, ne rien faire
  
    setCurrentNavIcon(clickedIcon.querySelector('img'));
    setPageView(clickedIcon.id);
  
    // Retirez la classe 'nav-icon-selected' de tous les éléments avant d'appliquer la classe à l'élément cliqué
    const navIconWrappers = document.querySelectorAll('.nav-icon-wrapper');
    navIconWrappers.forEach((wrapper) => {
      wrapper.classList.remove('nav-icon-selected');
    });
  
    // Appliquez la classe 'nav-icon-selected' à l'élément cliqué
    clickedIcon.classList.add('nav-icon-selected');
  };

  return (
    <section id="navigation-icons">
      <Box display="flex" flexBasis={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Box display="flex">
          <Box
            className={`nav-icon-wrapper ${
              currentNavIcon?.id === 'creatures' ? 'nav-icon-selected' : ''
            }`}
            onClick={handleNavigationClick}
            id="creatures"
          >
           
              <img src="src/assets/icons/Creatures.png" alt="Creatures" className="nav-icon" />
         
          </Box>
          <Box
            className={`nav-icon-wrapper ${
              currentNavIcon?.id === 'monsters' ? 'nav-icon-selected' : ''
            }`}
            onClick={handleNavigationClick}
            id="monsters"
          >
            <img src="src/assets/icons/Monsters.png" alt="Monsters" className="nav-icon" />
          </Box>
          <Box
            className={`nav-icon-wrapper ${
              currentNavIcon?.id === 'materials' ? 'nav-icon-selected' : ''
            }`}
            onClick={handleNavigationClick}
            id="materials"
          >
            <img src="src/assets/icons/Materials.png" alt="Materials" className="nav-icon" />
          </Box>
          <Box
            className={`nav-icon-wrapper ${
              currentNavIcon?.id === 'equipment' ? 'nav-icon-selected' : ''
            }`}
            onClick={handleNavigationClick}
            id="equipment"
          >
            <img src="src/assets/icons/Equipment.png" alt="Equipment" className="nav-icon" />
          </Box>
          <Box
            className={`nav-icon-wrapper ${
              currentNavIcon?.id === 'treasure' ? 'nav-icon-selected' : ''
            }`}
            onClick={handleNavigationClick}
            id="treasure"
          >
            <img src="src/assets/icons/Treasure.png" alt="Treasure" className="nav-icon" />
          </Box>
        </Box>
      </Box>
       {pageView === 'creatures' && (
        <div>Contenu pour la vue des créatures</div>
      )}
      {pageView === 'monsters' && (
        <div>Contenu pour la vue des monstres</div>
      )}
      {pageView === 'materials' && (
        <div>Contenu pour la vue des matériaux</div>
      )}
      {pageView === 'equipment' && (
        <div>Contenu pour la vue de léquipement</div>
      )}
      {pageView === 'treasure' && (
        <div>Contenu pour la vue du trésor</div>
      )}
    </section>
  );
}

export default Categories;
