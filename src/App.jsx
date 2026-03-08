import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from './components/PublicLayout'
import DashboardLayout from './components/DashboardLayout'

// Public Pages
import Landing from './pages/public/Landing'
import About from './pages/public/About'
import Statistics from './pages/public/Statistics'
import Contact from './pages/public/Contact'
import StudentLogin from './pages/public/StudentLogin'
import AdminLogin from './pages/public/AdminLogin'
import Register from './pages/public/Register'

// Student Pages
import StudentDashboard from './pages/student/Dashboard'
import StudentProfile from './pages/student/Profile'
import StudentCompanies from './pages/student/Companies'
import CompanyDetail from './pages/student/CompanyDetail'
import StudentApplications from './pages/student/Applications'
import StudentSchedule from './pages/student/Schedule'
import StudentAnnouncements from './pages/student/Announcements'
import StudentNotifications from './pages/student/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import ManageStudents from './pages/admin/ManageStudents'
import ManageCompanies from './pages/admin/ManageCompanies'
import AddCompany from './pages/admin/AddCompany'
import Eligibility from './pages/admin/Eligibility'
import AdminApplications from './pages/admin/Applications'
import AdminInterviews from './pages/admin/Interviews'
import AdminAnnouncements from './pages/admin/Announcements'
import AdminStatistics from './pages/admin/Statistics'
import ExportData from './pages/admin/ExportData'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Student Portal */}
      <Route path="/student" element={<DashboardLayout role="student" />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="companies" element={<StudentCompanies />} />
        <Route path="companies/:id" element={<CompanyDetail />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="schedule" element={<StudentSchedule />} />
        <Route path="announcements" element={<StudentAnnouncements />} />
        <Route path="notifications" element={<StudentNotifications />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={<DashboardLayout role="admin" />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="companies" element={<ManageCompanies />} />
        <Route path="companies/new" element={<AddCompany />} />
        <Route path="eligibility" element={<Eligibility />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="interviews" element={<AdminInterviews />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="statistics" element={<AdminStatistics />} />
        <Route path="export" element={<ExportData />} />
      </Route>
    </Routes>
  )
}

export default App
