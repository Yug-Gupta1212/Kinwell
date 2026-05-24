import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Home, Shield, MessageCircle, Users, Camera, Bell, User, X, Wifi, WifiOff } from 'lucide-react'

const NOTIFICATIONS = [
  { id: 1, title: 'OPV Booster Overdue', desc: 'Your child\'s OPV Booster was due on Apr 5. Please visit your nearest PHC.', time: '2 hours ago', type: 'urgent', icon: '🚨' },
  { id: 2, title: 'DPT 3rd Dose Coming Up', desc: 'Scheduled for Apr 18, 2026. Set a reminder now.', time: '1 day ago', type: 'info', icon: '💉' },
  { id: 3, title: 'Skin Scan Complete', desc: 'Your last scan showed Normal results. Keep up the good habits!', time: '3 days ago', type: 'success', icon: '✅' },
  { id: 4, title: 'New Health Tip', desc: 'Stay hydrated during summer. Drink 8-10 glasses of water daily.', time: '5 days ago', type: 'info', icon: '💡' },
]

export default function Layout() {
  const location = useLocation()
  const [showNotif, setShowNotif] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [notifs, setNotifs] = useState(NOTIFICATIONS)

  const dismissNotif = (id) => setNotifs(notifs.filter(n => n.id !== id))

  return (
    <div className="app-layout">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="offline-banner">
          <WifiOff size={14} /> You're offline — data saved locally
        </div>
      )}

      {/* Top Header */}
      <header className="top-header">
        <div className="logo-area">
          <div className="logo-icon">🩺</div>
          <div className="logo-text">Kin<span>Well</span></div>
        </div>
        <div className="header-actions">
          <button
            className="header-btn"
            onClick={() => setIsOnline(!isOnline)}
            aria-label="Toggle online/offline"
            title={isOnline ? 'Online' : 'Offline'}
          >
            {isOnline ? <Wifi size={17} /> : <WifiOff size={17} />}
          </button>
          <button
            className={`header-btn ${notifs.length > 0 ? 'notification-badge' : ''}`}
            onClick={() => setShowNotif(true)}
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>
          <NavLink to="/profile" className="header-btn" aria-label="Profile">
            <User size={18} />
          </NavLink>
        </div>
      </header>

      {/* Notification Panel */}
      {showNotif && (
        <div className="modal-overlay" onClick={() => setShowNotif(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem' }}>
                🔔 Notifications
              </h2>
              <button onClick={() => setShowNotif(false)} style={{ color: 'var(--gray-400)' }}><X size={20} /></button>
            </div>
            {notifs.length === 0 ? (
              <div className="empty-state" style={{ padding: '32px 0' }}>
                <div className="empty-state-icon">🔔</div>
                <h3 className="empty-state-title">All caught up!</h3>
                <p className="empty-state-desc">No new notifications</p>
              </div>
            ) : (
              notifs.map(n => (
                <div key={n.id} className={`notif-card notif-${n.type}`}>
                  <span className="notif-icon">{n.icon}</span>
                  <div className="notif-body">
                    <p className="notif-title">{n.title}</p>
                    <p className="notif-desc">{n.desc}</p>
                    <p className="notif-time">{n.time}</p>
                  </div>
                  <button className="notif-dismiss" onClick={() => dismissNotif(n.id)} aria-label="Dismiss">
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="app-content">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav" aria-label="Main navigation">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <Home size={22} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/vaccines" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Shield size={22} />
          <span>Vaccines</span>
        </NavLink>
        <NavLink to="/scan" className="nav-item-center">
          <button className="scan-btn" aria-label="Scan skin"><Camera size={24} /></button>
          <span>Scan</span>
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <MessageCircle size={22} />
          <span>Chat</span>
        </NavLink>
        <NavLink to="/asha" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={22} />
          <span>ASHA</span>
        </NavLink>
      </nav>
    </div>
  )
}
