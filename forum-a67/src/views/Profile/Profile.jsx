//Misc imports
import "./Profile.css";

//Dependency imports
import { useContext } from "react";
import { useParams } from "react-router-dom";

//Components imports
import ViewContainer from "../../components/containers/ViewContainer/ViewContainer";
import StandardCard from "../../components/containers/StandardCard/StandardCard";
import ProfileNavigation from "../../components/profile/ProfileNavigation/ProfileNavigation";
import ProfileDetails from "../../components/profile/ProfileDetails/ProfileDetails";
import ProfilePosts from "../../components/profile/ProfilePosts/ProfilePosts";
import ProfileComments from "../../components/profile/ProfileComments/ProfileComments";

//Services
import { AppContext } from "../../context/AppContext";

function Profile({ usernamePassedByAdmin }) {
  const { page } = useParams();
  const { user, userData } = useContext(AppContext);

  if (!userData) return <p>Access denied</p>;

  const username = usernamePassedByAdmin
    ? usernamePassedByAdmin
    : user.displayName;

  return (
    <ViewContainer>
      <h2>Hi {username}</h2>
      <StandardCard>
        <ProfileNavigation></ProfileNavigation>
        {page === "details" && <ProfileDetails></ProfileDetails>}
        {page === "posts" && <ProfilePosts username={username}></ProfilePosts>}
        {page === "comments" && <ProfileComments></ProfileComments>}
      </StandardCard>
    </ViewContainer>
  );
}

export default Profile;
