const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: String, default: 'all' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'success', 'warning', 'error', 'market'], default: 'info' },
  read: { type: Boolean, default: false },
  dismissed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
