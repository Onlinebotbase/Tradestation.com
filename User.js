const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  accountType: { type: String, default: 'Real Account' },
  isAdmin: { type: Boolean, default: false },
  withdrawSuspendedUntil: { type: Date, default: null },
  withdrawAttempts: { type: Number, default: 0 },
  usedDepositCodes: [{ type: String }],
  usedWithdrawCodes: [{ type: String }],
  settings: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: 'dark' },
    language: { type: String, default: 'en' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
