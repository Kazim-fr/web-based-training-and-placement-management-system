import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Edit, Trash2, IndianRupee } from 'lucide-react'
import { mockCompanies } from '../../data/mockCompanies'

const statusColors = { open: 'badge-selected', upcoming: 'badge-shortlisted', closed: 'badge-rejected' }

export default function ManageCompanies() {
  const [search, setSearch] = useState('')
  const filtered = mockCompanies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="page-header page-header-actions">
        <div>
          <h1>Manage Companies</h1>
          <p>View, add, and edit recruiting companies</p>
        </div>
        <Link to="/admin/companies/new" className="btn btn-accent"><Plus size={18} /> Add Company</Link>
      </div>

      <div className="data-table-wrapper">
        <div className="data-table-toolbar">
          <div className="data-table-search">
            <Search size={16} color="var(--gray-400)" />
            <input placeholder="Search companies..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{filtered.length} companies</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Package</th>
              <th>Type</th>
              <th>Min CGPA</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td>{c.role}</td>
                <td><span style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}><IndianRupee size={12} />{c.package}</span></td>
                <td>{c.type}</td>
                <td>{c.eligibility.minCGPA}</td>
                <td>{c.deadline}</td>
                <td><span className={`badge ${statusColors[c.status]}`}>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.375rem' }}>
                    <button className="btn btn-ghost btn-sm" title="Edit"><Edit size={16} /></button>
                    <button className="btn btn-ghost btn-sm" title="Delete"><Trash2 size={16} color="var(--danger)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
