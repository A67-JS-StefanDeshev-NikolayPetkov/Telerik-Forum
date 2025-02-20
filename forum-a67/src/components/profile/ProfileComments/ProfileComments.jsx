//Misc imports
import "./ProfileComments.css";

//Dependency imports
import SubmitButton from "../../SubmitButton/SubmitButton";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

function ProfileComments({ page, setPage, loading }) {
  const { user } = useContext(AppContext);

  const handleClick = function (e) {
    if (e.target.name === page) return;

    setPage(e.target.name);
  };

  return loading ? "loading" : <div>comments</div>;
}

export default ProfileComments;
