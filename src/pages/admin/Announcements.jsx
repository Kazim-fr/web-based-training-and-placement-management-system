import { useState } from 'react'
import { Send, Plus, Megaphone } from 'lucide-react'
import { mockAnnouncements } from '../../data/mockAnnouncements'

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', content: '', priority: 'medium' })

  const handleSend = (e) => {
    e.preventDefault()
    const newAnnouncement = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString().split('T')[0],
      author: 'T&P Cell'
    }
    setAnnouncements([newAnnouncement, ...announcements])
    setForm({ title: '', content: '', priority: 'medium' })
    setShowForm(false)
  }

  const priorityColors = { high: 'badge-applied', medium: 'badge-shortlisted', low: 'badge-pending' }

  return (
    <div>
      <div className="page-header page-header-actions">
        <div>
          <h1>Announcements</h1>
          <p>Create and manage placement announcements</p>
        </div>
        <button className="btn btn-accent" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> New Announcement
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header"><h3>Create Announcement</h3></div>
          <div className="card-body">
            <form onSubmit={handleSend}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input className="form-input" placeholder="Announcement title..." value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select className="form-input" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea className="form-input" placeholder="Write the announcement..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={4} required />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" className="btn btn-primary"><Send size={16} /> Publish</button>
                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {announcements.map(a => (
          <div key={a.id} className="card">
            <div className="card-body" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--gold-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Megaphone size={20} color="var(--gold-600)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '0.95rem' }}>{a.title}</h4>
                  <span className={`badge ${priorityColors[a.priority]}`}>{a.priority}</span>
                </div>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', lineHeight: 1.6 }}>{a.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--gray-400)' }}>
                  <span>By: {a.author}</span>
                  <span>{a.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
