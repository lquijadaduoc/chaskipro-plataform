import { LayoutDashboard, Users, TrendingUp, Briefcase } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const DashboardAdmin = () => {
  // Tarjeta de estadística
  const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-blue-100">
            Gestiona usuarios, servicios y configuración de la plataforma
          </p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            label="Total de Usuarios"
            value="0"
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard
            icon={Briefcase}
            label="Profesionales Activos"
            value="0"
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatCard
            icon={LayoutDashboard}
            label="Solicitudes Pendientes"
            value="0"
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <StatCard
            icon={TrendingUp}
            label="Servicios Completados"
            value="0"
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>

        {/* Sección de acciones rápidas */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">Gestionar Usuarios</p>
                <p className="text-sm text-gray-600">Ver y aprobar cuentas</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <Briefcase className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-800">Gestionar Servicios</p>
                <p className="text-sm text-gray-600">Administrar categorías</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-800">Ver Reportes</p>
                <p className="text-sm text-gray-600">Estadísticas y análisis</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAdmin;
