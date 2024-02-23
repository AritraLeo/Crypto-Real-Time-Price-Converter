const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const updateCryptoList = require('./src/backgroundTasks/updateCryptoList');
const cryptoConversionAPI = require('./src/api/cryptoConversion');
const publicTreasuryAPI = require('./src/api/publicTreasury');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Set the update interval in minutes (change this value as needed)
const updateIntervalInMinutes = 60; // Example: Update every 60 minutes

// Calculate the cron expression based on the interval
const cronExpression = `*/${updateIntervalInMinutes} * * * *`;

// Schedule the task to run based on the calculated cron expression
cron.schedule(cronExpression, () => {
  console.log(`Running the task to update crypto list every ${updateIntervalInMinutes} minutes...`);
  updateCryptoList();
});

// Use the cryptoConversion API
app.use('/api/cryptoConversion', cryptoConversionAPI);
// Use the publicTreasury API
app.use('/api/publicTreasury', publicTreasuryAPI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
