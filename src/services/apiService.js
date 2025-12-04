import axiosInstance from './api';

// ============================================
// AUTENTICACIÓN
// ============================================

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await axiosInstance.post('auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Guardar datos del usuario (sin el token)
      const { token, type, message, ...userData } = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
    }
    return response.data;
  },

  // Registro
  register: async (userData) => {
    const response = await axiosInstance.post('auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Guardar datos del usuario (sin el token)
      const { token, type, message, ...userInfo } = response.data;
      localStorage.setItem('user', JSON.stringify(userInfo));
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ============================================
// PROFESIONALES
// ============================================

export const professionalService = {
  // Listar todos los profesionales
  getAll: async () => {
    const response = await axiosInstance.get('profesionales');
    return response.data;
  },

  // Obtener profesional por ID
  getById: async (id) => {
    const response = await axiosInstance.get(`profesionales/perfil/${id}`);
    return response.data;
  },

  // Buscar profesionales por texto
  search: async (query) => {
    const response = await axiosInstance.get('profesionales/search', {
      params: { query }
    });
    return response.data;
  },

  // Buscar profesionales por comuna
  getByComuna: async (comunaId) => {
    const response = await axiosInstance.get(`profesionales/comuna/${comunaId}`);
    return response.data;
  },

  // Obtener profesionales mejor calificados
  getTopRated: async (limit = 6) => {
    const response = await axiosInstance.get('profesionales/top-rated', {
      params: { limit }
    });
    return response.data;
  },
};

// ============================================
// COMUNAS
// ============================================

export const comunaService = {
  // Listar todas las comunas
  getAll: async () => {
    const response = await axiosInstance.get('comunas');
    return response.data;
  },

  // Buscar comunas por región
  getByRegion: async (region) => {
    const response = await axiosInstance.get(`comunas/region/${region}`);
    return response.data;
  },
};

// ============================================
// SOLICITUDES DE SERVICIO
// ============================================

export const serviceRequestService = {
  // Crear solicitud de servicio
  create: async (requestData) => {
    const response = await axiosInstance.post('solicitudes', requestData);
    return response.data;
  },

  // Obtener mis solicitudes (como cliente)
  getMySolicitudes: async () => {
    const response = await axiosInstance.get('solicitudes/mis-solicitudes');
    return response.data;
  },

  // Obtener solicitudes recibidas (como profesional)
  getReceivedSolicitudes: async () => {
    const response = await axiosInstance.get('solicitudes/recibidas');
    return response.data;
  },

  // Aceptar solicitud (profesional)
  accept: async (requestId) => {
    const response = await axiosInstance.put(`solicitudes/${requestId}/aceptar`);
    return response.data;
  },

  // Rechazar solicitud (profesional)
  reject: async (requestId) => {
    const response = await axiosInstance.put(`solicitudes/${requestId}/rechazar`);
    return response.data;
  },

  // Completar servicio
  complete: async (requestId) => {
    const response = await axiosInstance.put(`solicitudes/${requestId}/completar`);
    return response.data;
  },
};

// ============================================
// REVIEWS
// ============================================

export const reviewService = {
  // Crear review
  create: async (reviewData) => {
    const response = await axiosInstance.post('reviews', reviewData);
    return response.data;
  },

  // Obtener reviews de un profesional
  getByProfessional: async (professionalId) => {
    const response = await axiosInstance.get(`reviews/profesional/${professionalId}`);
    return response.data;
  },

  // Obtener mis reviews (como cliente)
  getMyReviews: async () => {
    const response = await axiosInstance.get('reviews/mis-reviews');
    return response.data;
  },
};

// Exportar todos los servicios
export default {
  auth: authService,
  professional: professionalService,
  comuna: comunaService,
  serviceRequest: serviceRequestService,
  review: reviewService,
};
