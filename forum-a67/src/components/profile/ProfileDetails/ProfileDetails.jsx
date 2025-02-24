//Misc imports
import "./ProfileDetails.css";

//Dependency imports
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";

//Component imports
import Loader from "../../loader/Loader";
import EditProfileDetails from "../EditProfileDetails/EditProfileDetails";
import EditButton from "../../buttons/EditButton/EditButton";

function ProfileDetails() {
  const { userData } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => setEditMode(!editMode);

  return (
    <div className="details-container">
      <h3>Profile Info</h3>
      {editMode ? (
        <EditProfileDetails
          userData={userData}
          toggleEditMode={toggleEditMode}
        ></EditProfileDetails>
      ) : (
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
      )}
      <EditButton toggleEditMode={toggleEditMode}></EditButton>
    </div>
  );
}

export default ProfileDetails;
