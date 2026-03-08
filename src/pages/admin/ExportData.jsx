import { useState } from 'react'
import { Download, FileDown, Table } from 'lucide-react'
import { mockStudents } from '../../data/mockStudents'
import { mockCompanies } from '../../data/mockCompanies'
import { mockApplications } from '../../data/mockApplications'

const datasets = {
  students: { label: 'Student Data', data: mockStudents, columns: ['name', 'enrollment', 'branch', 'cgpa', 'backlogs', 'status'] },
  companies: { label: 'Company Data', data: mockCompanies, columns: ['name', 'role', 'package', 'type', 'location', 'status'] },
  applications: {
    label: 'Applications Data',
    data: mockApplications.map(a => {
      const s = mockStudents.find(st => st.id === a.studentId)
      return { ...a, studentName: s?.name || 'Unknown' }
    }),
    columns: ['studentName', 'companyName', 'role', 'appliedDate', 'status', 'round']
  },
}

export default function ExportData() {
  const [selected, setSelected] = useState('students')
  const ds = datasets[selected]

  const handleDownload = () => {
    const headers = ds.columns.join(',')
    const rows = ds.data.map(row => ds.columns.map(col => {
      const val = row[col]
      return typeof val === 'string' && val.includes(',') ? `"${val}"` : val
    }).join(','))
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selected}_export.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="page-header page-header-actions">
        <div>
          <h1>Export Data</h1>
          <p>Preview and download data as CSV files</p>
        </div>
        <button className="btn btn-accent" onClick={handleDownload}>
          <FileDown size={18} /> Download CSV
        </button>
      </div>

      {/* Dataset Selector */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {Object.entries(datasets).map(([key, val]) => (
          <button
            key={key}
            className={`btn ${selected === key ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setSelected(key)}
          >
            <Table size={16} /> {val.label}
          </button>
        ))}
      </div>

      {/* Preview Table */}
      <div className="data-table-wrapper">
        <div className="card-header">
          <h3>Preview — {ds.label} ({ds.data.length} records)</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                {ds.columns.map(col => (
                  <th key={col}>{col.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ds.data.slice(0, 15).map((row, i) => (
                <tr key={i}>
                  {ds.columns.map(col => (
                    <td key={col}>{typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
