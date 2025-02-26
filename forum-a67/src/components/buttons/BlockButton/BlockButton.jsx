import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";

function BlockButton({ toggleBlockMode, blocked }) {
  return (
    <button
      className="block-btn"
      onClick={toggleBlockMode}
    >
      {blocked ? (
        <FontAwesomeIcon icon={faLockOpen}></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon icon={faLock} />
      )}
    </button>
  );
}

export default BlockButton;
