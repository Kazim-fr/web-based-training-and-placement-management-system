import { FileText } from 'lucide-react'
import { mockApplications } from '../../data/mockApplications'

const myApps = mockApplications.filter(a => a.studentId === 1)

const statusColors = {
  applied: 'badge-applied',
  shortlisted: 'badge-shortlisted',
  selected: 'badge-selected',
  rejected: 'badge-rejected',
}

export default function Applications() {
  return (
    <div>
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track the status of your company applications</p>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Applied Date</th>
              <th>Current Round</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myApps.map(app => (
              <tr key={app.id}>
                <td style={{ fontWeight: 600 }}>{app.companyName}</td>
                <td>{app.role}</td>
                <td>{app.appliedDate}</td>
                <td>{app.round}</td>
                <td>
                  <span className={`badge ${statusColors[app.status]}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {myApps.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray-400)' }}>
          <FileText size={40} />
          <p style={{ marginTop: '1rem' }}>No applications yet. Browse companies to apply!</p>
        </div>
      )}
    </div>
  )
}
