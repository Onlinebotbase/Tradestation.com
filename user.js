const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/user/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/user/profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password;
    delete updates.userId;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/user/balance
router.get('/balance', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('balance');
    res.json({ success: true, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/user/balance
router.put('/balance', auth, async (req, res) => {
  try {
    const { amount, operation } = req.body;
    const user = await User.findById(req.user._id);
    if (operation === 'add') {
      user.balance += parseFloat(amount);
    } else if (operation === 'subtract') {
      user.balance -= parseFloat(amount);
    } else if (operation === 'set') {
      user.balance = parseFloat(amount);
    }
    await user.save();
    res.json({ success: true, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/user/password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
