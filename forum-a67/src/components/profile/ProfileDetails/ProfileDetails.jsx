//Misc imports
import "./ProfileDetails.css";

//Dependency imports
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

//Component imports
import EditProfileDetails from "../EditProfileDetails/EditProfileDetails";
import EditButton from "../../buttons/EditButton/EditButton";
import BlockButton from "../../buttons/BlockButton/BlockButton";

//Services
import { updateUserDetails } from "../../../services/users.service";

function ProfileDetails() {
  const [editMode, setEditMode] = useState(false);
  const { displayUserData, isOwnProfile, userData, username } =
    useOutletContext();
  const [blocked, setBlocked] = useState(displayUserData?.blocked || false);

  const toggleEditMode = () => setEditMode(!editMode);
  const toggleBlockMode = async () => {
    setBlocked(!blocked);
    try {
      const newDetails = displayUserData;
      newDetails.blocked = !blocked;
      updateUserDetails(username, newDetails);
    } catch (e) {
      console.log(e);
      setBlocked(!blocked);
    }
  };

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

      {!isOwnProfile && userData.admin && (
        <BlockButton
          toggleBlockMode={toggleBlockMode}
          blocked={blocked}
        ></BlockButton>
      )}
    </div>
  );
}

export default ProfileDetails;
