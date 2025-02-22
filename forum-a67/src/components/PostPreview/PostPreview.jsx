import "./PostPreview.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const PostPreview = ({ post, commentCount }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const onPostPreviewClick = function () {
    if (!user) return alert("You must be signed in to view posts!");

    return navigate(`/post/${post.id}`, { state: post });
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
    </div>
  );
};

export default PostPreview;
