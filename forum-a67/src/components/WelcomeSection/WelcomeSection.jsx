import InfoSection from "../InfoSection/InfoSection"
import SubmitButton from "../SubmitButton/SubmitButton"
import './WelcomeSection.css';

function WelcomeSection() {
  return (
    <div className="welcome-section">
        <h1>Welcome to BigMount!</h1>
        <div className="welcome-section__info">
            <InfoSection infoTitle = 'Users' infoText = {10000} />
            <InfoSection infoTitle = 'Posts' infoText = {100000} />
        </div>
        <p>Experience the modern Bulgarian mountaineering forum.</p>
        <p>Join our growing community:</p>
        <SubmitButton label = 'register' />
    </div>
  )
}

export default WelcomeSection