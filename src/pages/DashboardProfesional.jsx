import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/apiService';
import { Briefcase, LogOut, Home, Star, CheckCircle } from 'lucide-react';

const DashboardProfesional = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.rol !== 'PROFESIONAL') {
      navigate('/dashboard-cliente');
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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-secondary" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-montserrat">
                  {user.nombreCompleto}
                </h1>
                <p className="text-sm text-gray-600">Profesional</p>
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
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 font-montserrat mb-4">
            ¡Bienvenido Profesional! 👷‍♂️
          </h2>
          <p className="text-gray-600 mb-6">
            Tu perfil profesional ha sido creado. Una vez que sea verificado por nuestro equipo, comenzarás a recibir solicitudes de clientes.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⏳</div>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Perfil en Revisión</h3>
                <p className="text-sm text-yellow-800">
                  Tu perfil está siendo verificado por nuestro equipo. Este proceso puede tomar entre 24-48 horas. Te notificaremos por email cuando esté aprobado.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-8 h-8 text-secondary" />
                <span className="text-2xl font-bold text-gray-900">0</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Solicitudes Recibidas</h3>
              <p className="text-sm text-gray-600">
                Solicitudes de clientes esperando tu respuesta
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">0</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Servicios Completados</h3>
              <p className="text-sm text-gray-600">
                Trabajos finalizados exitosamente
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-8 h-8 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-900">--</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Calificación</h3>
              <p className="text-sm text-gray-600">
                Promedio de valoraciones de clientes
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Pasos</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Completa tu perfil</h4>
                  <p className="text-sm text-gray-600">Agrega una biografía, especialidades y zonas de cobertura (próximamente)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Espera la verificación</h4>
                  <p className="text-sm text-gray-600">Nuestro equipo revisará tus credenciales y documentos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gray-500 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-400">Comienza a recibir solicitudes</h4>
                  <p className="text-sm text-gray-500">Una vez aprobado, los clientes podrán contactarte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardProfesional;
