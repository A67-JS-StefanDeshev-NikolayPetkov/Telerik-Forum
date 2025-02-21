import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./PostPreview.css";

const PostPreview = ({ post, onPostPreviewClick }) => {
  return (
    <div className="post-preview" onClick={onPostPreviewClick}>
      <h4>Author: {post.author}</h4>
      <h3>Title: {post.title}</h3>
      <p>Created on: {new Date(post.createdOn).toLocaleDateString()}</p>
      <p>
        <span>Likes: {post.likes ? post.likes : 0}</span>
        <span>Comments: {post.commentCount}</span>
      </p>
    </div>
  );
};

export default PostPreview;
