import "./PostPreview.css";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Modal from "../Modal/Modal";

const PostPreview = ({ post, commentCount }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const onPostPreviewClick = function () {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    return navigate(`/post/${post.id}`);
  };

  return (
    <div
      className="post-preview"
      onClick={onPostPreviewClick}
    >
      <h4>Author: {post.author}</h4>
      <h3>Title: {post.title}</h3>
      <p>Created on: {new Date(post.createdOn).toLocaleDateString()}</p>
      <p>
        <span>Likes: {post.likeCount ? post.likeCount : 0}</span>
        <span>Comments: {commentCount}</span>
      </p>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => {
          navigate("/");
          setIsLoginModalOpen(false);
        }}
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
