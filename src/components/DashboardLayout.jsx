import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Search, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  UserCheck,
  Home
} from 'lucide-react';

/**
 * Layout principal para los dashboards con sidebar responsive
 */
const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener información del usuario
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userRole = user?.rol || user?.role || '';
  const userName = user?.nombre || user?.name || 'Usuario';

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Menú del Administrador
  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Gestión de Usuarios', path: '/admin/users' },
    { icon: Briefcase, label: 'Servicios', path: '/admin/services' },
    { icon: Settings, label: 'Configuración', path: '/admin/settings' },
  ];

  // Menú del Profesional
  const professionalMenuItems = [
    { icon: LayoutDashboard, label: 'Mi Dashboard', path: '/pro/dashboard' },
    { icon: Briefcase, label: 'Mis Trabajos', path: '/pro/jobs' },
    { icon: UserCheck, label: 'Mi Perfil', path: '/pro/profile' },
    { icon: Settings, label: 'Configuración', path: '/pro/settings' },
  ];

  // Menú del Cliente
  const clientMenuItems = [
    { icon: LayoutDashboard, label: 'Mi Dashboard', path: '/client/dashboard' },
    { icon: Search, label: 'Buscar Profesionales', path: '/search' },
    { icon: Briefcase, label: 'Mis Solicitudes', path: '/client/requests' },
    { icon: Settings, label: 'Configuración', path: '/client/settings' },
  ];

  // Seleccionar menú según rol
  let menuItems = clientMenuItems;
  if (userRole === 'ADMIN' || userRole === 'admin') {
    menuItems = adminMenuItems;
  } else if (userRole === 'PROFESIONAL' || userRole === 'profesional') {
    menuItems = professionalMenuItems;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar para desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="w-8 h-8" />
            <span>CHASKIPRO</span>
          </h1>
          <p className="text-blue-200 text-sm mt-1">Panel de Control</p>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-blue-900 shadow-lg'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Usuario y logout */}
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{userName}</p>
              <p className="text-xs text-blue-300 truncate">{userRole}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Sidebar móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
            {/* Logo y botón cerrar */}
            <div className="p-6 border-b border-blue-700 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  <span>CHASKIPRO</span>
                </h1>
                <p className="text-blue-200 text-xs mt-1">Panel de Control</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-blue-700 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-blue-900 shadow-lg'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Usuario y logout */}
            <div className="p-4 border-t border-blue-700">
              <div className="flex items-center gap-3 mb-3 px-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{userName}</p>
                  <p className="text-xs text-blue-300 truncate">{userRole}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar superior */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            {/* Botón menú móvil */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            
            {/* Título de página */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-500">Bienvenido, {userName}</p>
            </div>
          </div>

          {/* Botón volver al inicio */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Ir al Inicio</span>
          </Link>
        </header>

        {/* Área de contenido */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
