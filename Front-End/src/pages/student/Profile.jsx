import { useState } from 'react'
import { Save, Upload, User, BookOpen, Code, Link as LinkIcon } from 'lucide-react'
import { currentStudent } from '../../data/mockStudents'

export default function Profile() {
  const [form, setForm] = useState({
    name: currentStudent.name,
    enrollment: currentStudent.enrollment,
    branch: currentStudent.branch,
    year: currentStudent.year,
    cgpa: currentStudent.cgpa,
    phone: currentStudent.phone,
    email: currentStudent.email,
    skills: currentStudent.skills.join(', '),
    backlogs: currentStudent.backlogs,
    linkedin: currentStudent.linkedin,
    github: currentStudent.github,
  })
  const [saved, setSaved] = useState(false)

  const update = (key, val) => setForm({...form, [key]: val})
  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="page-header page-header-actions">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal and academic information</p>
        </div>
        {saved && (
          <span className="badge badge-selected" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>✓ Profile Saved</span>
        )}
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Personal Info */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={18} /> Personal Information</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-input" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen size={18} /> Academic Details</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Enrollment Number</label>
                <input className="form-input" value={form.enrollment} readOnly style={{ background: 'var(--gray-50)' }} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Branch</label>
                  <select className="form-input" value={form.branch} onChange={e => update('branch', e.target.value)}>
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                    <option>Electrical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <select className="form-input" value={form.year} onChange={e => update('year', e.target.value)}>
                    <option>1</option><option>2</option><option>3</option><option>4</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">CGPA</label>
                  <input className="form-input" type="number" step="0.1" value={form.cgpa} onChange={e => update('cgpa', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Active Backlogs</label>
                  <input className="form-input" type="number" value={form.backlogs} onChange={e => update('backlogs', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Code size={18} /> Skills & Resume</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Skills (comma-separated)</label>
                <input className="form-input" value={form.skills} onChange={e => update('skills', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Resume</label>
                <div style={{ border: '2px dashed var(--gray-300)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', textAlign: 'center', background: 'var(--gray-50)', cursor: 'pointer' }}>
                  <Upload size={24} color="var(--gray-400)" />
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
                    Click to upload or drag & drop your resume (PDF)
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '0.25rem' }}>
                    Current: {currentStudent.resume}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={18} /> Social Profiles</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">LinkedIn Profile</label>
                <input className="form-input" value={form.linkedin} onChange={e => update('linkedin', e.target.value)} placeholder="linkedin.com/in/username" />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub Profile</label>
                <input className="form-input" value={form.github} onChange={e => update('github', e.target.value)} placeholder="github.com/username" />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} /> Save Profile
          </button>
        </div>
      </form>
    </div>
  )
}
