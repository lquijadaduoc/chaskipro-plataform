import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Star,
  Power,
  AlertCircle
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import axiosInstance from '../services/api';

const DashboardProfesional = () => {
  const [stats, setStats] = useState({
    solicitudesNuevas: 0,
    trabajosEnProceso: 0,
    trabajosCompletados: 0,
    gananciasEsteMes: 0,
    calificacionPromedio: 0
  });
  const [disponible, setDisponible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Obtener estadísticas del profesional
      const response = await axiosInstance.get('/profesional/dashboard/stats');
      setStats(response.data);
      setDisponible(response.data.disponible || false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async () => {
    try {
      setUpdatingAvailability(true);
      const newStatus = !disponible;
      await axiosInstance.put('/profesional/disponibilidad', {
        disponible: newStatus
      });
      setDisponible(newStatus);
      
      // Mostrar mensaje de confirmación
      alert(newStatus ? '¡Ahora estás disponible para recibir solicitudes!' : 'Te has marcado como no disponible');
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Error al actualizar la disponibilidad. Por favor, intenta nuevamente.');
    } finally {
      setUpdatingAvailability(false);
    }
  };

  // Tarjeta de estadística
  const StatCard = ({ icon: Icon, label, value, color, bgColor, subtext }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {subtext && (
          <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
            {subtext}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header con toggle de disponibilidad */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Mi Panel Profesional</h1>
              <p className="text-blue-100">
                Gestiona tus trabajos y actualiza tu disponibilidad
              </p>
            </div>

            {/* Toggle de disponibilidad */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Power className={`w-6 h-6 ${disponible ? 'text-green-600' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Estado</p>
                  <p className={`text-xs ${disponible ? 'text-green-600' : 'text-gray-500'}`}>
                    {disponible ? 'Disponible' : 'No disponible'}
                  </p>
                </div>
                <button
                  onClick={handleToggleAvailability}
                  disabled={updatingAvailability}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${
                    disponible ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
                      disponible ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alerta si no está disponible */}
        {!disponible && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">No estás recibiendo solicitudes</h3>
              <p className="text-sm text-yellow-700">
                Activa tu disponibilidad para que los clientes puedan contactarte y enviarte solicitudes de trabajo.
              </p>
            </div>
          </div>
        )}

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Clock}
            label="Solicitudes Nuevas"
            value={stats.solicitudesNuevas || 0}
            color="text-blue-600"
            bgColor="bg-blue-100"
            subtext="Pendientes"
          />
          <StatCard
            icon={Briefcase}
            label="Trabajos En Proceso"
            value={stats.trabajosEnProceso || 0}
            color="text-orange-600"
            bgColor="bg-orange-100"
            subtext="Activos"
          />
          <StatCard
            icon={CheckCircle}
            label="Trabajos Completados"
            value={stats.trabajosCompletados || 0}
            color="text-green-600"
            bgColor="bg-green-100"
            subtext="Total"
          />
          <StatCard
            icon={DollarSign}
            label="Ganancias Este Mes"
            value={`$${(stats.gananciasEsteMes || 0).toLocaleString()}`}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>

        {/* Calificación promedio */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Calificación Promedio</h3>
                <p className="text-sm text-gray-600">Basado en reseñas de clientes</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-800">
                  {stats.calificacionPromedio?.toFixed(1) || '0.0'}
                </span>
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1">de 5.0 estrellas</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((stats.calificacionPromedio || 0) / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Sección de acciones rápidas */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">Ver Mis Trabajos</p>
                <p className="text-sm text-gray-600">Gestionar solicitudes</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <Star className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-800">Mis Reseñas</p>
                <p className="text-sm text-gray-600">Ver calificaciones</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-800">Historial de Pagos</p>
                <p className="text-sm text-gray-600">Ver ganancias</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfesional;
