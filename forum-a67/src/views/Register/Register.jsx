//Misc imports
import "./Register.css";

//Dependency imports
import { useState } from "react";

//Component imports
import RegisterFrom from "../../components/forms/RegisterForm/RegisterForm";
import FormContainer from "../../components/forms/FormContainer/FormContainer";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(username);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
    console.log(number);
  };

  const props = {
    username: username,
    password: password,
    firstName: firstName,
    lastName,
    number,
    setPassword: setPassword,
    setUsername,
    setFirstName,
    setLastName,
    setNumber,
    handleSubmit,
  };

  return (
    <FormContainer>
      <RegisterFrom {...props}></RegisterFrom>
    </FormContainer>
  );
}

export default Register;
