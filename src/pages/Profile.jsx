import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()
  const [offlineMode, setOfflineMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [voiceNav, setVoiceNav] = useState(false)

  const settingsGroups = [
    {
      title: 'Health Profile',
      items: [
        { icon: '👤', iconBg: 'var(--primary-50)', label: 'Personal Details', desc: 'Name, age, blood group', hasChevron: true },
        { icon: '👶', iconBg: 'var(--info-50)', label: 'Family Members', desc: '3 members registered', hasChevron: true },
        { icon: '📋', iconBg: 'var(--success-50)', label: 'Health Records', desc: 'Vaccination history, scans', hasChevron: true },
        { icon: '🆔', iconBg: 'var(--accent-50)', label: 'ABHA ID', desc: 'Link your Ayushman Bharat ID', hasChevron: true },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: '🌐', iconBg: 'var(--primary-50)', label: 'Language', desc: 'English (India)', hasChevron: true },
        { icon: '📶', iconBg: 'var(--gray-100)', label: 'Offline Mode', desc: 'Save data locally for offline use', toggle: 'offline' },
        { icon: '🔔', iconBg: 'var(--warning-50)', label: 'Notifications', desc: 'Vaccine reminders & alerts', toggle: 'notifications' },
        { icon: '🗣️', iconBg: 'var(--accent-50)', label: 'Voice Navigation', desc: 'Navigate app using voice', toggle: 'voice' },
      ],
    },
    {
      title: 'Security & Privacy',
      items: [
        { icon: '🔒', iconBg: 'var(--danger-50)', label: 'Data Privacy', desc: 'Your data is encrypted', hasChevron: true },
        { icon: '📄', iconBg: 'var(--gray-100)', label: 'Consent Management', desc: 'Control your data sharing', hasChevron: true },
        { icon: '🗑️', iconBg: 'var(--danger-50)', label: 'Delete Account', desc: 'Permanently remove your data', hasChevron: true },
      ],
    },
    {
      title: 'About',
      items: [
        { icon: 'ℹ️', iconBg: 'var(--info-50)', label: 'About KinWell', desc: 'Version 1.0.0', hasChevron: true },
        { icon: '📞', iconBg: 'var(--success-50)', label: 'Contact Support', desc: 'Get help via phone or chat', hasChevron: true },
        { icon: '⭐', iconBg: 'var(--warning-50)', label: 'Rate the App', desc: 'Help us improve', hasChevron: true },
      ],
    },
  ]

  const getToggleState = (key) => {
    if (key === 'offline') return offlineMode
    if (key === 'notifications') return notifications
    if (key === 'voice') return voiceNav
    return false
  }

  const handleToggle = (key) => {
    if (key === 'offline') setOfflineMode(!offlineMode)
    if (key === 'notifications') setNotifications(!notifications)
    if (key === 'voice') setVoiceNav(!voiceNav)
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate('/')} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">Profile & Settings</h1>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">PS</div>
        <h2 className="profile-name">Priya Sharma</h2>
        <p className="profile-id">ABHA: 1234-5678-9012 • Rampur Village</p>
      </div>

      {/* Settings Groups */}
      {settingsGroups.map((group, gi) => (
        <div className="settings-group" key={gi}>
          <p className="settings-group-title">{group.title}</p>
          {group.items.map((item, ii) => (
            <div
              className="settings-item"
              key={ii}
              onClick={() => item.toggle && handleToggle(item.toggle)}
              role={item.toggle ? 'switch' : 'button'}
              aria-checked={item.toggle ? getToggleState(item.toggle) : undefined}
            >
              <div className="settings-icon" style={{ background: item.iconBg }}>
                {item.icon}
              </div>
              <div className="settings-item-info">
                <p className="settings-item-name">{item.label}</p>
                <p className="settings-item-desc">{item.desc}</p>
              </div>
              {item.hasChevron && (
                <ChevronRight size={18} className="settings-chevron" />
              )}
              {item.toggle && (
                <div className={`toggle-switch ${getToggleState(item.toggle) ? 'active' : ''}`} />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Disclaimer Footer */}
      <div className="disclaimer-banner" style={{ margin: '0 20px 100px' }}>
        <span style={{ fontSize: '1rem' }}>🔒</span>
        <p className="disclaimer-text">
          Your health data is encrypted and stored securely. We never share your data without your explicit consent.
        </p>
      </div>
    </div>
  )
}
