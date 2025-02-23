import "./PostPreview.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { deletePost } from "../../services/users.service";

const PostPreview = ({ post, commentCount, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const onPostPreviewClick = function () {
    if (!user) return alert("You must be signed in to view posts!");

    return navigate(`/post/${post.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(post.id);
      onDelete(post.id);
    }
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
      {user && user.displayName === post.author && (
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default PostPreview;
