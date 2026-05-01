const Admin = require('../models/Admin');

const seedData = async () => {
  try {
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      const depositCodes = process.env.DEPOSIT_CODES ? process.env.DEPOSIT_CODES.split(',').map(c => c.trim()) : [];
      const withdrawCodes = process.env.WITHDRAW_CODES ? process.env.WITHDRAW_CODES.split(',').map(c => c.trim()) : [];
      
      const admin = new Admin({
        email: process.env.ADMIN_EMAIL || 'admin@tradestation.com',
        password: 'admin123',
        depositCodes,
        withdrawCodes
      });
      await admin.save();
      console.log('Admin seeded with validation codes');
    }
  } catch (err) {
    console.error('Seed error:', err);
  }
};

module.exports = seedData;
