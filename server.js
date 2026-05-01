require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transactions');
const investmentRoutes = require('./routes/investment');
const marketRoutes = require('./routes/market');
const adminRoutes = require('./routes/admin');

const seedData = require('./utils/seedData');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/investment', investmentRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/admin', adminRoutes);

// Fallback for SPA-like navigation (serve index.html for non-API routes)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
});

// MongoDB connection with fallback to JSON file mode
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected successfully');
      await seedData();
    } else {
      console.log('No MONGODB_URI found. Running in JSON file mode.');
    }
  } catch (err) {
    console.log('MongoDB connection failed. Running in JSON file mode.', err.message);
  }
};

// Background job: update active trades and holdings every minute
cron.schedule('* * * * *', async () => {
  try {
    const Investment = require('./models/Investment');
    const User = require('./models/User');

    const activeTrades = await Investment.find({ type: 'trade', status: 'active' });
    for (const trade of activeTrades) {
      const dailyReturn = trade.amount * (trade.dailyReturnRate / 100);
      const minuteReturn = dailyReturn / 1440;
      trade.currentValue += minuteReturn;

      const now = new Date();
      if (now >= trade.endDate) {
        trade.status = 'completed';
        trade.profit = trade.currentValue - trade.amount;
        const user = await User.findOne({ userId: trade.userId });
        if (user) {
          user.balance += trade.currentValue;
          await user.save();
        }
      }
      await trade.save();
    }

    const activeHoldings = await Investment.find({ type: 'holding', status: 'active' });
    for (const holding of activeHoldings) {
      const dailyReturn = holding.amount * (holding.dailyReturnRate / 100);
      const minuteReturn = dailyReturn / 1440;
      holding.currentValue += minuteReturn;

      const now = new Date();
      if (now >= holding.endDate) {
        holding.status = 'completed';
        holding.profit = holding.currentValue - holding.amount;
        const user = await User.findOne({ userId: holding.userId });
        if (user) {
          user.balance += holding.currentValue;
          await user.save();
        }
      }
      await holding.save();
    }
  } catch (err) {
    console.error('Background job error:', err);
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Trade Station server running on port ${PORT}`);
  });
});
