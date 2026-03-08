import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Building2 } from 'lucide-react'

export default function AddCompany() {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: '', role: '', package: '', type: 'IT Services', location: '',
    description: '', deadline: '', minCGPA: '', maxBacklogs: '0',
    branches: [], rounds: ''
  })

  const update = (key, val) => setForm({...form, [key]: val})

  const toggleBranch = (branch) => {
    setForm(prev => ({
      ...prev,
      branches: prev.branches.includes(branch) ? prev.branches.filter(b => b !== branch) : [...prev.branches, branch]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => navigate('/admin/companies'), 1500)
  }

  if (saved) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
          <Building2 size={28} color="#065F46" />
        </div>
        <h3>Company Added Successfully!</h3>
        <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>Redirecting to companies list...</p>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => navigate('/admin/companies')} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem' }}>
        <ArrowLeft size={16} /> Back to Companies
      </button>

      <div className="page-header">
        <h1>Add New Company</h1>
        <p>Fill in the company details for campus recruitment</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="card">
            <div className="card-header"><h3>Company Details</h3></div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input className="form-input" placeholder="e.g. Tata Consultancy Services" value={form.name} onChange={e => update('name', e.target.value)} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Job Role *</label>
                  <input className="form-input" placeholder="e.g. Software Developer" value={form.role} onChange={e => update('role', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Package *</label>
                  <input className="form-input" placeholder="e.g. 7.0 LPA" value={form.package} onChange={e => update('package', e.target.value)} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Company Type</label>
                  <select className="form-input" value={form.type} onChange={e => update('type', e.target.value)}>
                    <option>IT Services</option>
                    <option>Product</option>
                    <option>Core Engineering</option>
                    <option>PSU</option>
                    <option>Consulting</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input className="form-input" placeholder="e.g. Mumbai" value={form.location} onChange={e => update('location', e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" placeholder="Brief about the company..." value={form.description} onChange={e => update('description', e.target.value)} rows={3} />
              </div>
              <div className="form-group">
                <label className="form-label">Application Deadline</label>
                <input className="form-input" type="date" value={form.deadline} onChange={e => update('deadline', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div className="card-header"><h3>Eligibility Criteria</h3></div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Minimum CGPA *</label>
                    <input className="form-input" type="number" step="0.1" min="0" max="10" placeholder="e.g. 7.0" value={form.minCGPA} onChange={e => update('minCGPA', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Max Backlogs Allowed</label>
                    <input className="form-input" type="number" min="0" value={form.maxBacklogs} onChange={e => update('maxBacklogs', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Eligible Branches</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.375rem' }}>
                    {['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'].map(branch => (
                      <button
                        key={branch}
                        type="button"
                        className={`badge ${form.branches.includes(branch) ? 'badge-shortlisted' : 'badge-pending'}`}
                        style={{ cursor: 'pointer', padding: '0.375rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => toggleBranch(branch)}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3>Selection Rounds</h3></div>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Rounds (one per line)</label>
                  <textarea className="form-input" placeholder="Aptitude Test&#10;Technical Interview&#10;HR Interview" value={form.rounds} onChange={e => update('rounds', e.target.value)} rows={5} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="button" className="btn btn-ghost btn-lg" onClick={() => navigate('/admin/companies')}>Cancel</button>
          <button type="submit" className="btn btn-accent btn-lg"><Save size={18} /> Add Company</button>
        </div>
      </form>
    </div>
  )
}
