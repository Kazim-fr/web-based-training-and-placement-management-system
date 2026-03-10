import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts'
import { Users, Building2, TrendingUp, Award, ArrowRight, FileText, Clock } from 'lucide-react'
import { mockStudents } from '../../data/mockStudents'
import { mockCompanies } from '../../data/mockCompanies'
import { mockApplications } from '../../data/mockApplications'
import { yearlyPlacementData, branchWiseData } from '../../data/mockStats'
import { mockAnnouncements } from '../../data/mockAnnouncements'

const COLORS = ['#0A1F44', '#F5A623', '#10B981', '#3B82F6', '#EF4444']

const statusData = [
  { name: 'Placed', value: mockStudents.filter(s => s.status === 'placed').length },
  { name: 'Shortlisted', value: mockStudents.filter(s => s.status === 'shortlisted').length },
  { name: 'Applied', value: mockStudents.filter(s => s.status === 'applied').length },
  { name: 'Not Placed', value: mockStudents.filter(s => s.status === 'not-placed').length },
]

export default function AdminDashboard() {
  const stats = [
    { icon: Users, label: 'Total Students', value: mockStudents.length, color: '#0A1F44', bg: 'rgba(10,31,68,0.06)' },
    { icon: Building2, label: 'Companies', value: mockCompanies.length, color: '#F5A623', bg: 'var(--gold-100)' },
    { icon: FileText, label: 'Applications', value: mockApplications.length, color: '#3B82F6', bg: '#DBEAFE' },
    { icon: Award, label: 'Placed Students', value: mockStudents.filter(s => s.status === 'placed').length, color: '#10B981', bg: '#D1FAE5' },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Training & Placement Cell — Overview</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="stat-card" style={{ '--accent-color': s.color }}>
              <div className="stat-card-icon" style={{ background: s.bg, color: s.color }}><Icon size={24} /></div>
              <div className="stat-card-info">
                <h4>{s.label}</h4>
                <div className="stat-value">{s.value}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="dashboard-grid">
        {/* Placement Trend Line */}
        <div className="card">
          <div className="card-header">
            <h3>Placement Trend</h3>
            <Link to="/admin/statistics" style={{ fontSize: '0.85rem', color: 'var(--navy-400)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Details <ArrowRight size={14} />
            </Link>
          </div>
          <div className="card-body" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyPlacementData}>
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E6ED' }} />
                <Legend />
                <Line type="monotone" dataKey="placed" stroke="#0A1F44" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="companies" stroke="#F5A623" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Status Pie */}
        <div className="card">
          <div className="card-header"><h3>Student Status</h3></div>
          <div className="card-body" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Branch-wise Bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header"><h3>Branch-wise Placements</h3></div>
        <div className="card-body" style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={branchWiseData}>
              <XAxis dataKey="branch" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E6ED' }} />
              <Bar dataKey="placed" name="Placed" fill="#0A1F44" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" name="Total" fill="#FFD07B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header"><h3>Recent Announcements</h3></div>
        <div className="card-body" style={{ padding: 0 }}>
          {mockAnnouncements.slice(0, 3).map((a, i) => (
            <div key={i} style={{ padding: '0.875rem 1.5rem', borderBottom: i < 2 ? '1px solid var(--gray-100)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{a.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={12} /> {a.date}
                </div>
              </div>
              <span className={`badge ${a.priority === 'high' ? 'badge-applied' : 'badge-pending'}`}>{a.priority}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
