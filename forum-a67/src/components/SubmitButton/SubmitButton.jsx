import "./SubmitButton.css";
function SubmitButton({ label, onClick }) {
  return (
    <button
      className="submit-button"
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default SubmitButton;
