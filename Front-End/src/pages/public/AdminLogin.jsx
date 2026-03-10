import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/admin/dashboard')
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)', padding: '2rem' }}>
      <div className="card slide-up" style={{ width: '100%', maxWidth: 440 }}>
        <div className="card-body" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Shield size={28} color="#F5A623" />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Admin Login</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginTop: '0.375rem' }}>Training & Placement Officer Portal</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Admin ID</label>
              <input className="form-input" type="text" placeholder="Enter admin ID" value={id} onChange={e => setId(e.target.value)} required />
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
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
              Sign In as Admin
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--gray-400)', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            🔒 This portal is restricted to authorized T&P Cell officials only.
          </div>
        </div>
      </div>
    </div>
  )
}
