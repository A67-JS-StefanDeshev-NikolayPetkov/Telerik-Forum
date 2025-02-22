import DislikeButton from "../../buttons/DislikeButton/DislikeButton";
import LikeButton from "../../buttons/LikeButton/LikeButton";
import EditButton from "../../buttons/EditButton/EditButton";

import CreatePostForm from "../../forms/CreatePostForm/CreatePostForm";

import { useState, useEffect } from "react";

import { updatePostHandle } from "../../../services/users.service";
import "./PostDetails.css";

function PostDetails({
  postId,
  post,
  setPost,
  handleDislike,
  handleLike,
  currentUserLike,
  isAuthor,
}) {
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    postTitle: post.title,
    postBody: post.body,
  });

  const toggleEditMode = function () {
    setEditMode(!editMode);
  };

  useEffect(() => {
    console.log(editMode);
  }, [editMode]);

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
    console.log(newFormData);
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
        <span>Comments: {0}</span>
      </p>
      <div className="post-buttons">
        {currentUserLike ? (
          <DislikeButton handleDislike={handleDislike}></DislikeButton>
        ) : (
          <LikeButton handleLike={handleLike}></LikeButton>
        )}

        {isAuthor && <EditButton toggleEditMode={toggleEditMode}></EditButton>}
      </div>
    </div>
  );
}

export default PostDetails;
