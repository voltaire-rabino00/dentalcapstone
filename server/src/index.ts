import 'dotenv/config'; // 👈 CRITICAL: Ito dapat ang Line 1! Awtomatiko nitong ilo-load ang .env bago ang lahat ng imports.
import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDatabase from './config/DatabaseConfig.js'; 
import authRoutes from './routes/AuthRoutes.js';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 🛡️ MIDDLEWARES (Security & Optimization)
// ==========================================

// Helmet: Nagdaragdag ng HTTP headers para sa security ng API (Standard #8)
app.use(helmet());

// CORS: Pinapayagan lang ang frontend mo (localhost:5173) na maka-access sa backend (Standard #8)
app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));

// Body Parser: Para makabasa ang server ng JSON data na ipapasa mula sa Postman/Frontend
app.use(express.json());

// Morgan: Logger na nagpi-print sa terminal ng bawat request (e.g., GET / 200 OK)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ==========================================
// 🔌 DATABASE CONNECTION
// ==========================================
connectDatabase();

// ==========================================
// 🛣️ ROUTES DECLARATION
// ==========================================

// Dito dadaan ang lahat ng requests na may kinalaman sa registration at login
app.use('/api/auth', authRoutes);

// Base Route para sa pag-test kung buhay ang server
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    success: true,
    message: "Welcome to Dental Clinic Management System API Backend!" 
  });
});

// ==========================================
// 🚀 START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server is happily running on port http://localhost:${PORT}`);
});