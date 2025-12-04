import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/apiService';
import { User, LogOut, Home } from 'lucide-react';

const DashboardCliente = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.rol !== 'CLIENTE') {
      navigate('/dashboard-profesional');
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
              <User className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-montserrat">
                  {user.nombreCompleto}
                </h1>
                <p className="text-sm text-gray-600">Cliente</p>
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
            ¡Bienvenido a CHASKIPRO! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido creada exitosamente. Ahora puedes buscar y contratar profesionales verificados para tu hogar.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Buscar Profesionales</h3>
              <p className="text-sm text-gray-600 mb-4">
                Encuentra expertos verificados cerca de ti
              </p>
              <Link
                to="/"
                className="text-primary hover:text-primary/80 font-semibold text-sm"
              >
                Buscar ahora →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-semibold text-gray-900 mb-2">Mis Solicitudes</h3>
              <p className="text-sm text-gray-600 mb-4">
                Revisa el estado de tus servicios
              </p>
              <span className="text-gray-400 text-sm">Próximamente</span>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Mis Calificaciones</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ve las reviews que has dejado
              </p>
              <span className="text-gray-400 text-sm">Próximamente</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Recuerda siempre verificar los perfiles y calificaciones antes de contratar un servicio.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardCliente;
