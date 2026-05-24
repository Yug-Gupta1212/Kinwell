import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const CHILD_VACCINES = [
  { name: 'BCG', age: 'At birth', status: 'completed', date: 'Jan 15, 2024' },
  { name: 'OPV-0', age: 'At birth', status: 'completed', date: 'Jan 15, 2024' },
  { name: 'Hepatitis B (Birth dose)', age: 'At birth', status: 'completed', date: 'Jan 15, 2024' },
  { name: 'OPV-1 + IPV-1', age: '6 weeks', status: 'completed', date: 'Feb 28, 2024' },
  { name: 'Pentavalent-1', age: '6 weeks', status: 'completed', date: 'Feb 28, 2024' },
  { name: 'Rotavirus-1', age: '6 weeks', status: 'completed', date: 'Feb 28, 2024' },
  { name: 'PCV-1', age: '6 weeks', status: 'completed', date: 'Feb 28, 2024' },
  { name: 'OPV-2 + IPV-2', age: '10 weeks', status: 'completed', date: 'Mar 28, 2024' },
  { name: 'Pentavalent-2', age: '10 weeks', status: 'completed', date: 'Mar 28, 2024' },
  { name: 'Rotavirus-2', age: '10 weeks', status: 'completed', date: 'Mar 28, 2024' },
  { name: 'OPV-3 + IPV-3', age: '14 weeks', status: 'completed', date: 'Apr 25, 2024' },
  { name: 'Pentavalent-3', age: '14 weeks', status: 'completed', date: 'Apr 25, 2024' },
  { name: 'Rotavirus-3', age: '14 weeks', status: 'missed', date: 'Missed' },
  { name: 'Measles/MR 1st dose', age: '9 months', status: 'pending', date: 'Due: Oct 2024' },
  { name: 'JE-1', age: '9 months', status: 'pending', date: 'Due: Oct 2024' },
  { name: 'Vitamin A (1st dose)', age: '9 months', status: 'upcoming', date: 'Due: Oct 2024' },
  { name: 'DPT Booster-1', age: '16-24 months', status: 'upcoming', date: 'May 2025' },
  { name: 'Measles/MR 2nd dose', age: '16-24 months', status: 'upcoming', date: 'May 2025' },
  { name: 'OPV Booster', age: '16-24 months', status: 'upcoming', date: 'May 2025' },
]

const ADULT_VACCINES = [
  { name: 'Td (Tetanus + Diphtheria)', age: 'Every 10 years', status: 'completed', date: 'Jun 2023' },
  { name: 'Influenza (Flu)', age: 'Annually', status: 'pending', date: 'Due: Sep 2026' },
  { name: 'Hepatitis B (3-dose series)', age: 'If not immunized', status: 'completed', date: 'Mar 2022' },
  { name: 'HPV Vaccine', age: '9-26 years', status: 'completed', date: 'Aug 2021' },
  { name: 'COVID-19 Booster', age: 'As recommended', status: 'pending', date: 'Due: Apr 2026' },
  { name: 'Pneumococcal (PCV13/PPSV23)', age: '65+ years', status: 'upcoming', date: 'Scheduled' },
  { name: 'Shingles (Zoster)', age: '50+ years', status: 'upcoming', date: 'Scheduled' },
]

const statusEmoji = {
  completed: '✅',
  pending: '⏳',
  missed: '❌',
  upcoming: '🔜',
}

export default function VaccineTracker() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('child')
  const vaccines = tab === 'child' ? CHILD_VACCINES : ADULT_VACCINES

  const completedCount = vaccines.filter(v => v.status === 'completed').length
  const missedCount = vaccines.filter(v => v.status === 'missed').length
  const pendingCount = vaccines.filter(v => v.status === 'pending').length

  return (
    <div className="fade-in">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate('/')} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">Vaccine Tracker</h1>
      </div>

      {/* Stats Row */}
      <div className="asha-stats">
        <div className="asha-stat-card">
          <div className="asha-stat-val" style={{ color: 'var(--success-600)' }}>{completedCount}</div>
          <div className="asha-stat-label">Completed</div>
        </div>
        <div className="asha-stat-card">
          <div className="asha-stat-val" style={{ color: 'var(--warning-600)' }}>{pendingCount}</div>
          <div className="asha-stat-label">Pending</div>
        </div>
        <div className="asha-stat-card">
          <div className="asha-stat-val" style={{ color: 'var(--danger-600)' }}>{missedCount}</div>
          <div className="asha-stat-label">Missed</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="vaccine-tabs">
        <button
          className={`vaccine-tab ${tab === 'child' ? 'active' : ''}`}
          onClick={() => setTab('child')}
          id="tab-child"
        >
          👶 Child
        </button>
        <button
          className={`vaccine-tab ${tab === 'adult' ? 'active' : ''}`}
          onClick={() => setTab('adult')}
          id="tab-adult"
        >
          🧑 Adult
        </button>
      </div>

      {/* Missed dose alert */}
      {missedCount > 0 && (
        <div className="disclaimer-banner" style={{ borderLeftColor: 'var(--danger-500)', background: 'var(--danger-50)' }}>
          <span style={{ fontSize: '1.1rem' }}>⚠️</span>
          <p className="disclaimer-text" style={{ color: 'var(--danger-600)' }}>
            <strong>{missedCount} missed dose{missedCount > 1 ? 's' : ''} detected!</strong> Please consult your healthcare provider about catch-up vaccination.
          </p>
        </div>
      )}

      {/* Timeline */}
      <div className="vaccine-timeline">
        {vaccines.map((vaccine, i) => (
          <div className="timeline-item" key={i}>
            <div className={`timeline-dot ${vaccine.status}`}>
              {statusEmoji[vaccine.status]}
            </div>
            <div className="timeline-content">
              <p className="timeline-name">{vaccine.name}</p>
              <p className="timeline-age">Age: {vaccine.age} • {vaccine.date}</p>
              <span className={`timeline-status status-${vaccine.status}`}>
                {vaccine.status === 'completed' && '✓ Completed'}
                {vaccine.status === 'pending' && '⏳ Pending'}
                {vaccine.status === 'missed' && '✗ Missed'}
                {vaccine.status === 'upcoming' && '→ Upcoming'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
