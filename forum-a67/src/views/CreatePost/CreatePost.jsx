//Misc imports
import "./CreatePost.css";

//Misc imports
import "./Register.css";

//Dependency imports
import { useState, useEffect, useContext } from "react";

//Components imports
import ViewContainer from "../../components/containers/ViewContainer/ViewContainer";
import StandardCard from "../../components/containers/StandardCard/StandardCard";
import PostForm from "../../components/forms/PostForm/PostForm";

//Services
import { AppContext } from "../../context/AppContext";
import { getUserByHandle } from "../../services/users.service";
import { registerUser } from "../../services/auth.service";
import { createUserHandle } from "../../services/users.service";

function CreatePost() {
  const { user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    username: "",
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
  };

  return (
    <ViewContainer>
      <h2>Create Post</h2>
      <StandardCard>
        <PostForm></PostForm>
      </StandardCard>
    </ViewContainer>
  );
}

export default CreatePost;
