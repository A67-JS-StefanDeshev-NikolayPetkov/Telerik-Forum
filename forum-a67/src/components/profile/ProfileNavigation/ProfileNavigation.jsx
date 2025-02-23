//Misc imports
import "./ProfileNavigation.css";

//Dependency imports
import { NavLink } from "react-router-dom";

function ProfileNavigation() {
  return (
    <nav className="profile-nav">
      <NavLink to="/profile/details">details</NavLink>
      <NavLink to="/profile/posts">posts</NavLink>
      <NavLink to="/profile/comments">comments</NavLink>
    </nav>
  );
}

export default ProfileNavigation;
