import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, User, Building2, FileText, Calendar, Bell, Megaphone,
  Users, PlusCircle, Filter, ClipboardList, BarChart3, Download,
  ChevronLeft, ChevronRight, LogOut, GraduationCap, Menu
} from 'lucide-react'

const studentMenuItems = [
  { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/student/profile', label: 'My Profile', icon: User },
  { path: '/student/companies', label: 'Companies', icon: Building2 },
  { path: '/student/applications', label: 'Applications', icon: FileText },
  { path: '/student/schedule', label: 'Interview Schedule', icon: Calendar },
  { path: '/student/announcements', label: 'Announcements', icon: Megaphone },
  { path: '/student/notifications', label: 'Notifications', icon: Bell },
]

const adminMenuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/students', label: 'Manage Students', icon: Users },
  { path: '/admin/companies', label: 'Manage Companies', icon: Building2 },
  { path: '/admin/companies/new', label: 'Add Company', icon: PlusCircle },
  { path: '/admin/eligibility', label: 'Eligibility Criteria', icon: Filter },
  { path: '/admin/applications', label: 'Applications', icon: ClipboardList },
  { path: '/admin/interviews', label: 'Interviews', icon: Calendar },
  { path: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { path: '/admin/statistics', label: 'Statistics', icon: BarChart3 },
  { path: '/admin/export', label: 'Export Data', icon: Download },
]

export default function DashboardLayout({ role }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const items = role === 'admin' ? adminMenuItems : studentMenuItems

  return (
    <div className="dashboard-shell">
      {/* Mobile overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <div className="sidebar-logo-icon"><GraduationCap size={22} color="#F5A623" /></div>
            {!collapsed && (
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--white)', lineHeight: 1.2 }}>SATI Vidisha</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--gold-300)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {role === 'admin' ? 'Admin Portal' : 'Student Portal'}
                </div>
              </div>
            )}
          </Link>
          <button className="sidebar-collapse-btn desktop-only" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {items.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link" onClick={() => navigate('/')} title="Logout">
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="dashboard-main">
        {/* Top bar */}
        <header className="dashboard-topbar">
          <button className="mobile-menu-btn mobile-only" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
          <div style={{ flex: 1 }} />
          <div className="topbar-user">
            <div className="topbar-avatar">
              {role === 'admin' ? 'A' : 'S'}
            </div>
            <div className="desktop-only">
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--gray-800)' }}>
                {role === 'admin' ? 'Prof. Abhishek Mathur' : 'Kazim Sheikh'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                {role === 'admin' ? 'Placement Officer' : 'SATI2023001'}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="page-content fade-in">
          <Outlet />
        </div>
      </div>

      <style>{`
        .dashboard-shell {
          display: flex;
          min-height: 100vh;
          background: var(--gray-50);
        }
        .sidebar {
          width: var(--sidebar-width);
          background: var(--navy);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 200;
          transition: width var(--transition-base);
          overflow-x: hidden;
        }
        .sidebar.collapsed { width: var(--sidebar-collapsed); }
        .sidebar-header {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          min-height: 72px;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow: hidden;
        }
        .sidebar-logo-icon {
          width: 38px; height: 38px;
          background: rgba(245,166,35,0.12);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sidebar-collapse-btn {
          background: rgba(255,255,255,0.06);
          border: none;
          color: var(--gray-400);
          width: 28px; height: 28px;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .sidebar-collapse-btn:hover { background: rgba(255,255,255,0.12); color: white; }
        .sidebar-nav {
          flex: 1;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: var(--gray-400);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          white-space: nowrap;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }
        .sidebar-link:hover {
          color: var(--white);
          background: rgba(255,255,255,0.06);
        }
        .sidebar-link.active {
          color: var(--gold);
          background: rgba(245,166,35,0.1);
        }
        .sidebar-footer {
          padding: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .dashboard-main {
          flex: 1;
          margin-left: var(--sidebar-width);
          transition: margin-left var(--transition-base);
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .sidebar.collapsed ~ .dashboard-main { margin-left: var(--sidebar-collapsed); }
        .dashboard-topbar {
          height: var(--navbar-height);
          background: var(--white);
          border-bottom: 1px solid var(--gray-200);
          display: flex;
          align-items: center;
          padding: 0 2rem;
          gap: 1rem;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .topbar-user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .topbar-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--navy);
          color: var(--gold);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
        }
        .sidebar-overlay { display: none; }
        .mobile-only { display: none; }
        .mobile-menu-btn {
          background: none; border: none;
          color: var(--gray-600); cursor: pointer;
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            width: var(--sidebar-width);
          }
          .sidebar.mobile-open { transform: translateX(0); }
          .sidebar.collapsed { width: var(--sidebar-width); }
          .sidebar-overlay {
            display: block;
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.5);
            z-index: 150;
          }
          .dashboard-main { margin-left: 0 !important; }
          .dashboard-topbar { padding: 0 1rem; }
          .desktop-only { display: none; }
          .mobile-only { display: block; }
        }
      `}</style>
    </div>
  )
}
