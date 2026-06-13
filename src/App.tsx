import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { ServicesPage } from './pages/dashboard/ServicesPage';
import { ProjectsPage } from './pages/dashboard/ProjectsPage';
import { TestimonialsPage } from './pages/dashboard/TestimonialsPage';
import { ContactsPage } from './pages/dashboard/ContactsPage';
import { StaffPage } from './pages/dashboard/StaffPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="staff" element={<StaffPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
