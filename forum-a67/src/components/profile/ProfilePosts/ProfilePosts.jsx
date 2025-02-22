//Misc imports
import "./ProfilePosts.css";

//Component imports
import Loader from "../../loader/Loader";
import PostsContainer from "../../PostsContainer/PostsContainer";

function ProfilePosts({ posts }) {
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
