const express = require('express');
const Investment = require('../models/Investment');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Helper: compute end date from duration string
function computeEndDate(duration) {
  const now = new Date();
  const map = {
    '1 week': () => now.setDate(now.getDate() + 7),
    '2 weeks': () => now.setDate(now.getDate() + 14),
    '1 month': () => now.setMonth(now.getMonth() + 1),
    '2 months': () => now.setMonth(now.getMonth() + 2),
    '3 months': () => now.setMonth(now.getMonth() + 3),
    '6 months': () => now.setMonth(now.getMonth() + 6),
    '9 months': () => now.setMonth(now.getMonth() + 9),
    '1 year': () => now.setFullYear(now.getFullYear() + 1),
    '18 months': () => now.setMonth(now.getMonth() + 18),
    '2 years': () => now.setFullYear(now.getFullYear() + 2),
  };
  if (map[duration]) map[duration]();
  return now;
}

// GET /api/investment/trades
router.get('/trades', auth, async (req, res) => {
  try {
    const trades = await Investment.find({ userId: req.user.userId, type: 'trade' }).sort({ createdAt: -1 });
    res.json({ success: true, trades });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/investment/trade
router.post('/trade', auth, async (req, res) => {
  try {
    const { symbol, symbolName, amount, orderType, volume, stopLoss, takeProfit, duration, direction } = req.body;
    const user = await User.findById(req.user._id);
    if (user.balance < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    const dailyReturnRate = 10.95;
    const endDate = computeEndDate(duration || '1 week');
    
    const trade = new Investment({
      userId: req.user.userId,
      type: 'trade',
      symbol,
      symbolName,
      amount: parseFloat(amount),
      currentValue: parseFloat(amount),
      dailyReturnRate,
      orderType,
      volume: parseFloat(volume) || 1,
      stopLoss: parseFloat(stopLoss) || 0,
      takeProfit: parseFloat(takeProfit) || 0,
      duration,
      direction,
      endDate
    });
    await trade.save();
    
    user.balance -= parseFloat(amount);
    await user.save();
    
    res.json({ success: true, trade, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/investment/trade/:id/close
router.put('/trade/:id/close', auth, async (req, res) => {
  try {
    const trade = await Investment.findOne({ _id: req.params.id, userId: req.user.userId, type: 'trade' });
    if (!trade) return res.status(404).json({ message: 'Trade not found' });
    
    trade.status = 'completed';
    trade.profit = trade.currentValue - trade.amount;
    await trade.save();
    
    const user = await User.findById(req.user._id);
    user.balance += trade.currentValue;
    await user.save();
    
    res.json({ success: true, trade, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/investment/holdings
router.get('/holdings', auth, async (req, res) => {
  try {
    const holdings = await Investment.find({ userId: req.user.userId, type: 'holding' }).sort({ createdAt: -1 });
    res.json({ success: true, holdings });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/investment/holding
router.post('/holding', auth, async (req, res) => {
  try {
    const { symbol, symbolName, amount, duration } = req.body;
    const user = await User.findById(req.user._id);
    if (user.balance < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    let dailyReturnRate = 10.95;
    const amt = parseFloat(amount);
    if (amt >= 5500) dailyReturnRate = 30.5;
    else if (amt >= 1500) dailyReturnRate = 25.95;
    else if (amt >= 250) dailyReturnRate = 20.95;
    else if (amt >= 55) dailyReturnRate = 15.95;
    else if (amt >= 10) dailyReturnRate = 10.95;
    
    const endDate = computeEndDate(duration || '1 week');
    
    const holding = new Investment({
      userId: req.user.userId,
      type: 'holding',
      symbol,
      symbolName,
      amount: amt,
      currentValue: amt,
      dailyReturnRate,
      duration,
      endDate
    });
    await holding.save();
    
    user.balance -= amt;
    await user.save();
    
    res.json({ success: true, holding, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/investment/holding/:id/topup
router.put('/holding/:id/topup', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const holding = await Investment.findOne({ _id: req.params.id, userId: req.user.userId, type: 'holding' });
    if (!holding) return res.status(404).json({ message: 'Holding not found' });
    
    const user = await User.findById(req.user._id);
    if (user.balance < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    holding.amount += parseFloat(amount);
    holding.currentValue += parseFloat(amount);
    await holding.save();
    
    user.balance -= parseFloat(amount);
    await user.save();
    
    res.json({ success: true, holding, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
