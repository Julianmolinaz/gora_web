const axios = require("axios").default;

/**
 * from = "Mi negocio"
 * to = ["573207809668", "573147651296"]
 * text = "Lorem ipsumo dolor"
 */

async function sendSms(from, to, text) {
  try {
    const body = { from, to, text };
    const url = process.env.SMS_URL;
    const meta = {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: process.env.SMS_USER, 
        password: process.env.SMS_PASSWORD
      }
    };
    if (process.env.SMS_SEND == true) {
      return await axios.post(url, body, meta);
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }  
}

module.exports = {
  sendSms,
}
