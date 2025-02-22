import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function DislikeButton({ handleDislike }) {
  return (
    <button
      className="dislike-btn"
      onClick={handleDislike}
    >
      <FontAwesomeIcon icon={faThumbsDown} />
    </button>
  );
}

export default DislikeButton;
