import { Calendar, Clock, MapPin, Building2 } from 'lucide-react'
import { interviewSchedule } from '../../data/mockStats'

export default function Schedule() {
  const upcoming = interviewSchedule.filter(i => i.status === 'upcoming')
  const completed = interviewSchedule.filter(i => i.status === 'completed')

  return (
    <div>
      <div className="page-header">
        <h1>Interview Schedule</h1>
        <p>Your upcoming and past interview sessions</p>
      </div>

      <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Calendar size={20} color="var(--gold)" /> Upcoming
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {upcoming.map(item => (
          <div key={item.id} className="card">
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, background: 'var(--gold-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Building2 size={22} color="var(--gold-600)" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.125rem' }}>{item.company}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{item.type}</p>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {item.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {item.time}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {item.venue}</span>
              </div>
              <span className="badge badge-shortlisted">Upcoming</span>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '1rem', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Clock size={20} /> Past Interviews
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {completed.map(item => (
          <div key={item.id} className="card" style={{ opacity: 0.7 }}>
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Building2 size={22} color="var(--gray-400)" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.125rem' }}>{item.company}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{item.type}</p>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                {item.date} · {item.time} · {item.venue}
              </div>
              <span className="badge badge-pending">Completed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
