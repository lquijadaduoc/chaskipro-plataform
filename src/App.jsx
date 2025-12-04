import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardCliente from './pages/DashboardCliente';
import DashboardProfesional from './pages/DashboardProfesional';
import DashboardAdmin from './pages/DashboardAdmin';
import AdminUsers from './pages/AdminUsers';
import SearchProfessionals from './pages/SearchProfessionals';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/search" element={<SearchProfessionals />} />

        {/* Rutas protegidas - ADMINISTRADOR */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas - PROFESIONAL */}
        <Route
          path="/pro/dashboard"
          element={
            <ProtectedRoute allowedRoles={['PROFESIONAL', 'profesional']}>
              <DashboardProfesional />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pro/jobs"
          element={
            <ProtectedRoute allowedRoles={['PROFESIONAL', 'profesional']}>
              <DashboardProfesional />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pro/profile"
          element={
            <ProtectedRoute allowedRoles={['PROFESIONAL', 'profesional']}>
              <DashboardProfesional />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pro/settings"
          element={
            <ProtectedRoute allowedRoles={['PROFESIONAL', 'profesional']}>
              <DashboardProfesional />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas - CLIENTE */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE', 'cliente']}>
              <DashboardCliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/requests"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE', 'cliente']}>
              <DashboardCliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/settings"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE', 'cliente']}>
              <DashboardCliente />
            </ProtectedRoute>
          }
        />

        {/* Rutas legacy (para compatibilidad) - redirigirán a las nuevas */}
        <Route
          path="/dashboard-cliente"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE', 'cliente']}>
              <DashboardCliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-profesional"
          element={
            <ProtectedRoute allowedRoles={['PROFESIONAL', 'profesional']}>
              <DashboardProfesional />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
