//Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

//Component imports
import InfoSection from "../InfoSection/InfoSection";
import SubmitButton from "../SubmitButton/SubmitButton";

//Misc imports
import "./WelcomeSection.css";

//Context import
import { AppContext } from "../../context/AppContext";
import { getUserCount, getPostCount } from "../../services/users.service";

function WelcomeSection() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    getUserCount().then((count) => setUserCount(count));
  }, [setUserCount]);

  useEffect(() => {
    getPostCount().then((count) => setPostCount(count));
  }, [setPostCount]);

  const toRegister = () => navigate("/register");

  // Extract the displayName or email from the user object
  const username = user?.displayName || user?.providerData?.[0]?.email || "";

  return (
    <div className="welcome-section">
      <h1>Welcome to BigMount, {username ? `, ${username}` : "Guest"}!</h1>
      <div className="welcome-section__info">
        <InfoSection
          infoTitle="Users"
          infoText= {userCount}
        />
        <InfoSection
          infoTitle="Posts"
          infoText={postCount}
        />
      </div>
      <p>Experience the modern Bulgarian mountaineering forum.</p>
      {user ? <p>We are happy to see you again!</p> :
      <>
        <p>Join our growing community:</p>
        <SubmitButton
        label="register"
        onClick={toRegister}
      />
      </>
      }
    </div>
  );
}

export default WelcomeSection;