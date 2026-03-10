import { useState } from 'react'
import { Search, Filter, Eye, Trash2 } from 'lucide-react'
import { mockStudents } from '../../data/mockStudents'

const statusColors = { placed: 'badge-selected', shortlisted: 'badge-shortlisted', applied: 'badge-applied', 'not-placed': 'badge-rejected' }

export default function ManageStudents() {
  const [search, setSearch] = useState('')
  const [branchFilter, setBranchFilter] = useState('all')
  const [modal, setModal] = useState(null)

  const filtered = mockStudents.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.enrollment.toLowerCase().includes(search.toLowerCase())
    const matchBranch = branchFilter === 'all' || s.branch === branchFilter
    return matchSearch && matchBranch
  })

  return (
    <div>
      <div className="page-header">
        <h1>Manage Students</h1>
        <p>View and manage all registered students</p>
      </div>

      <div className="data-table-wrapper">
        <div className="data-table-toolbar">
          <div className="data-table-search">
            <Search size={16} color="var(--gray-400)" />
            <input placeholder="Search by name or enrollment..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Filter size={16} color="var(--gray-500)" />
            <select className="form-input" style={{ width: 'auto', padding: '0.5rem', fontSize: '0.85rem' }} value={branchFilter} onChange={e => setBranchFilter(e.target.value)}>
              <option value="all">All Branches</option>
              <option value="Computer Science">CSE</option>
              <option value="Electronics">ECE</option>
              <option value="Mechanical">ME</option>
              <option value="Civil">CE</option>
            </select>
            <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{filtered.length} students</span>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Enrollment</th>
              <th>Branch</th>
              <th>CGPA</th>
              <th>Backlogs</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td>{s.enrollment}</td>
                <td>{s.branch}</td>
                <td>{s.cgpa}</td>
                <td>{s.backlogs}</td>
                <td>
                  <span className={`badge ${statusColors[s.status]}`}>
                    {s.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.375rem' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setModal(s)} title="View Details"><Eye size={16} /></button>
                    <button className="btn btn-ghost btn-sm" title="Remove"><Trash2 size={16} color="var(--danger)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal.name}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.9rem' }}>
                {[
                  ['Enrollment', modal.enrollment],
                  ['Branch', modal.branch],
                  ['Year', modal.year],
                  ['CGPA', modal.cgpa],
                  ['Phone', modal.phone],
                  ['Email', modal.email],
                  ['Backlogs', modal.backlogs],
                  ['Status', modal.status],
                ].map(([k, v], i) => (
                  <div key={i}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '0.125rem' }}>{k}</div>
                    <div style={{ fontWeight: 500, color: 'var(--gray-800)' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '0.375rem' }}>Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {modal.skills.map((sk, i) => <span key={i} className="badge badge-shortlisted">{sk}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
