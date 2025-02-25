//Misc imports
import "./ProfileNavigation.css";

//Dependency imports
import { NavLink } from "react-router-dom";

function ProfileNavigation({ username }) {
  return (
    <nav className="profile-nav">
      <NavLink to={`/profile/${username}/details`}>details</NavLink>
      <NavLink to={`/profile/${username}/posts`}>posts</NavLink>
      <NavLink to={`/profile/${username}/comments`}>comments</NavLink>
    </nav>
  );
}

export default ProfileNavigation;
