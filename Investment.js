const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['trade', 'holding'], required: true },
  symbol: { type: String, required: true },
  symbolName: { type: String, default: '' },
  amount: { type: Number, required: true },
  currentValue: { type: Number, default: 0 },
  profit: { type: Number, default: 0 },
  dailyReturnRate: { type: Number, default: 0 },
  orderType: { type: String, default: 'Market Execution' },
  volume: { type: Number, default: 1 },
  stopLoss: { type: Number, default: 0 },
  takeProfit: { type: Number, default: 0 },
  duration: { type: String, default: '' },
  direction: { type: String, enum: ['buy', 'sell'], default: 'buy' },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Investment', investmentSchema);
