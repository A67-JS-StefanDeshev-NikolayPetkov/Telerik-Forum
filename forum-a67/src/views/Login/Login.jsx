//Misc imports
import "./Login.css";

//Dependency imports
import { useState } from "react";

//Component imports
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import FormContainer from "../../components/forms/FormContainer/FormContainer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(username);
    console.log(password);
  };

  const props = {
    username,
    password,
    setPassword,
    setUsername,
    handleSubmit,
  };

  return (
    <FormContainer>
      <LoginForm {...props}></LoginForm>
    </FormContainer>
  );
}

export default Login;
