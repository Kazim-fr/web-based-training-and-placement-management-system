import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GraduationCap, CheckCircle } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', enrollment: '', branch: '', year: '', cgpa: '',
    phone: '', email: '', password: '', confirmPassword: '',
    skills: '', backlogs: '0', linkedin: '', github: ''
  })

  const update = (key, val) => setForm({...form, [key]: val})

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)' }}>
        <div className="card slide-up" style={{ maxWidth: 480, textAlign: 'center' }}>
          <div className="card-body" style={{ padding: '3rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle size={32} color="#065F46" />
            </div>
            <h2 style={{ marginBottom: '0.75rem' }}>Registration Successful!</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: '2rem' }}>
              Your account has been created. You can now login to the student portal.
            </p>
            <Link to="/login/student" className="btn btn-primary btn-lg">Go to Login</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)', padding: '2rem' }}>
      <div className="card slide-up" style={{ width: '100%', maxWidth: 600 }}>
        <div className="card-body" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <GraduationCap size={28} color="#F5A623" />
            </div>
            <h2 style={{ fontSize: '1.4rem' }}>Student Registration</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.375rem' }}>Create your placement portal account</p>
          </div>

          {/* Progress Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                width: s === step ? 32 : 10,
                height: 10,
                borderRadius: 5,
                background: s <= step ? 'var(--navy)' : 'var(--gray-200)',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="fade-in">
                <h4 style={{ marginBottom: '1.25rem', color: 'var(--navy)' }}>Personal Information</h4>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Enter full name" value={form.name} onChange={e => update('name', e.target.value)} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" placeholder="you@sati.ac.in" value={form.email} onChange={e => update('email', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input className="form-input" type="tel" placeholder="10-digit number" value={form.phone} onChange={e => update('phone', e.target.value)} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <input className="form-input" type="password" placeholder="Create password" value={form.password} onChange={e => update('password', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password *</label>
                    <input className="form-input" type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="fade-in">
                <h4 style={{ marginBottom: '1.25rem', color: 'var(--navy)' }}>Academic Details</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Enrollment Number *</label>
                    <input className="form-input" placeholder="e.g. SATI2023001" value={form.enrollment} onChange={e => update('enrollment', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Branch *</label>
                    <select className="form-input" value={form.branch} onChange={e => update('branch', e.target.value)} required>
                      <option value="">Select Branch</option>
                      <option>Computer Science</option>
                      <option>Electronics</option>
                      <option>Mechanical</option>
                      <option>Civil</option>
                      <option>Electrical</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Year *</label>
                    <select className="form-input" value={form.year} onChange={e => update('year', e.target.value)} required>
                      <option value="">Select Year</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">CGPA *</label>
                    <input className="form-input" type="number" step="0.1" min="0" max="10" placeholder="e.g. 8.5" value={form.cgpa} onChange={e => update('cgpa', e.target.value)} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Active Backlogs</label>
                  <input className="form-input" type="number" min="0" placeholder="0" value={form.backlogs} onChange={e => update('backlogs', e.target.value)} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="fade-in">
                <h4 style={{ marginBottom: '1.25rem', color: 'var(--navy)' }}>Skills & Links</h4>
                <div className="form-group">
                  <label className="form-label">Skills (comma-separated)</label>
                  <input className="form-input" placeholder="e.g. React, Python, Java" value={form.skills} onChange={e => update('skills', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn Profile</label>
                  <input className="form-input" placeholder="linkedin.com/in/username" value={form.linkedin} onChange={e => update('linkedin', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub Profile</label>
                  <input className="form-input" placeholder="github.com/username" value={form.github} onChange={e => update('github', e.target.value)} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {step > 1 && (
                <button type="button" className="btn btn-ghost btn-lg" onClick={() => setStep(step - 1)}>
                  Back
                </button>
              )}
              <div style={{ flex: 1 }} />
              {step < 3 ? (
                <button type="button" className="btn btn-primary btn-lg" onClick={() => setStep(step + 1)}>
                  Continue
                </button>
              ) : (
                <button type="submit" className="btn btn-accent btn-lg">
                  Complete Registration
                </button>
              )}
            </div>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            Already registered? <Link to="/login/student" style={{ color: 'var(--navy)', fontWeight: 600 }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
