import nodemailer from 'nodemailer'; // import nodemailer for sending emails

// Sends the OTP to the specified email address
export const sendOTP = async (email, otp) => {
  // Created transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Gmail address from .env
      pass: process.env.EMAIL_PASS, // App password from .env
    },
  });

  // Configure & send the email
  await transporter.sendMail({
    from: process.env.EMAIL_USER, // Sender email
    to: email, // Recipient email
    subject: 'Your OTP Code', // Email subject
    text: `Your OTP is: ${otp}`, // Email body with OTP
  });
};
