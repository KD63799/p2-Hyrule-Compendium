import { NavLink } from "react-router-dom";
import "./Acceuil.css";
import poster from "../../assets/slider/linkPost.jpg";
import mapIcon from "../../assets/icons/OOT MAP.png";
import ocarinaIcon from "../../assets/icons/ocarina.png";
import majoraIcon from "../../assets/images/icons/majoraMask.png";

const links = [
  { to: "/hyrulemap", icon: mapIcon, label: "Hyrule Map" },
  { to: "/ocarina", icon: ocarinaIcon, label: "Ocarina" },
  { to: "/comingsoon", icon: majoraIcon, label: "Majora's Mask" },
];

const Acceuil = () => {
  return (
    <div className="home">
      <img src={poster} alt="Link in Breath of the Wild" id="poster" />
      <h1>Welcome to the Kokiri Village !</h1>
      <p className="home-intro">
        Explore the Hyrule Compendium of <em>Breath of the Wild</em> and{" "}
        <em>Tears of the Kingdom</em>: pick a category above, switch game, search and keep your
        favorites.
      </p>

      <div id="silly">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className="button-link">
            <img src={link.icon} alt="" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Acceuil;
