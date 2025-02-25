//Misc imports
import "./UserPreview.css";

//Dependency imports
import { useNavigate } from "react-router-dom";

//Components imports
import Profile from "../../views/Profile/Profile";

//Services

const UserPreview = ({ username, userData }) => {
  const navigate = useNavigate();
  function goToProfile() {
    navigate(`/profile/${username}`);
  }

  return (
    <div
      className="post-preview"
      onClick={goToProfile}
    >
      <h4>Username: {username}</h4>
      <h3>Joined on: {new Date(userData.createdOn).toLocaleDateString()}</h3>
      <p>Posts: {userData.posts}</p>
      <p>Comments: {userData.comments}</p>
    </div>
  );
};

export default UserPreview;
