const emailjs = require('@emailjs/nodejs');

const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const TEMPLATE_REGISTER = process.env.EMAILJS_TEMPLATE_REGISTER;
const TEMPLATE_AUTOREPLY = process.env.EMAILJS_TEMPLATE_AUTOREPLY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

emailjs.init({ publicKey: PUBLIC_KEY, privateKey: '' });

async function sendAdminNotification({ firstName, lastName, email, userId }) {
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_REGISTER, {
      to_email: ADMIN_EMAIL,
      from_name: `${firstName} ${lastName}`,
      from_email: email,
      user_id: userId,
      message: `New user registered: ${firstName} ${lastName} (${email}) - User ID: ${userId}`
    });
    return true;
  } catch (err) {
    console.error('Admin notification failed:', err);
    return false;
  }
}

async function sendAutoReply({ firstName, lastName, email }) {
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, {
      to_email: email,
      to_name: `${firstName} ${lastName}`,
      from_name: 'Trade Station',
      message: `Welcome to Trade Station, ${firstName}! Your account has been created successfully. You can now log in and start trading.`
    });
    return true;
  } catch (err) {
    console.error('Auto-reply failed:', err);
    return false;
  }
}

module.exports = { sendAdminNotification, sendAutoReply };
