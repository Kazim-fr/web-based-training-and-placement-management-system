import { useState } from 'react'
import { Save, Filter } from 'lucide-react'
import { mockCompanies } from '../../data/mockCompanies'

export default function Eligibility() {
  const [selectedCompany, setSelectedCompany] = useState('')
  const [minCGPA, setMinCGPA] = useState('')
  const [maxBacklogs, setMaxBacklogs] = useState('0')
  const [branches, setBranches] = useState([])
  const [saved, setSaved] = useState(false)

  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId)
    const company = mockCompanies.find(c => c.id === parseInt(companyId))
    if (company) {
      setMinCGPA(company.eligibility.minCGPA.toString())
      setMaxBacklogs(company.eligibility.backlogs.toString())
      setBranches(company.eligibility.branches)
    }
    setSaved(false)
  }

  const toggleBranch = (branch) => {
    setBranches(prev => prev.includes(branch) ? prev.filter(b => b !== branch) : [...prev, branch])
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="page-header page-header-actions">
        <div>
          <h1>Eligibility Criteria</h1>
          <p>Set CGPA cutoff, branch restrictions, and backlog limits for each company</p>
        </div>
        {saved && <span className="badge badge-selected" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>✓ Criteria Saved</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div className="card-header"><h3><Filter size={18} style={{ marginRight: '0.5rem' }} /> Set Criteria</h3></div>
          <div className="card-body">
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Select Company</label>
                <select className="form-input" value={selectedCompany} onChange={e => handleCompanyChange(e.target.value)} required>
                  <option value="">Choose a company...</option>
                  {mockCompanies.map(c => <option key={c.id} value={c.id}>{c.name} — {c.role}</option>)}
                </select>
              </div>

              {selectedCompany && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Minimum CGPA</label>
                      <input className="form-input" type="number" step="0.1" min="0" max="10" value={minCGPA} onChange={e => setMinCGPA(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Max Backlogs Allowed</label>
                      <input className="form-input" type="number" min="0" value={maxBacklogs} onChange={e => setMaxBacklogs(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Eligible Branches</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.375rem' }}>
                      {['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'].map(branch => (
                        <button key={branch} type="button" className={`badge ${branches.includes(branch) ? 'badge-shortlisted' : 'badge-pending'}`} style={{ cursor: 'pointer', padding: '0.375rem 0.75rem', fontSize: '0.8rem' }} onClick={() => toggleBranch(branch)}>
                          {branch}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                    <Save size={16} /> Update Criteria
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Current Criteria Overview */}
        <div className="card">
          <div className="card-header"><h3>Current Criteria Overview</h3></div>
          <div className="card-body" style={{ padding: 0, maxHeight: 500, overflowY: 'auto' }}>
            {mockCompanies.map(c => (
              <div key={c.id} style={{ padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{c.name}</div>
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--gray-500)', flexWrap: 'wrap' }}>
                  <span>CGPA ≥ {c.eligibility.minCGPA}</span>
                  <span>Backlogs ≤ {c.eligibility.backlogs}</span>
                  <span>{c.eligibility.branches.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
