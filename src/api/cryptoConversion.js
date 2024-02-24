const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/convert', async (req, res) => {
  try {
    const { fromCurrency, toCurrency, date } = req.body;

    // Fetch historical price data for the specified date
    const historicalData = await fetchHistoricalData(fromCurrency, toCurrency, date);
    console.log("accepted body");

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
  const timestamp = Math.floor(new Date(date).getTime() / 1000);

  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${fromCurrency}/market_chart`,
    {
      params: {
        vs_currency: toCurrency, // Get price in the desired "to" currency
        from: timestamp,
        to: timestamp,
        interval: 'daily',
        precision: 10,
        days: 1
      },
    }
  );

  console.log(response.data);
  return response.data.prices[0];
}

// Function to calculate conversion rate from historical data
function calculateConversionRate(historicalData) {
  const [fromPrice, toPrice] = historicalData;
    if (fromPrice && toPrice) {
        const conversionRate = fromPrice / toPrice;
        return conversionRate;
    } else {
        throw new Error('No historical data available for the specified date');
    }
}

module.exports = router;
