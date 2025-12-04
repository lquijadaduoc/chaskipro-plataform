import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  Filter,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Home,
  LogIn
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import axiosInstance from '../services/api';

const SearchProfessionals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filters, setFilters] = useState({
    searchTerm: searchParams.get('search') || '',
    comuna: searchParams.get('comuna') || '',
    categoria: searchParams.get('categoria') || '',
    minRating: parseInt(searchParams.get('minRating') || '0')
  });
  const [comunas, setComunas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  
  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('token');

  // Función para formatear nombres de categorías
  const formatCategoryName = (category) => {
    const categoryNames = {
      'ELECTRICISTA': 'Electricista',
      'GASFITER': 'Gasfíter',
      'PINTOR': 'Pintor',
      'CARPINTERO': 'Carpintero',
      'JARDINERO': 'Jardinero',
      'TECNICO_REFRIGERACION': 'Técnico en Refrigeración',
      'CERRAJERO': 'Cerrajero',
      'TECNICO_COMPUTACION': 'Técnico en Computación',
      'OTRO': 'Otro'
    };
    return categoryNames[category] || category;
  };

  // Cargar datos iniciales (comunas y categorías)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Cargar comunas - si falla, continuamos sin comunas
        try {
        const comunasRes = await axiosInstance.get('/comunas');
          const comunasData = Array.isArray(comunasRes.data) ? comunasRes.data : [];
          setComunas(comunasData);
        } catch (comunaError) {
          console.warn('No se pudieron cargar las comunas, continuando sin filtro de comunas:', comunaError);
          setComunas([]);
        }
        
        // Categorías estáticas (enum del backend)
        const categoriasEstaticas = [
          'ELECTRICISTA',
          'GASFITER',
          'PINTOR',
          'CARPINTERO',
          'JARDINERO',
          'TECNICO_REFRIGERACION',
          'CERRAJERO',
          'TECNICO_COMPUTACION',
          'OTRO'
        ];
        setCategorias(categoriasEstaticas);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        // Establecer categorías por defecto en caso de error
        setCategorias([
          'ELECTRICISTA',
          'GASFITER',
          'PINTOR',
          'CARPINTERO',
          'JARDINERO',
          'TECNICO_REFRIGERACION',
          'CERRAJERO',
          'TECNICO_COMPUTACION',
          'OTRO'
        ]);
        setComunas([]);
      }
    };

    fetchInitialData();
  }, []);

  // Ejecutar búsqueda cuando cambien los filtros
  useEffect(() => {
    const searchProfessionals = async () => {
      try {
        setLoading(true);
        setErrorMessage('');
        console.log('🔍 Buscando profesionales con filtros:', filters);

        // Intentar múltiples endpoints por si el backend expone distinta convención
        const baseParams = {
          search: filters.searchTerm || undefined,
          query: filters.searchTerm || undefined,
          communeId: filters.comuna || undefined,
          comunaId: filters.comuna || undefined,
          professionCategory: filters.categoria || undefined,
          categoria: filters.categoria || undefined,
          minRating: filters.minRating > 0 ? filters.minRating : undefined,
        };

        // Intentar primero el endpoint público en inglés; si hay token, también probamos el de español
        const endpointsToTry = [
          {
            url: '/professionals/search',
            params: {
              search: baseParams.search,
              communeId: baseParams.communeId,
              professionCategory: baseParams.professionCategory,
              minRating: baseParams.minRating,
            },
          },
        ];

        if (isAuthenticated) {
          endpointsToTry.unshift({
            url: '/profesionales/search',
            params: {
              query: baseParams.query,
              comunaId: baseParams.comunaId,
              categoria: baseParams.categoria,
              minRating: baseParams.minRating,
            },
          });
        }

        let professionalsList = [];
        let lastError = null;

        for (const endpoint of endpointsToTry) {
          try {
            console.log(`🌐 Probando endpoint: ${endpoint.url}`, endpoint.params);
            const response = await axiosInstance.get(endpoint.url, { params: endpoint.params });
            console.log('✅ Respuesta recibida:', response.status);
            console.log('📦 Datos:', response.data);

            professionalsList = Array.isArray(response.data?.content)
              ? response.data.content
              : Array.isArray(response.data)
                ? response.data
                : [];

            lastError = null;
            break;
          } catch (err) {
            lastError = err;
            console.warn(`⚠️ Falló ${endpoint.url}:`, err.response?.status, err.response?.data);
          }
        }

        if (lastError) {
          throw lastError;
        }

        console.log('👥 Total profesionales:', professionalsList.length);
        setProfessionals(professionalsList);
      } catch (error) {
        console.error('❌ Error searching professionals:', error);
        console.error('📛 Error response:', error.response);
        console.error('📛 Error message:', error.message);
        console.error('📛 Error status:', error.response?.status);
        setProfessionals([]);
        
        // Mensaje de error más específico
        let errorMsg = 'No pudimos cargar los profesionales. ';
        if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          errorMsg += 'El servidor no está disponible. Por favor, verifica que el backend esté corriendo.';
        } else if (error.response?.status === 401) {
          errorMsg += 'No tienes permisos para realizar esta búsqueda.';
        } else if (error.response?.status >= 500) {
          errorMsg += 'Error del servidor. Intenta nuevamente en unos momentos.';
        } else {
          errorMsg += 'Intenta nuevamente o ajusta los filtros.';
        }
        setErrorMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    // Sincronizar filtros con la URL
    const params = new URLSearchParams();
    if (filters.searchTerm) params.set('search', filters.searchTerm);
    if (filters.comuna) params.set('comuna', filters.comuna);
    if (filters.categoria) params.set('categoria', filters.categoria);
    if (filters.minRating > 0) params.set('minRating', filters.minRating.toString());
    
    setSearchParams(params, { replace: true });
    searchProfessionals();
  }, [filters.searchTerm, filters.comuna, filters.categoria, filters.minRating, setSearchParams]);

  const handleCategoryChange = (categoria) => {
    setFilters(prev => ({
      ...prev,
      categoria: prev.categoria === categoria ? '' : categoria
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      comuna: '',
      categoria: '',
      minRating: 0
    });
  };

  // Contenido del sidebar (compartido entre vistas)
  const sidebarContent = (
    <aside className="lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </h2>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpiar
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Nombre o especialidad..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtro de comuna */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Comuna
          </label>
          <select
            value={filters.comuna}
            onChange={(e) => setFilters({ ...filters, comuna: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas las comunas</option>
            {comunas.map((comuna) => (
              <option key={comuna.id} value={comuna.id}>
                {comuna.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de categoría */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Categoría
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                checked={filters.categoria === ''}
                onChange={() => handleCategoryChange('')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">Todas las categorías</span>
            </label>
            {categorias.map((categoria, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  checked={filters.categoria === categoria}
                  onChange={() => handleCategoryChange(categoria)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{formatCategoryName(categoria)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtro de calificación */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Calificación mínima
          </label>
          <div className="space-y-2">
            {[0, 3, 4, 4.5].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilters({ ...filters, minRating: rating })}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  filters.minRating === rating
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Star className={`w-4 h-4 ${filters.minRating === rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                <span className="text-sm font-medium">
                  {rating === 0 ? 'Todas' : `${rating}+ estrellas`}
                </span>
              </button>
            ))}
          </div>
        </div>


      </div>
    </aside>
  );

  // Componente de tarjeta de profesional
  const ProfessionalCard = ({ professional }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100">
      {/* Header con foto */}
      <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            {professional.foto ? (
              <img src={professional.foto} alt={professional.nombreCompleto} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-blue-600">
                {professional.nombreCompleto?.charAt(0).toUpperCase() || 'P'}
              </span>
            )}
          </div>
        </div>
        {professional.disponible && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
            <CheckCircle className="w-3 h-3" />
            Disponible
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="pt-16 px-6 pb-6">
        {/* Nombre y especialidad */}
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {professional.nombreCompleto || 'Sin nombre'}
        </h3>
        <p className="text-blue-600 font-medium mb-3">
          {formatCategoryName(professional.categoria) || 'Sin especialidad'}
        </p>

        {/* Calificación */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-gray-800">
              {professional.rating ? Number(professional.rating).toFixed(1) : '0.0'}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({professional.totalCalificaciones || 0} reseñas)
          </span>
        </div>

        {/* Ubicación */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{professional.comunaPrincipal || 'No especificada'}</span>
        </div>

        {/* Descripción */}
        {professional.descripcion && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {professional.descripcion}
          </p>
        )}

        {/* Botón ver perfil */}
        <div className="flex items-center justify-end pt-4 border-t border-gray-100">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            Ver Perfil
          </button>
        </div>
      </div>
    </div>
  );

  // Contenido principal (compartido entre vistas)
  const mainContent = (
    <>
      {/* Header de resultados */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Buscar Profesionales
        </h1>
        <p className="text-gray-600">
          Encontrados <span className="font-semibold">{professionals.length}</span> profesionales
        </p>
        {errorMessage && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div className="text-sm">{errorMessage}</div>
          </div>
        )}
      </div>

      {/* Grid de profesionales */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : professionals.length === 0 ? (
        // Empty state
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No se encontraron profesionales
          </h3>
          <p className="text-gray-600 mb-6">
            Intenta ajustar los filtros o ampliar tu búsqueda
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {professionals.map((professional) => (
            <ProfessionalCard key={professional.id} professional={professional} />
          ))}
        </div>
      )}
    </>
  );

  // Vista autenticada (con DashboardLayout)
  const AuthenticatedContent = () => (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6">
        {sidebarContent}
        <main className="flex-1">
          {mainContent}
        </main>
      </div>
    </DashboardLayout>
  );

  // Vista pública (sin autenticación)
  const PublicContent = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar público */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">CHASKIPRO</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Inicio</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <LogIn className="w-5 h-5" />
                <span>Iniciar Sesión</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {sidebarContent}
          <main className="flex-1">
            {mainContent}
          </main>
        </div>
      </div>
    </div>
  );

  // Renderizar según autenticación
  return isAuthenticated ? <AuthenticatedContent /> : <PublicContent />;
};

export default SearchProfessionals;
