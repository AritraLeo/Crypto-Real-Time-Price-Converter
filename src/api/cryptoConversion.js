// /src/api/cryptoConversion.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/convert', async (req, res) => {
  try {
    const { fromCurrency, toCurrency, date } = req.body;

    // Fetch historical price data for the specified date
    const historicalData = await fetchHistoricalData(fromCurrency, toCurrency, date);

    // Calculate conversion rate
    const conversionRate = calculateConversionRate(historicalData);

    res.json({ conversionRate });
  } catch (error) {
    console.error('Error converting currencies:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to fetch historical price data from Coingecko
async function fetchHistoricalData(fromCurrency, toCurrency, date) {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${fromCurrency}/market_chart`,
    {
      params: {
        vs_currency: toCurrency, // Get price in the desired "to" currency
        from: new Date(date).getTime() / 1000,
        to: new Date(date).getTime() / 1000,
        interval: 'daily',
      },
    }
  );

  return response.data.prices;
}

// Function to calculate conversion rate from historical data
function calculateConversionRate(historicalData) {
  // Assuming the data is in the format [timestamp, price]
  if (historicalData.length > 0) {
    const closingPrice = historicalData[historicalData.length - 1][1];
    return closingPrice; // You may adjust this based on your specific requirements
  } else {
    throw new Error('No historical data available for the specified date');
  }
}

module.exports = router;
