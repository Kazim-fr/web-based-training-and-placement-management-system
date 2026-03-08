import { Link, useLocation, Outlet } from 'react-router-dom'
import { GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Footer from './Footer'

export default function PublicLayout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/statistics', label: 'Statistics' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <nav className="public-navbar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          <Link to="/" className="public-logo-area">
            <div className="logo-icon">
              <GraduationCap size={28} color="#F5A623" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--white)', lineHeight: 1.2 }}>SATI Vidisha</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--gold-300)', letterSpacing: '0.05em' }}>Training & Placement Cell</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="public-nav-links">
            {links.map(l => (
              <Link key={l.path} to={l.path} className={`public-nav-link ${location.pathname === l.path ? 'active' : ''}`}>
                {l.label}
              </Link>
            ))}
            <Link to="/login/student" className="btn btn-outline-gold btn-sm">Student Login</Link>
            <Link to="/login/admin" className="btn btn-accent btn-sm">Admin Login</Link>
          </div>

          {/* Mobile toggle */}
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: 'white' }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {links.map(l => (
              <Link key={l.path} to={l.path} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link to="/login/student" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Student Login</Link>
            <Link to="/login/admin" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Admin Login</Link>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />

      <style>{`
        .public-navbar {
          background: var(--navy);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }
        .public-logo-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .logo-icon {
          width: 44px; height: 44px;
          background: rgba(245,166,35,0.12);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .public-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .public-nav-link {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--gray-300);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .public-nav-link:hover, .public-nav-link.active {
          color: var(--white);
          background: rgba(255,255,255,0.08);
        }
        .public-nav-link.active {
          color: var(--gold);
        }
        .mobile-toggle { display: none; }
        .mobile-menu { display: none; }

        @media (max-width: 768px) {
          .public-nav-links { display: none; }
          .mobile-toggle { display: block; }
          .mobile-menu {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            background: var(--navy-700);
            border-top: 1px solid rgba(255,255,255,0.1);
          }
          .mobile-menu-link {
            padding: 0.75rem 1rem;
            color: var(--gray-300);
            font-size: 0.95rem;
            border-radius: var(--radius-sm);
          }
          .mobile-menu-link:hover { color: var(--white); background: rgba(255,255,255,0.06); }
        }
      `}</style>
    </div>
  )
}
