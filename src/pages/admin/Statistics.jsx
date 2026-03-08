import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts'
import { yearlyPlacementData, branchWiseData, packageDistribution } from '../../data/mockStats'
import { Edit3 } from 'lucide-react'

const COLORS = ['#0A1F44', '#F5A623', '#10B981', '#3B82F6', '#EF4444']

export default function Statistics() {
  const [data, setData] = useState(yearlyPlacementData)
  const [editing, setEditing] = useState(null)

  const handleEdit = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: Number(value) }
    setData(updated)
  }

  return (
    <div>
      <div className="page-header">
        <h1>Placement Statistics</h1>
        <p>Interactive charts — click table values to edit data and see live chart updates</p>
      </div>

      {/* Placement Trend */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header"><h3>Year-wise Placement Trend</h3></div>
        <div className="card-body" style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E6ED' }} />
              <Legend />
              <Line type="monotone" dataKey="placed" name="Placed" stroke="#0A1F44" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="eligible" name="Eligible" stroke="#F5A623" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="companies" name="Companies" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Branch-wise */}
        <div className="card">
          <div className="card-header"><h3>Branch-wise Placement %</h3></div>
          <div className="card-body" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchWiseData}>
                <XAxis dataKey="branch" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E6ED' }} />
                <Bar dataKey="percentage" name="Placement %" fill="#0A1F44" radius={[4, 4, 0, 0]}>
                  {branchWiseData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Package Pie */}
        <div className="card">
          <div className="card-header"><h3>Package Distribution</h3></div>
          <div className="card-body" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={packageDistribution} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={90} label={({ range, percent }) => `${range} (${(percent*100).toFixed(0)}%)`}>
                  {packageDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Editable Data Table */}
      <div className="data-table-wrapper">
        <div className="card-header">
          <h3><Edit3 size={16} style={{ marginRight: '0.5rem' }} /> Editable Data — Click values to modify</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Placed</th>
              <th>Eligible</th>
              <th>Companies</th>
              <th>Highest (LPA)</th>
              <th>Average (LPA)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((y, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{y.year}</td>
                {['placed', 'eligible', 'companies', 'highestPackage', 'averagePackage'].map(field => (
                  <td key={field}>
                    {editing === `${i}-${field}` ? (
                      <input
                        type="number"
                        className="form-input"
                        style={{ width: 80, padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                        value={y[field]}
                        onChange={e => handleEdit(i, field, e.target.value)}
                        onBlur={() => setEditing(null)}
                        autoFocus
                      />
                    ) : (
                      <span
                        style={{ cursor: 'pointer', padding: '0.25rem 0.5rem', borderRadius: 4, transition: 'background 0.15s' }}
                        onClick={() => setEditing(`${i}-${field}`)}
                        onMouseEnter={e => e.target.style.background = 'var(--gold-100)'}
                        onMouseLeave={e => e.target.style.background = 'transparent'}
                      >
                        {field.includes('Package') ? `₹${y[field]}` : y[field]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
