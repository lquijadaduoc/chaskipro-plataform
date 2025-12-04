import { useState, useEffect } from 'react';
import { UserCheck, UserX, Search, Filter, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import axiosInstance from '../services/api';

/**
 * Tabla de administración de profesionales pendientes de aprobación
 */
const AdminProfessionalsTable = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved, rejected
  const [processingId, setProcessingId] = useState(null);

  // Cargar profesionales al montar el componente
  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/admin/professionals');
      setProfessionals(response.data);
    } catch (err) {
      setError('Error al cargar los profesionales. Por favor, intenta nuevamente.');
      console.error('Error fetching professionals:', err);
    } finally {
      setLoading(false);
    }
  };

  // Aprobar profesional
  const handleApprove = async (professionalId) => {
    if (!confirm('¿Estás seguro de aprobar este profesional?')) return;
    
    try {
      setProcessingId(professionalId);
      await axiosInstance.put(`/admin/professionals/${professionalId}/approve`);
      
      // Actualizar estado local
      setProfessionals(prev =>
        prev.map(prof =>
          prof.id === professionalId
            ? { ...prof, aprobado: true, estadoAprobacion: 'APPROVED' }
            : prof
        )
      );
      
      alert('Profesional aprobado exitosamente');
    } catch (err) {
      alert('Error al aprobar el profesional. Por favor, intenta nuevamente.');
      console.error('Error approving professional:', err);
    } finally {
      setProcessingId(null);
    }
  };

  // Rechazar profesional
  const handleReject = async (professionalId) => {
    const reason = prompt('Ingresa la razón del rechazo (opcional):');
    if (reason === null) return; // Usuario canceló
    
    try {
      setProcessingId(professionalId);
      await axiosInstance.put(`/admin/professionals/${professionalId}/reject`, {
        reason: reason || 'No especificada'
      });
      
      // Actualizar estado local
      setProfessionals(prev =>
        prev.map(prof =>
          prof.id === professionalId
            ? { ...prof, aprobado: false, estadoAprobacion: 'REJECTED' }
            : prof
        )
      );
      
      alert('Profesional rechazado');
    } catch (err) {
      alert('Error al rechazar el profesional. Por favor, intenta nuevamente.');
      console.error('Error rejecting professional:', err);
    } finally {
      setProcessingId(null);
    }
  };

  // Filtrar profesionales
  const filteredProfessionals = professionals.filter(prof => {
    // Filtro por búsqueda
    const matchesSearch = 
      prof.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.especialidad?.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro por estado
    let matchesStatus = true;
    if (filterStatus === 'pending') {
      matchesStatus = !prof.aprobado && prof.estadoAprobacion !== 'REJECTED';
    } else if (filterStatus === 'approved') {
      matchesStatus = prof.aprobado || prof.estadoAprobacion === 'APPROVED';
    } else if (filterStatus === 'rejected') {
      matchesStatus = prof.estadoAprobacion === 'REJECTED';
    }

    return matchesSearch && matchesStatus;
  });

  // Badge de estado
  const StatusBadge = ({ professional }) => {
    if (professional.aprobado || professional.estadoAprobacion === 'APPROVED') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          <CheckCircle className="w-3 h-3" />
          Aprobado
        </span>
      );
    } else if (professional.estadoAprobacion === 'REJECTED') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          <XCircle className="w-3 h-3" />
          Rechazado
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          <Clock className="w-3 h-3" />
          Pendiente
        </span>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-800 mb-1">Error</h3>
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchProfessionals}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Gestión de Profesionales
        </h1>
        <p className="text-gray-600">
          Administra las solicitudes de profesionales y aprueba sus cuentas
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtro de estado */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="approved">Aprobados</option>
              <option value="rejected">Rechazados</option>
            </select>
          </div>
        </div>

        {/* Contador */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando <span className="font-semibold">{filteredProfessionals.length}</span> de{' '}
          <span className="font-semibold">{professionals.length}</span> profesionales
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredProfessionals.length === 0 ? (
          <div className="text-center py-12">
            <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No hay profesionales
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all'
                ? 'No se encontraron profesionales con los filtros aplicados'
                : 'No hay profesionales registrados en el sistema'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Profesional
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Especialidad
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProfessionals.map((prof) => (
                  <tr key={prof.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {prof.nombre?.charAt(0).toUpperCase() || 'P'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{prof.nombre || 'Sin nombre'}</p>
                          <p className="text-sm text-gray-500">ID: {prof.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                        {prof.especialidad || 'No especificada'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-800">{prof.email || 'Sin email'}</p>
                        <p className="text-gray-500">{prof.telefono || 'Sin teléfono'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge professional={prof} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {(!prof.aprobado && prof.estadoAprobacion !== 'APPROVED') && (
                          <>
                            <button
                              onClick={() => handleApprove(prof.id)}
                              disabled={processingId === prof.id}
                              className="inline-flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                            >
                              <UserCheck className="w-4 h-4" />
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleReject(prof.id)}
                              disabled={processingId === prof.id}
                              className="inline-flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                            >
                              <UserX className="w-4 h-4" />
                              Rechazar
                            </button>
                          </>
                        )}
                        {(prof.aprobado || prof.estadoAprobacion === 'APPROVED') && (
                          <span className="text-sm text-gray-500 italic">
                            Ya aprobado
                          </span>
                        )}
                        {prof.estadoAprobacion === 'REJECTED' && (
                          <button
                            onClick={() => handleApprove(prof.id)}
                            disabled={processingId === prof.id}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                          >
                            <UserCheck className="w-4 h-4" />
                            Re-aprobar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfessionalsTable;
