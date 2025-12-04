# 🏠 CHASKIPRO - Marketplace de Servicios del Hogar

**CHASKIPRO** es un marketplace chileno que conecta clientes con especialistas del hogar ("Chasquillas Pro") verificados. Plataforma moderna desarrollada con React, Vite y Tailwind CSS.

---

## 🚀 Guía de Inicio Rápido

### 📋 Requisitos Previos
- **Node.js** v18 o superior
- **npm** v9 o superior
- **macOS**, Linux o Windows

### 🔧 Instalación

1. **Navegar al directorio del proyecto**
   ```bash
   cd ~/Documents/chaskipro-platform
   ```

2. **Instalar dependencias** (si aún no lo has hecho)
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

---

## 🎨 Stack Tecnológico

- **Framework**: React 18 + Vite
- **Estilos**: Tailwind CSS v4
- **Router**: React Router DOM
- **Íconos**: Lucide React
- **Animaciones**: Framer Motion
- **Backend**: Spring Boot (puerto 8080)

---

## 📂 Estructura del Proyecto

```
chaskipro-platform/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx       # Navegación principal
│   │   ├── Hero.jsx         # Sección hero con CTA
│   │   ├── Features.jsx     # Grid de beneficios
│   │   ├── HowItWorks.jsx   # Pasos del proceso
│   │   └── Footer.jsx       # Pie de página
│   ├── pages/
│   │   └── Home.jsx         # Landing page principal
│   ├── App.jsx              # Configuración de rutas
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globales + Tailwind
├── public/                  # Archivos estáticos
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.js        # Configuración de PostCSS
├── vite.config.js           # Configuración de Vite
└── package.json             # Dependencias
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Landing Page Completa
- **Hero Section**: Título impactante + buscador de servicios
- **Features**: 6 beneficios clave con íconos
- **How It Works**: 4 pasos del proceso
- **Footer**: Enlaces y redes sociales

### 🎨 Diseño
- **Paleta de colores**:
  - Primary: `#0056D2` (Azul Chaski - Confianza)
  - Secondary: `#FF7F11` (Naranja Al Toque - Acción)
- **Tipografías**:
  - Montserrat (Títulos)
  - Inter (Textos)
- **Responsive**: Mobile First (se adapta perfectamente a todos los dispositivos)

### 🆕 Actualizaciones recientes
- **Búsqueda de profesionales estable**: la página `/search` consulta el endpoint público `/api/professionals/search` y, si hay sesión, también `/api/profesionales/search`, enviando los filtros (`search/query`, `communeId/comunaId`, `professionCategory/categoria`, `minRating`). Deja de recargar en bucle y muestra errores en pantalla si la API responde con 4xx/5xx.
- **Sesiones seguras**: en respuestas 401 solo se limpia el token, sin redirigir ni romper vistas públicas.
- **Carga defensiva de comunas**: el listado de comunas se omite si la API devuelve error (por ejemplo, 400), manteniendo el resto de la página operativa.

---

## 🛠️ Comandos Disponibles

```bash
# Desarrollo - Inicia servidor con Hot Reload
npm run dev

# Build - Genera versión de producción
npm run build

# Preview - Previsualiza build de producción
npm run preview

# Lint - Revisa código con ESLint
npm run lint
```

---

## 🧪 Pruebas de la Web

### 1️⃣ **Navegación**
- ✅ Haz clic en el logo "CHASKIPRO" para volver al inicio
- ✅ Prueba el menú responsive (en móvil, haz clic en el ícono de hamburguesa)
- ✅ Navega por las secciones: Inicio, Cómo funciona, Servicios, Contacto

### 2️⃣ **Hero Section**
- ✅ Escribe en el buscador: "electricista", "plomero", "pintor"
- ✅ Haz clic en "Buscar Maestro" (funcionalidad de búsqueda)
- ✅ Observa las badges de confianza (500+ profesionales, cobertura nacional)

### 3️⃣ **Features/Beneficios**
- ✅ Revisa las 6 tarjetas de beneficios:
  1. Verificación de Identidad
  2. Geolocalización
  3. Pago Seguro
  4. Respuesta Rápida
  5. Calificaciones Reales
  6. Soporte 24/7

### 4️⃣ **How It Works**
- ✅ Lee los 4 pasos del proceso:
  1. Busca el servicio
  2. Compara profesionales
  3. Agenda tu cita
  4. Califica el servicio

