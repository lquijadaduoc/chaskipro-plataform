import { Navigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

/**
 * Componente para proteger rutas según autenticación y roles
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componente hijo a renderizar si está autorizado
 * @param {string[]} props.allowedRoles - Array de roles permitidos para acceder a la ruta
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Obtener token y usuario del localStorage
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si no hay información de usuario, redirigir al login
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    
    // Si se especificaron roles permitidos, verificar que el usuario tenga uno de esos roles
    if (allowedRoles.length > 0) {
      const userRole = user.rol || user.role || '';
      
      if (!allowedRoles.includes(userRole)) {
        // Si el usuario no tiene el rol requerido, mostrar mensaje de acceso denegado
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 p-4 rounded-full">
                  <ShieldAlert className="w-16 h-16 text-red-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Acceso Denegado
              </h1>
              <p className="text-gray-600 mb-6">
                No tienes permisos para acceder a esta sección.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        );
      }
    }

    // Si todo está bien, renderizar el componente hijo
    return children;
    
  } catch (error) {
    // Si hay error al parsear el usuario, limpiar y redirigir al login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
