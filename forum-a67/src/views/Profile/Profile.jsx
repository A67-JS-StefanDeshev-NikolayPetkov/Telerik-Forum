//Misc imports
import "./Profile.css";

//Dependency imports
import { useState, useEffect, useContext } from "react";

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
import { getPostsByAuthor } from "../../services/users.service";

function Profile() {
  const { user, userData, loading } = useContext(AppContext);
  const [page, setPage] = useState("details");
  const [posts, setPosts] = useState(false);
  const [errors, setErrors] = useState({});

  const getPosts = async function () {
    try {
      const userPosts = await getPostsByAuthor(user.displayName);
      setPosts(userPosts);
    } catch (e) {
      errors.posts = e.message;
      console.log(e);
    }
  };

  useEffect(() => {
    setPage("details");
    getPosts();
  }, []);

  if (loading) return <Loader></Loader>;

  return (
    <ViewContainer>
      <h2>Hi {user.displayName}</h2>
      <StandardCard>
        <ProfileNavigation
          page={page}
          setPage={setPage}
        ></ProfileNavigation>
        {page === "details" && <ProfileDetails></ProfileDetails>}
        {page === "posts" && <ProfilePosts posts={posts}></ProfilePosts>}
        {page === "comments" && <ProfileComments></ProfileComments>}
      </StandardCard>
    </ViewContainer>
  );
}

export default Profile;
