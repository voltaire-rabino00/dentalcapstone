import 'dotenv/config'; // Load environment variables before other imports

import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { globalLimiter } from './middlewares/rateLimiters.js';
import connectDatabase from './config/DatabaseConfig.js';
import authRoutes from './routes/AuthRoutes.js';
import staffRoutes from "./routes/staffRoutes.js";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Security & Core Middleware
// ==========================================

// Adds secure HTTP headers
app.use(helmet());

// Restrict API access to the frontend application
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Parse incoming JSON requests
app.use(express.json());

// Apply global rate limiting
app.use(globalLimiter);

// HTTP request logging (development only)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ==========================================
// Database Connection
// ==========================================

connectDatabase();

// ==========================================
// Routes
// ==========================================

app.use('/api/auth', authRoutes);
app.use("/api/staffs", staffRoutes);

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to Dental Clinic Management System API Backend!',
  });
});

// ==========================================
// Start Server
// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});