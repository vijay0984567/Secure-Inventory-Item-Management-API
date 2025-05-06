import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Routes for OTP & auth
import itemRoutes from './routes/itemRoutes.js'; // Routes for inventory
import { errorHandler } from './middlewares/errorHandler.js'; // Custom error handler

dotenv.config(); // Load env variables

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/auth', authRoutes);  // OTP & JWT auth
app.use('/api/items', itemRoutes); // CRUD for inventory items

app.use(errorHandler); // Global error handler

export default app;
