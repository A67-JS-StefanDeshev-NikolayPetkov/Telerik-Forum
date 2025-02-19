//Misc imports
import "./Header.css";

//Dependency imports
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Header() {
  const { user, onLogout } = useContext(AppContext);

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
        {user ? (
          <NavLink
            to="/home"
            onClick={onLogout}
          >
            logout
          </NavLink>
        ) : (
          <NavLink to="/login">login</NavLink>
        )}
        <NavLink to="/about">about</NavLink>
      </nav>
    </div>
  );
}

export default Header;
