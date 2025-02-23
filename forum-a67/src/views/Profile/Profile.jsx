//Misc imports
import "./Profile.css";

//Dependency imports
import { useContext } from "react";
import { useParams } from "react-router-dom";

//Components imports
import ViewContainer from "../../components/containers/ViewContainer/ViewContainer";
import StandardCard from "../../components/containers/StandardCard/StandardCard";
import Loader from "../../components/loader/Loader";
import ProfileNavigation from "../../components/profile/ProfileNavigation/ProfileNavigation";
import ProfileDetails from "../../components/profile/ProfileDetails/ProfileDetails";
import ProfilePosts from "../../components/profile/ProfilePosts/ProfilePosts";
import ProfileComments from "../../components/profile/ProfileComments/ProfileComments";

//Services
import { AppContext } from "../../context/AppContext";

function Profile() {
  const { page } = useParams();
  const { user } = useContext(AppContext);

  if (!user) return <Loader></Loader>;

  return (
    <ViewContainer>
      <h2>Hi {user.displayName}</h2>
      <StandardCard>
        <ProfileNavigation page={page}></ProfileNavigation>
        {page === "details" && <ProfileDetails></ProfileDetails>}
        {page === "posts" && (
          <ProfilePosts username={user.displayName}></ProfilePosts>
        )}
        {page === "comments" && <ProfileComments></ProfileComments>}
      </StandardCard>
    </ViewContainer>
  );
}

export default Profile;
