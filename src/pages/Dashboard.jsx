import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()

  const vaccines = [
    { name: 'OPV Booster', date: 'Due: Apr 5, 2026', status: 'urgent', icon: '💉', badge: 'Overdue', badgeClass: 'badge-urgent' },
    { name: 'DPT 3rd Dose', date: 'Due: Apr 18, 2026', status: 'upcoming', icon: '💉', badge: 'In 18 days', badgeClass: 'badge-upcoming' },
    { name: 'Hepatitis B', date: 'Completed: Mar 15', status: 'done', icon: '✅', badge: 'Done', badgeClass: 'badge-done' },
  ]

  return (
    <div className="fade-in">
      {/* Welcome */}
      <section className="welcome-section">
        <p className="greeting">Good morning 👋</p>
        <h1 className="greeting-name">Priya Sharma</h1>
      </section>

      {/* Health Score */}
      <div className="health-score-card">
        <div className="health-score-top">
          <div>
            <p className="health-score-label">Health Score</p>
            <p className="health-score-value">82<span>/100</span></p>
          </div>
          <div className="health-score-circle">
            <svg viewBox="0 0 72 72">
              <circle className="track" cx="36" cy="36" r="30" />
              <circle
                className="progress"
                cx="36" cy="36" r="30"
                strokeDasharray={`${2 * Math.PI * 30}`}
                strokeDashoffset={`${2 * Math.PI * 30 * (1 - 0.82)}`}
              />
            </svg>
          </div>
        </div>
        <div className="health-score-stats">
          <div className="health-stat">
            <div className="health-stat-icon">💉</div>
            <div className="health-stat-val">12/14</div>
            <div className="health-stat-name">Vaccines</div>
          </div>
          <div className="health-stat">
            <div className="health-stat-icon">🔬</div>
            <div className="health-stat-val">3</div>
            <div className="health-stat-name">Scans</div>
          </div>
          <div className="health-stat">
            <div className="health-stat-icon">📋</div>
            <div className="health-stat-val">Good</div>
            <div className="health-stat-name">Status</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="section-title">Quick Actions</h2>
      <div className="quick-actions">
        <div className="quick-action-card skin-scan" onClick={() => navigate('/scan')} role="button" tabIndex={0} id="qa-skin-scan">
          <div className="qa-icon teal">🔬</div>
          <div className="qa-label">Skin Scan</div>
          <div className="qa-desc">AI-powered analysis</div>
        </div>
        <div className="quick-action-card vaccine" onClick={() => navigate('/vaccines')} role="button" tabIndex={0} id="qa-vaccines">
          <div className="qa-icon blue">💉</div>
          <div className="qa-label">Vaccines</div>
          <div className="qa-desc">Track & schedule</div>
        </div>
        <div className="quick-action-card chatbot" onClick={() => navigate('/chat')} role="button" tabIndex={0} id="qa-chatbot">
          <div className="qa-icon orange">🗣️</div>
          <div className="qa-label">Health Chat</div>
          <div className="qa-desc">Ask in your language</div>
        </div>
        <div className="quick-action-card asha" onClick={() => navigate('/asha')} role="button" tabIndex={0} id="qa-asha">
          <div className="qa-icon green">👩‍⚕️</div>
          <div className="qa-label">ASHA Mode</div>
          <div className="qa-desc">Manage families</div>
        </div>
      </div>

      {/* Upcoming Vaccines */}
      <h2 className="section-title">
        Vaccine Alerts
        <button className="see-all" onClick={() => navigate('/vaccines')}>See all</button>
      </h2>
      {vaccines.map((v, i) => (
        <div className="vaccine-alert-card" key={i} onClick={() => navigate('/vaccines')}>
          <div className={`vaccine-alert-icon ${v.status}`}>
            <span>{v.icon}</span>
          </div>
          <div className="vaccine-alert-info">
            <div className="vaccine-alert-name">{v.name}</div>
            <div className="vaccine-alert-date">{v.date}</div>
          </div>
          <span className={`vaccine-alert-badge ${v.badgeClass}`}>{v.badge}</span>
        </div>
      ))}

      {/* Disclaimer */}
      <div className="disclaimer-banner">
        <AlertTriangle size={18} />
        <p className="disclaimer-text">
          <strong>Disclaimer:</strong> KinWell provides AI-based health guidance only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </div>
    </div>
  )
}
