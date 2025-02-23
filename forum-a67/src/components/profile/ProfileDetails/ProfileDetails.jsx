//Misc imports
import "./ProfileDetails.css";

//Dependency imports
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

//Component imports
import Loader from "../../loader/Loader";

function ProfileDetails() {
  const { userData } = useContext(AppContext);

  if (!userData) return <Loader></Loader>;

  return (
    <div className="details-container">
      <h3>Profile Info</h3>
      <div className="details-form-container">
        <div className="details-row">
          <p>First Name:</p>
          <p>{userData.firstName}</p>
        </div>
        <div className="details-row">
          <p>Last Name:</p>
          <p>{userData.lastName}</p>
        </div>
        <div className="details-row">
          <p>Email:</p>
          <p>{userData.email}</p>
        </div>
        <div className="details-row">
          <p>Mobile:</p>
          <p>{userData.number}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
