//Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

//Component imports
import InfoSection from "../InfoSection/InfoSection";
import SubmitButton from "../SubmitButton/SubmitButton";

//Misc imports
import "./WelcomeSection.css";

//Context import
import { AppContext } from "../../context/AppContext";

function WelcomeSection() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  
  const toRegister = () => navigate("/register");

  // Extract the displayName or email from the user object
  const username = user?.displayName || user?.providerData?.[0]?.email || "";

  return (
    <div className="welcome-section">
      <h1>Welcome to BigMount, {username ? `, ${username}` : "Guest"}!</h1>
      <div className="welcome-section__info">
        <InfoSection
          infoTitle="Users"
          infoText={10000}
        />
        <InfoSection
          infoTitle="Posts"
          infoText={100000}
        />
      </div>
      <p>Experience the modern Bulgarian mountaineering forum.</p>
      <p>Join our growing community:</p>
      <SubmitButton
        label="register"
        onClick={toRegister}
      />
    </div>
  );
}

export default WelcomeSection;