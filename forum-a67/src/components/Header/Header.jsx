//Misc imports
import "./Header.css";

//Dependency imports
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Header() {
  const { user, onLogout } = useContext(AppContext);

  const loggedOut = (
    <nav>
      <NavLink to="/home">home</NavLink>
      <NavLink to="/about">about</NavLink>
      <NavLink to="/login">login</NavLink>
    </nav>
  );

  const loggedIn = (
    <nav>
      <NavLink
        className="create-link"
        to="/create-post"
      >
        create
      </NavLink>
      <NavLink to="/profile/details">profile</NavLink>
      <NavLink to="/home">home</NavLink>
      <NavLink to="/about">about</NavLink>
      <NavLink
        to="/home"
        onClick={onLogout}
      >
        logout
      </NavLink>
    </nav>
  );

  return (
    <div className="header">
      <NavLink to="/home">
        <img
          src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          className="logo"
          alt="BGMount"
        ></img>
      </NavLink>

      {user ? loggedIn : loggedOut}
    </div>
  );
}

export default Header;
