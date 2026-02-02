// Express server setup

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import twilioCall from './twilioCall.js';
import twilioSetup from './twilioSetup.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', twilioCall);
app.use('/api', twilioSetup);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
