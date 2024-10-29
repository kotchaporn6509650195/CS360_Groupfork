// server.js
const express = require('./express');
const nodemailer = require('./nodemailer');
const dotenv = require('./dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// สร้าง transporter สำหรับส่งอีเมล
const transporter = nodemailer.createTransport({
  service: 'gmail', // หรือบริการอื่น ๆ ที่คุณใช้
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ฟังก์ชันเพื่อส่ง OTP
const sendOtp = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. This code is valid for 5 minutes.`,
  };

  return transporter.sendMail(mailOptions);
};

// เส้นทางสำหรับขอ OTP
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;

  // ตรวจสอบว่าอีเมลถูกต้องหรือไม่
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // สร้าง OTP (สามารถปรับปรุงให้มีการสร้าง OTP แบบสุ่มได้)
  const otp = Math.floor(100000 + Math.random() * 900000); // สุ่มเลข 6 หลัก

  try {
    await sendOtp(email, otp);
    // ในการใช้งานจริง คุณควรเก็บ OTP ไว้ในฐานข้อมูลและกำหนดเวลาหมดอายุ
    console.log(`OTP sent to ${email}: ${otp}`); // ลบออกในโปรดักชัน
    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
