//Misc imports
import "./Register.css";

//Dependency imports
import { useState, useEffect, useContext } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

//Component imports
import RegisterFrom from "../../components/forms/RegisterForm/RegisterForm";
import StandardCard from "../../components/containers/StandardCard/StandardCard";
import RegistrationSuccess from "../../components/informational/RegistrationSuccess/RegistrationSuccess";

//Constants
import {
  nameRegex,
  usernameRegex,
  emailRegex,
  passwordRegex,
} from "../../constants/regex";

//Services
import { AppContext } from "../../context/AppContext";
import { getUserByHandle } from "../../services/users.service";
import { registerUser } from "../../services/auth.service";
import { createUserHandle } from "../../services/users.service";

function Register() {
  const { onLogout } = useContext(AppContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    username: "",
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return setRegistrationSuccess(false);
  }, []);

  const validate = function () {
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

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Invalid password!";
    }

    //Phone validation
    const phoneNumber = parsePhoneNumberFromString(`+${formData.number}`);

    if (!phoneNumber || !phoneNumber.isValid()) {
      newErrors.number = "Invalid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(formData);
    if (validate()) {
      getUserByHandle(formData.username)
        .then((snapshot) => {
          console.log(snapshot);
          if (snapshot.exists()) {
            throw new Error(
              `Username @${formData.username} has already been taken!`
            );
          }

          return registerUser(
            formData.email,
            formData.password,
            // formData.username
          );
        })
        .then((credentials) => {
          return createUserHandle(
            formData.username,
            credentials.user.uid,
            credentials.user.email,
            formData.firstName,
            formData.lastName,
            formData.number
          );
        })
        .then(() => {
          onLogout();
          setErrors({});

          setFormData({
            firstName: "",
            lastName: "",
            number: "",
            username: "",
            email: "",
            password: "",
          });

          setRegistrationSuccess(true);
        })
        .catch((e) => {
          console.log(e.message);
          console.log(errors);
          setErrors({ ...errors, message: e.message });
        });
    }
  };

  return !registrationSuccess ? (
    <StandardCard>
      <RegisterFrom
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        formData={formData}
        errors={errors}
      ></RegisterFrom>
    </StandardCard>
  ) : (
    <StandardCard>
      <RegistrationSuccess></RegistrationSuccess>
    </StandardCard>
  );
}

export default Register;
