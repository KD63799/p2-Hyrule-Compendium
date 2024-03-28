import { Box } from '@mui/material';
import { useState } from 'react';
import '../CategorieBar/categorie.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Creatures from '../Creatures/Creatures';
import Monsters from '../Monsters/Monsters'; 
// import Materials from '../Materials/Materials';
// import Equipment from '../Equipment/Equipment';
import Treasure from '../Treasure/Treasure';

function Categories() {
  const [currentNavIcon, setCurrentNavIcon] = useState(null);
  const [pageView, setPageView] = useState(null);

  const handleNavigationClick = function (event) {
    const clickedIcon = event.target.closest(".nav-icon-wrapper");
    if (!clickedIcon) return;
  
    setCurrentNavIcon(clickedIcon.querySelector("img"));
  
    // Au lieu de mettre à jour directement l'état `pageView`, naviguer vers la route appropriée en utilisant React Router
    const pageViewId = clickedIcon.id;
    history.push(pageViewId); // Utilisation de history.push pour naviguer
  
    const navIconWrappers = document.querySelectorAll(".nav-icon-wrapper");
    navIconWrappers.forEach((wrapper) => {
      wrapper.classList.remove("nav-icon-selected");
    });
  
    clickedIcon.classList.add("nav-icon-selected");
  };

  return (
  
      <section id="navigation-icons">
        <Box display="flex">
          
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'creatures' ? 'nav-icon-selected' : ''}`}>
              <a href='/Creatures'> 
              <img src="src/assets/icons/Creatures.png" alt="Creatures" className="nav-icon" />
              </a>
              
            </Box>
         
        
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'monsters' ? 'nav-icon-selected' : ''}`}>
              <a href='/Monsters'>
              <img src="src/assets/icons/Monsters.png" alt="Monsters" className="nav-icon" />
              </a>
            </Box>
    

       
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'materials' ? 'nav-icon-selected' : ''}`}>
              <a href='/Materials'>
              <img src="src/assets/icons/Materials.png" alt="Materials" className="nav-icon" />
              </a>
            </Box>
        

       
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'equipment' ? 'nav-icon-selected' : ''}`}>
              <a href='/Equipment'>
              <img src="src/assets/icons/Equipment.png" alt="Equipment" className="nav-icon" />
              </a>
            </Box>
       

         
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'treasure' ? 'nav-icon-selected' : ''}`}>
              <a href='/Treasure'>
              <img src="src/assets/icons/Treasure.png" alt="Treasure" className="nav-icon" />
              </a>
            </Box>
        </Box>
        {pageView === 'creatures' && <Creatures />}
        {pageView === 'monsters' && <Monsters />}
        {pageView === 'materials' && <Materials />}
       {pageView === 'equipment' && <Equipment />} 
        {pageView === 'treasure' && <Treasure />}
      </section>

   
  );
}

export default Categories;
