import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Briefcase, FileText, Calendar, TrendingUp, ArrowRight, Clock, Building2 } from 'lucide-react'
import { mockApplications } from '../../data/mockApplications'
import { mockAnnouncements } from '../../data/mockAnnouncements'
import { interviewSchedule } from '../../data/mockStats'
import { currentStudent } from '../../data/mockStudents'

const myApps = mockApplications.filter(a => a.studentId === 1)
const upcomingInterviews = interviewSchedule.filter(i => i.status === 'upcoming').slice(0, 3)

const applicationChartData = [
  { name: 'Applied', count: myApps.filter(a => a.status === 'applied').length },
  { name: 'Shortlist', count: myApps.filter(a => a.status === 'shortlisted').length },
  { name: 'Selected', count: myApps.filter(a => a.status === 'selected').length },
  { name: 'Rejected', count: myApps.filter(a => a.status === 'rejected').length },
]

export default function StudentDashboard() {
  const stats = [
    { icon: Briefcase, label: 'Offers Received', value: myApps.filter(a => a.status === 'selected').length, color: '#10B981', bg: '#D1FAE5' },
    { icon: FileText, label: 'Applications', value: myApps.length, color: '#0A1F44', bg: 'rgba(10,31,68,0.06)' },
    { icon: Calendar, label: 'Upcoming Interviews', value: upcomingInterviews.length, color: '#F5A623', bg: 'var(--gold-100)' },
    { icon: TrendingUp, label: 'Current CGPA', value: currentStudent.cgpa, color: '#3B82F6', bg: '#DBEAFE' },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Welcome back, {currentStudent.name.split(' ')[0]}! 👋</h1>
        <p>Here's a summary of your placement journey</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="stat-card" style={{ '--accent-color': s.color }}>
              <div className="stat-card-icon" style={{ background: s.bg, color: s.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-card-info">
                <h4>{s.label}</h4>
                <div className="stat-value">{s.value}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="dashboard-grid">
        {/* Application Chart */}
        <div className="card">
          <div className="card-header">
            <h3>Application Overview</h3>
            <Link to="/student/applications" style={{ fontSize: '0.85rem', color: 'var(--navy-400)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="card-body" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E6ED' }} />
                <Bar dataKey="count" fill="#0A1F44" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="card">
          <div className="card-header">
            <h3>Upcoming Interviews</h3>
            <Link to="/student/schedule" style={{ fontSize: '0.85rem', color: 'var(--navy-400)', fontWeight: 500 }}>View All</Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {upcomingInterviews.map((item, i) => (
              <div key={i} style={{ padding: '1rem 1.5rem', borderBottom: i < upcomingInterviews.length - 1 ? '1px solid var(--gray-100)' : 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--gold-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Building2 size={18} color="var(--gold-600)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.company}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{item.type}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--navy)' }}>{item.date}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
                    <Clock size={12} /> {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Announcements</h3>
          <Link to="/student/announcements" style={{ fontSize: '0.85rem', color: 'var(--navy-400)', fontWeight: 500 }}>View All</Link>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {mockAnnouncements.slice(0, 3).map((a, i) => (
            <div key={i} style={{ padding: '1rem 1.5rem', borderBottom: i < 2 ? '1px solid var(--gray-100)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '0.9rem' }}>{a.title}</h4>
                <span className={`badge badge-${a.priority === 'high' ? 'applied' : 'pending'}`}>
                  {a.priority}
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', lineHeight: 1.5 }}>{a.content.slice(0, 120)}...</p>
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '0.25rem', display: 'block' }}>{a.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
