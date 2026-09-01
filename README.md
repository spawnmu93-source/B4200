# BASE 4.200 by OBEMA — Portal Web & Sistema MVP

Sitio web institucional, configurador de campamentos y panel de administración para **BASE 4.200**, unidad de negocios especializada de **OBEMA S.A.** en desarrollo e integración de soluciones para campamentos y operaciones remotas.

---

## 🛠️ Stack Tecnológico

* **Frontend (`/client`):** React 19, Vite, Tailwind CSS v4, Lucide Icons, react-i18next (Bilingüe ES/EN).
* **Backend (`/server`):** Node.js 24, Express, SQLite nativo (`node:sqlite`), JWT, Bcrypt, Zod, Nodemailer.
* **Identidad Visual:** Manual de Marca Oficial BASE 4.200 (Amarillo Industrial `#F3A801`, Grafito `#202328`, Negro Técnico `#141619`, Azul OBEMA `#1766A3`).

---

## 🚀 Cómo Iniciar el Proyecto

### 1. Iniciar Servidor Backend (Node.js API)
```bash
cd server
npm run dev
```
> El servidor iniciará en `http://localhost:3001` y creará automáticamente la base de datos SQLite en `server/data/base4200.db`.

### 2. Iniciar Cliente Frontend (React + Vite)
En una nueva terminal:
```bash
cd client
npm run dev
```
> El portal web estará disponible en `http://localhost:5173`.

---

## 🔐 Acceso al Panel de Administración (Backoffice)

El sitio cuenta con un panel de control integrado para el equipo comercial y operativo:
* **Acceso:** Haz clic en el ícono de llave inglesa en el encabezado de navegación o en el enlace "Acceso Administración" del pie de página.
* **Usuario:** `admin`
* **Contraseña:** `Base4200@Admin`

### Funcionalidades del Panel:
1. **Consultas de Campamentos:** Visualización de solicitudes recibidas, filtrado por estado (*Nueva*, *Contactada*, *En análisis*, *Cerrada*), búsqueda por empresa o código y notas internas.
2. **Postulaciones de Proveedores:** Gestión de aliados y empresas que postulan para integrarse a la cadena de valor.
3. **Métricas en tiempo real:** Resumen de nuevos leads y proveedores.

---

## 📂 Estructura del Repositorio

```text
PAGE BASE4200/
├── client/                     # Aplicación Frontend en React
│   ├── src/
│   │   ├── assets/             # Logos vectoriales (SVG) y fotografía oficial
│   │   ├── components/         # Navbar, Hero, Presentation, Solutions, Configurator...
│   │   ├── i18n/               # Diccionarios de traducción (es.json / en.json)
│   │   ├── pages/              # AdminDashboard (Backoffice)
│   │   ├── App.jsx
│   │   └── index.css           # Configuración de paleta Tailwind
├── server/                     # Backend API en Node.js + Express
│   ├── src/
│   │   ├── config/db.js        # Esquemas de SQLite y seeds
│   │   ├── middleware/         # Autenticación JWT y validaciones Zod
│   │   ├── routes/             # Endpoints /api/inquiries, /api/admin, /api/auth...
│   │   ├── services/           # Nodemailer / simulador de correos
│   │   └── index.js
└── package.json                # Scripts globales del workspace
```
