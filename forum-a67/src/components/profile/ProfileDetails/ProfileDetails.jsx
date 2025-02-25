//Misc imports
import "./ProfileDetails.css";

//Dependency imports
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

//Component imports
import EditProfileDetails from "../EditProfileDetails/EditProfileDetails";
import EditButton from "../../buttons/EditButton/EditButton";

function ProfileDetails() {
  const [editMode, setEditMode] = useState(false);
  const { displayUserData, isOwnProfile } = useOutletContext();

  console.log(displayUserData);

  const toggleEditMode = () => setEditMode(!editMode);

  return (
    <div className="details-container">
      <h3>Profile Info</h3>
      {editMode ? (
        <EditProfileDetails
          userData={displayUserData}
          toggleEditMode={toggleEditMode}
        ></EditProfileDetails>
      ) : (
        <div className="details-form-container">
          <div className="details-row">
            <p>First Name:</p>
            <p>{displayUserData.firstName}</p>
          </div>
          <div className="details-row">
            <p>Last Name:</p>
            <p>{displayUserData.lastName}</p>
          </div>
          <div className="details-row">
            <p>Email:</p>
            <p>{displayUserData.email}</p>
          </div>
          <div className="details-row">
            <p>Mobile:</p>
            <p>{displayUserData.number}</p>
          </div>
        </div>
      )}

      {isOwnProfile && (
        <EditButton toggleEditMode={toggleEditMode}></EditButton>
      )}
    </div>
  );
}

export default ProfileDetails;
