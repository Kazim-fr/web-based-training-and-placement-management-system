import { useState } from 'react'
import { Bell, Check, CheckCheck } from 'lucide-react'
import { mockNotifications } from '../../data/mockAnnouncements'

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})))
  }

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div>
      <div className="page-header page-header-actions">
        <div>
          <h1>Notifications</h1>
          <p>{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={markAllRead}>
          <CheckCheck size={16} /> Mark All Read
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {notifications.map(n => (
          <div key={n.id} className="card" style={{ background: n.read ? 'var(--white)' : 'var(--gold-100)', borderColor: n.read ? 'var(--gray-200)' : 'var(--gold-300)', cursor: 'pointer' }} onClick={() => markRead(n.id)}>
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: n.read ? 'var(--gray-100)' : 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {n.read ? <Check size={18} color="var(--gray-400)" /> : <Bell size={18} color="var(--gold)" />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.9rem', fontWeight: n.read ? 400 : 500, color: n.read ? 'var(--gray-600)' : 'var(--gray-800)' }}>{n.message}</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{n.time}</span>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
