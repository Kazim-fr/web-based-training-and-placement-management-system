import { Megaphone } from 'lucide-react'
import { mockAnnouncements } from '../../data/mockAnnouncements'

const priorityColors = { high: 'badge-applied', medium: 'badge-shortlisted', low: 'badge-pending' }

export default function Announcements() {
  return (
    <div>
      <div className="page-header">
        <h1>Announcements</h1>
        <p>Latest updates from the Training & Placement Cell</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {mockAnnouncements.map(a => (
          <div key={a.id} className="card">
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--gold-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.125rem' }}>
                  <Megaphone size={20} color="var(--gold-600)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <h3 style={{ fontSize: '1rem' }}>{a.title}</h3>
                    <span className={`badge ${priorityColors[a.priority]}`}>{a.priority}</span>
                  </div>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>{a.content}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--gray-400)' }}>
                    <span>By: {a.author}</span>
                    <span>{a.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
