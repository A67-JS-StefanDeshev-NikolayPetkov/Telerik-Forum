//Misc imports
import "./ProfilePosts.css";

//Component imports
import Loader from "../../loader/Loader";
import PostsContainer from "../../PostsContainer/PostsContainer";
import Modal from "../../Modal/Modal";

//Dependency imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Services imports
import { getPostsByAuthor } from "../../../services/users.service";

function ProfilePosts() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    getPostsByAuthor(username)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <Loader></Loader>;

  if (error) return <p>{error.message}</p>;

  if (!posts || posts.length === 0) return <p>No posts yet.</p>;

  return (
    <div>
      <PostsContainer
        title={"Your posts:"}
        posts={posts}
        onDelete={(postId) => {
          setPostToDelete(postId);
          setIsModalOpen(true);
        }}
      ></PostsContainer>
    </div>
  );
}

export default ProfilePosts;
