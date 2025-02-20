import "./SubmitButton.css";
function SubmitButton({ label, onClick, className }) {
  return (
    <button
      className={`submit-button ${className}`}
      type="submit"
      name={label}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default SubmitButton;
