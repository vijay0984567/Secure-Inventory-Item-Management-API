import express from 'express';
import { requestOTP, verifyOTP } from '../controllers/authController.js';

const router = express.Router();

// Route to request OTP
router.post('/request-otp', requestOTP);

// Route to verify OTP and get JWT
router.post('/verify-otp', verifyOTP);

export default router;
