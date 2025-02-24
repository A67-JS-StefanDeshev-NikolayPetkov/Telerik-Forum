import "./Comment.css";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteComment, updateComment } from "../../services/users.service";
import Modal from "../Modal/Modal";

function Comment({ comment, onDelete, onUpdate, commentId, onClick }) {
  const { user, userData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    await deleteComment(commentId);
    onDelete(commentId);
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    if (isEditing) {
      onUpdate(commentId, { ...comment, body: editedComment });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      className="commentContainer"
      onClick={onClick}
    >
      <p className="comment-author">{comment.author}</p>
      {isEditing ? (
        <textarea
          className="comment-body"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
      ) : (
        <p className="comment-body">{comment.body}</p>
      )}
      <p className="comment-timestamp">
        {new Date(comment.createdOn).toLocaleDateString()}
      </p>

      {/* OnClick is passed by profile component thus if comment component is rendered by profile, dont display edit and delete buttons*/}
      {!onClick && (
        <div className="comment-actions">
          {user && user.displayName === comment.author && (
            <button
              className="edit-btn"
              onClick={handleEdit}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          )}
          {((user && user.displayName === comment.author) ||
            userData.admin) && (
            <button
              className="delete-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Delete
            </button>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
      >
        Are you sure you want to delete this comment?
      </Modal>
    </div>
  );
}

export default Comment;
