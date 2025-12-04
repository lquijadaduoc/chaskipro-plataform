import axios from 'axios';

// Configuración base de Axios (siempre con slash final)
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080/api').replace(/\/?$/, '/');

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a cada request
axiosInstance.interceptors.request.use(
  (config) => {
    // Asegurar que las rutas relativas no se coman el /api
    if (config.url && config.url.startsWith('/') && !/^https?:/i.test(config.url)) {
      config.url = config.url.slice(1);
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Solo forzar logout si el usuario tenía sesión iniciada
      const hasToken = !!localStorage.getItem('token');
      if (hasToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
