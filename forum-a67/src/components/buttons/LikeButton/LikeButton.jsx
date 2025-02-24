import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

import { likePost } from "../../../services/users.service";
import { unlikePost } from "../../../services/users.service";

function LikeButton({ post, postId, toggleLike, currentUserLike }) {
  const { user } = useContext(AppContext);

  const handleLike = async function () {
    toggleLike();
    const change = currentUserLike ? -1 : 1;

    post.likeCount += change;

    try {
      currentUserLike
        ? await unlikePost(postId, user.displayName)
        : await likePost(postId, user.displayName);
    } catch (e) {
      toggleLike();
      post.likeCount -= change;
    }
  };

  return (
    <button
      className="like-btn"
      onClick={handleLike}
    >
      {!currentUserLike ? (
        <FontAwesomeIcon icon={faThumbsUp} />
      ) : (
        <FontAwesomeIcon icon={faThumbsDown} />
      )}
    </button>
  );
}

export default LikeButton;
