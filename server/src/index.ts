import 'dotenv/config';
import express, { type Application, type Request, type Response } from 'express';
import http from 'http'; // 1. Import http
import { Server } from 'socket.io'; // 2. Import Socket.io
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { globalLimiter } from './middlewares/rateLimiters.js';
import connectDatabase from './config/DatabaseConfig.js';
import authRoutes from './routes/AuthRoutes.js';
import staffRoutes from "./routes/staffRoutes.js";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// 3. Create HTTP Server
const server = http.createServer(app);

// 4. Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"]
  }
});

// GAWIN NATING GLOBAL ANG IO PARA MAGAMIT SA ROUTES
app.set("io", io);

// ==========================================
// Security & Core Middleware
// ==========================================
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(globalLimiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ==========================================
// Socket.io Connection Logic
// ==========================================
io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// ==========================================
// Routes & Database
// ==========================================
connectDatabase();

app.use('/api/auth', authRoutes);
app.use("/api/staffs", staffRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Welcome to Dental Clinic Management System API Backend!' });
});

// 5. PALITAN ANG app.listen NG server.listen
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});