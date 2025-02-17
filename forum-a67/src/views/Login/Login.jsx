//Misc imports
import "./Login.css";

//Dependency imports
import { useState } from "react";

//Component imports
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import FormContainer from "../../components/forms/FormContainer/FormContainer";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(formData.username);
    console.log(formData.password);
  };

  return (
    <FormContainer>
      <LoginForm
        formData={formData}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      ></LoginForm>
    </FormContainer>
  );
}

export default Login;
