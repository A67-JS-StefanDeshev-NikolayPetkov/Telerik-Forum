import './InfoSection.css';
function InfoSection({infoTitle, infoText }) {
  return (
    <div className="info-section">
        <h4>{infoTitle}</h4>
        <p>{infoText}</p>
    </div>
  )
}

export default InfoSection