import { useState } from 'react'
import { Search, CheckCircle, XCircle } from 'lucide-react'
import { mockApplications } from '../../data/mockApplications'
import { mockStudents } from '../../data/mockStudents'

const statusColors = { applied: 'badge-applied', shortlisted: 'badge-shortlisted', selected: 'badge-selected', rejected: 'badge-rejected' }

export default function Applications() {
  const [search, setSearch] = useState('')
  const [apps, setApps] = useState(mockApplications)

  const filtered = apps.filter(a => {
    const student = mockStudents.find(s => s.id === a.studentId)
    return a.companyName.toLowerCase().includes(search.toLowerCase()) ||
           (student && student.name.toLowerCase().includes(search.toLowerCase()))
  })

  const updateStatus = (appId, status) => {
    setApps(apps.map(a => a.id === appId ? {...a, status} : a))
  }

  return (
    <div>
      <div className="page-header">
        <h1>Student Applications</h1>
        <p>View and manage all student applications across companies</p>
      </div>

      <div className="data-table-wrapper">
        <div className="data-table-toolbar">
          <div className="data-table-search">
            <Search size={16} color="var(--gray-400)" />
            <input placeholder="Search by student or company..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{filtered.length} applications</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Company</th>
              <th>Role</th>
              <th>Applied Date</th>
              <th>Current Round</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(app => {
              const student = mockStudents.find(s => s.id === app.studentId)
              return (
                <tr key={app.id}>
                  <td style={{ fontWeight: 600 }}>{student?.name || 'Unknown'}</td>
                  <td>{app.companyName}</td>
                  <td>{app.role}</td>
                  <td>{app.appliedDate}</td>
                  <td>{app.round}</td>
                  <td><span className={`badge ${statusColors[app.status]}`}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <button className="btn btn-ghost btn-sm" title="Shortlist" onClick={() => updateStatus(app.id, 'shortlisted')}>
                        <CheckCircle size={16} color="var(--info)" />
                      </button>
                      <button className="btn btn-ghost btn-sm" title="Select" onClick={() => updateStatus(app.id, 'selected')}>
                        <CheckCircle size={16} color="var(--success)" />
                      </button>
                      <button className="btn btn-ghost btn-sm" title="Reject" onClick={() => updateStatus(app.id, 'rejected')}>
                        <XCircle size={16} color="var(--danger)" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
