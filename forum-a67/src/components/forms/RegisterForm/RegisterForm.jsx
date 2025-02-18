//Misc imports
import "./RegisterForm.css";
import "react-phone-input-2/lib/style.css";

//Dependency imports
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

//Component imports
import SubmitButton from "../../SubmitButton/SubmitButton";
import FieldError from "../FieldError/FieldError";

function RegisterForm({ handleInput, handleSubmit, formData, errors }) {
  return (
    <form
      className="register-form"
      onSubmit={handleSubmit}
    >
      <h2>Register</h2>

      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          className="register-input"
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
        <label htmlFor="lastName">Last Name</label>
        <input
          className="register-input"
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
        <label htmlFor="username">Username</label>
        <input
          className="register-input"
          type="text"
          id="username"
          name="username"
          required
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
        {errors.username && <FieldError label={errors.username}></FieldError>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          className="register-input"
          type="text"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
        {errors.email && <FieldError label={errors.email}></FieldError>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          className="register-input"
          type="password"
          id="password"
          name="password"
          required
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
        {errors.password && <FieldError label={errors.password}></FieldError>}
      </div>

      <div>
        <label htmlFor="number">Number</label>
        <PhoneInput
          className="register-input"
          type="tel"
          id="number"
          name="number"
          placeholder="Enter your number"
          value={formData.number}
          onChange={(value) => {
            handleInput({
              name: "number",
              value: value,
            });
          }}
        />
        {errors.number && <FieldError label={errors.number}></FieldError>}
      </div>

      <div className="redirection-links">
        <div className="redirection-link">
          Already registered? <Link to="/login">Click here.</Link>
        </div>
      </div>

      <SubmitButton label="Register"></SubmitButton>
    </form>
  );
}

export default RegisterForm;
