const express = require('express');
const axios = require('axios');

const router = express.Router();

// Cache for market data
const cache = {};
const CACHE_TTL = 60 * 1000; // 60 seconds

function getCached(key) {
  const entry = cache[key];
  if (entry && Date.now() - entry.time < CACHE_TTL) {
    return entry.data;
  }
  return null;
}

function setCached(key, data) {
  cache[key] = { time: Date.now(), data };
}

// GET /api/market/crypto
router.get('/crypto', async (req, res) => {
  try {
    const cached = getCached('crypto');
    if (cached) return res.json({ success: true, data: cached });
    
    const response = await axios.get(`${process.env.COINGECKO_API_URL}/coins/markets`, {
      params: { vs_currency: 'usd', per_page: 100, page: 1, sparkline: false }
    });
    setCached('crypto', response.data);
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('Crypto fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch crypto data' });
  }
});

// GET /api/market/forex
router.get('/forex', async (req, res) => {
  try {
    const cached = getCached('forex');
    if (cached) return res.json({ success: true, data: cached });
    
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`);
    setCached('forex', response.data);
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('Forex fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch forex data' });
  }
});

// GET /api/market/news
router.get('/news', async (req, res) => {
  try {
    const cached = getCached('news');
    if (cached) return res.json({ success: true, data: cached });
    
    const response = await axios.get(`https://finnhub.io/api/v1/news?category=general&token=${process.env.FINNHUB_API_KEY}`);
    setCached('news', response.data);
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('News fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

// GET /api/market/stock/:symbol
router.get('/stock/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const cached = getCached(`stock_${symbol}`);
    if (cached) return res.json({ success: true, data: cached });
    
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: process.env.ALPHA_VANTAGE_API_KEY
      }
    });
    setCached(`stock_${symbol}`, response.data);
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('Stock fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch stock data' });
  }
});

module.exports = router;
