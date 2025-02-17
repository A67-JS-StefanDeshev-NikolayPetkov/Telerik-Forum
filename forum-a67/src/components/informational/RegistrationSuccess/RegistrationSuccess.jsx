//Misc imports
import "./RegistrationSuccess.css";

//Dependency imports
import { useNavigate } from "react-router-dom";

//Component imports
import SubmitButton from "../../SubmitButton/SubmitButton";

function RegistrationSuccess() {
  const navigate = useNavigate();

  const toLogin = () => navigate("/login");
  return (
    <div className="success-container">
      <h2>Success!</h2>
      <p>Your account has been creates successfully!</p>
      <SubmitButton
        label="Login"
        onClick={toLogin}
      ></SubmitButton>
    </div>
  );
}

export default RegistrationSuccess;
