//Misc imports
import "./CreatePost.css";

//Dependency imports
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Components imports
import ViewContainer from "../../components/containers/ViewContainer/ViewContainer";
import StandardCard from "../../components/containers/StandardCard/StandardCard";
import CreatePostForm from "../../components/forms/CreatePostForm/CreatePostForm";

//Services
import { AppContext } from "../../context/AppContext";
import { createPostHandle } from "../../services/users.service";

function CreatePost() {
  //State & context
  const { user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    postTitle: "",
    postBody: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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
        await createPostHandle(
          formData.postTitle,
          formData.postBody,
          user.displayName
        );
      } catch (e) {
        errors.message = e;
        return;
      }

      setFormData({
        postTitle: "",
        postBody: "",
      });

      navigate("/");
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
          label={"post"}
        ></CreatePostForm>
      </StandardCard>
    </ViewContainer>
  );
}

export default CreatePost;
