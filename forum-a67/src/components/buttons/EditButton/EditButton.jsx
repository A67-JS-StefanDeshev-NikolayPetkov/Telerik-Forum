import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function EditButton({ enableEdit }) {
  return (
    <button
      className="edit-btn"
      onClick={enableEdit}
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
}

export default EditButton;
