const express = require('express');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Admin = require('../models/Admin');

const router = express.Router();

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/validation-codes/deposit
router.post('/validation-codes/deposit', async (req, res) => {
  try {
    const { codes } = req.body;
    const admin = await Admin.findOne();
    if (!admin) {
      const newAdmin = new Admin({ email: process.env.ADMIN_EMAIL, password: 'admin123', depositCodes: codes });
      await newAdmin.save();
    } else {
      admin.depositCodes = [...new Set([...(admin.depositCodes || []), ...codes])];
      await admin.save();
    }
    res.json({ success: true, message: 'Deposit codes updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/validation-codes/withdraw
router.post('/validation-codes/withdraw', async (req, res) => {
  try {
    const { codes } = req.body;
    const admin = await Admin.findOne();
    if (!admin) {
      const newAdmin = new Admin({ email: process.env.ADMIN_EMAIL, password: 'admin123', withdrawCodes: codes });
      await newAdmin.save();
    } else {
      admin.withdrawCodes = [...new Set([...(admin.withdrawCodes || []), ...codes])];
      await admin.save();
    }
    res.json({ success: true, message: 'Withdrawal codes updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/user/:id/suspend
router.put('/user/:id/suspend', async (req, res) => {
  try {
    const { hours } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const until = new Date();
    until.setHours(until.getHours() + (hours || 48));
    user.withdrawSuspendedUntil = until;
    await user.save();
    res.json({ success: true, message: `User suspended until ${until.toISOString()}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
