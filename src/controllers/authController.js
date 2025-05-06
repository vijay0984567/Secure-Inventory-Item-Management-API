import jwt from 'jsonwebtoken'; 
import { sendOTP } from '../utils/sendOTP.js'; 
import db from '../config/db.js'; 
import { users } from '../models/user.js';
import { eq } from 'drizzle-orm'; // For building query conditions

const otpStore = {};

// Send OTP to user’s email
export const requestOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  otpStore[email] = otp; // Store OTP temporarily

  try {
    await sendOTP(email, otp); // Send OTP via email
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('OTP send error:', err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP and return JWT token
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

  if (otpStore[email] !== otp) return res.status(401).json({ error: 'Invalid OTP' });

  try {
    // Check if user exists
    let user = await db.select().from(users).where(eq(users.email, email));

    // If user doesn't exist, insert new user
    if (user.length === 0) {
      await db.insert(users).values({ email });
      user = await db.select().from(users).where(eq(users.email, email));
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    delete otpStore[email]; // clear OTP after success
    res.status(200).json({ token });
  } catch (err) {
    console.error('OTP verification failed:', err);
    res.status(500).json({ error: 'Something went wrong on the server' });
  }
};
