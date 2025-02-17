//Misc imports
import "./RegisterForm.css";

//Dependency imports
import { Link } from "react-router-dom";

//Component imports
import SubmitButton from "../../SubmitButton/SubmitButton";

function RegisterForm({ handleInput, handleSubmit, formData }) {
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
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input
          className="register-input"
          type="text"
          id="username"
          name="username"
          required
          placeholder="Enter your username or email"
          value={formData.username}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
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
      </div>

      <div>
        <label htmlFor="number">Number</label>
        <input
          className="register-input"
          type="text"
          id="number"
          name="number"
          placeholder="Enter your number"
          value={formData.number}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
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
