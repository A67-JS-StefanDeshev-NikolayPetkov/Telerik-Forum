import "./SubmitButton.css";
function SubmitButton({ label }) {
  return (
    <button
      className="submit-button"
      type="submit"
    >
      {label}
    </button>
  );
}

export default SubmitButton;
