//Misc imports
import "./Profile.css";

//Dependency imports
import { useContext, useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";

//Components imports
import ViewContainer from "../../components/containers/ViewContainer/ViewContainer";
import StandardCard from "../../components/containers/StandardCard/StandardCard";
import ProfileNavigation from "../../components/profile/ProfileNavigation/ProfileNavigation";
import Loader from "../../components/loader/Loader";

//Services
import { AppContext } from "../../context/AppContext";
import { getUserDataByHandle } from "../../services/users.service";

function Profile() {
  const { username } = useParams();
  const { user, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [displayUserData, setDisplayUserData] = useState(null);
  const [error, setError] = useState(null);

  const isOwnProfile = username === user.displayName;

  if (!userData) return <p>Access denied</p>;

  const fetchUserData = async () => {
    try {
      if (isOwnProfile) {
        setDisplayUserData(userData);
      } else {
        const snapshot = await getUserDataByHandle(username);
        setDisplayUserData(snapshot);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  if (loading) return <Loader></Loader>;

  if (error) return <p>Something went wrong: ${error}</p>;

  return (
    <ViewContainer>
      {isOwnProfile ? <h2>Hi {username}</h2> : <h2>{username}'s profile</h2>}

      <StandardCard>
        <ProfileNavigation username={username}></ProfileNavigation>
        <Outlet
          context={{ username, displayUserData, isOwnProfile, userData }}
        />
      </StandardCard>
    </ViewContainer>
  );
}

export default Profile;
