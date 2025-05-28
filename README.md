## Backend

El **backend** de Bitacorapp está construido como una API RESTful sobre **Node.js** y **Express**, con **MongoDB** como base de datos y **Mongoose** para el modelado de datos. Su misión es exponer todos los endpoints necesarios para gestionar usuarios, sesiones y bitácoras de navegación (“voyages”), aplicar las reglas de negocio y garantizar la seguridad y escalabilidad de la plataforma.

### Arquitectura y tecnologías
- **Node.js (v18+)** y **Express**: servidor HTTP y enrutamiento de peticiones.  
- **MongoDB (Atlas o self-hosted)** con **Mongoose**: esquemas y validación de datos para colecciones como `User`, `Voyage`, `Equipment`, etc.  
- **Autenticación y autorización**: JSON Web Tokens (JWT) para sesiones seguras y rol de usuario.  
- **Middlewares**:  
  - **Validación** de body/query params con `express-validator`  
  - **Control de errores** centralizado  
  - **Logging** con `morgan`  
  - **CORS** configurado para dominios de frontend  
- **Configuración**:  
  - Variables de entorno gestionadas con `.env` (ej. `PORT`, `MONGO_URI`, `JWT_SECRET`)  
  - Ficheros de configuración separados (`config/`)  
- **Despliegue**:  
  - **Docker** y **docker-compose** para desarrollo y staging  
  - Integración continua con GitHub Actions (tests, lint, build)  
  - Despliegue a AWS (Elastic Beanstalk / ECS) o cualquier proveedor que soporte contenedores

### Estructura de carpetas
<pre> ```plaintext /backend ├── src │ ├── config/ # Variables de entorno │ ├── controllers/ # Lógica de endpoints │ ├── models/ # Esquemas Mongoose │ ├── routes/ # Definición de rutas │ ├── middlewares/ # Auth y validaciones │ ├── services/ # Funciones de negocio │ ├── utils/ # Helpers │ └── app.js # Inicialización de Express ├── tests/ # Pruebas unitarias ├── .env.example # Ejemplo de variables ├── docker-compose.yml # Contenedores ├── Dockerfile # Imagen del API └── package.json ``` </pre>

### Principales endpoints
- **Auth**  
  - `POST /api/auth/register` — Registro de usuario  
  - `POST /api/auth/login` — Login y emisión de JWT  
- **Usuarios**  
  - `GET /api/users/me` — Datos del usuario autenticado  
  - `PUT /api/users/me` — Actualizar perfil  
- **Bitácoras de navegación**  
  - `GET /api/voyages` — Listar todas las bitácoras del usuario  
  - `POST /api/voyages` — Crear nueva bitácora  
  - `GET /api/voyages/:id` — Obtener detalles de una bitácora  
  - `PUT /api/voyages/:id` — Actualizar bitácora  
  - `DELETE /api/voyages/:id` — Eliminar bitácora  

### Cómo empezar
1. Clonar el repositorio y moverse a la carpeta `backend`.  
2. Copiar `.env.example` a `.env` y completar las variables (MongoDB URI, JWT secret, etc.).  
3. Ejecutar `npm install`.  
4. Para desarrollo local con Docker:  
   ```bash
   docker-compose up --build

