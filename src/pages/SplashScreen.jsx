export default function SplashScreen({ onGetStarted }) {
  return (
    <div className="splash-screen">
      <div className="splash-logo">🩺</div>
      <h1 className="splash-title">KinWell</h1>
      <p className="splash-tagline">Your Digital Health Assistant</p>

      <div className="splash-features">
        <div className="splash-feature">
          <span className="splash-feature-icon">🔬</span>
          <span>AI Skin Analysis</span>
        </div>
        <div className="splash-feature">
          <span className="splash-feature-icon">💉</span>
          <span>Smart Vaccine Reminders</span>
        </div>
        <div className="splash-feature">
          <span className="splash-feature-icon">🗣️</span>
          <span>Multilingual Voice Support</span>
        </div>
        <div className="splash-feature">
          <span className="splash-feature-icon">📶</span>
          <span>Works Offline</span>
        </div>
      </div>

      <button className="splash-btn" onClick={onGetStarted} id="get-started-btn">
        Get Started →
      </button>
    </div>
  )
}
