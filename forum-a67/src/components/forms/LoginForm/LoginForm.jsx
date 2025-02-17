//Misc imports
import "./LoginForm.css";

//Dependency imports
import { Link } from "react-router-dom";

//Component imports
import SubmitButton from "../../SubmitButton/SubmitButton";

function LoginForm({ formData, handleInput, handleSubmit }) {
  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
    >
      <h2>Login</h2>

      <div>
        <label htmlFor="username">Username or Email</label>
        <input
          className="login-input"
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
          className="login-input"
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
      <div className="redirection-links">
        {/* <div className="redirection-link">
          <Link>Forgot password?</Link>
        </div> */}
        <div className="redirection-link">
          New user? <Link to="/register">Register here.</Link>
        </div>
      </div>

      <SubmitButton label="Login"></SubmitButton>
    </form>
  );
}

export default LoginForm;
