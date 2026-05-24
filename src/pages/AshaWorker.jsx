import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Plus, ChevronRight } from 'lucide-react'

const FAMILIES = [
  {
    id: 1,
    name: 'Sharma Family',
    village: 'Rampur Village',
    head: 'RS',
    members: [
      { name: 'Priya (2 yr)', status: 'vaccinated' },
      { name: 'Rohit (5 yr)', status: 'pending' },
      { name: 'Sunita (Mother)', status: 'vaccinated' },
    ],
  },
  {
    id: 2,
    name: 'Patel Family',
    village: 'Sundarpur Village',
    head: 'AP',
    members: [
      { name: 'Arjun (8 mo)', status: 'missed' },
      { name: 'Kavita (3 yr)', status: 'vaccinated' },
      { name: 'Meena (Mother)', status: 'pending' },
    ],
  },
  {
    id: 3,
    name: 'Kumar Family',
    village: 'Rampur Village',
    head: 'VK',
    members: [
      { name: 'Sita (1 yr)', status: 'vaccinated' },
      { name: 'Ravi (4 yr)', status: 'vaccinated' },
    ],
  },
  {
    id: 4,
    name: 'Singh Family',
    village: 'Laxmipur Village',
    head: 'DS',
    members: [
      { name: 'Neha (6 mo)', status: 'pending' },
      { name: 'Amit (Mother)', status: 'vaccinated' },
    ],
  },
  {
    id: 5,
    name: 'Yadav Family',
    village: 'Sundarpur Village',
    head: 'RY',
    members: [
      { name: 'Gauri (3 mo)', status: 'missed' },
      { name: 'Lakshmi (5 yr)', status: 'vaccinated' },
      { name: 'Anita (Mother)', status: 'vaccinated' },
    ],
  },
]

export default function AshaWorker() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = FAMILIES.filter(
    f => f.name.toLowerCase().includes(search.toLowerCase()) ||
         f.village.toLowerCase().includes(search.toLowerCase())
  )

  const totalFamilies = FAMILIES.length
  const totalMembers = FAMILIES.reduce((sum, f) => sum + f.members.length, 0)
  const missedMembers = FAMILIES.reduce(
    (sum, f) => sum + f.members.filter(m => m.status === 'missed').length, 0
  )

  return (
    <div className="fade-in">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate('/')} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">ASHA Worker Mode</h1>
      </div>

      {/* Stats */}
      <div className="asha-stats">
        <div className="asha-stat-card">
          <div className="asha-stat-val">{totalFamilies}</div>
          <div className="asha-stat-label">Families</div>
        </div>
        <div className="asha-stat-card">
          <div className="asha-stat-val">{totalMembers}</div>
          <div className="asha-stat-label">Members</div>
        </div>
        <div className="asha-stat-card">
          <div className="asha-stat-val" style={{ color: 'var(--danger-600)' }}>{missedMembers}</div>
          <div className="asha-stat-label">Missed Doses</div>
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search families or villages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="asha-search"
        />
      </div>

      {/* Add New */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <button className="btn btn-primary btn-sm" id="add-family-btn">
          <Plus size={16} /> Add Family
        </button>
      </div>

      {/* Family Cards */}
      <h2 className="section-title">
        Registered Families
        <span className="see-all">{filtered.length} found</span>
      </h2>

      {filtered.map((family) => (
        <div className="family-card" key={family.id}>
          <div className="family-card-top">
            <div className="family-avatar">{family.head}</div>
            <div className="family-info">
              <p className="family-name">{family.name}</p>
              <p className="family-village">📍 {family.village}</p>
            </div>
            <ChevronRight size={20} color="var(--gray-300)" />
          </div>
          <div className="family-members">
            {family.members.map((member, i) => (
              <span className={`member-chip ${member.status}`} key={i}>
                {member.status === 'vaccinated' && '✓'}
                {member.status === 'pending' && '⏳'}
                {member.status === 'missed' && '✗'}
                {' '}{member.name}
              </span>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No families found</h3>
          <p className="empty-state-desc">Try a different search term or add a new family.</p>
        </div>
      )}
    </div>
  )
}
