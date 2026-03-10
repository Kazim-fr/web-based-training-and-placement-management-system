import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Eye, EyeOff } from 'lucide-react'

export default function StudentLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/student/dashboard')
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)', padding: '2rem' }}>
      <div className="card slide-up" style={{ width: '100%', maxWidth: 440 }}>
        <div className="card-body" style={{ padding: '2.5rem' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <GraduationCap size={28} color="#F5A623" />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Student Login</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginTop: '0.375rem' }}>Access your placement portal</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email / Enrollment Number</label>
              <input className="form-input" type="text" placeholder="e.g. aarav@sati.ac.in" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: '2.5rem' }} required />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--gray-400)', cursor: 'pointer' }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)', cursor: 'pointer' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ color: 'var(--navy-400)', fontWeight: 500 }}>Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Sign In
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            Not registered? <Link to="/register" style={{ color: 'var(--navy)', fontWeight: 600 }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
