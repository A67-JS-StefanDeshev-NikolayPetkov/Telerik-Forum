//Misc imports
import "./ProfilePosts.css";

//Component imports
import Loader from "../../loader/Loader";
import PostsContainer from "../../PostsContainer/PostsContainer";
import Modal from "../../Modal/Modal";

//Dependency imports
import { useState, useEffect } from "react";

//Services imports
import { getPostsByAuthor, deletePost } from "../../../services/users.service";

function ProfilePosts({ username }) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

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

  const handleDelete = async () => {
    if (postToDelete) {
      await deletePost(postToDelete);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postToDelete)
      );
      setIsModalOpen(false);
      setPostToDelete(null);
    }
  };

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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
      >
        Are you sure you want to delete this post?
      </Modal>
    </div>
  );
}

export default ProfilePosts;
