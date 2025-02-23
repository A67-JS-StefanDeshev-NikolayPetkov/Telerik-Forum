//Misc imports
import "./ProfilePosts.css";

//Component imports
import Loader from "../../loader/Loader";
import PostsContainer from "../../PostsContainer/PostsContainer";

//Dependency imports
import { useState, useEffect } from "react";

//Services imports
import { getPostsByAuthor } from "../../../services/users.service";

function ProfilePosts({ username }) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostsByAuthor(username)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader></Loader>;

  if (error) return <p>error.message</p>;

  if (!posts || posts.length === 0) return <p>No posts yet.</p>;

  return (
    <PostsContainer
      title={"Your posts:"}
      posts={posts}
    ></PostsContainer>
  );
}

export default ProfilePosts;
