import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Building2, Users, TrendingUp, Award, ArrowRight, Briefcase, GraduationCap, Target } from 'lucide-react'
import { yearlyPlacementData, topRecruiters } from '../../data/mockStats'

const quickStats = [
  { icon: Users, value: '380+', label: 'Students Registered', color: '#0A1F44' },
  { icon: Building2, value: '55+', label: 'Recruiting Companies', color: '#F5A623' },
  { icon: TrendingUp, value: '85%', label: 'Placement Rate', color: '#10B981' },
  { icon: Award, value: '₹45 LPA', label: 'Highest Package', color: '#3B82F6' },
]

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content slide-up">
            <div className="hero-badge">🎓 Training & Placement Cell</div>
            <h1 className="hero-title">
              Samrat Ashok Technological<br />
              Institute, <span className="text-gold">Vidisha</span>
            </h1>
            <p className="hero-subtitle">
              Bridging the gap between academia and industry. Empowering students with
              the right skills and opportunities for a successful career.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-accent btn-lg">
                <GraduationCap size={20} /> Student Registration
              </Link>
              <Link to="/statistics" className="btn btn-outline-gold btn-lg">
                View Statistics <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-bg-pattern" />
      </section>

      {/* Stats Ribbon */}
      <section className="stats-ribbon">
        <div className="container">
          <div className="stats-ribbon-grid">
            {quickStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="stats-ribbon-card">
                  <div className="stats-ribbon-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                    <Icon size={24} />
                  </div>
                  <div className="stats-ribbon-value">{stat.value}</div>
                  <div className="stats-ribbon-label">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section style={{ padding: '4rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>Placement Trends</h2>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>Year-wise placement performance over the last 6 years</p>
          </div>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyPlacementData} barGap={4}>
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #E2E6ED', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="placed" name="Students Placed" fill="#0A1F44" radius={[4, 4, 0, 0]} />
                <Bar dataKey="companies" name="Companies" fill="#F5A623" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section style={{ padding: '4rem 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>Our Top Recruiters</h2>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>Companies that regularly recruit from SATI Vidisha</p>
          </div>
          <div className="recruiters-grid">
            {topRecruiters.map((name, i) => (
              <div key={i} className="recruiter-card">
                <Briefcase size={20} color="var(--navy-400)" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <Target size={40} color="#F5A623" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>Ready to Begin Your Career Journey?</h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1.05rem' }}>
            Register now and explore placement opportunities from top companies across India.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-accent btn-lg">Register as Student</Link>
            <Link to="/login/student" className="btn btn-outline-gold btn-lg">Student Login</Link>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section {
          background: linear-gradient(135deg, var(--navy-900) 0%, var(--navy) 50%, var(--navy-700) 100%);
          padding: 6rem 0 5rem;
          position: relative;
          overflow: hidden;
        }
        .hero-bg-pattern {
          position: absolute;
          top: 0; right: 0;
          width: 50%;
          height: 100%;
          background: radial-gradient(circle at 70% 30%, rgba(245,166,35,0.08) 0%, transparent 50%),
                      radial-gradient(circle at 30% 80%, rgba(245,166,35,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .hero-content { position: relative; z-index: 1; max-width: 680px; }
        .hero-badge {
          display: inline-block;
          padding: 0.375rem 1rem;
          background: rgba(245,166,35,0.12);
          color: var(--gold);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(245,166,35,0.2);
        }
        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1.15;
          margin-bottom: 1.25rem;
        }
        .hero-subtitle {
          font-size: 1.125rem;
          color: var(--gray-400);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

        .stats-ribbon { padding: 3rem 0; background: var(--white); margin-top: -2rem; position: relative; z-index: 2; }
        .stats-ribbon-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .stats-ribbon-card {
          text-align: center;
          padding: 1.75rem 1rem;
          border-radius: var(--radius-md);
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          transition: all var(--transition-base);
        }
        .stats-ribbon-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .stats-ribbon-icon {
          width: 52px; height: 52px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
        .stats-ribbon-value { font-size: 1.75rem; font-weight: 800; color: var(--navy); }
        .stats-ribbon-label { font-size: 0.85rem; color: var(--gray-500); margin-top: 0.25rem; }

        .recruiters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 1rem;
        }
        .recruiter-card {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.25rem;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--gray-700);
          transition: all var(--transition-fast);
        }
        .recruiter-card:hover {
          border-color: var(--gold-400);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2rem; }
          .stats-ribbon-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .stats-ribbon-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
