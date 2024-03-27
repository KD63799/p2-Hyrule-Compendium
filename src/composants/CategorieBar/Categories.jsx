import { Box } from '@mui/material';
import { useState } from 'react';
import '../CategorieBar/categorie.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Creatures from 'src/composants/Creatures/Creatures.jsx';
import Monsters from 'src/composants/Monsters/Monsters.jsx';
import Materials from 'src/composants/Materials/Materials.jsx';
import Equipment from 'src/composants/Equipment/Equipment.jsx';
import Treasure from 'src/composants/Treasure/Treasure.jsx';

function Categories() {
  const [currentNavIcon, setCurrentNavIcon] = useState(null);
  const [pageView, setPageView] = useState(null);
  const history = useHistory(); // Import du hook useHistory

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
    <Router>
      <section id="navigation-icons">
        <Box display="flex">
          <Link to="/creatures">
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'creatures' ? 'nav-icon-selected' : ''}`}>
              <img src="src/assets/icons/Creatures.png" alt="Creatures" className="nav-icon" />
            </Box>
          </Link>

          <Link to="/monsters">
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'monsters' ? 'nav-icon-selected' : ''}`}>
              <img src="src/assets/icons/Monsters.png" alt="Monsters" className="nav-icon" />
            </Box>
          </Link>

          <Link to="/materials">
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'materials' ? 'nav-icon-selected' : ''}`}>
              <img src="src/assets/icons/Materials.png" alt="Materials" className="nav-icon" />
            </Box>
          </Link>

          <Link to="/equipment">
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'equipment' ? 'nav-icon-selected' : ''}`}>
              <img src="src/assets/icons/Equipment.png" alt="Equipment" className="nav-icon" />
            </Box>
          </Link>

          <Link to="/treasure">
            <Box className={`nav-icon-wrapper ${currentNavIcon?.id === 'treasure' ? 'nav-icon-selected' : ''}`}>
              <img src="src/assets/icons/Treasure.png" alt="Treasure" className="nav-icon" />
            </Box>
          </Link>
        </Box>
      </section>

      <Switch>
        <Route path="/creatures">
          <Creatures />
        </Route>
        <Route path="/monsters">
          <Monsters />
        </Route>
        <Route path="/materials">
          <Materials />
        </Route>
        <Route path="/equipment">
          <Equipment />
        </Route>
        <Route path="/treasure">
          <Treasure />
        </Route>
      </Switch>
    </Router>
  );
}

export default Categories;
