import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function LikeButton({ handleLike }) {
  return (
    <button
      className="like-btn"
      onClick={handleLike}
    >
      <FontAwesomeIcon icon={faThumbsUp} />
    </button>
  );
}

export default LikeButton;
