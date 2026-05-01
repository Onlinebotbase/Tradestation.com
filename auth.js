const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendAdminNotification, sendAutoReply } = require('../utils/emailService');

const router = express.Router();

// Helper: generate 10-digit user ID
function generateUserId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const userId = generateUserId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      userId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      balance: 0,
      accountType: 'Real Account'
    });
    await user.save();

    // Send emails
    try {
      await sendAdminNotification({ firstName, lastName, email, userId });
      await sendAutoReply({ firstName, lastName, email });
    } catch (e) {
      console.error('EmailJS error:', e);
    }

    const token = jwt.sign({ id: user._id, userId: user.userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });

    res.json({
      success: true,
      token,
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        balance: user.balance,
        accountType: user.accountType
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, userId: user.userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });

    res.json({
      success: true,
      token,
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        balance: user.balance,
        accountType: user.accountType
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

module.exports = router;
