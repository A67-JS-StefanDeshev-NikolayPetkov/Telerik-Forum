import "./PostPreview.css";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deletePost } from "../../services/users.service";
import Modal from "../Modal/Modal";

const PostPreview = ({ post, commentCount, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const onPostPreviewClick = function () {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    return navigate(`/post/${post.id}`);
  };

  const handleDelete = async () => {
    await deletePost(post.id);
    onDelete(post.id);
    setIsModalOpen(false);
    navigate(-1); // Navigate to the last view
  };

  return (
    <div className="post-preview" onClick={onPostPreviewClick}>
      <h4>Author: {post.author}</h4>
      <h3>Title: {post.title}</h3>
      <p>Created on: {new Date(post.createdOn).toLocaleDateString()}</p>
      <p>
        <span>Likes: {post.likeCount ? post.likeCount : 0}</span>
        <span>Comments: {commentCount}</span>
      </p>
      {user && user.displayName === post.author && (
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          Delete
        </button>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
      >
        Are you sure you want to delete this post?
      </Modal>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onConfirm={() => navigate("/login")}
        title="Login Required"
      >
        <p>You need to be logged in to view this post.</p>
        <p>
          Don't have an account? <Link to="/register">Register here.</Link>
        </p>
      </Modal>
    </div>
  );
};

export default PostPreview;
