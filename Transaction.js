const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['deposit', 'withdraw', 'transfer', 'profit'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'], default: 'pending' },
  method: { type: String, default: '' },
  address: { type: String, default: '' },
  network: { type: String, default: '' },
  symbol: { type: String, default: '' },
  code: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null }
});

module.exports = mongoose.model('Transaction', transactionSchema);
