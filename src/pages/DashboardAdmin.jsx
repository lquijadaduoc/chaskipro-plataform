import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/apiService';
import { Shield, LogOut, Home, Users, Briefcase, FileText } from 'lucide-react';

const DashboardAdmin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.rol !== 'ADMIN') {
      // Redirigir a su dashboard correspondiente
      if (currentUser.rol === 'PROFESIONAL') {
        navigate('/dashboard-profesional');
      } else {
        navigate('/dashboard-cliente');
      }
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-montserrat">
                  {user.nombreCompleto}
                </h1>
                <p className="text-sm text-primary font-semibold">Administrador</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                Inicio
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold font-montserrat mb-2">
            Panel de Administración 🛡️
          </h2>
          <p className="text-blue-100">
            Bienvenido al centro de control de CHASKIPRO. Aquí puedes gestionar usuarios, profesionales y el sistema.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-10 h-10 text-blue-500" />
              <span className="text-3xl font-bold text-gray-900">--</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Total Usuarios</h3>
            <p className="text-sm text-gray-600">Clientes registrados</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
            <div className="flex items-center justify-between mb-3">
              <Briefcase className="w-10 h-10 text-secondary" />
              <span className="text-3xl font-bold text-gray-900">--</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Profesionales</h3>
            <p className="text-sm text-gray-600">Activos y verificados</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-10 h-10 text-green-500" />
              <span className="text-3xl font-bold text-gray-900">--</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Solicitudes</h3>
            <p className="text-sm text-gray-600">Pendientes de revisión</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-3">
              <Shield className="w-10 h-10 text-yellow-500" />
              <span className="text-3xl font-bold text-gray-900">--</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Verificaciones</h3>
            <p className="text-sm text-gray-600">En espera</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 font-montserrat">
            Acciones Rápidas
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <button className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-all text-left">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-8 h-8 text-primary" />
                <h4 className="font-semibold text-gray-900">Gestionar Usuarios</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Ver, editar y administrar cuentas de usuarios
              </p>
              <span className="text-xs text-gray-400">Próximamente</span>
            </button>

            <button className="border-2 border-gray-200 rounded-lg p-6 hover:border-secondary hover:bg-secondary/5 transition-all text-left">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-8 h-8 text-secondary" />
                <h4 className="font-semibold text-gray-900">Verificar Profesionales</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Aprobar o rechazar solicitudes de profesionales
              </p>
              <span className="text-xs text-gray-400">Próximamente</span>
            </button>

            <button className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-all text-left">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-8 h-8 text-green-600" />
                <h4 className="font-semibold text-gray-900">Revisar Reportes</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Ver reportes y quejas de usuarios
              </p>
              <span className="text-xs text-gray-400">Próximamente</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 font-montserrat">
            Actividad Reciente
          </h3>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-500">No hay actividad reciente</p>
            <p className="text-sm text-gray-400 mt-2">
              Las acciones administrativas aparecerán aquí
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                <strong>Panel de Administración:</strong> Este es el centro de control de CHASKIPRO. 
                Desde aquí podrás gestionar todo el sistema una vez que las funcionalidades estén completamente implementadas.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
