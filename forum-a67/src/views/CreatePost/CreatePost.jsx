//Misc imports
import "./CreatePost.css";

//Misc imports
import "./CreatePost.css";

//Dependency imports
import { useState, useEffect, useContext } from "react";

//Components imports
import ViewContainer from "../../components/containers/ViewContainer/ViewContainer";
import StandardCard from "../../components/containers/StandardCard/StandardCard";
import CreatePostForm from "../../components/forms/CreatePostForm/CreatePostForm";

//Services
import { AppContext } from "../../context/AppContext";
import {
  getUserByHandle,
  createPostHandle,
} from "../../services/users.service";

function CreatePost() {
  const { user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    postTitle: "",
    postBody: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = function (e) {
    e.preventDefault();

    //If valid, upload post
    if (validate()) {
      // console.log(formData.postTitle);
      createPostHandle(
        formData.postTitle,
        formData.postBody,
        user.displayName
      ).then((snapshot) => {
        console.log(snapshot);
      });
    }
  };

  return (
    <ViewContainer>
      <h2>Create Post</h2>
      <StandardCard>
        <CreatePostForm
          formData={formData}
          errors={errors}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
        ></CreatePostForm>
      </StandardCard>
    </ViewContainer>
  );
}

export default CreatePost;
