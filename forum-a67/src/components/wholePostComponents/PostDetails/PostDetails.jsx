//Component imports
import CreatePostForm from "../../forms/CreatePostForm/CreatePostForm";
import LikeButton from "../../buttons/LikeButton/LikeButton";
import EditButton from "../../buttons/EditButton/EditButton";
import Modal from "../../Modal/Modal";

//Dependency imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Service imports
import { deletePost } from "../../../services/users.service";

//Misc imports
import "./PostDetails.css";

function PostDetails({
  postId,
  post,
  setPost,
  currentUserLike,
  isAuthor,
  setCurrentUserLike,
  userData,
}) {
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    postTitle: post.title,
    postBody: post.body,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleEditMode = function () {
    setEditMode(!editMode);
  };

  const toggleLike = function () {
    setCurrentUserLike(!currentUserLike);
  };

  const validate = function () {
    const newErrors = {};

    if (formData.postTitle.length < 16 || formData.postTitle.length > 64)
      newErrors.postTitle = "Title must be between 16 and 64 characters!";

    if (formData.postBody.length < 32 || formData.postBody.length > 8192)
      newErrors.postBody = "Body must be between 32 and 8192 characters!";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (validate()) {
      try {
        const updatedPost = {
          ...post,
          title: formData.postTitle,
          body: formData.postBody,
        };
        setPost(updatedPost);
        updatePostHandle(updatedPost, postId);
        toggleEditMode();
      } catch (e) {
        errors.message = e;
        return;
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      navigate(-1);
    } catch (e) {
      return;
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="post-details">
      <p>{post.author}</p>
      <p>Created on: {new Date(post.createdOn).toLocaleDateString()}</p>
      {editMode ? (
        <CreatePostForm
          formData={formData}
          errors={errors}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          label={"update"}
        ></CreatePostForm>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </>
      )}

      <p>
        <span>Likes: {post.likeCount || 0}</span>
        <span>Comments: {post.commentCount || 0}</span>
      </p>
      <div className="post-buttons">
        <LikeButton
          post={post}
          postId={postId}
          toggleLike={toggleLike}
          currentUserLike={currentUserLike}
        ></LikeButton>

        {isAuthor && !post.isDeleted && (
          <EditButton toggleEditMode={toggleEditMode}></EditButton>
        )}

        {(isAuthor || userData.admin) && (
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            Delete
          </button>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Confirm Delete"
        >
          Are you sure you want to delete this post?
        </Modal>
      </div>
    </div>
  );
}

export default PostDetails;
