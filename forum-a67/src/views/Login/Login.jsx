//Misc imports
import "./Login.css";

//Dependency imports
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service.js";
import { AppContext } from "../../context/AppContext.jsx";

//Component imports
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import StandardCard from "../../components/containers/StandardCard/StandardCard";

function Login() {
  const { setContext, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    loginUser(formData.email, formData.password)
      .then((credentials) => {
        setContext({ user: credentials.user });
      })
      .then(() => {
        navigate("/");
      })
      .catch((e) => setLoginError(e.message));
  };

  return (
    <StandardCard>
      <LoginForm
        formData={formData}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        loginError={loginError}
      ></LoginForm>
    </StandardCard>
  );
}

export default Login;
