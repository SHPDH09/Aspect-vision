import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const router = express.Router();
const envPath = path.resolve(process.cwd(), '.env');

dotenv.config();

// GET current Twilio config
router.get('/twilio-setup', (req, res) => {
  res.json({
    sid: process.env.TWILIO_ACCOUNT_SID || '',
    token: process.env.TWILIO_AUTH_TOKEN || '',
    phone: process.env.TWILIO_PHONE_NUMBER || '',
  });
});

// POST update Twilio config
router.post('/twilio-setup', (req, res) => {
  const { sid, token, phone } = req.body;
  try {
    let env = fs.readFileSync(envPath, 'utf8');
    env = env.replace(/TWILIO_ACCOUNT_SID=.*/g, `TWILIO_ACCOUNT_SID=${sid}`);
    env = env.replace(/TWILIO_AUTH_TOKEN=.*/g, `TWILIO_AUTH_TOKEN=${token}`);
    env = env.replace(/TWILIO_PHONE_NUMBER=.*/g, `TWILIO_PHONE_NUMBER=${phone}`);
    fs.writeFileSync(envPath, env, 'utf8');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
