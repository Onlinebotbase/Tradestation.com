const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['crypto', 'forex', 'stock', 'commodity'], required: true },
  price: { type: Number, default: 0 },
  change24h: { type: Number, default: 0 },
  change24hValue: { type: Number, default: 0 },
  marketCap: { type: Number, default: 0 },
  volume24h: { type: Number, default: 0 },
  image: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Asset', assetSchema);
