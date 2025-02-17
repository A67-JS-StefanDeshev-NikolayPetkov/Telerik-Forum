//Misc imports
import "./Header.css";

//Dependency imports
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <NavLink to="/home">
        <img
          src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          className="logo"
          alt="BGMount"
        ></img>
      </NavLink>

      <nav>
        <NavLink to="/home">home</NavLink>
        <NavLink to="/login">login</NavLink>
        <NavLink to="/about">about</NavLink>
      </nav>
    </div>
  );
}

export default Header;
