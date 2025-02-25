//Misc imports
import "./Register.css";

//Dependency imports
import { useState, useContext } from "react";
import { validateUserDetails } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

//Component imports
import RegisterFrom from "../../components/forms/RegisterForm/RegisterForm";
import StandardCard from "../../components/containers/StandardCard/StandardCard";

//Services
import { AppContext } from "../../context/AppContext";
import { getUserByHandle } from "../../services/users.service";
import { registerUser } from "../../services/auth.service";
import { createUserHandle } from "../../services/users.service";

function Register() {
  const { onLogout } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    if (validateUserDetails(formData, setErrors)) {
      try {
        const snapshot = await getUserByHandle(formData.username);

        if (snapshot.exists()) {
          throw new Error(
            `Username @${formData.username} has already been taken!`
          );
        }

        const userCredentials = await registerUser(
          formData.email,
          formData.password,
          formData.username
        );

        createUserHandle(
          formData.username,
          userCredentials.user.uid,
          userCredentials.user.email,
          formData.firstName,
          formData.lastName,
          formData.number
        );

        onLogout();

        navigate("/registration-success");
      } catch (e) {
        setErrors({ ...errors, message: e.message });
      }
    }
  };

  return (
    <StandardCard>
      <RegisterFrom
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        formData={formData}
        errors={errors}
      ></RegisterFrom>
    </StandardCard>
  );
}
export default Register;
