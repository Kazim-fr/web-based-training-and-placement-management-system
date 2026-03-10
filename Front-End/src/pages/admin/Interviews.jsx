import { useState } from 'react'
import { Calendar, Plus, Save, Clock, MapPin, Building2 } from 'lucide-react'
import { interviewSchedule } from '../../data/mockStats'
import { mockCompanies } from '../../data/mockCompanies'

export default function Interviews() {
  const [interviews, setInterviews] = useState(interviewSchedule)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ company: '', date: '', time: '', venue: '', type: '' })

  const update = (key, val) => setForm({...form, [key]: val})

  const handleAdd = (e) => {
    e.preventDefault()
    setInterviews([...interviews, { id: Date.now(), ...form, status: 'upcoming' }])
    setForm({ company: '', date: '', time: '', venue: '', type: '' })
    setShowForm(false)
  }

  return (
    <div>
      <div className="page-header page-header-actions">
        <div>
          <h1>Interview Schedule</h1>
          <p>Manage and schedule interviews for campus recruitment</p>
        </div>
        <button className="btn btn-accent" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> Schedule Interview
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header"><h3>New Interview</h3></div>
          <div className="card-body">
            <form onSubmit={handleAdd}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <select className="form-input" value={form.company} onChange={e => update('company', e.target.value)} required>
                    <option value="">Select Company</option>
                    {mockCompanies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Round Type</label>
                  <input className="form-input" placeholder="e.g. Technical Interview" value={form.type} onChange={e => update('type', e.target.value)} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input className="form-input" type="date" value={form.date} onChange={e => update('date', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input className="form-input" type="time" value={form.time} onChange={e => update('time', e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Venue</label>
                <input className="form-input" placeholder="e.g. Seminar Hall A" value={form.venue} onChange={e => update('venue', e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" className="btn btn-primary"><Save size={16} /> Schedule</button>
                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {interviews.map(item => (
          <div key={item.id} className="card">
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: item.status === 'upcoming' ? 'var(--gold-100)' : 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Building2 size={20} color={item.status === 'upcoming' ? 'var(--gold-600)' : 'var(--gray-400)'} />
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
              <span className={`badge ${item.status === 'upcoming' ? 'badge-shortlisted' : 'badge-pending'}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
