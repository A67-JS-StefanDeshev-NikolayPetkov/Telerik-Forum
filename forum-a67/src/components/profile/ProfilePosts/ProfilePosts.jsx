//Misc imports
import "./ProfilePosts.css";

//Dependency imports
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

//Component imports
import Loader from "../../loader/Loader";
import PostPreview from "../../PostPreview/PostPreview";
import PostsContainer from "../../PostsContainer/PostsContainer";

function ProfilePosts({ posts }) {
  const { user, userData } = useContext(AppContext);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return !posts ? (
    <Loader></Loader>
  ) : (
    <PostsContainer
      title={"Your posts:"}
      posts={posts}
    ></PostsContainer>
  );
}

export default ProfilePosts;
