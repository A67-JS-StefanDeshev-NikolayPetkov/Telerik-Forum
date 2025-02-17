//Misc imports
import "./Register.css";

//Dependency imports
import { useState } from "react";
import { useEffect } from "react";

//Component imports
import RegisterFrom from "../../components/forms/RegisterForm/RegisterForm";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import RegistrationSuccess from "../../components/informational/RegistrationSuccess/RegistrationSuccess";
import { Form } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    username: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    return setRegistrationSuccess(false);
  }, []);

  const validate = function () {
    const errors = {};
    return Object.keys(errors).length === 0;
  };

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    if (validate()) {
      setRegistrationSuccess(true);
    }
  };

  return !registrationSuccess ? (
    <FormContainer>
      <RegisterFrom
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        formData={formData}
      ></RegisterFrom>
    </FormContainer>
  ) : (
    <FormContainer>
      <RegistrationSuccess></RegistrationSuccess>
    </FormContainer>
  );
}

export default Register;
