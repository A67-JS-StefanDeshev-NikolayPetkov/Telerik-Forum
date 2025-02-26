import "./EditProfileDetails.css";
import { useState } from "react";

//Component imports
import SubmitButton from "../../SubmitButton/SubmitButton";
import FieldError from "../../forms/FieldError/FieldError";

import { validateUserDetails } from "../../../utils/helpers";
import { updateUserHandle } from "../../../services/users.service";

function EditProfileDetails({ userData, toggleEditMode }) {
  const [formData, setFormData] = useState(userData);
  const [errors, setErrors] = useState({});

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (validateUserDetails(formData, setErrors)) {
      updateUserHandle(formData)
        .then(() => {
          toggleEditMode();
          location.reload();
        })
        .catch((error) => {
          setErrors({ ...errors, message: error });
        });
    }
  }

  return (
    <form
      className="profile-details-form"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="first-name">First name:</label>
        <input
          className="edit-input"
          type="text"
          id="first-name"
          name="firstName"
          required
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
        {errors.firstName && <FieldError label={errors.firstName}></FieldError>}
      </div>

      <div>
        <label htmlFor="last-name">Last name:</label>
        <input
          className="edit-input"
          type="text"
          id="last-name"
          name="lastName"
          required
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
        {errors.lastName && <FieldError label={errors.lastName}></FieldError>}
      </div>

      <div>
        <label htmlFor="number">Mobile:</label>
        <input
          className="edit-input"
          type="text"
          id="number"
          name="number"
          required
          placeholder="Enter your first name"
          value={formData.number}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
        {errors.number && <FieldError label={errors.number}></FieldError>}
      </div>

      {errors.message && (
        <div autoFocus>
          <p
            ref={paragraphRef}
            tabIndex={-1}
          >
            {errors.message}
          </p>
        </div>
      )}

      <SubmitButton label={"Update"}></SubmitButton>
    </form>
  );
}

export default EditProfileDetails;
