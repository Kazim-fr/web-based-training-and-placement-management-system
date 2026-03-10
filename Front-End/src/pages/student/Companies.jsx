import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, IndianRupee, Clock, Filter } from 'lucide-react'
import { mockCompanies } from '../../data/mockCompanies'
import { currentStudent } from '../../data/mockStudents'

export default function Companies() {
  const [search, setSearch] = useState('')
  const [filterBranch, setFilterBranch] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const checkEligibility = (company) => {
    return currentStudent.cgpa >= company.eligibility.minCGPA &&
           company.eligibility.branches.includes(currentStudent.branch) &&
           currentStudent.backlogs <= company.eligibility.backlogs
  }

  const filtered = mockCompanies.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || c.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="page-header">
        <h1>Company Listings</h1>
        <p>Browse and apply to companies visiting our campus</p>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-body" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="data-table-search" style={{ flex: 1, minWidth: 200 }}>
            <Search size={16} color="var(--gray-400)" />
            <input placeholder="Search companies or roles..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Filter size={16} color="var(--gray-500)" />
            <select className="form-input" style={{ width: 'auto', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="upcoming">Upcoming</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Company Cards */}
      <div className="cards-grid">
        {filtered.map(company => {
          const eligible = checkEligibility(company)
          return (
            <Link key={company.id} to={`/student/companies/${company.id}`} className="card" style={{ textDecoration: 'none' }}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '0.125rem' }}>{company.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{company.role}</p>
                  </div>
                  <span className={`badge ${eligible ? 'badge-eligible' : 'badge-not-eligible'}`}>
                    {eligible ? 'Eligible' : 'Not Eligible'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><IndianRupee size={14} /> {company.package}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {company.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {company.deadline}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className={`badge ${company.status === 'open' ? 'badge-selected' : company.status === 'upcoming' ? 'badge-shortlisted' : 'badge-rejected'}`}>
                    {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{company.type}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
