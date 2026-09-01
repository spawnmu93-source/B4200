import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { initDatabase } from './config/db.js';
import inquiriesRouter from './routes/inquiries.js';
import adminRouter from './routes/admin.js';
import authRouter from './routes/auth.js';
import publicRouter from './routes/public.js';

dotenv.config();

// Inicializar base de datos
initDatabase();

const app = express();
const PORT = process.env.PORT || 3001;

// Seguridad y Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Limitador de tasa para prevenir ataques de denegación y spam
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 150, // límite de 150 solicitudes por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Por favor intente más tarde.' }
});

const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 20, // 20 envíos de formulario por hora por IP
  message: { error: 'Ha alcanzado el límite de envíos de formularios. Intente en unos minutos.' }
});

app.use('/api/', apiLimiter);
app.use('/api/inquiries/', inquiryLimiter);

// Rutas de la API
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/public', publicRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'BASE 4.200 API Server',
    timestamp: new Date().toISOString()
  });
});

// Manejador 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Manejador global de errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 BASE 4.200 Backend API activo en http://localhost:${PORT}`);
  console.log(`📌 Modo: ${process.env.NODE_ENV || 'development'}`);
  console.log(`======================================================\n`);
});