### 5️⃣ **Responsive Design**
- ✅ Abre DevTools (F12)
- ✅ Activa el modo responsive (Ctrl+Shift+M o Cmd+Shift+M en Mac)
- ✅ Prueba en:
  - 📱 iPhone (375px)
  - 📱 iPad (768px)
  - 💻 Desktop (1280px)

### 6️⃣ **Interacciones**
- ✅ Hover sobre botones (cambian de color)
- ✅ Botones "Iniciar Sesión" y "Registrarse"
- ✅ Enlaces en el footer (redes sociales)
- ✅ Animaciones al hacer scroll (Framer Motion)

---

## 🔗 Integración con Backend

### ✅ Configuración Completada

El backend Spring Boot está corriendo en:
```
http://localhost:8080
```

### 🔑 API Endpoints Disponibles

**Autenticación:**
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

**Profesionales (públicos):**
- `GET /api/profesionales/comuna/{id}` - Buscar por comuna
- `GET /api/profesionales/perfil/{id}` - Ver perfil
- `GET /api/profesionales/usuario/{id}` - Perfil por usuario

**Comunas (público):**
- `GET /api/comunas` - Listar todas
- `GET /api/comunas/{id}` - Obtener por ID
- `GET /api/comunas/region/{region}` - Filtrar por región

**Profesionales (autenticados):**
- `GET /api/profesionales` - Listar todos (ADMIN)
- `POST /api/profesionales/perfil/{userId}` - Crear perfil
- `PUT /api/profesionales/perfil/{id}` - Actualizar perfil

### 🔐 Credenciales de Prueba

```javascript
// Administrador
{ email: "admin@chaskipro.com", password: "password123" }

// Profesional
{ email: "profesional@test.com", password: "password123" }

// Cliente
{ email: "cliente@test.com", password: "password123" }
```

### 📝 Variables de Entorno

Asegúrate de tener configurado `.env`:
```
VITE_API_URL=http://localhost:8080/api
```

---

## 🐛 Solución de Problemas

### Problema: Pantalla en blanco
**Solución**: Hard refresh del navegador
```
Mac: Cmd + Shift + R
Windows/Linux: Ctrl + Shift + R
```

### Problema: Estilos no se cargan
**Solución**: Verifica que Tailwind CSS esté configurado
```bash
npm install -D @tailwindcss/postcss
```

### Problema: Puerto 5173 ocupado
**Solución**: Cambia el puerto en `vite.config.js` o mata el proceso:
```bash
lsof -ti:5173 | xargs kill -9
```

---

## 📸 Screenshots

### Desktop
La landing page muestra:
- Navbar fija con logo y navegación
- Hero con gradiente azul y buscador prominente
- Grid de 6 features con íconos
- Sección "Cómo funciona" con 4 pasos
- Footer completo con enlaces

### Mobile
- Menú hamburguesa responsive
- Diseño adaptado a pantallas pequeñas
- Botones táctiles optimizados
- Imágenes y textos fluidos

---

## 📞 Contacto

- **Proyecto**: CHASKIPRO Platform
- **Versión**: 1.0.0
- **Fecha**: Diciembre 2025

---

## 📝 Notas de Desarrollo

- El proyecto usa **Tailwind CSS v4** con la nueva sintaxis `@import "tailwindcss"`
- Las fuentes se cargan desde **Google Fonts** en `index.css`
- Los colores personalizados se definen con `@theme` en CSS
- Todas las animaciones usan **Framer Motion**
- El diseño es **Mobile First** y totalmente responsive

---

## 🎓 Estado del Proyecto

### ✅ Completado

- [x] Landing page responsive
- [x] Sistema de navegación
- [x] Integración con backend Spring Boot
- [x] Sistema de autenticación (JWT)
- [x] Páginas de Login/Registro funcionales
- [x] Dashboard Cliente
- [x] Dashboard Profesional
- [x] Dashboard Admin
- [x] Servicios API (auth, professional, comuna)
- [x] Configuración CORS
- [x] Manejo de errores y estados

### 🚧 Próximos Pasos

- [ ] Búsqueda de profesionales desde Hero
- [ ] Página de listado de profesionales
- [ ] Página de detalle de profesional
- [ ] Sistema de solicitudes de servicio
- [ ] Sistema de reviews y calificaciones
- [ ] Sistema de notificaciones
- [ ] Chat en tiempo real
- [ ] Pasarela de pagos

---

¡Disfruta explorando CHASKIPRO! 🎉
