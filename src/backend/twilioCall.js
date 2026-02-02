// Twilio call API endpoint
import express from 'express';
import twilio from 'twilio';

const router = express.Router();

router.post('/call', async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  const client = twilio(accountSid, authToken);
  const { to } = req.body;
  console.log('Twilio FROM:', twilioPhone, '| SID:', accountSid, '| TOKEN:', authToken);
  try {
    if (!twilioPhone) {
      return res.status(500).json({ success: false, error: 'Twilio FROM number is missing in env.' });
    }
    const call = await client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to,
      from: twilioPhone,
    });
    res.json({ success: true, callSid: call.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
