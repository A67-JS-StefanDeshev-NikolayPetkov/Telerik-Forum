//Misc imports
import "./ProfileNavigation.css";

//Dependency imports
import SubmitButton from "../../SubmitButton/SubmitButton";
import { useNavigate } from "react-router-dom";

function ProfileNavigation({ page }) {
  const navigate = useNavigate();

  const handleClick = function (e) {
    if (e.target.name === page) return;

    navigate(`/profile/${e.target.name}`);
  };

  return (
    <nav className="profile-nav">
      <SubmitButton
        label={"details"}
        onClick={handleClick}
      ></SubmitButton>
      <SubmitButton
        label={"posts"}
        onClick={handleClick}
      ></SubmitButton>
      <SubmitButton
        label={"comments"}
        onClick={handleClick}
      ></SubmitButton>
    </nav>
  );
}

export default ProfileNavigation;
