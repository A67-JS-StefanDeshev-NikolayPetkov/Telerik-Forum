import { useNavigate } from "react-router-dom";
import "./PostPreview.css";

const PostPreview = ({ post, commentCount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-preview" onClick={handleClick}>
      <h4>Author: {post.author}</h4>
      <h3>Title: {post.title}</h3>
      <p>Created on: {new Date(post.createdOn).toLocaleDateString()}</p>
      <p>
        <span>Likes: {post.likes ? post.likes : 0}</span>
        <span>Comments: {commentCount}</span>
      </p>
    </div>
  );
};

export default PostPreview;
