const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/transactions/deposit
router.post('/deposit', auth, async (req, res) => {
  try {
    const { amount, method, symbol, network, address, code } = req.body;
    const transaction = new Transaction({
      userId: req.user.userId,
      type: 'deposit',
      amount: parseFloat(amount),
      method,
      symbol,
      network,
      address,
      code,
      status: 'completed'
    });
    await transaction.save();
    
    const user = await User.findById(req.user._id);
    user.balance += parseFloat(amount);
    await user.save();
    
    res.json({ success: true, transaction, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/transactions/withdraw
router.post('/withdraw', auth, async (req, res) => {
  try {
    const { amount, method, network, address, code } = req.body;
    const user = await User.findById(req.user._id);
    
    if (user.balance < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    const transaction = new Transaction({
      userId: req.user.userId,
      type: 'withdraw',
      amount: parseFloat(amount),
      method,
      network,
      address,
      code,
      status: 'processing'
    });
    await transaction.save();
    
    user.balance -= parseFloat(amount);
    await user.save();
    
    res.json({ success: true, transaction, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/transactions/:id/status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status, completedAt: status === 'completed' ? new Date() : null },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
