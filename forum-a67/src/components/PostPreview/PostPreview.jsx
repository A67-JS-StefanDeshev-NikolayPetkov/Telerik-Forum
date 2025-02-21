import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./PostPreview.css";

const PostPreview = ({ author, title, body, likes, comments, createdOn }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="post-preview">
      <h4>Author: {author}</h4>
      <h3>Title: {title}</h3>
      <p>Created on: {new Date(createdOn).toLocaleDateString()}</p>
      {body && (
        <>
          <p>
            <span>Likes: {likes ? likes : 0}</span>
            <span>Comments: {comments ? comments.length : 0}</span>
          </p>
        </>
      )}
      {user && (
        <>
          {body ? (
            <p>
              {/* {isContentExpanded ? body : `${body.substring(0, 10)}...`} */}
              {body}
              {/* <span
                onClick={toggleContentVisibility}
                className="toggle-content"
              >
                {isContentExpanded ? (
                  <>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </>
                )}
              </span> */}
            </p>
          ) : (
            <p>No posts</p>
          )}
        </>
      )}
    </div>
  );
};

export default PostPreview;
