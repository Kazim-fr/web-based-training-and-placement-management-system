import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, IndianRupee, Calendar, Building2, CheckCircle, Users, Clock } from 'lucide-react'
import { mockCompanies } from '../../data/mockCompanies'
import { currentStudent } from '../../data/mockStudents'

export default function CompanyDetail() {
  const { id } = useParams()
  const company = mockCompanies.find(c => c.id === parseInt(id))
  const [applied, setApplied] = useState(false)

  if (!company) {
    return <div className="page-content"><h2>Company not found</h2></div>
  }

  const eligible = currentStudent.cgpa >= company.eligibility.minCGPA &&
                   company.eligibility.branches.includes(currentStudent.branch) &&
                   currentStudent.backlogs <= company.eligibility.backlogs

  return (
    <div>
      <Link to="/student/companies" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--navy-400)', fontWeight: 500, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back to Companies
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Main Info */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-body" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{company.name}</h1>
                  <p style={{ color: 'var(--gray-500)', fontSize: '1rem' }}>{company.role}</p>
                </div>
                <span className={`badge ${eligible ? 'badge-eligible' : 'badge-not-eligible'}`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.875rem' }}>
                  {eligible ? '✓ Eligible' : '✗ Not Eligible'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><IndianRupee size={16} color="var(--gold-600)" /> {company.package}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><MapPin size={16} color="var(--gold-600)" /> {company.location}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Building2 size={16} color="var(--gold-600)" /> {company.type}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Calendar size={16} color="var(--gold-600)" /> Deadline: {company.deadline}</span>
              </div>

              <h3 style={{ marginBottom: '0.5rem' }}>About</h3>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.7 }}>{company.description}</p>
            </div>
          </div>

          {/* Selection Process */}
          <div className="card">
            <div className="card-header"><h3>Selection Process</h3></div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {company.rounds.map((round, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--navy)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--gray-700)' }}>{round}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-header"><h3>Eligibility Criteria</h3></div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--gray-500)' }}>Minimum CGPA</span>
                  <span style={{ fontWeight: 600 }}>{company.eligibility.minCGPA}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--gray-500)' }}>Max Backlogs</span>
                  <span style={{ fontWeight: 600 }}>{company.eligibility.backlogs}</span>
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--gray-500)' }}>Branches:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.375rem' }}>
                    {company.eligibility.branches.map((b, i) => (
                      <span key={i} className="badge badge-shortlisted">{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Card */}
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: '2rem' }}>
              {applied ? (
                <>
                  <CheckCircle size={40} color="var(--success)" style={{ marginBottom: '0.75rem' }} />
                  <h3>Application Submitted!</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
                    Your application has been sent. Track it in your applications page.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>
                    {eligible ? 'You meet all eligibility criteria.' : 'You do not meet the eligibility criteria.'}
                  </p>
                  <button
                    className={`btn ${eligible ? 'btn-accent' : 'btn-ghost'} btn-lg`}
                    style={{ width: '100%' }}
                    disabled={!eligible || company.status === 'closed'}
                    onClick={() => setApplied(true)}
                  >
                    {company.status === 'closed' ? 'Applications Closed' : eligible ? 'Apply Now' : 'Not Eligible'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
