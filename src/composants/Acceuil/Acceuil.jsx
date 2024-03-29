import { NavLink } from 'react-router-dom';
import './Acceuil.css';

const Acceuil = () => {
  return (
    <div>
      <div id="poster">
        <img src="src/assets/slider/linkPost.jpg" alt="Breath of the Wild" id="poster" />
      </div>
        <h1>Welcome to the Kokiri Village !</h1>

      <div id="silly">
        <NavLink to="/hyrulemap" className="button-link">
          <img src="src/assets/icons/OOT MAP.png" alt="Map" />
        </NavLink>

        <NavLink to="/ocarina" className="button-link">
          <img src="src/assets/icons/ocarina.png" alt="Ocarina" />
        </NavLink>

        <NavLink to="/comingsoon" className="button-link">
          <img src="src/assets/images/icons/majoraMask.png" alt="majora's mask" />
        </NavLink>
      </div>
    </div>
  );
};

export default Acceuil;
