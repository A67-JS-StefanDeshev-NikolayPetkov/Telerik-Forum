//Misc imports
import "./ProfileNavigation.css";

//Dependency imports
import SubmitButton from "../../SubmitButton/SubmitButton";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

function ProfileNavigation({ page, setPage }) {
  const { user } = useContext(AppContext);

  const handleClick = function (e) {
    if (e.target.name === page) return;

    setPage(e.target.name);
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
