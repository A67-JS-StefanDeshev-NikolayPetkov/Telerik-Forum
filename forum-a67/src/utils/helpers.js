//Constants
import {
  nameRegex,
  usernameRegex,
  emailRegex,
  passwordRegex,
} from "../constants/regex";

import { parsePhoneNumberFromString } from "libphonenumber-js";

export const validateUserDetails = function (formData, setErrors) {
  const newErrors = {};

  //Regex validations
  if (!nameRegex.test(formData.firstName)) {
    newErrors.firstName = "Invalid first name!";
  }
  if (!nameRegex.test(formData.lastName)) {
    newErrors.lastName = "Invalid last name!";
  }

  if (!usernameRegex.test(formData.username)) {
    newErrors.username = "Invalid username!";
  }

  if (!emailRegex.test(formData.email)) {
    newErrors.email = "Invalid email!";
  }

  if (formData.password) {
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Invalid password!";
    }
  }

  //Phone validation
  const phoneNumber = parsePhoneNumberFromString(`+${formData.number}`);

  if (!phoneNumber || !phoneNumber.isValid()) {
    newErrors.number = "Invalid phone number";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
