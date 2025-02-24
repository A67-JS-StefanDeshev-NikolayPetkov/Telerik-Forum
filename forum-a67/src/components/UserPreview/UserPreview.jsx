//Misc imports
import "./UserPreview.css";

//Dependency imports

//Components imports
import Profile from "../../views/Profile";

//Services

const UserPreview = ({ user }) => {
  function goToProfile() {
    return <Profile username={user.username}></Profile>;
  }

  return (
    <div
      className="post-preview"
      onClick={goToProfile}
    >
      <h4>Username: {user.username}</h4>
      <h3>Joined on: {new Date(user.createdOn).toLocaleDateString()}</h3>
      <p>Posts: {user.posts}</p>
      <p>Comments: {user.comments}</p>
    </div>
  );
};

export default UserPreview;
