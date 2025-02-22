import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function EditButton({ toggleEditMode }) {
  return (
    <button
      className="edit-btn"
      onClick={toggleEditMode}
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
}

export default EditButton;
